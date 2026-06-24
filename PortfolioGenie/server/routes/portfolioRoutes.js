const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate-draft', requireAuth, portfolioController.generatePortfolioDraft);
router.post('/', requireAuth, portfolioController.savePortfolio);
router.get('/',       requireAuth, portfolioController.getUserPortfolios);
router.get('/:id',    requireAuth, portfolioController.getPortfolioById);
router.put('/:id',    requireAuth, portfolioController.updatePortfolioById);
router.delete('/:id', requireAuth, portfolioController.deletePortfolio);

module.exports = router;
