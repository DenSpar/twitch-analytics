const express = require('express');
const MongoClient = require('mongodb').MongoClient;

var app = express();
const jsonParser = express.json();

const getList = require('./forDashboard/getList.js');
const getStreamer4Page = require('./forStreamerPage/getStreamer4Page.js')
// const getStreamer = require('./twitchApiRequests/getStreamer.js');
const updateStreamersStat = require('./updateStreamersStat/updateStreamersStat.js');
const checkWebHooks = require('./apiHandlers/checkWebHooks.js');
const subscribe2WebHook  = require('./twitchApiRequests/subscribe2WebHook.js');
const updateWebHooks = require('./updateWebHooks.js');
const recStreamStat = require('./recStreamStat/recStreamStat.js');

const searchChannels = require('./apiHandlers/searchChannels.js');
const addChannel2MainStack = require('./apiHandlers/addChannel2MainStack.js');
const totalDeleteStreamer = require('./apiHandlers/totalDeleteStreamer.js');

const getAllStreamersFromDB = require('./collectionStreamers/getAllStreamersFromDB.js');
const getStreamerFromDB = require('./collectionStreamers/getStreamerFromDB.js');

const alreadyExistStream = require('./apiHandlers/alreadyExistStream.js');
const deleteLiveStream = require('./collectionLiveStreams/deleteLiveStream.js');
// const addLiveStream = require('./collectionLiveStreams/addLiveStream.js');
const refreshLiveStreams = require('./refreshLiveStreams/refreshLiveStreams.js');

console.log('Server running at http://stat.metacorp.gg:3000/');

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
let dbClient;
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
    app.locals.stats = client.db("streamers").collection("stats");
    app.locals.lives = client.db("streamers").collection("lives");
    app.listen(3000, function(){
        console.log("mongoDB connect");
        // автоматическое обновление статы
        updateStreamersStat();
        // автоматическое продление подписки
        updateWebHooks();
        // автоматическое проверка и запись статы текущих стримов
        refreshLiveStreams();
    });
});

// вернет список стримеров для дашборда
app.get('/api/streamers', function(req, res) {
    // заменить на функцию
    const streamersList = app.locals.streamers;
    streamersList.find().toArray(function(err, streamers){
        getList(streamers)
        .then(list => res.send(list))
    });
});

// вернет стримера для страницы
app.get('/api/streamers/:id', function(req, res) {
    const id = Number(req.params.id);
    // заменить на функцию
    const streamersList = app.locals.streamers;
    streamersList.findOne({twitchID: id}, function(err, streamer){
        if(err) return console.log(err);
        if (streamer) {
            getStreamer4Page(streamer)
            .then(streamerObj => res.send(streamerObj)
        )}
        else { res.send({message: 'нет такого стримера'}) }
    });
});

// вывод содержимого коллекции list
app.get('/api/showlist', function(req, res) {
    getAllStreamersFromDB()
    .then(streamers => res.send(streamers));
});

// вывод одного стримера из коллекции list
app.get('/api/streamerfromlist/:id', function(req, res) {
    const id = Number(req.params.id);
    getStreamerFromDB(id)
    .then(streamer => res.send(streamer));
});

// вывод содержимого коллекции stats
app.get('/api/showstats', function(req, res) {
    const statsList = app.locals.stats;
    statsList.find().toArray(function(err, stats){
        res.send(stats)
    });
});

// вывод содержимого коллекции lives
app.get('/api/showlives', function(req, res) {
    const livesList = app.locals.lives;
    livesList.find().toArray(function(err, lives){
        res.send(lives)
    });
});

// удалит стрим № из списка живых стримов
app.get('/api/deletestream/:id', function(req, res) {
    const id = Number(req.params.id);
    deleteLiveStream(id)
    .then(answer => res.send({message: answer}));
});

// поиск каналов по имени
app.get('/api/search', function(req, res) {
    if (req.query["name"]) {
        let name = req.query["name"];
        let limit = req.query["limit"];
        if (!limit || limit === "undefined") { limit = 10; };
        console.log("get-запрос: поиск каналов по имени " + name + ", лимит = " + limit);
        searchChannels(name, limit)
        .then(channels => res.send(channels))
    } else {
        console.log("get-запрос: поиск каналов по имени - не указано имя поиска");
        res.send({message: "не указано имя поиска"});
    };
});

