const firebaseAdmin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireVerification = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findOne({ userId: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if verification exists and is approved
    if (!user.verification || user.verification.status !== 'approved') {
      const status = user.verification?.status || 'not_submitted';
      return res.status(403).json({ 
        error: 'Identity verification required',
        verificationStatus: status,
        message: status === 'pending' 
          ? 'Your verification is pending review. Please wait for admin approval.'
          : status === 'rejected'
          ? 'Your verification was rejected. Please resubmit.'
          : 'Please complete identity verification first.',
      });
    }
    
    req.userProfile = user;
    next();
  } catch (error) {
    console.error('Verification check error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

const requireRole = (roles) => {
  return async (req, res, next) => {
    try {
      const User = require('../models/User');
      const user = await User.findOne({ userId: req.user.uid });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const userRoles = Array.isArray(roles) ? roles : [roles];
      // Allow if user has the exact role OR if user has 'both' role (which includes all roles)
      const hasRole = userRoles.includes(user.role) || user.role === 'both';
      
      if (!hasRole) {
        return res.status(403).json({ 
          error: 'Insufficient permissions',
          requiredRole: roles,
          userRole: user.role,
        });
      }
      
      req.userProfile = user;
      next();
    } catch (error) {
      console.error('Role check error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
};

module.exports = {
  verifyToken,
  requireVerification,
  requireRole,
};

