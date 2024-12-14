const Product = require('../models/productModel');


exports.addProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = new Product({
            name,
            price,
            stock,
            vendor: req.vendor.id,
        });

        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findOneAndUpdate(
            { _id: id, vendor: req.vendor.id },
            updates,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found or not authorized' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOneAndDelete({ _id: id, vendor: req.vendor.id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or not authorized' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.listProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const products = await Product.find({ vendor: req.vendor.id })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