// добавление канала в основной стэк
app.post('/api/addchannel', jsonParser, function(req, res) {
    if(!req.body) {return res.sendStatus(400)}
    else {
        addChannel2MainStack(req.body)
        .then(response => { res.send(response); })
    };
});

// // тотальное удаление стримера
// app.get('/api/totaldel/:id', function(req, res) {
//     const id = Number(req.params.id);
//     totalDeleteStreamer(id)
//     .then(delAnswer => { res.send(delAnswer); })
// });

// подписаться на стримера
app.get('/api/subwebhook/:id', function(req, res) {
    const id = Number(req.params.id);
    subscribe2WebHook(id)
    .then(response => {
        console.log(response);
        res.send({message: response})
    })
});

// показать список активных подписок
app.get('/api/checkwebhooks', function(req, res) {
    const streamersList = app.locals.streamers;
    streamersList.find().toArray(function(err, streamers){
        let streamersIdArr = [];
        streamers.map(streamer => streamersIdArr.push(streamer.twitchID));
        checkWebHooks(streamersIdArr)
        .then(result => res.send(result));
    });    
});

// подтверждение подписки/отписки на вебхук
app.get('/api/webhooks', function(req, res) {
    console.log("webhook get-request");
    // if (req.query) {console.log("req.query:", req.query);}; //показать query парамы
    if (req.query['hub.challenge']) {
        res.send(req.query['hub.challenge'])
        if(req.query['hub.mode'] === 'subscribe') {
            console.log("подписка на стримера id=" + req.query['hub.topic'].match(/\d+$/)[0]);
        };
        if(req.query['hub.mode'] === 'unsubscribe') {
            console.log("отписка от стримера id=" + req.query['hub.topic'].match(/\d+$/)[0]);
        };
    }
    else {console.log("неизвестный реквест :(")};
});

// получение уведомления о начале/окончание стрима
app.post('/api/webhooks', jsonParser, function (req, res) {
    if(!req.body) {return res.sendStatus(400)}
    else {res.sendStatus(202)};
    if (req.body.data.length !== 0) {
        let stream = req.body.data[0];
        console.log('webhook - ' + stream.user_name + '(' + stream.user_id + ')' + ' запустил стрим №' + stream.id);
        let newStream = {
            streamID: Number(stream.id),
            streamerID: Number(stream.user_id),
            streamerName: stream.user_name,
            title: stream.title
        };
        alreadyExistStream(newStream)
        .then(isStreamExist => {
            if(isStreamExist) {console.log('стрим №' + stream.id + ' уже записывается')}
            else {recStreamStat (newStream);}
        })
    } else {console.log('webhook - стрим закончился');}
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

// //удалить коллекцию stats
// app.get('/api/delstats', function(req, res) {
//     const statsList = app.locals.stats;
//     statsList.drop(function(err, result){              
//         res.send({message: 'удалена коллекция stats'})
//     });
// });

// //удалить коллекцию lives
// app.get('/api/dellives', function(req, res) {
//     const livesList = app.locals.lives;
//     livesList.drop(function(err, result){              
//         res.send({message: 'удалена коллекция lives'})
//     });
// });


// срочно добавленный стример
// app.get('/api/addone', function(req, res) {
//     const streamersList = app.locals.streamers;
//     const oneStreamer = {
//         followers: [{"11/25/2020": 19}],
//         maxOnline: 0,
//         midOnline: {inDays: 0, value: 0},
//         name: "russianminecrafttours",
//         twitchID: 593756357,
//         views: [{"11/25/2020": 8989}]
//     }
//     streamersList.insertOne(oneStreamer, function(err, result){          
//         if(err) { return console.log(err); }
//         console.log("добавлен новый стример", result.ops);
//         res.send(result.ops)
//     });
// });

// app.get('/api/delone', function(req, res) {
//     const streamersList = app.locals.streamers;
//     streamersList.findOneAndDelete({twitchID: 593756357}, function(err, result){               
//         if(err) return console.log(err);
//         console.log("удален стример");
//         res.send(result)
//     });
// });