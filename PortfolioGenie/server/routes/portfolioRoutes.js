const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate-draft', requireAuth, portfolioController.generatePortfolioDraft);
router.post('/', requireAuth, portfolioController.savePortfolio);

module.exports = router;
