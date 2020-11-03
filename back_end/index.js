const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const tryImport = require('./test.js');
var app = express();
const jsonParser = express.json();

console.log('Server running at http://stat.metacorp.gg:3000/');
console.log(tryImport());

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
let dbClient;
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

// обработка запроса на список стримеров
app.get('/api/streamers', function(req, res) {
    const streamersList = app.locals.streamers;
    streamersList.find().toArray(function(err, results){            
        res.send({ list: results });
    });
});

// обработка запроса на стату стримера
app.get('/api/streamer/:id', function(req, res) {
    const id = req.params.id;
    res.send({ id: id });
});

// подтверждение подписки на вебхук
app.get('/api/webhooks', function(req, res) {
    console.log("webhook get-request");
    // if (req.query) {console.log("req.query:", req.query);}; //показать query парамы
    if (req.query['hub.challenge']) {
        console.log("подписка на " + req.query['hub.topic']);
        res.send(req.query['hub.challenge'])
    }
    else {console.log("неизвестный реквест :(")};
});

// получение уведомления о начале/окончание стрима
app.post('/api/webhooks', jsonParser, function (req, res) {  
    console.log("webhook post-request");     
    if(!req.body) return res.sendStatus(400);
    // console.log('req.body', req.body);
    if (req.body.data.length !== 0) {
        let stream = req.body.data[0];
        console.log(stream.user_name + '(' + stream.user_id + ')' + ' запустил стрим');
    } else {console.log('стрим закончился');}
    res.sendStatus(202);
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

// при подписке вернется такой объект 5 раз:
// req.query: 
// {'hub.challenge': 'MND38pynLaZ79Tu8sf5AHPnHXAxnuwZBWZeP1Ubq',
//  'hub.lease_seconds': '10000',
//  'hub.mode': 'subscribe',
//  'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=95793204'}

// при уведомление о событие
// req.body = { data: [] } если стрим закончился
// и если начался: (как если обычный запрос на стрим)
// req.body = { data:
// [ { game_id: '509658',
//     id: '39823845820',
//     language: 'ru',
//     started_at: '2020-10-30T16:56:37Z',
//     tag_ids: null,
//     thumbnail_url:
//      'https://static-cdn.jtvnw.net/previews-ttv/live_user_modestal-{width}x{height}.jpg',
//     title:
//      'КРОТ ВИТЬКА ОТЖАЛ ПЕЩЕРУ У СТРАУСА РУСЛАНА / Мерч: https://modestal.shop',
//     type: 'live',
//     user_id: '112619759',
//     user_name: 'modestal',
//     viewer_count: 0 } ] }