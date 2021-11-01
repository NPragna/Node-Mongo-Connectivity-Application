const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: { type: String },
    items: { type: Array },
    address: { type: String},
    discount: { type:  String}
}, { timestamps: true });

const Order = mongoose.model('orders', orderSchema);

module.exports = {
    Order
};