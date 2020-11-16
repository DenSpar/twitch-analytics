const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const updateLiveStream = require('./updateLiveStream.js');
const addLiveStream = require('./addLiveStream.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.lives = client.db("streamers").collection("lives");
});

module.exports = function alreadyExistStream (srcStream) {
    return new Promise (function(resolve, reject) {
        //streamerID, streamID
        let response;
        const livesList = app.locals.lives;
        livesList.findOne({streamerID: srcStream.streamerID}, function(err, findStream){
            if(err) return console.log(err);
            console.log(findStream);
            if (findStream) {
                if (findStream.streamID !== srcStream.streamID) {
                        console.log('в БД записан устаревший стрим, заменяю актуальным ...');
                        updateLiveStream(srcStream);
                        response = false;
                    }
                else {
                    console.log('в БД уже есть стрим №' + srcStream.streamID);
                    response = true;
                };
            }
            else {
                console.log('в БД нет стрима №' + srcStream.streamID);
                addLiveStream(srcStream);
                response = false;
            };
            resolve(response);
        });
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});