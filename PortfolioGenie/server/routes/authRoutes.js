const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

// Map endpoints
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.get('/me',               requireAuth, authController.getMe);
router.patch('/me',             requireAuth, authController.updateMe);
router.post('/change-password', requireAuth, authController.changePassword);
module.exports = router;