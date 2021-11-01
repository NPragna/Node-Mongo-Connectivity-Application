const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: String },
    price: { type: String }
}, { timestamps: true });

const Item = mongoose.model('items', itemSchema);

module.exports = {
    Item
};