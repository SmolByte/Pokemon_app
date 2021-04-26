const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//Connecting the routes to their files
const pokeRoutes = require('./routes/poke_routes');
const userRoutes = require('./routes/user_routes');

mongoose.connect('mongodb+srv://nparikh:whosThatPokemond@cluster0.d8ofr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useMongoClient: true
}
);

//Prints out the different requests made to the server in the console 
app.use(morgan('dev'));

//Routes and what requests they will handle 
app.use('/pokemon', pokeRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: 'Ya messed up, bad. TRY AGAIN'
    });
});

module.exports = app;