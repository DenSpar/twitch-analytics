const splitNumbers = require('./splitNumbers.js');

module.exports = function getOnlineInfo(finObj, streamerFromDB) {
    if (streamerFromDB.hasOwnProperty('maxOnline')) {
        if(streamerFromDB.maxOnline === 0) { finObj.maxOnline = 'статистика еще не собрана'}
        else { finObj.maxOnline = splitNumbers(streamerFromDB.maxOnline) };
    } else { finObj.maxOnline = 'статистика еще не собрана'};
    if (streamerFromDB.hasOwnProperty('midOnline')) {
        if(streamerFromDB.midOnline.value === 0) {
            finObj.midOnline = {
                value: 'статистика еще не собрана',
                inDays: null
            };
        } else {
            finObj.midOnline = {
                value: splitNumbers(streamerFromDB.midOnline.value),
                inDays: 'за ' + streamerFromDB.midOnline.inDays + ' д.'
            };
        };
    } else {
        finObj.midOnline = {
            value: 'статистика еще не собрана',
            inDays: null
        };
    };
};