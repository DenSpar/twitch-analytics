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

module.exports = function deleteStreamerStats (streamerID) {
    return new Promise (function(resolve, reject) {
        let response = {};
        const statsList = app.locals.stats;
        statsList.findOneAndDelete({twitchID: streamerID}, function(err, result){               
            if(err) return console.log(err);    
            let streamer = result.value;
            if (streamer) {
                response.message = 'Статистика стримера №' + streamerID +' удалена';
                response.status = true;
            } else {
                response.message = 'Статистика стримера №' + streamerID + ' не найдена, нечего удалять';
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