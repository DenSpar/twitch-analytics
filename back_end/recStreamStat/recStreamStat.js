const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js');
const quickSort = require('../quickSort.js');
const videoTimeConverter = require('../videoTimeConverter.js');
const saveStreamStat = require('./saveStreamStat.js');
const deleteLiveStream = require('../collectionLiveStreams/deleteLiveStream.js');
const formatedLog = require('../formatedLog.js');

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
    formatedLog(obj.streamerName + '(' + obj.streamerID + ') закончил стрим #' + obj.streamID, 'INFO');
    deleteNulls(obj);
    if (obj.stat.length > 0) {
        obj.midViewers = Math.round(obj.stat.reduce((prev, viewers) => prev + viewers, 0) / obj.stat.length);
        let sortedArr = quickSort(obj.stat);
        obj.med50Viewers = sortedArr[Math.ceil(sortedArr.length/2)];
    };
    delete obj.stat;
    obj.stream.length = videoTimeConverter(dateDif(obj.stream.created_at));
    obj.record.length = videoTimeConverter(dateDif(obj.record.start_at));
    obj.games = obj.games.all;
    saveStreamStat(obj);
    deleteLiveStream(obj.streamID);
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
                formatedLog(obj.streamerName + ', id:' + obj.streamID + ', mins:' + (obj.stat.length-1), 'INFO');
                setTimeout(checkStream, 60000, numID, obj)
            } else { endStream(obj); };
        } else { endStream(obj); };
    })
};

let startRec = (stream, title) => {
    formatedLog('начинаю записывать стату по стриму №' + stream._id, 'INFO');
    let statObj = {
        streamerName: stream.channel.display_name,
        streamerID: stream.channel._id,
        maxViewers: stream.viewers,
        midViewers: stream.viewers,
        med50Viewers: stream.viewers,
        stat:[stream.viewers],
        stream: {created_at: stream.created_at},
        record: {start_at: new Date().toISOString()},
        games: {now: stream.game, all: [stream.game]},
        title: title,
        streamID: stream._id,
        notes: []
    };
    let difStartAndRecStream = (new Date(statObj.record.start_at).getTime() - new Date(statObj.stream.created_at).getTime())/1000;
    if (difStartAndRecStream > 300) {statObj.notes.push('сбор статистики не с начала стрима')};
    checkStream(statObj.streamerID, statObj);
};

let wrongStart = (newStream) => {
    formatedLog('что-то не так: стрима №' + newStream.streamID +  ' - нет. Проверю через минуту', 'WARN');
    setTimeout(getStreamsChannelById, 60000, newStream.streamerID)
    .then(stream => {
        if (stream.stream) {
            startRec(stream.stream, newStream.title);
        } else {
            formatedLog('повторная проверка стрима №' + newStream.streamID +  ' - стрима все еще нет', 'WARN');
            deleteLiveStream(newStream.streamID);
        };
    })
};

module.exports = function recStreamStat (newStream) {
    getStreamsChannelById(newStream.streamerID)
    .then(stream => {
        if (stream.stream) {
            startRec(stream.stream, newStream.title);
        } else { wrongStart(newStream); };
    });
};