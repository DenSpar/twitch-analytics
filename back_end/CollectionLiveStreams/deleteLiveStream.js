const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const formatedLog = require('../formatedLog.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return formatedLog(err, 'ERROR');
    dbClient = client;
    app.locals.lives = client.db("streamers").collection("lives");
});

module.exports = function deleteLiveStream (streamID) {
    return new Promise (function(resolve, reject) {
        let response = {};
        const livesList = app.locals.lives;
        livesList.findOneAndDelete({streamID: streamID}, function(err, result){               
            if(err) return formatedLog(err, 'ERROR');    
            let stream = result.value;
            if (stream) {
                response.message = 'стрим №' + streamID +' удален из текущих стримов';
                response.status = true;
            } else {
                response.message = 'стрим №' + streamID + ' не найден, нечего удалять';
                response.status = false;
            };
            formatedLog(response.message, 'INFO');
            resolve(response);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});