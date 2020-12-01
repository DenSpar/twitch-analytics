const getChannelById = require('../twitchApiRequests/getChannelById.js');
const getChannelsVideoById = require('../twitchApiRequests/getChannelsVideoById.js');
const getDiff = require('../preparingStreamers4Send/getDiff.js');
const getOnlineInfo = require('../preparingStreamers4Send/getOnlineInfo.js');
const getStreamInfo = require('../preparingStreamers4Send/getStreamInfo.js');
const getInfo4ClosedChannel = require('../preparingStreamers4Send/getInfo4ClosedChannel.js');
const howManyStreamsIn7Days = require('./howManyStreamsIn7Days.js');

let getChannelInfo = (numID, obj) => {
    return new Promise((resolve, reject) => {
        getChannelById(numID)
        .then(res => {
            if (res) {
                obj.id = res._id;
                obj.name = res.display_name;
                obj.logo = res.logo;
                obj.followers = res.followers;
                obj.views = res.views;
                obj.description = res.description; // для поиска
                obj.isClosed = false;
            } else {
                obj.id = numID;
                // obj.name = "";
                // obj.logo = "";
                // obj.followers = "";
                // obj.views = "";
                obj.description = ""; // для поиска
                obj.isClosed = true;
            };
            resolve()
        })
    })
};

let getVideosInfo = (numID, obj) => {
    return new Promise((resolve, reject) => {
        getChannelsVideoById(numID, 1)
        .then(res => {
            obj.totalVideos = res._total;
            resolve()
        })
    })
};

module.exports = function getStreamer4Dashboard(streamerFromDB) {
    let finalObj = {stream: null};
    finalObj.onlineViewers = getOnlineInfo(streamerFromDB);
    return new Promise ((resolve, reject) => {
        Promise.all([
            getChannelInfo(streamerFromDB.twitchID, finalObj),
            getStreamInfo(streamerFromDB.twitchID, finalObj),
            getVideosInfo(streamerFromDB.twitchID, finalObj),
            howManyStreamsIn7Days(streamerFromDB.twitchID, finalObj)
        ])
        .then(() => {
            if (!finalObj.isClosed) {
                finalObj.followers = getDiff('followers', finalObj.followers, streamerFromDB);
                finalObj.views = getDiff('views', finalObj.views, streamerFromDB);
            } else {
                getInfo4ClosedChannel(streamerFromDB, finalObj);
            };
            
            resolve(finalObj)
        });
    })
    .catch(err => console.log(err));
};