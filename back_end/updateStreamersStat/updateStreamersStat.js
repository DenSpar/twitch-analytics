const getAllStreamersFromDB = require('../collectionStreamers/getAllStreamersFromDB.js');
const getChannelById = require('../twitchApiRequests/getChannelById.js');
const getStreamerStats = require('../collectionStats/getStreamerStats.js');
const getMidAndMaxOnline = require('./getMidAndMaxOnline.js');
const updateStreamerInList = require('../collectionStreamers/updateStreamerInList.js');
const formatedLog = require('../formatedLog.js');

let getNewStat = (date) => {
    let localDate = date.toLocaleDateString();
    getAllStreamersFromDB()
    .then(streamers => {
        streamers.map(streamer => {
            getChannelById(streamer.twitchID)
            .then(channel => {
                let updatesOBJ = {};

                if (channel) {
                    let updateFollowers = [];
                    let updateViews = [];
                    let newName = channel.display_name;
                    
                    let newFollowers = {};
                    newFollowers[localDate] = channel.followers;
                    if (streamer.hasOwnProperty('followers')) {
                        updateFollowers = streamer.followers;
                        updateFollowers.push(newFollowers);
                    } else {updateFollowers = [newFollowers]}

                    let newViews = {};
                    newViews[localDate] = channel.views;
                    if (streamer.hasOwnProperty('views')) {
                        updateViews = streamer.views;
                        updateViews.push(newViews);
                    } else {updateViews = [newViews]}

                    updatesOBJ = {
                        followers: updateFollowers,
                        views: updateViews
                    };
                    if (streamer.name !== newName || !streamer.name) {
                        updatesOBJ.name = newName;
                    };
                };

                getStreamerStats(streamer.twitchID)
                .then(streamerStat => {
                    let MidAndMaxOnline = getMidAndMaxOnline(streamerStat);
                    updatesOBJ.maxOnline = MidAndMaxOnline.maxOnline;
                    updatesOBJ.midOnline = MidAndMaxOnline.midOnline;

                    let streamerName = '';
                    if (updatesOBJ.name) { streamerName = updatesOBJ.name }
                    else { streamerName = streamer.name };
                    updateStreamerInList(streamer.twitchID, streamerName, updatesOBJ);
                });
            })
        })
    });
    return null
};

let updateScript = () => {
    let currentDate = new Date();
    let hoursNow = currentDate.getHours() + 3;
    if (hoursNow > 23) { hoursNow = hoursNow - 24; };
    let hoursWait = 9;
    if (hoursNow === hoursWait) {
        formatedLog('обновление статы стримеров: обновление ...', 'INFO');
        return getNewStat(currentDate)
    } else {
        formatedLog('обновление статы стримеров: сейчас ' + hoursNow + ' часов, жду ' + hoursWait, 'INFO');
    };
};

module.exports = function updateStreamersStat() {
    updateScript();
    formatedLog('обновление статы стримеров: стартовал таймер', 'INFO');
    setInterval(() => { updateScript(); }, 3600000);
};