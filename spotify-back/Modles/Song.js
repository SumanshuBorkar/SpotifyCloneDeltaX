const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    songname: {
        type: String,
        required: true
    },
    releasedate: {
        type: String,
        required: [true, 'you have to register email']
    },
    file:{
        type:Object,
        require:true
    },
    artist: {
        type: [String], // Assuming the likes are stored as user IDs
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
        ref: 'User', // Assuming the model for user is named 'User'
        required: true
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

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;