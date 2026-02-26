const express = require('express');
const {
    getReviews,
    addReview
} = require('../controllers/review');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getReviews)
    .post(protect, authorize('customer'), addReview);

module.exports = router;
