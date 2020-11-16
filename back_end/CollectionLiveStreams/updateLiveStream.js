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

module.exports = function updateLiveStream (stream) {
    return new Promise (function(resolve, reject) {
        let response = '';
        const livesList = app.locals.lives;        
        livesList.findOneAndUpdate({streamerID: stream.streamerID}, { $set: stream },
            {returnOriginal: false },function(err, result){
                  
           if(err) return console.log(err);
            response = 'стрим №' + stream.streamID + ' записан в БД вместо старого';
            console.log (response);
            resolve({message: response, newStream: result});
        });
    });
};

// findOneAndUpdate в result вернет:
// 1) если не найдет нужный объект
// {   lastErrorObject: { n: 0, updatedExisting: false },
//     ok: 1,
//     value: null }
// 2) если найдет
// {  lastErrorObject: { n: 1, updatedExisting: true },
//     ok: 1
//     value: {_id: "5fae5bc6684489a78e1bbc8d", ...} } // - новое или старое значение элемента

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});