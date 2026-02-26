const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Validate inventory for an order
// @route   POST /api/products/validate-inventory
// @access  Public
exports.validateInventory = asyncHandler(async (req, res, next) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        return next(new ErrorResponse('Please provide items to validate', 400));
    }

    const validations = [];
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
            validations.push({ product: item.product, available: false, message: 'Product not found' });
            continue;
        }
        if (product.stock < item.quantity) {
            validations.push({
                product: item.product,
                name: product.name,
                available: false,
                requested: item.quantity,
                inStock: product.stock
            });
        } else {
            validations.push({ product: item.product, available: true });
        }
    }

    const allAvailable = validations.every(v => v.available);

    res.status(200).json({
        success: true,
        allAvailable,
        validations
    });
});
