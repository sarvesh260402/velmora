const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'velmora/products',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

const upload3DModel = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            folder: 'velmora/models',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary model upload error:', error);
        throw error;
    }
};

module.exports = { uploadImage, upload3DModel };
