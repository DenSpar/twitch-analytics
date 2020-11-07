const MongoClient = require('mongodb').MongoClient;
const getChannelById = require('./twitchApiRequests/getChannelById.js');
const express = require('express');
var app = express();

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
});

let updateStats = (date) => {
    const streamersList = app.locals.streamers;
    let localDate = date.toLocaleDateString();
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

module.exports = function updateStreamersStat() {
    let startTime = new Date();
    console.log('обновление статы стримеров: сейчас ' + startTime.getHours() + ' часов, жду 12');
    if (startTime.getHours() === 12 ) {updateStats(startTime)}
    console.log("обновление статы стримеров: стартовал таймер");

    setInterval(() => {
        let currentDate = new Date();
        console.log('обновление статы стримеров: сейчас ' + currentDate.getHours() + ' часов, жду 12');
        if (currentDate.getHours() === 12) {
            console.log('обновление статы стримеров: дождался, 12');
            return updateStats(currentDate)
        } else {
            console.log('обновление статы стримеров: сейчас ' + currentDate.getHours() + ' часов, жду 12');
        };
    } ,3600000)
    ;
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

// попробовать удалить app