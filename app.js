/**
 * Author: Nikhil Parikh
 */

 //Creating an instance of the express routing app
const express = require('express');
const app = express();
var qString = require('querystring');

//let dbManager = require('./dbManager');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

//Connecting the routes to their files
const pokeRoutes = require('./routes/poke_routes');
const userRoutes = require('./routes/user_routes');

//Setting up the views
app.set('views', './views');
app.set('view engine', 'pug');

//Connecting the different routes to their files
app.use('/pokemon', pokeRoutes);
app.use('/user', userRoutes);

app.get('/', function(req, res){
    res.render('index');
});

app.use('/search', function(req, res, next){
    res.render('search');
})

app.listen(3000, function(){
    console.log('Server started from app.js on port 3000');
})
// app.use((req, res, next) => {
//     const error = new Error('Not Found!');
//     error.status(404);
//     next(error);
// })

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: 'Ya messed up, bad. TRY AGAIN'
//     });
// });

module.exports = app;