const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');
const Party = require('../models/Party');

// Middleware to check admin status
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user is admin (either role is 'admin' or isAdmin flag is true)
    if (user.role !== 'admin' && !user.isAdmin) {
      return res.status(403).json({ 
        error: 'Admin access required',
        message: 'Only administrators can access this resource',
      });
    }
    
    req.adminUser = user;
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get pending verifications
router.get('/verifications/pending', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({
      'verification.status': 'pending',
    }).select('userId email verification profile');

    res.json({ users });
  } catch (error) {
    console.error('Get pending verifications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve verification
router.post('/verifications/:userId/approve', verifyToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verification.status = 'approved';
    user.verification.reviewedAt = new Date();
    user.verification.reviewedBy = req.user.uid;
    await user.save();

    res.json({ message: 'Verification approved', user });
  } catch (error) {
    console.error('Approve verification error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject verification
router.post('/verifications/:userId/reject', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findOne({ userId: req.params.userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verification.status = 'rejected';
    user.verification.reviewedAt = new Date();
    user.verification.reviewedBy = req.user.uid;
    user.verification.rejectionReason = reason || 'Verification rejected';
    await user.save();

    res.json({ message: 'Verification rejected', user });
  } catch (error) {
    console.error('Reject verification error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all parties for moderation
router.get('/parties', verifyToken, requireAdmin, async (req, res) => {
  try {
    const parties = await Party.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ parties });
  } catch (error) {
    console.error('Get all parties error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel party (admin)
router.post('/parties/:id/cancel', verifyToken, requireAdmin, async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    
    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    party.status = 'cancelled';
    await party.save();

    // Trigger refunds for all participants
    // This would call the refund endpoint for each payment

    res.json({ message: 'Party cancelled', party });
  } catch (error) {
    console.error('Cancel party error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

