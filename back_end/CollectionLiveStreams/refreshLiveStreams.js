const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js')
const recStreamStat = require('../recStreamStat/recStreamStat.js');
const addLiveStream = require('./addLiveStream.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
    app.locals.lives = client.db("streamers").collection("lives");
});

let clearLivesStreams = () => {
    return new Promise (function(resolve, reject) {
        const livesList = app.locals.lives;
        livesList.drop(function(err, result){              
            console.log('удалена коллекция lives')
        });
        resolve();
    });
};

let getStreamersList = () => {
    return new Promise (function(resolve, reject) {
        const streamersList = app.locals.streamers;
        streamersList.find().toArray(function(err, streamers){
            resolve(streamers)
        });
    });
};

module.exports = function refreshLiveStreams () {
    clearLivesStreams()
    .then(() => getStreamersList())
    .then(streamers => {
        streamers.map(streamer => {
            getStreamsChannelById(streamer.twitchID)
            .then(isStream => {
                if (isStream) {
                    let newStream = {
                        streamerID: streamer.twitchID,
                        streamID: isStream.stream._id,
                        streamerName: isStream.stream.channel.name,
                        title: isStream.stream.channel.status
                    };
                    addLiveStream(newStream);
                    recStreamStat(newStream);
                } else { return null }
            })
        })
    })
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});