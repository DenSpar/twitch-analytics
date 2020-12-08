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

module.exports = function addChannel (channel) {
    return new Promise (function(resolve, reject) {
        let response = {};
        const streamersList = app.locals.streamers;
        streamersList.insertOne(channel, function(err, result){
            if(err) return console.log(err);
            if (result) {
                response.message = 'Канал ' + channel.name + '(' + channel.twitchID + ') добавлен в основной стэк';
                response.status = true;
            } else {
                response.message = 'Не удалось добавить канал ' + channel.name + '(' + channel.twitchID + ') в основной стэк';
                response.status = false;
            };
            console.log (response.message);
            resolve(response);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});