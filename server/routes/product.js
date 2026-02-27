const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');
const { validateInventory } = require('../controllers/inventory');

// Include other resource routers
const reviewRouter = require('./review');

const router = express.Router();

// Re-route into other resource routers
router.use('/:productId/reviews', reviewRouter);


const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = 'uploads/';
        if (file.fieldname === 'images') path += 'productimage/';
        else if (file.fieldname === 'model') path += 'models/';
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/validate-inventory', validateInventory);

router
    .route('/')
    .get(getProducts)
    .post(protect, authorize('owner'), upload.fields([{ name: 'images', maxCount: 5 }, { name: 'model', maxCount: 1 }]), createProduct);

router
    .route('/:id')
    .get(getProduct)
    .put(protect, authorize('owner'), updateProduct)
    .delete(protect, authorize('owner'), deleteProduct);

module.exports = router;
