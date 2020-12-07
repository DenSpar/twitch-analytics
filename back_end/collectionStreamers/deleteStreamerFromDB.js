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

module.exports = function deleteStreamerFromDB (streamerID) {
    return new Promise (function(resolve, reject) {
        let response = {};
        const streamersList = app.locals.streamers;
        streamersList.findOneAndDelete({twitchID: streamerID}, function(err, result){               
            if(err) return console.log(err);    
            let streamer = result.value;
            if (streamer) {
                response.message = 'стример №' + streamerID +' удален из основного списка';
                response.status = true;
            } else {
                response.message = 'стример №' + streamerID + ' не найден в основном списке, нечего удалять';
                response.status = false;
            };
            console.log(response.message);
            resolve(response);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});