const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'you have to register email']
    },
    password: {
        type: String,
        required: [true, 'you have to register password']
    },
    songs: {
        type: [String], // Assuming the likes are stored as user IDs
        default: []
    }
},
{
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;