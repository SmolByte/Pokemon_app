/**
 * The routes to access the differernt specific pokemon 
 * 
 * @authors: Nikhil Parikh, Xavier Williams 
 */
const express = require('express');
const router = express.Router();
const pokeCol = require('../models/pokeSchema');
var ObjectID = require('mongodb').ObjectID;
const fetch = require("node-fetch");

router.get('/', (req, res, next) => {
   res.render('pokemon', {
       pokemonName: 'Insert pokemon here'
   });
});

router.get('/charizard', (req, res, next) => {
    res.render('pokemon', {
        pokemonName: 'Charizard'
    });
 });

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST requests to /pokemon"
    });
});

router.get('/:pokeID', async function(req, res){
   try {
       //console.log(req.params.pokeID);
       let result = await pokeCol.findById(req.params.pokeID);
       if (result == null){
           fetch()
       }
       res.render('pokemon', {pokemonName: result.name})
   } catch(e){
       console.log(e.message);
   }
});

module.exports = router;