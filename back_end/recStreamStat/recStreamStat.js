const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js');
const quickSort = require('../quickSort.js');
const videoTimeConverter = require('../videoTimeConverter.js');
const saveStreamStat = require('./saveStreamStat.js');
const deleteLiveStream = require('../collectionLiveStreams/deleteLiveStream.js');

let deleteNulls = (obj) => {
    let firstViewer = 1;
    if (obj.maxViewers === 0) { obj.minutes1Viewer = null }
    else {
        for (let i = 0; i < obj.stat.length; i++) {
            if (obj.stat[i] === 0) {firstViewer++}
            else {break};
        };
        obj.minutes1Viewer = firstViewer;
        if (firstViewer > 5) {obj.stat.splice(0, 5)};
        if (firstViewer > 1 && firstViewer <= 5) {obj.stat.splice(0, firstViewer)};
    };    
    return null
};

function dateDif(dateStr) {
    let date = new Date(Date.parse(dateStr));
    var dif = Math.ceil(Math.abs(date.getTime() - new Date()) / 1000);
    return dif;
};

let checkGame = (nowGame, gamesObj) => {
    // если название текущей игры и так соответствует последнему названию игры из объекта
    if (nowGame === gamesObj.now) { return null }
    else {
        // если название текущей игры не соответствует последнему названию игры из объекта, но уже было в этом стриме
        if (gamesObj.all.includes(nowGame)) { return null }
        else {
            // если игры еще не было на этом стриме
            gamesObj.all.push(nowGame);
        };
    };
};

let endStream = (obj) => {
    console.log(obj.streamerName + "(" + obj.streamerID + ") закончил стрим #" + obj.streamID);
    deleteNulls(obj);
    obj.midViewers = Math.round(obj.stat.reduce((prev, viewers) => prev + viewers, 0) / obj.stat.length);
    let sortedArr = quickSort(obj.stat);
    obj.med50Viewers = sortedArr[Math.ceil(sortedArr.length/2)];
    delete obj.stat;
    obj.stream.length = videoTimeConverter(dateDif(obj.stream.created_at));
    obj.record.length = videoTimeConverter(dateDif(obj.record.start_at));
    obj.games = obj.games.all;
    deleteLiveStream(obj.streamID);
    saveStreamStat(obj);
};

let checkStream = (numID, obj) => {
    getStreamsChannelById(numID)
    .then(stream => {
        if(stream.stream) {
            if (stream.stream._id === obj.streamID) {
                checkGame(stream.stream.game, obj.games);
                obj.stat.push(stream.stream.viewers);
                if (stream.stream.viewers > obj.maxViewers) {
                    obj.maxViewers = stream.stream.viewers
                };

                // delete
                console.log(
                    obj.streamerName,
                    ", id:" + obj.streamID,
                    ", mins:" + obj.stat.length,
                    ", start:" + obj.stream.created_at,
                    ", rec:" + obj.record.start_at 
                );
                // delete

                setTimeout(checkStream, 60000, numID, obj)
            } else { endStream(obj); };
        } else { endStream(obj); };
    })
};

module.exports = function recStreamStat (newStream) {
    //streamerID, title, streamID
    getStreamsChannelById(newStream.streamerID)
    .then(stream => {
        console.log("начинаю записывать стату по стриму #" + newStream.streamID);
        if (stream.stream) {
            let statObj = {
                streamerName: stream.stream.channel.display_name,
                streamerID: stream.stream.channel._id,
                maxViewers: stream.stream.viewers,
                stat:[],
                stream: {created_at: stream.stream.created_at},
                record: {start_at: new Date().toISOString()},
                games: {now: stream.stream.game, all: [stream.stream.game]},
                title: newStream.title,
                // title: stream.stream.channel.status ??
                streamID: Number(newStream.streamID),
                notes: []
            };
            let difStartStreamAndRec = (new Date(statObj.record.start_at).getTime() - new Date(statObj.stream.created_at).getTime())/1000;
            if (difStartStreamAndRec > 300) {statObj.notes.push('сбор статистики не с начала стрима')};
            checkStream(newStream.streamerID, statObj);
        } else {console.log("что-то не так: стрима #" + newStream.streamID +  " - нет");}
    })
};

// сейчас записывает так:
// {
//     name: "Stray228",
//     streams: [
//         {games: ["Dota 2"],
//         maxViewers: 10279,
//         med50Viewers: 8336,
//         midViewers: 8101,
//         minutes1Viewer: 1,
//         notes: [],
//         record: {start_at: "2020-11-13T18:08:20.784Z", length: "5:55:48"},
//         stream: {created_at: "2020-11-13T18:06:48Z", length: "5:57:21"},
//         streamID: 39973754108,
//         title: "Как стать успешным стримером(секреты), заходи + прогрессируй братишка"},

//         {games: ["Dota 2"],
//         maxViewers: 12102,
//         med50Viewers: 9478,
//         midViewers: 9379,
//         minutes1Viewer: 2,
//         notes: [],
//         record:{length: "6:11:58", start_at: "2020-11-15T17:52:20.337Z"},
//         stream: {created_at: "2020-11-15T17:51:35Z", length: "6:12:43"},
//         streamID: 40001177404,
//         title: "Как стать успешным стримером(секреты), заходи + прогрессируй братишка"},

//         {games: ["Dota 2"],
//         maxViewers: 12102,
//         med50Viewers: 9478,
//         midViewers: 9366,
//         minutes1Viewer: 1,
//         notes: [],
//         record: {length: "6:10:57", start_at: "2020-11-15T17:53:55.730Z"},
//         stream: {created_at: "2020-11-15T17:51:35Z", length: "6:13:18"},
//         streamID: 40001177404,
//         title: "Битва за рейтинг и общение на различные темы(развиваемся), присоединяйся "}
//     ],
//     twitchID: 40488774,
//     _id: "5faf1ef8d124e0bedd6d2b1a"
// }