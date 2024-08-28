const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true, // Uncomment if you want this field to be required
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        // required: true, // Uncomment if you want this field to be required
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to Category model
    },
    stock: {
        type: Number,
        // required: true, // Uncomment if you want this field to be required
        min: 0,
    },
    image: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
