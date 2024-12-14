
const Order = require('../models/orderModel');
const Product = require('../models/productModel');


exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find({ vendor: req.vendor.id })
            .populate('product', 'name price')  
            .sort('-createdAt');

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error in listOrders:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.markAsShipped = async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.id, 
            vendor: req.vendor.id 
        });

        if (!order) {
            return res.status(404).json({ 
                message: 'Order not found or not authorized' 
            });
        }

        if (order.status === 'shipped') {
            return res.status(400).json({ 
                message: 'Order is already shipped' 
            });
        }

        order.status = 'shipped';
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        console.error('Error in markAsShipped:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

       
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

     
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        
        const order = new Order({
            product: productId,
            vendor: product.vendor,
            quantity
        });

        
        product.stock -= quantity;
        await product.save();

        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error('Error in createOrder:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};