// 3) средний онлайн за месяц
// 4) максимальный онлайн за месяц

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = express();

let dbClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.stats = client.db("streamers").collection("stats");
});

let getDaysDiff = (dateStr) => {
    let date = new Date(dateStr).getTime();
    let currentDate = new Date().getTime();
    let timeDiff = (currentDate - date) / 1000;
    let daysDiff = Math.floor(timeDiff / 86400);
    return daysDiff
};

module.exports = function getMidAndMaxOnline(streamerID) {
    return new Promise (function(resolve, reject) {
        let obj = {
            maxOnline: 0,
            midOnline: {
                value: 0,
                inDays: 0
            }
        }
        const statsList = app.locals.stats;
        statsList.findOne({twitchID: streamerID}, function(err, streamerStat){
            if(err) return console.log(err);
            
            if(streamerStat.streams.length === 1) {
                obj.maxOnline = stream[0].maxViewers;
                obj.midOnline.value = stream[0].midViewers;
                obj.midOnline.inDays = getDaysDiff(stream[0].record.start_at);
            };

            if(streamerStat.streams.length > 1) {
                arrMidOnline = [];
                streamerStat.streams.map(stream => {
                    let newDaysDiff = getDaysDiff(stream.record.start_at);
                    if(newDaysDiff <= 30) {
                        if(obj.maxOnline < stream.maxViewers) { obj.maxOnline = stream.maxViewers };
                        arrMidOnline.push(stream.midViewers);
                        obj.midOnline.inDays = newDaysDiff;
                    } else { break };
                });
                if(arrMidOnline.length !== 0) {
                    obj.midOnline.value = Math.round(arrMidOnline.reduce((prev, viewers) => prev + viewers, 0) / arrMidOnline.length);
                } else {
                    let indexOfLastStream = streamerStat.streams.length - 1;
                    obj.maxOnline = stream[indexOfLastStream].maxViewers;
                    obj.midOnline.value = stream[indexOfLastStream].midViewers;
                    obj.midOnline.inDays = getDaysDiff(stream[indexOfLastStream].record.start_at);
                };
            };
            resolve(obj);
        })
    })
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});