/**
 * Author: Nikhil Parikh
 */
const MongoClient = require('mongodb').MongoClient;
var getID = require('mongodb').ObjectID();
var url = "mongodb+srv://nparikh:whosThatPokemon@cluster0.d8ofr.mongodb.net/pokemonProject?retryWrites=true&w=majority";
let database = {};
let mongoClient  = MongoClient(url,{ useUnifiedTopology: true});
let myDB;
const dbName = "pokemonProject";

var connect = async function(dbName){
    try{
        await mongoClient.connect();
        
        myDB = mongoClient.db(dbName);

        if (!myDB){
            throw new Error("DB Connection failed to start!");
        }
        else{
            console.log('Connected to ' + dbName);
            return myDB;
        }
    } catch(e){
        console.log(e.message);
        }
}

database.get = function(dbName){
    if (myDB) {
        return myDB;
    }
    else {
        return connect(dbName);
    }
}

database.close = async function(){
    try{
        await mongoClient.close();
        return;
    } catch (e){
        console.log(e.mesage);
    }
}