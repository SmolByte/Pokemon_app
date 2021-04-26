const express = require('express');
const app = express();
const morgan = require('morgan');

//Connecting the routes to their files
const pokeRoutes = require('./routes/poke_routes');
const userRoutes = require('./routes/user_routes');

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

module.exports = app;