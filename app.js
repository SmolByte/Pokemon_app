/**
 * Author: Nikhil Parikh
 */

 //Creating an instance of the express routing app
const express = require('express');
const app = express();
var qString = require('querystring');
const fetch = require("node-fetch");

//Setting up the database connections
let dbManager = require('./pokeDb');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const pokeCol = require('./models/pokeSchema');
const Pokemon = require('./pokemon');

var postParams;
function moveOn(postData){
    let proceed = true;
    postParams = qString.parse(postData);
    for (property in postParams){
        if (postParams[property].toString().trim() == ''){
            proceed = false;
        }
    }
    return proceed;
}

//Connecting the route files to this file
const pokeRoutes = require('./routes/poke_routes');
const userRoutes = require('./routes/user_routes');

//Setting up the views
app.set('views', './views');
app.set('view engine', 'pug');

//Connecting the different routes to their files
app.use('/pokemon', pokeRoutes);
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
    console.log(req.params.pokeID);
    try {
        console.log("searching!");
        res.render('pokemon');
    } catch(e){
        console.log(e.message);
    }
 });

 app.post('/search', function(req, res){
     postData = '';
     req.on('data', (data) => {
         postData += data;
     });
     req.on('end', async ()=>{
         console.log(postData);
         if(moveOn(postData)){
             var prop = postParams.prop;
             var val = postParams.value;
             try {
                 let cursor;
                 if (prop == "pokeID"){
                     cursor = await pokeCol.find({pokedexNum: val});
                 } else {
                     cursor = await pokeCol.find({name: val});
                 }
                console.log(cursor);
                if (cursor === ""){
                let data = [];
                await cursor.forEach((item) =>{
                    let curPokemon = {};
                    curPokemon = new Pokemon(item.name, item.pokedexNum, item.type, item.weight);
                    data.push(curPokemon);
                })
                let resultOBJ = {dataArr: data, [prop] : val, prop: prop};
                console.log("resultOBJ is currently" + resultOBJ);
                res.render('pokemon', {results: resultOBJ});
                 } else {
                     const apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + postParams.value;
                     let curPokemon = {};
                     fetch(apiUrl)
                     .then((response) => {
                         return response.json()
                     })
                     .then((pokemon) => {
                         curPokemon.name = pokemon.name;
                         curPokemon.pokedexNum = pokemon.id;
                         curPokemon.type = pokemon.types[0].name;
                         curPokemon.weight = pokemon.weight;
                         res.render('pokeinfo', {curPokemon});
                         console.log(pokemon);
                     })
                     .catch((error) => {
                         console.log(error);
                     })
                     
                 }

             } catch (e){
                 console.log(e.message);
                 res.writeHead(404);
                 res.write("<html><body><h1> ERROR 404. PAGE NOT FOUND</h1>");
                 res.end("<br>" + e.message + "<br></body></html>");

             }
         } else {
             res.render('search');
         }
     })
 })

app.listen(3000, async () =>{
    try {
        await mongoose.connect("mongodb+srv://nparikh:whosThatPokemon@cluster0.d8ofr.mongodb.net/pokemonProject?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, (req, res) => {
            console.log("Connected to database");
        })
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