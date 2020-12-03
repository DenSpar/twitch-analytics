const deleteStreamerFromDB = require('../collectionStreamers/deleteStreamerFromDB.js');
const deleteStreamerStats = require('../collectionStats/deleteStreamerStats.js');

module.exports = function totalDeleteStreamer(streamerID) {
    return new Promise (function(resolve, reject) {
        console.log("запущенно полное удаление стримера из БД");
        Promise.all([
            deleteStreamerFromDB(streamerID), // удаление из основного списка
            deleteStreamerStats(streamerID), // удаление статы стримера
        ])
        .then(res => {
            let answer = {
                delStreamer: res[0],
                delStats: res[1]
            };
            resolve(answer);
        })
        
        // заполнить ансвер
    })
};