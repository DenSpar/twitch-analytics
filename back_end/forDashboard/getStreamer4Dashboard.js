const getChannelById = require('../twitchApiRequests/getChannelById.js');
const getChannelsVideoById = require('../twitchApiRequests/getChannelsVideoById.js');
const getDiff = require('../preparingStreamers4Send/getDiff.js');
const getOnlineInfo = require('../preparingStreamers4Send/getOnlineInfo.js');
const getStreamInfo = require('../preparingStreamers4Send/getStreamInfo.js');

let getChannelInfo = (numID, obj) => {
    return new Promise((resolve, reject) => {
        getChannelById(numID)
        .then(res => {
            obj.id = res._id;
            obj.name = res.display_name;
            obj.logo = res.logo;
            obj.followers = res.followers;
            obj.views = res.views;
            obj.description = res.description; // для поиска
            resolve()
        })
    })
};

let getVideosInfo = (numID, obj) => {
    return new Promise((resolve, reject) => {
        getChannelsVideoById(numID, 1)
        .then(res => {
            obj.lastVideo = res.videos[0];
            obj.totalVideos = res._total;
            resolve()
        })
    })
};

module.exports = function getStreamer4Dashboard(streamerFromDB) {
    let finalObj = {stream: null};
    return new Promise ((resolve, reject) => {
        Promise.all([
            getChannelInfo(streamerFromDB.twitchID, finalObj),
            getStreamInfo(streamerFromDB.twitchID, finalObj),
            getVideosInfo(streamerFromDB.twitchID, finalObj)
        ])
        .then(() => {
            finalObj.followers = getDiff('followers', finalObj.followers, streamerFromDB);
            finalObj.views = getDiff('views', finalObj.views, streamerFromDB);
            getOnlineInfo(finalObj, streamerFromDB);
            resolve(finalObj)
        });
    })
    .catch(err => console.log(err));
};