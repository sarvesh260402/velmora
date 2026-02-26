const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get owner analytics
// @route   GET /api/owner/analytics
// @access  Private (Owner)
exports.getAnalytics = asyncHandler(async (req, res, next) => {
    const productCount = await Product.countDocuments({ owner: req.user.id });
    const orders = await Order.find({ 'items.product': { $in: await Product.find({ owner: req.user.id }).select('_id') } });

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({
        success: true,
        data: {
            productCount,
            orderCount: orders.length,
            totalRevenue
        }
    });
});
