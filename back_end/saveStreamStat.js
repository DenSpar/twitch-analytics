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

module.exports = function saveStreamStat (obj) {
    console.log("вношу изменения в БД ...");
    const statsList = app.locals.stats;
    statsList.findOne({twitchID: obj.streamerID}, function(err, streamer){
        if(err) return console.log(err);

        let newStream = {};
        newStream = {...obj};
        delete newStream.streamerID;
        delete newStream.streamerName;

        if(streamer) {
            let updateStreamsArr = streamer.streams;
            updateStreamsArr.push(newStream);
            statsList.findOneAndUpdate({twitchID: obj.streamerID}, { $set: {streams: updateStreamsArr} },
                {returnOriginal: false }, function(err, newStats){
                    if(err) return console.log(err);
            });
        } else {
            let newStreamer = {
                twitchID: obj.streamerID,
                name: obj.streamerName,
                streams: [newStream]
            };
            statsList.insertOne(newStreamer, function(err, result){               
                if(err) return console.log(err);
            });
        };
        console.log("записана статистика стрима " + obj.streamerName + "(" + obj.streamerID + ")");
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});