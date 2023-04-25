const mongoose = require("mongoose")

const catSchema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        uppercase: true,
        required: true,
    },

    is_available: {
        type: Number,
        default: 1,
        required: true
    }

});

module.exports = mongoose.model('category', catSchema)