const getChannelsVideoById = require('../twitchApiRequests/getChannelsVideoById.js');
const getChannelById = require('../twitchApiRequests/getChannelById.js');
const getDiff = require('../preparingStreamers4Send/getDiff.js');
const getOnlineInfo = require('../preparingStreamers4Send/getOnlineInfo.js');
const getStreamInfo = require('../preparingStreamers4Send/getStreamInfo.js');
const getStreamsList = require('./getStreamsList.js');

let makeVideosList = (videosArr) => {
    let arr = [] ;  
    videosArr.map(video => arr.push({
        published_at: video.published_at,
        game: video.game,
        title: video.title,
        id: video._id,
        views: video.views,
        length: video.length
    }))
    return arr;
};

let getChannelDescriptionAndVideos = (streamerID, finObj) => {
    let descriptionObj = finObj.description;
    let videosArr = finObj.videos;
    return new Promise((resolve, reject) => {
        getChannelsVideoById(streamerID, 100)
        .then(data => {
            if (data._total) {
                let channelDescr = data.videos[0].channel;
                descriptionObj.logo = channelDescr.logo;
                descriptionObj.name = channelDescr.display_name;
                descriptionObj.followers.actual = channelDescr.followers;
                descriptionObj.views.actual = channelDescr.views;
                descriptionObj.totalVideos = data._total;
                videosArr = makeVideosList(data.videos);
            } else {
                getChannelById(streamerID)
                .then(channelDescr => {
                    descriptionObj.logo = channelDescr.logo;
                    descriptionObj.name = channelDescr.display_name;
                    descriptionObj.followers.actual = channelDescr.followers;
                    descriptionObj.views.actual = channelDescr.views;
                    descriptionObj.totalVideos = 0;
    
                    let videosStub = {
                        published_at: "",
                        game: "Видео скрыты для просмотра или еще не созданы",
                        title: "",
                        id: "",
                        views: "",
                        length: ""
                    };
                    videosArr = [videosStub];
                })
            };
            resolve();
        });
    });
};

module.exports = function getStreamer4Page(streamerFromDB) {
    let finalObj = {
        description: {
            logo: '',
            name: '',
            followers: {actual: '', diff: null, inDays: null},
            views: {actual: '', diff: null, inDays: null},
            totalVideos: 0,
            totalStreams: 0
        },
        videos: [],
        stream: null
    };
    return new Promise ((resolve, reject) => {
        Promise.all([
            getChannelDescriptionAndVideos(streamerFromDB.twitchID, finalObj),
            getStreamInfo(streamerFromDB.twitchID, finalObj),
            getStreamsList(streamerFromDB.twitchID, finalObj)
        ])
        .then(() => {
            finalObj.description.followers = getDiff('followers', finalObj.description.followers.actual, streamerFromDB);
            finalObj.description.views = getDiff('views', finalObj.description.views.actual, streamerFromDB);
            finalObj.description.totalStreams = finalObj.streams.length;
            getOnlineInfo(finalObj, streamerFromDB);
            resolve(finalObj)
        });
    })
    .catch(err => console.log(err));
};