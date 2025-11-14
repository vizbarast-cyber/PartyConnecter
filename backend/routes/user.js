const express = require('express');
const router = express.Router();
const { verifyToken, requireVerification } = require('../middleware/auth');
const User = require('../models/User');
const firebaseAdmin = require('firebase-admin');

// Create or update user profile
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { role, profile, name } = req.body;
    
    console.log('User creation request - Role received:', role);
    console.log('User creation request - Body:', req.body);
    console.log('User creation request - User UID:', req.user.uid);
    
    if (!role || !['organizer', 'participant', 'both'].includes(role)) {
      console.error('Invalid role provided:', role);
      return res.status(400).json({ error: 'Valid role required. Must be one of: organizer, participant, both' });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Real name is required' });
    }

    let user = await User.findOne({ userId: req.user.uid });
    
    if (user) {
      // Update existing user - ensure we use the new role
      console.log('Updating existing user. Old role:', user.role, 'New role:', role);
      // Force role update - don't merge, replace
      user.role = role;
      if (name) {
        user.name = name.trim();
      }
      if (profile) {
        user.profile = { ...user.profile, ...profile };
      }
      await user.save();
      console.log('User updated. Final role:', user.role);
      
      // Double-check by fetching fresh from DB
      const freshUser = await User.findOne({ userId: req.user.uid });
      console.log('Fresh user role from DB:', freshUser.role);
      user = freshUser; // Use fresh user for response
    } else {
      // Create new user
      console.log('Creating new user with role:', role);
      user = new User({
        userId: req.user.uid,
        email: req.user.email,
        name: name.trim(),
        role: role, // Explicitly set role
        profile: profile || {},
      });
      await user.save();
      console.log('User created. Final role:', user.role);
    }

    // Verify the role was saved correctly
    const savedUser = await User.findOne({ userId: req.user.uid });
    if (savedUser.role !== role) {
      console.error('CRITICAL: Role mismatch! Expected:', role, 'Saved:', savedUser.role);
      // Force update one more time
      savedUser.role = role;
      await savedUser.save();
      console.log('Force-updated role to:', savedUser.role);
      user = savedUser;
    }

    res.json({ user });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get user profile
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't expose sensitive verification data to other users
    const publicProfile = {
      userId: user.userId,
      role: user.role,
      profile: user.profile,
      verification: {
        status: user.verification.status,
      },
    };

    res.json({ user: publicProfile });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user profile (full data)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload ID for verification
router.post('/upload-id', verifyToken, async (req, res) => {
  try {
    const { idPhotoUrl, selfieUrl, birthDate } = req.body;
    
    if (!idPhotoUrl || !selfieUrl || !birthDate) {
      return res.status(400).json({ error: 'ID photo, selfie, and birth date required' });
    }

    const birthDateObj = new Date(birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    
    if (age < 18) {
      return res.status(400).json({ error: 'Must be 18 or older' });
    }

    const user = await User.findOne({ userId: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verification = {
      status: 'pending',
      idPhotoUrl,
      selfieUrl,
      birthDate: birthDateObj,
      age,
      submittedAt: new Date(),
    };

    await user.save();

    res.json({ 
      message: 'Verification submitted',
      verification: user.verification,
    });
  } catch (error) {
    console.error('ID upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user role
router.put('/role', verifyToken, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['organizer', 'participant', 'both'].includes(role)) {
      return res.status(400).json({ error: 'Valid role required. Must be one of: organizer, participant, both' });
    }

    const user = await User.findOne({ userId: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({ 
      message: 'Role updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, images, bio, gender, interests, city, distancePreference } = req.body;
    
    if (name !== undefined) {
      if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Real name is required' });
      }
      user.name = name.trim();
    }
    if (images) user.profile.images = images;
    if (bio !== undefined) user.profile.bio = bio;
    if (gender) user.profile.gender = gender;
    if (interests) user.profile.interests = interests;
    if (city) user.profile.city = city;
    if (distancePreference) user.profile.distancePreference = distancePreference;

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get list of users (for Find People feature)
router.get('/list', verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findOne({ userId: req.user.uid });
    
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get query parameters for filtering
    const { city, minAge, maxAge, gender, interests, limit = 50 } = req.query;
    
    // Build query
    const query = {
      userId: { $ne: req.user.uid }, // Exclude current user
    };
    
    // Exclude blocked users
    if (currentUser.blockedUsers && currentUser.blockedUsers.length > 0) {
      query.userId = { 
        $ne: req.user.uid,
        $nin: currentUser.blockedUsers,
      };
    }
    
    // Filter by city if provided
    if (city) {
      query['profile.city'] = new RegExp(city, 'i');
    }
    
    // Filter by age range if provided
    if (minAge || maxAge) {
      query['profile.age'] = {};
      if (minAge) query['profile.age'].$gte = parseInt(minAge);
      if (maxAge) query['profile.age'].$lte = parseInt(maxAge);
    }
    
    // Filter by gender if provided
    if (gender) {
      query['profile.gender'] = gender;
    }
    
    // Filter by interests if provided
    if (interests) {
      const interestArray = interests.split(',').map(i => i.trim());
      query['profile.interests'] = { $in: interestArray };
    }
    
    // Get users with public profile data only
    const users = await User.find(query)
      .select('userId name role profile.images profile.bio profile.age profile.gender profile.interests profile.city verification.status')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    // Filter out users who have blocked the current user
    const filteredUsers = users.filter(user => {
      return !user.blockedUsers || !user.blockedUsers.includes(req.user.uid);
    });
    
    res.json({ users: filteredUsers });
  } catch (error) {
    console.error('Get user list error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Block user
router.post('/block/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.uid });
    const targetUserId = req.params.userId;
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.blockedUsers.includes(targetUserId)) {
      user.blockedUsers.push(targetUserId);
      await user.save();
    }

    res.json({ message: 'User blocked' });
  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

