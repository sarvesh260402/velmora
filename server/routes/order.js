const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, asyncHandler(async (req, res, next) => {
    const { orderItems, shippingAddress, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return next(new ErrorResponse('No order items', 400));
    }

    const order = await Order.create({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
        paidAt: Date.now()
    });

    // Update product stock
    for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity }
        });
    }

    res.status(201).json({
        success: true,
        data: order
    });
}));

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        data: orders
    });
}));

module.exports = router;
