const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.lives = client.db("streamers").collection("lives");
});

module.exports = function clearLivesStreams () {
    // вынести в отдельный модуль
    return new Promise (function(resolve, reject) {
        const livesList = app.locals.lives;
        livesList.drop(function(err, result){              
            console.log('удалена коллекция lives')
        });
        resolve();
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});