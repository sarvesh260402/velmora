const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// @desc    Update customer profile
// @route   PUT /api/customer/profile
// @access  Private (Customer)
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };

    if (req.file) {
        // Handle local file path if Cloudinary is not used, or just save path
        fieldsToUpdate.profileImage = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Add/Update address
// @route   POST /api/customer/addresses
// @access  Private (Customer)
exports.addAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    user.addresses.push(req.body);
    await user.save();

    res.status(200).json({
        success: true,
        data: user.addresses
    });
});
