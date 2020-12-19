const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const formatedLog = require('../formatedLog.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return formatedLog(err, 'ERROR');
    dbClient = client;
    app.locals.stats = client.db("streamers").collection("stats");
});

module.exports = function getStreamerStats (streamerID) {
    return new Promise (function(resolve, reject) {
        const statsList = app.locals.stats;
        statsList.findOne({twitchID: streamerID}, function(err, streamerStat){
            if(err) return formatedLog(err, 'ERROR');
            resolve(streamerStat);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});