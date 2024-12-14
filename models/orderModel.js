
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    vendor: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'shipped'], 
        default: 'pending' 
    }
}, { timestamps: true });


orderSchema.index({ vendor: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;