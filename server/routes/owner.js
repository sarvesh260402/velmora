const express = require('express');
const {
    getAnalytics
} = require('../controllers/owner');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('owner'));

router.get('/analytics', getAnalytics);

module.exports = router;
