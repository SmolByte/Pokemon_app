/**
 * Author: Nikhil Parikh
 */
const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    pokedexNum: Number,
    type: String, 
    weight: Number,
    // stats: String,
    // species: String,
    // moves: String,
    //img: {
    //     data: Buffer, 
    //     contentType: String
    // }

});

const pokeCol = mongoose.model('Pokemon', pokeSchema);
module.exports = pokeCol;