const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.stats = client.db("streamers").collection("stats");
});

module.exports = function getStreamsList (streamerID, finObj) {
    return new Promise (function(resolve, reject) {
        const statsList = app.locals.stats;
        statsList.findOne({twitchID: streamerID}, function(err, findStreams){
            if(err) return console.log(err);
            if (findStreams) {
                finObj.streams = findStreams.streams;
            } else {
                finObj.streams = [];
            };
            resolve();
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});