
const { body, param } = require('express-validator');

exports.validateCreateOrder = [
    body('productId')
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID'),
    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1')
];

exports.validateOrderId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID')
];