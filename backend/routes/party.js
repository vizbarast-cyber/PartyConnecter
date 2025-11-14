const express = require('express');
const router = express.Router();
const { verifyToken, requireVerification, requireRole } = require('../middleware/auth');
const Party = require('../models/Party');
const User = require('../models/User');

// Create party (draft)
router.post('/create', verifyToken, requireVerification, requireRole('organizer'), async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      pricePerPerson,
      maxParticipants,
      location,
      images,
      musicType,
      dressCode,
      ageRange,
    } = req.body;

    // Validation
    if (!title || !description || !date || !time || !pricePerPerson || !maxParticipants) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!images || images.length < 3) {
      return res.status(400).json({ error: 'At least 3 images required' });
    }

    const partyDate = new Date(date);
    if (partyDate <= new Date()) {
      return res.status(400).json({ error: 'Party date must be in the future' });
    }

    const party = new Party({
      organizerId: req.user.uid,
      title,
      description,
      date: partyDate,
      time,
      pricePerPerson,
      maxParticipants,
      location: location || {},
      images: images.map((url, index) => ({ url, order: index })),
      musicType,
      dressCode,
      ageRange,
      status: 'draft',
    });

    await party.save();

    res.json({ party });
  } catch (error) {
    console.error('Create party error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Publish party
router.post('/:id/publish', verifyToken, requireVerification, requireRole('organizer'), async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    if (party.organizerId !== req.user.uid) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (party.status !== 'draft') {
      return res.status(400).json({ error: 'Party already published or cancelled' });
    }

    if (party.images.length < 3) {
      return res.status(400).json({ error: 'At least 3 images required' });
    }

    party.status = 'published';
    party.publishedAt = new Date();
    await party.save();

    res.json({ party });
  } catch (error) {
    console.error('Publish party error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get party list (for discovery)
router.get('/list', verifyToken, async (req, res) => {
  try {
    const { city, minDate, maxDate, maxPrice } = req.query;
    const user = await User.findOne({ userId: req.user.uid });
    
    const query = {
      status: 'published',
      date: { $gte: new Date() },
    };

    if (city) {
      query['location.city'] = city;
    }

    if (minDate) {
      query.date.$gte = new Date(minDate);
    }

    if (maxDate) {
      query.date = { ...query.date, $lte: new Date(maxDate) };
    }

    if (maxPrice) {
      query.pricePerPerson = { $lte: parseFloat(maxPrice) };
    }

    // Filter out blocked users' parties
    if (user && user.blockedUsers.length > 0) {
      const blockedParties = await Party.find({
        organizerId: { $in: user.blockedUsers },
      }).distinct('_id');
      query._id = { $nin: blockedParties };
    }

    const parties = await Party.find(query)
      .sort({ date: 1 })
      .limit(50)
      .lean();

    // Hide address for parties user hasn't paid for
    const partiesWithHiddenAddress = parties.map(party => {
      const hasPaid = party.participants.some(
        p => p.userId === req.user.uid && p.paymentStatus === 'completed'
      );
      
      return {
        ...party,
        location: hasPaid ? party.location : {
          ...party.location,
          address: undefined,
          coordinates: undefined,
        },
      };
    });

    res.json({ parties: partiesWithHiddenAddress });
  } catch (error) {
    console.error('Get party list error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single party
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    // Check if user is blocked
    const user = await User.findOne({ userId: req.user.uid });
    if (user && user.blockedUsers.includes(party.organizerId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Hide address if not paid
    const hasPaid = party.participants.some(
      p => p.userId === req.user.uid && p.paymentStatus === 'completed'
    );

    const partyData = party.toObject();
    if (!hasPaid) {
      partyData.location = {
        ...partyData.location,
        address: undefined,
        coordinates: undefined,
      };
    }

    res.json({ party: partyData });
  } catch (error) {
    console.error('Get party error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Join party (creates payment intent) - requires accepted request
router.post('/:id/join', verifyToken, requireVerification, async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    if (party.status !== 'published' && party.status !== 'full') {
      return res.status(400).json({ error: 'Party not available' });
    }

    if (party.participants.length >= party.maxParticipants) {
      return res.status(400).json({ error: 'Party is full' });
    }

    const alreadyJoined = party.participants.some(p => p.userId === req.user.uid);
    if (alreadyJoined) {
      return res.status(400).json({ error: 'Already joined this party' });
    }

    // Check if blocked
    const user = await User.findOne({ userId: req.user.uid });
    if (user && user.blockedUsers.includes(party.organizerId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if request was accepted
    const request = party.requests.find(r => r.userId === req.user.uid);
    if (!request) {
      return res.status(400).json({ 
        error: 'You must request to join this party first. Like the party to send a request.',
      });
    }

    if (request.status !== 'accepted') {
      return res.status(400).json({ 
        error: `Your request is ${request.status}. Only accepted requests can proceed to payment.`,
        requestStatus: request.status,
      });
    }

    res.json({
      partyId: party._id,
      amount: party.pricePerPerson,
      message: 'Proceed to payment',
    });
  } catch (error) {
    console.error('Join party error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Confirm arrival
router.post('/:id/confirm-arrival', verifyToken, async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    const participant = party.participants.find(p => p.userId === req.user.uid);
    
    if (!participant) {
      return res.status(404).json({ error: 'Not a participant of this party' });
    }

    if (participant.paymentStatus !== 'completed') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    if (participant.arrivalConfirmed) {
      return res.status(400).json({ error: 'Arrival already confirmed' });
    }

    participant.arrivalConfirmed = true;
    participant.arrivalConfirmedAt = new Date();
    await party.save();

    // Trigger escrow release (handled by payment service)
    // This will be called by the payment service after updating the payment record

    res.json({ message: 'Arrival confirmed', participant });
  } catch (error) {
    console.error('Confirm arrival error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's parties (as organizer)
router.get('/my/created', verifyToken, requireRole('organizer'), async (req, res) => {
  try {
    const parties = await Party.find({ organizerId: req.user.uid })
      .sort({ createdAt: -1 });
    
    res.json({ parties });
  } catch (error) {
    console.error('Get my parties error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's joined parties (as participant)
router.get('/my/joined', verifyToken, async (req, res) => {
  try {
    const parties = await Party.find({
      'participants.userId': req.user.uid,
      'participants.paymentStatus': 'completed',
    }).sort({ date: 1 });
    
    res.json({ parties });
  } catch (error) {
    console.error('Get joined parties error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Like a party (creates a request to join)
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    if (party.status !== 'published') {
      return res.status(400).json({ error: 'Party is not available for requests' });
    }

    const user = await User.findOne({ userId: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already requested
    const existingRequest = party.requests.find(
      r => r.userId === req.user.uid
    );

    if (existingRequest) {
      return res.json({ 
        message: 'Request already exists', 
        requestStatus: existingRequest.status,
        request: existingRequest,
      });
    }

    // Check if already a participant
    const alreadyParticipant = party.participants.some(
      p => p.userId === req.user.uid
    );

    if (alreadyParticipant) {
      return res.status(400).json({ error: 'Already a participant of this party' });
    }

    // Create request
    const request = {
      userId: req.user.uid,
      requestedAt: new Date(),
      status: 'pending',
    };

    party.requests.push(request);
    await party.save();

    // Also add to user's liked parties for reference
    const alreadyLiked = user.likedParties.some(
      lp => lp.partyId === req.params.id
    );

    if (!alreadyLiked) {
      user.likedParties.push({
        partyId: req.params.id,
        likedAt: new Date(),
      });
      await user.save();
    }

    res.json({ 
      message: 'Request sent to organizer', 
      requestStatus: 'pending',
      request,
    });
  } catch (error) {
    console.error('Like party error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Unlike a party
router.post('/:id/unlike', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove from liked parties
    user.likedParties = user.likedParties.filter(
      lp => lp.partyId !== req.params.id
    );
    await user.save();

    res.json({ message: 'Party unliked', liked: false });
  } catch (error) {
    console.error('Unlike party error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's liked parties
router.get('/my/liked', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const likedPartyIds = user.likedParties.map(lp => lp.partyId);
    const parties = await Party.find({
      _id: { $in: likedPartyIds },
    }).sort({ date: 1 });

    res.json({ parties });
  } catch (error) {
    console.error('Get liked parties error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get requests for a party (organizer only)
router.get('/:id/requests', verifyToken, requireRole('organizer'), async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    if (party.organizerId !== req.user.uid) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Populate user info for each request
    const requestsWithUsers = await Promise.all(
      party.requests.map(async (request) => {
        const user = await User.findOne({ userId: request.userId });
        return {
          ...request.toObject(),
          user: user ? {
            userId: user.userId,
            name: user.name,
            email: user.email,
            profile: user.profile,
            verification: user.verification,
          } : null,
        };
      })
    );

    res.json({ requests: requestsWithUsers });
  } catch (error) {
    console.error('Get party requests error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Accept a request
router.post('/:id/requests/:userId/accept', verifyToken, requireRole('organizer'), async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    if (party.organizerId !== req.user.uid) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const request = party.requests.find(r => r.userId === req.params.userId);
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ error: 'Request already processed' });
    }

    // Check if party is full
    if (party.participants.length >= party.maxParticipants) {
      return res.status(400).json({ error: 'Party is full' });
    }

    // Update request status
    request.status = 'accepted';
    request.respondedAt = new Date();
    await party.save();

    res.json({ 
      message: 'Request accepted', 
      request,
    });
  } catch (error) {
    console.error('Accept request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject a request
router.post('/:id/requests/:userId/reject', verifyToken, requireRole('organizer'), async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    if (party.organizerId !== req.user.uid) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const request = party.requests.find(r => r.userId === req.params.userId);
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ error: 'Request already processed' });
    }

    // Update request status
    request.status = 'rejected';
    request.respondedAt = new Date();
    await party.save();

    res.json({ 
      message: 'Request rejected', 
      request,
    });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's request status for a party
router.get('/:id/request-status', verifyToken, async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    const request = party.requests.find(r => r.userId === req.user.uid);
    
    if (!request) {
      return res.json({ 
        hasRequest: false,
        requestStatus: null,
      });
    }

    res.json({ 
      hasRequest: true,
      requestStatus: request.status,
      request: request.toObject(),
    });
  } catch (error) {
    console.error('Get request status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

