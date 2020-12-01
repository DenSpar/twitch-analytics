const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const getChannelById = require('../twitchApiRequests/getChannelById.js');
const getMidAndMaxOnline = require('./getMidAndMaxOnline.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
});

let getNewStat = (date) => {
    let localDate = date.toLocaleDateString();
    const streamersList = app.locals.streamers;
    streamersList.find().toArray(function(err, streamers){
        streamers.map(streamer => {
            getChannelById(streamer.twitchID)
            .then(channel => {
                let updatesOBJ = {};

                if (channel) {
                    let updateFollowers = [];
                    let updateViews = [];
                    let newName = channel.display_name;
                    
                    let newFollowers = {};
                    newFollowers[localDate] = channel.followers;
                    if (streamer.hasOwnProperty('followers')) {
                        updateFollowers = streamer.followers;
                        updateFollowers.push(newFollowers);
                    } else {updateFollowers = [newFollowers]}

                    let newViews = {};
                    newViews[localDate] = channel.views;
                    if (streamer.hasOwnProperty('views')) {
                        updateViews = streamer.views;
                        updateViews.push(newViews);
                    } else {updateViews = [newViews]}

                    updatesOBJ = {
                        followers: updateFollowers,
                        views: updateViews
                    };
                    if (streamer.name !== newName || !streamer.name) {
                        updatesOBJ.name = newName;
                    };
                };

                getMidAndMaxOnline(streamer.twitchID)
                .then(MidAndMaxOnline => {
                    updatesOBJ.maxOnline = MidAndMaxOnline.maxOnline;
                    updatesOBJ.midOnline = MidAndMaxOnline.midOnline;

                    streamersList.findOneAndUpdate({twitchID: streamer.twitchID}, { $set: updatesOBJ },
                        {returnOriginal: false },function(err, result){
                        if(err) return console.log(err);
                    });
                    console.log('статистика стримера ' + streamer.name + '(' + streamer.twitchID + ')' + ' обновленна');
                })
            })
        })
    });
    return null
};

let updateScript = () => {
    let currentDate = new Date();
    let hours = currentDate.getHours() + 3;
    if (hours === 9) {
        console.log('обновление статы стримеров: обновление ...');
        return getNewStat(currentDate)
    } else {
        console.log('обновление статы стримеров: сейчас ' + hours + ' часов, жду 9');
    };
};

module.exports = function updateStreamersStat() {
    updateScript();
    console.log("обновление статы стримеров: стартовал таймер");
    setInterval(() => { updateScript(); }, 3600000);
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});