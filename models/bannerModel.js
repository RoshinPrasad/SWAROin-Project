const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    is_active: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('banner', bannerSchema)