// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { validateOrder } = require('../middleware/validators');
const { 
    listOrders, 
    markAsShipped, 
    createOrder 
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, listOrders);
router.put('/:id', protect, markAsShipped);
router.post('/', validateOrder, createOrder);

module.exports = router;