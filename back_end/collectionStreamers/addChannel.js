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
        let response = '';
        const streamersList = app.locals.lives;
        streamersList.insertOne(channel, function(err, result){
            if(err) return console.log(err);
            response = 'в основной стэк добавлен канал ' + channel.name + '(' + channel.twitchID + ')';
            console.log (response);
            resolve({
                message:response,
                result:result
            });
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});