const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Get reviews
// @route   GET /api/reviews
// @route   GET /api/products/:productId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.productId) {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name profileImage');
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } else {
        const reviews = await Review.find().populate('product', 'name');
        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    }
});

// @desc    Add review
// @route   POST /api/products/:productId/reviews
// @access  Private (Customer)
exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.product = req.params.productId;
    req.body.user = req.user.id;
    req.body.name = req.user.name;

    const product = await Product.findById(req.params.productId);

    if (!product) {
        return next(new ErrorResponse(`No product with the id of ${req.params.productId}`, 404));
    }

    const review = await Review.create(req.body);

    res.status(210).json({
        success: true,
        data: review
    });
});
