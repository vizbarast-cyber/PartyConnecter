const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// User validation rules
const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('role').isIn(['organizer', 'participant', 'both']),
  body('profile.bio').optional().isLength({ max: 200 }),
  handleValidationErrors,
];

// Party validation rules
const validateParty = [
  body('title').trim().isLength({ min: 3, max: 100 }),
  body('description').trim().isLength({ min: 10, max: 1000 }),
  body('date').isISO8601().toDate(),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('pricePerPerson').isFloat({ min: 0 }),
  body('maxParticipants').isInt({ min: 1, max: 1000 }),
  body('images').isArray({ min: 3, max: 10 }),
  handleValidationErrors,
];

// Payment validation rules
const validatePayment = [
  body('partyId').isMongoId(),
  body('provider').isIn(['stripe', 'paypal']),
  handleValidationErrors,
];

module.exports = {
  validateUser,
  validateParty,
  validatePayment,
  handleValidationErrors,
};

