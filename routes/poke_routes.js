/**
 * The routes to access the differernt specific pokemon 
 * 
 * @authors: Nikhil Parikh, Xavier Williams 
 */
const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const pokeCol = require('../models/pokeSchema');

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

router.param('pokeID', function(req, res, next, value){
    console.log('Request for a specific Pokemon ' + value);
    next();
})

router.get('/:pokeID', async function(req, res){
   try {
       console.log(req.params.pokeID);
       let result = await pokeCol.findOne({_id: ObjectID(req.params.pokeID)});
       console.log(result);

       res.render('pokemon', {pokemonName: result.name})
   } catch(e){
       console.log(e.message);
   }
});

module.exports = router;