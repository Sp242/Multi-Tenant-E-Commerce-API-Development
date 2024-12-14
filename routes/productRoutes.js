// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { validateProduct } = require('../middleware/validators');
const { 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    listProducts 
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, validateProduct, addProduct);
router.put('/:id', protect, validateProduct, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/', protect, listProducts);

module.exports = router;