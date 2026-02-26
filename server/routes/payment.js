const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create Stripe Payment Intent
// @route   POST /api/payments/create-intent
// @access  Private
router.post('/create-intent', protect, asyncHandler(async (req, res, next) => {
    const { amount } = req.body;

    if (!amount) {
        return next(new ErrorResponse('Please provide an amount', 400));
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' },
    });

    res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret
    });
}));

module.exports = router;
