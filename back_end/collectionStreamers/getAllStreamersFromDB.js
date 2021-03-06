const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
});

module.exports = function getAllStreamersFromDB () {
    return new Promise (function(resolve, reject) {
        const streamersList = app.locals.streamers;
        streamersList.find().toArray(function(err, streamers){
            if(err) return console.log(err);
            resolve(streamers);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});