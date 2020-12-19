const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const formatedLog = require('../formatedLog.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return formatedLog(err, 'ERROR');
    dbClient = client;
    app.locals.lives = client.db("streamers").collection("lives");
});

module.exports = function findLiveStream (streamerID) {
    return new Promise (function(resolve, reject) {
        const livesList = app.locals.lives;
        livesList.findOne({streamerID: streamerID}, function(err, result){
            if(err) return formatedLog(err, 'ERROR');
            resolve(result);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});