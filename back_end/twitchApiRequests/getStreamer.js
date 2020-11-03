const getChannelById = require('./getChannelById.js');
const getChannelsVideoById = require('./getChannelsVideoById.js');
const getStreamsChannelById = require('./getStreamsChannelById.js');

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

module.exports = function getStreamer(numID) {
    let streamer = {stream: null};
    return new Promise ((resolve, reject) => {
        Promise.all([
            channelInfo(numID, streamer),
            streamInfo(numID, streamer),
            videosInfo(numID, streamer)
        ])
        .then(() => resolve(streamer));
    })
    .catch(err => console.log(err));
};