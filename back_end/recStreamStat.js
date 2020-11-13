const getStreamsChannelById = require('./twitchApiRequests/getStreamsChannelById.js');
const quickSort = require('./quickSort.js');
const videoTimeConverter = require('./videoTimeConverter.js');
const saveStreamStat = require('./saveStreamStat.js');

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

module.exports = function recStreamStat (numID, title, streamID) {
    getStreamsChannelById(numID)
    .then(stream => {
        console.log("начинаю записывать стату по стриму #" + streamID);
        if (stream.stream) {
            let statObj = {
                streamerName: stream.stream.channel.display_name,
                streamerID: stream.stream.channel._id,
                maxViewers: stream.stream.viewers,
                stat:[],
                stream: {created_at: stream.stream.created_at},
                record: {start_at: new Date().toISOString()},
                games: {now: stream.stream.game, all: [stream.stream.game]},
                title: title,
                streamID: Number(streamID),
                notes: []
            };
            let difStartStreamAndRec = (new Date(statObj.record.start_at).getTime - new Date(statObj.stream.created_at).getTime)/1000;
            if (difStartStreamAndRec > 300) {statObj.notes.push('сбор статистики не с начала стрима')};
            checkStream(numID, statObj);
        } else {console.log("что-то не так: стрима #" + streamID +  " - нет");}
    })
};

// сейчас записывает так:
// {
//     name: "steel",
//     streams: [
//         {
//             created_at: "2020-11-12T18:03:54Z",
//             game: "Grand Theft Auto V",
//             maxViewers: 1705,
//             med50Viewers: 1393,
//             midViewers: 1326,
//             minutes1Viewer: 2,
//             startRecord: "11/12/2020, 6:04:46 PM",
//             streamID: 39962535756,
//             streamLength: "6:16:46",
//             title: "СЭМ ПАБЛО ВЕРНУЛСЯ"
//         },
//         {
//             created_at: "2020-11-12T18:03:54Z",
//             game: "Just Chatting",
//             maxViewers: 968,
//             med50Viewers: 701,
//             midViewers: 711,
//             minutes1Viewer: 1,
//             startRecord: "11/12/2020, 11:54:44 PM",
//             streamID: 39962535756,
//             streamLength: "6:16:59",
//             title: "СЭМ ПАБЛО ВЕРНУЛСЯ"
//         }
//     ],
//     twitchID: 195675197,
//     _id: "5fadd1578b244248a25f2b18"
// }