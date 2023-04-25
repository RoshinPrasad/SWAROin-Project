const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
    },
    isAvailable: {
        type: Number,
        default: 1
    },
    review: [{
        username: { type: String },
        review: { type: String }
    }],



})
module.exports = mongoose.model('product', productSchema)
