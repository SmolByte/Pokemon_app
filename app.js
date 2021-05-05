/**
 * Author: Nikhil Parikh
 */

 //Creating an instance of the express routing app
const express = require('express');
const app = express();
var qString = require('querystring');

//Setting up the database connections
let dbManager = require('./pokeDb');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const pokeCol = require('./models/pokeSchema');

//Connecting the route files to this file
const pokeRoutes = require('./routes/poke_routes');
const userRoutes = require('./routes/user_routes');

//Setting up the views
app.set('views', './views');
app.set('view engine', 'pug');

//Connecting the different routes to their files
//app.use('/pokemon', pokeRoutes);
app.use('/user', userRoutes);

//GET ROUTES
app.get('/', function(req, res){
    res.render('index');
});

app.get('/login', function(req, res, next){
    res.render('login');
})

app.get('/search', function(req, res, next){
    res.render('search');
})

app.get('/pokemon/:pokeID', async function(req, res){
    try {
        console.log("searching!");
        res.render('pokemon');
    } catch(e){
        console.log(e.message);
    }
 });

const pokeID = "111";

app.post('/pokemon/:pokeID', async function(req, res){
   try {
       console.log("searching!");
   } catch(e){
       console.log(e.message);
   }
});

app.listen(3000, async () =>{
    try {
        await mongoose.connect("mongodb+srv://nparikh:whosThatPokemon@cluster0.d8ofr.mongodb.net/pokemonProject?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    } catch(e){
        console.log(e.message);
    }
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