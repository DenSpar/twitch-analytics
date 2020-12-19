const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const formatedLog = require('../formatedLog.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return formatedLog(err, 'ERROR');
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
});

module.exports = function getStreamerFromDB (streamerID) {
    return new Promise (function(resolve, reject) {
        const streamersList = app.locals.streamers;
        streamersList.findOne({twitchID: streamerID}, function(err, streamer){
            if(err) return formatedLog(err, 'ERROR');
            resolve(streamer);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});