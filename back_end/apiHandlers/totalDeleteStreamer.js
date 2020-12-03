const deleteStreamerFromDB = require('../collectionStreamers/deleteStreamerFromDB.js');
const deleteStreamerStats = require('../collectionStats/deleteStreamerStats.js');
const findLiveStream = require('../collectionLiveStreams/findLiveStream.js');
const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js');

let checkNowStream = (streamerID) => {
    return new Promise (function (resolve, reject) {
        findLiveStream(streamerID)
        .then(liveStreamInDB => {
            if (liveStreamInDB) {
                getStreamsChannelById(streamerID)
                .then(stream => {
                    if(stream) {
                        resolve(stream); // сделать разные ответы для двух кейсов
                    } else { resolve(stream); } // сделать разные ответы для двух кейсов
                });
            } else { resolve(liveStreamInDB); };
        })
    })
};

module.exports = function totalDeleteStreamer(streamerID) {
    return new Promise (function(resolve, reject) {
        console.log("запущенно полное удаление стримера из БД");
        Promise.all([
            deleteStreamerFromDB(streamerID), // удаление из основного списка
            deleteStreamerStats(streamerID), // удаление статы стримера
            checkNowStream(streamerID), // проверка идет ли сейчас стрим на этом канала
        ])
        .then(res => {
            let answer = {
                delStreamer: res[0],
                delStats: res[1],
                nowStream: res[2]
            };
            resolve(answer);
        })
        
        // заполнить ансвер
    })
};