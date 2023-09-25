const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    artistname: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: [true, 'you have to register Date']
    },
    bio: {
        type: String,
        required: [true, 'you have to enter bio']
    },
    songs: {
        type: [String], 
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

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;