const splitNumbers = require('./splitNumbers.js');

module.exports = function getOnlineInfo(streamerFromDB) {
    let onlineViewers = {};
    if (streamerFromDB.hasOwnProperty('maxOnline')) {
        if(streamerFromDB.maxOnline === 0) { onlineViewers.max = '-'}
        else { onlineViewers.max = splitNumbers(streamerFromDB.maxOnline) };
    } else { onlineViewers.max = '-'};
    if (streamerFromDB.hasOwnProperty('midOnline')) {
        if(streamerFromDB.midOnline.value === 0) {
            onlineViewers.middle = '-';
            onlineViewers.inDays = null;
        } else {
            onlineViewers.middle = splitNumbers(streamerFromDB.midOnline.value);
            onlineViewers.inDays = 'за ' + streamerFromDB.midOnline.inDays + ' д.';
        };
    } else {
        onlineViewers.middle = '-';
        onlineViewers.inDays = null;
    };
    return onlineViewers;
};