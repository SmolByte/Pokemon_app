const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String, 
        required: [true, 'We need to know your name']
    }
})