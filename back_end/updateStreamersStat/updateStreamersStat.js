const MongoClient = require('mongodb').MongoClient;
const getChannelById = require('../twitchApiRequests/getChannelById.js');
const express = require('express');
var app = express();

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

                let updatesOBJ = {
                    followers: updateFollowers,
                    views: updateViews
                };
                if (streamer.name !== newName || !streamer.name) {
                    updatesOBJ.name = newName;
                };

                streamersList.findOneAndUpdate({twitchID: streamer.twitchID}, { $set: updatesOBJ },
                    {returnOriginal: false },function(err, result){
                    if(err) return console.log(err);
                });
            })
        })
    });   
    console.log('статистика стримеров обновленна') 
    return null
};

let updateScript = () => {
    let currentDate = new Date();
    if (currentDate.getHours() === 6) {
        console.log('обновление статы стримеров: обновление ...');
        return getNewStat(currentDate)
    } else {
        console.log('обновление статы стримеров: сейчас ' + currentDate.getHours() + ' часов, жду 6');
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

// попробовать удалить app