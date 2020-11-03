const express = require('express');
// const url = require('url');
const MongoClient = require("mongodb").MongoClient;
var app = express();
const jsonParser = express.json();

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
    res.send({ id: id });
});

// тест на возврат пустого ответа
app.get('/api/empty', function(req, res) {
    res.send();
});

// запрос на стату стримера
app.get('/api/webhooks', function(req, res) {
    console.log("webhook get-request");
    // if (req.query) {console.log("req.query:", req.query);}; //показать query парамы
    if (req.query['hub.challenge']) {
        console.log("подписка на " + req.query['hub.topic']);
        res.send(req.query['hub.challenge'])
    }
    else {console.log("неизвестный реквест :(")};
});

app.get('/api/webhooks', function(req, res) {
    console.log("webhook get-request");
    // if (req.query) {console.log("req.query:", req.query);}; //показать query парамы
    if (req.query['hub.challenge']) {
        console.log("подписка на " + req.query['hub.topic']);
        res.send(req.query['hub.challenge'])
    }
    else {console.log("неизвестный реквест :(")};
});

app.post('/api/webhooks', jsonParser, function (req, res) {  
    console.log("webhook post-request");     
    if(!req.body) return res.sendStatus(400);
    console.log('req.body', req.body);
    res.sendStatus(202);
});
app.listen(3000);

// при подписке вернется такой объект 5 раз:
// req.query: 
// {'hub.challenge': 'MND38pynLaZ79Tu8sf5AHPnHXAxnuwZBWZeP1Ubq',
//  'hub.lease_seconds': '10000',
//  'hub.mode': 'subscribe',
//  'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=95793204'}