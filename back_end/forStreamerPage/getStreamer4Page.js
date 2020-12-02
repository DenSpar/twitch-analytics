const getChannelsVideoById = require('../twitchApiRequests/getChannelsVideoById.js');
const getChannelById = require('../twitchApiRequests/getChannelById.js');
const getDiff = require('../preparingStreamers4Send/getDiff.js');
const getOnlineInfo = require('../preparingStreamers4Send/getOnlineInfo.js');
const getStreamInfo = require('../preparingStreamers4Send/getStreamInfo.js');
const getStreamsList = require('./getStreamsList.js');
const videoTimeConverter = require('../videoTimeConverter.js');
const splitNumbers = require('../preparingStreamers4Send/splitNumbers.js');
const dateConverter = require('./dateConverter.js');
const getInfo4ClosedChannel = require('../preparingStreamers4Send/getInfo4ClosedChannel.js');

let makeVideosList = (videosArr) => {
    let arr = [] ;  
    videosArr.map(video => arr.push({
        published_at: dateConverter(video.published_at),
        game: video.game,
        title: video.title,
        id: video._id,
        views: splitNumbers(video.views),
        length: videoTimeConverter(video.length),
        url: video.url
    }));
    return arr;
};

let getChannelDescriptionAndVideos = (streamerID, finObj) => {
    let descriptionObj = finObj.description;
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
                descriptionObj.url = channelDescr.url
                finObj.videos = makeVideosList(data.videos);
                resolve();
            } else {
                getChannelById(streamerID)
                .then(channelDescr => {
                    if (channelDescr) {
                        descriptionObj.logo = channelDescr.logo;
                        descriptionObj.name = channelDescr.display_name;
                        descriptionObj.followers.actual = channelDescr.followers;
                        descriptionObj.views.actual = channelDescr.views;
                        descriptionObj.totalVideos = 0;
                        descriptionObj.url = channelDescr.url;
                        descriptionObj.isClosed = false;
                    } else {
                        descriptionObj.totalVideos = 0;
                        descriptionObj.url = null;
                        descriptionObj.isClosed = true;
                    };
    
                    let videosStub = {
                        published_at: "",
                        game: "Видео скрыты для просмотра или еще не созданы",
                        title: "",
                        id: "",
                        views: "",
                        length: ""
                    };
                    finObj.videos = [videosStub];
                    resolve();
                })
            };
        });
    });
};

module.exports = function getStreamer4Page(streamerFromDB) {
    let finalObj = {
        description: {
            logo: '',
            name: '',
            followers: {},
            views: {},
            totalVideos: 0,
            totalStreams: 0,
            url: null
        },
        videos: [],
        stream: null
    };
    finalObj.description.onlineViewers = getOnlineInfo(streamerFromDB);
    return new Promise ((resolve, reject) => {
        Promise.all([
            getChannelDescriptionAndVideos(streamerFromDB.twitchID, finalObj),
            getStreamInfo(streamerFromDB.twitchID, finalObj),
            getStreamsList(streamerFromDB.twitchID, finalObj)
        ])
        .then(() => {
            if (!finalObj.description.isClosed) {
                finalObj.description.followers = getDiff('followers', finalObj.description.followers.actual, streamerFromDB);
                finalObj.description.views = getDiff('views', finalObj.description.views.actual, streamerFromDB);
            } else {
                getInfo4ClosedChannel(streamerFromDB, finalObj.description);
            };
            
            finalObj.description.totalStreams = finalObj.streams.length;
            resolve(finalObj)
        });
    })
    .catch(err => console.log(err));
};