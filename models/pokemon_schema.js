const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    num: Number,
    type: String, 
    weight: Number,
    // stats: String,
    // species: String,
    // moves: String,
    img: {
        data: Buffer, 
        contentType: String
    }

});

module.exports = mongoose.model('Pokemon', pokeSchema);