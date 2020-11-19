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
            
            if (streamerStat) {
                let streams = streamerStat.streams;
                if(streams.length === 1) {
                    obj.maxOnline = streams[0].maxViewers;
                    obj.midOnline.value = streams[0].midViewers;
                    obj.midOnline.inDays = getDaysDiff(streams[0].record.start_at);
                };

                if(streams.length > 1) {
                    arrMidOnline = [];
                    for (let i = 0; i < streams.length; i++) {
                        let newDaysDiff = getDaysDiff(streams[i].record.start_at);
                        if(newDaysDiff <= 30) {
                            if(obj.maxOnline < streams[i].maxViewers) { obj.maxOnline = streams[i].maxViewers };
                            arrMidOnline.push(streams[i].midViewers);
                            obj.midOnline.inDays = newDaysDiff;
                        } else { break };
                    };
                    if(arrMidOnline.length !== 0) {
                        obj.midOnline.value = Math.round(arrMidOnline.reduce((prev, viewers) => prev + viewers, 0) / arrMidOnline.length);
                    } else {
                        let indexOfLastStream = streams.length - 1;
                        obj.maxOnline = stream[indexOfLastStream].maxViewers;
                        obj.midOnline.value = stream[indexOfLastStream].midViewers;
                        obj.midOnline.inDays = getDaysDiff(stream[indexOfLastStream].record.start_at);
                    };
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