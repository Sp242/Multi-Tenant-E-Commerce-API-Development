// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerVendor, loginVendor } = require('../controllers/authController');
const { validateVendorRegistration } = require('../middleware/validators');

router.post('/register', validateVendorRegistration, registerVendor);
router.post('/login', loginVendor);

module.exports = router;