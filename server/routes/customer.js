const express = require('express');
const {
    updateProfile,
    addAddress
} = require('../controllers/customer');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/customers/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.use(protect);
router.use(authorize('customer'));

router.put('/profile', upload.single('profileImage'), updateProfile);
router.post('/addresses', addAddress);

module.exports = router;
