const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            'Clothing',
            'Footwear',
            'Watches',
            'Jewelry',
            'Appliances',
            'Furniture',
            'Electronics',
            'Home Decor',
            'Home & Kitchen'
        ]
    },
    subcategory: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex', 'None'],
        default: 'None'
    },
    images: {
        type: [String],
        default: []
    },
    '3dModel': {
        type: String // URL to .glb / .gltf file
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating can not be more than 5']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
