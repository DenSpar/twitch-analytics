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

module.exports = function deleteLiveStream (streamID) {
    return new Promise (function(resolve, reject) {
        let response = {};
        const livesList = app.locals.lives;
        livesList.findOneAndDelete({streamID: streamID}, function(err, result){               
            if(err) return console.log(err);    
            let stream = result.value;
            if (stream) {
                response.message = 'стрим №' + streamID +' удален из текущих стримов';
                response.status = true;
            } else {
                response.message = 'стрим №' + streamID + ' не найден, нечего удалять';
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