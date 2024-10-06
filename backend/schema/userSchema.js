const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    mobile: {
        type: Number,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)