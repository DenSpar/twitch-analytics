const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const formatedLog = require('../formatedLog.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return formatedLog(err, 'ERROR');
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
});

module.exports = function updateStreamerInList (streamerID, streamerName, updatesOBJ) {
    return new Promise (function(resolve, reject) {
        let response = '';
        const streamersList = app.locals.streamers;
        streamersList.findOneAndUpdate({twitchID: streamerID}, { $set: updatesOBJ },
            {returnOriginal: false },function(err, result){

            if(err) return formatedLog(err, 'ERROR');
            response = 'статистика стримера ' + streamerName + '(' + streamerID + ')' + ' обновленна';
            formatedLog(response, 'INFO');
            resolve({message: response, newStat: result});
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});