const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

const checkWebHooks = require('./apiHandlers/checkWebHooks.js');
const subscribe2WebHook  = require('./twitchApiRequests/subscribe2WebHook.js');
const formatedLog = require('./formatedLog.js');

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return formatedLog(err, 'ERROR');
    dbClient = client;
    app.locals.streamers = client.db("streamers").collection("list");
});

let updateScript = () => {
    formatedLog('обновление вебхуков: проверяю статус подписок ...', 'INFO');
    const streamersList = app.locals.streamers;
    streamersList.find().toArray(function(err, streamers){
        let streamersIdArr = [];
        streamers.map(streamer => streamersIdArr.push(streamer.twitchID));
        checkWebHooks(streamersIdArr)  
        .then(sortedSubs => {
            let arr2Subscribe = [];
            if(sortedSubs.over.length !== 0) {arr2Subscribe = [...sortedSubs.over];}
            if(sortedSubs.needRefresh.length !== 0) {
                sortedSubs.needRefresh.map(sub => arr2Subscribe.push(sub.id));
            };
            if(arr2Subscribe.length !== 0) {
                formatedLog('обновление вебхуков: актуализирую подписки ...', 'INFO');
                arr2Subscribe.map(id2Subscribe => subscribe2WebHook(id2Subscribe))
            } else { formatedLog('обновление вебхуков: все подписки действительны, нечего актуализировать', 'INFO'); };
        })
    })
};

module.exports = function updateWebHooks() {
    updateScript();
    formatedLog('обновление подписок: стартовал таймер', 'INFO');
    setInterval(() => { updateScript(); }, 86400000);
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

// попробовать удалить app