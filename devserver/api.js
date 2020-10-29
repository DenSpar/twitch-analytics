const express = require('express');
const url = require('url');
const MongoClient = require("mongodb").MongoClient;
var app = express();

console.log('Server running at http://stat.metacorp.gg:3000/');

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

// запрос на список стримеров
app.get('/api/streamers', function(req, res) {
    mongoClient.connect(function(err, client){
        const db = client.db("streamers");
        const streamersList = db.collection("list");

        if(err) return console.log(err);

        streamersList.find().toArray(function(err, results){            
            res.send({ list: results });
            client.close();
        });
    });
});


// запрос на стату стримера
app.get('/api/streamer/:id', function(req, res) {
    const id = req.params.id;
    // mongoClient.connect(function(err, client){
    //     const db = client.db("streamers");
    //     const streamersList = db.collection("list");

    //     if(err) return console.log(err);

    //     streamersList.find().toArray(function(err, results){            
    //         res.send({ list: results });
    //         client.close();
    //     });
    // });
    res.send({ message: id });
});

// запрос на стату стримера
app.get('/api/webhooks', function(req, res) {
    console.log("req:", req.query);
    // res.send({ message: id });
});
//вернется такой объект 3 раза:
// req.query: 
// {'hub.challenge': 'MND38pynLaZ79Tu8sf5AHPnHXAxnuwZBWZeP1Ubq',
//  'hub.lease_seconds': '10000',
//  'hub.mode': 'subscribe',
//  'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=95793204'}

app.listen(3000);