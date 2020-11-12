const getChannelById = require('./getChannelById.js');
const getChannelsVideoById = require('./getChannelsVideoById.js');
const getStreamsChannelById = require('./getStreamsChannelById.js');
const splitNumbers = require('../splitNumbers.js');

let channelInfo = (numID, obj) => {
    return new Promise((resolve, reject) => {
        getChannelById(numID)
        .then(res => {
            obj.id = res._id;
            obj.name = res.display_name;
            obj.logo = res.logo;
            obj.followers = res.followers;
            obj.views = res.views;
            obj.description = res.description;
            resolve()
        })
    })
};

let streamInfo = (numID, obj) => {
    return new Promise((resolve, reject) => {
        getStreamsChannelById(numID)
        .then(res => {
            obj.stream = res.stream;
            resolve()
        })
    })
};

let videosInfo = (numID, obj) => {
    return new Promise((resolve, reject) => {
        getChannelsVideoById(numID, 1)
        .then(res => {
            obj.lastVideo = res.videos[0];
            obj.totalVideos = res._total;
            resolve()
        })
    })
};

let getDaysDiff = (dateStr) => {
    let date = new Date(dateStr).getTime();
    let currentDate = new Date().getTime();
    let timeDiff = (currentDate - date) / 1000;
    let daysDiff = Math.floor(timeDiff / 86400);
    // daysDiff = 'за ' + daysDiff + ' д.'
    return daysDiff
};

let getFollowersDiff = (actual, streamerFromDB) => {
    let obj = {
        actual: actual,
        diff: null
    };
    if (streamerFromDB.hasOwnProperty('followers')) {
        let stats = streamerFromDB.followers;

        if (stats.length === 1) {
            let dateStr = Object.keys(stats[0])[0];
            obj.inDays = getDaysDiff(dateStr);
        } else {
            for (let i = stats.length - 1; i >= 0; i--) {
                let dateStr = Object.keys(stats[i])[0];
                if (getDaysDiff(dateStr) < 7 && i !== 0) {
                    continue
                } else {
                    obj.diff = obj.actual - Object.values(stats[i])[0];
                    let dateStr = Object.keys(stats[i])[0];
                    obj.inDays = getDaysDiff(dateStr);
                }
            };
        };
    } else {obj.inDays = null};
    
    return obj
};

let getViewsDiff = (actual, streamerFromDB) => {
    let obj = {
        actual: actual,
        diff: null
    };
    if (streamerFromDB.hasOwnProperty('views')) {
        let stats = streamerFromDB.views;

        if (stats.length === 1) {
            obj.diff = obj.actual - Object.values(stats[0])[0];
            let dateStr = Object.keys(stats[0])[0];
            obj.inDays = getDaysDiff(dateStr);
        } else {
            for (let i = stats.length - 1; i >= 0; i--) {
                let dateStr = Object.keys(stats[i])[0];
                if (getDaysDiff(dateStr) < 30 && i !== 0) {
                    continue
                } else {
                    obj.diff = obj.actual - Object.values(stats[i])[0];
                    let dateStr = Object.keys(stats[i])[0];
                    obj.inDays = getDaysDiff(dateStr);
                }
            };
        };
    } else {obj.inDays = null};
    
    return obj
};

let preparing4Send = (obj) => {
    obj.actual = splitNumbers(obj.actual);
    if(obj.diff) {
        if (obj.diff[0] === '-') { obj.diff = splitNumbers(obj.diff); }
        else { obj.diff = '+' + splitNumbers(obj.diff); };
    };
    return obj
};

module.exports = function getStreamer(streamerFromDB) {
    let finalObj = {stream: null};
    return new Promise ((resolve, reject) => {
        Promise.all([
            channelInfo(streamerFromDB.twitchID, finalObj),
            streamInfo(streamerFromDB.twitchID, finalObj),
            videosInfo(streamerFromDB.twitchID, finalObj)
        ])
        .then(() => {
            finalObj.followers = getFollowersDiff(finalObj.followers, streamerFromDB);
            finalObj.followers = preparing4Send(finalObj.followers);
            finalObj.views = getViewsDiff(finalObj.views, streamerFromDB);
            finalObj.views = preparing4Send(finalObj.views);
            resolve(finalObj)
        });
    })
    .catch(err => console.log(err));
};

// 3) средний онлайн за месяц
// 4) максимальный онлайн за месяц