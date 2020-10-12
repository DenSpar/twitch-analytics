var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';

let getChannelByID = (numID, obj) => {
    return new Promise((resolve, reject) => {
        api.channels.channelByID({ channelID: numID }, (err, res) => {
            //поиск канала по номеру
            if(err) {
                console.log(err);
            } else {
                // console.log('channel', res);
                obj.id = res._id;
                obj.name = res.display_name;
                obj.logo = res.logo;
                obj.followers = res.followers;
                obj.views = res.views;
                obj.description = res.description;
                resolve()
            };
        })
    })
};

let getStreamsChannelByID = (numID, obj) => {
    return new Promise((resolve, reject) => {
        api.streams.channel({ channelID: numID }, (err, res) => {
            //проверка, если канал(по номеру) сейчас стримит
            if(err) {
                console.log(err);
            } else {
                // console.log('stream', res);
                obj.stream = res.stream;
                resolve(obj)
            };
        })
    })
};

let getChannelsVideoByID = (numID, obj) => {
    return new Promise((resolve, reject) => {
        api.channels.videos({ channelID: numID, limit:1 }, (err, res) => {
            //найти видео канала(по номеру)
            if(err) {
                console.log(err);
            } else {
                // console.log('videos', res);
                obj.lastVideo = res.videos[0];
                obj.totalVideos = res._total;
                resolve()
            };
        })
    })
};

let getStreamer = (numID) => {
    let streamer = {stream: false};
    return new Promise ((resolve, reject) => {
        Promise.all([
            getChannelByID(numID, streamer),
            getStreamsChannelByID(numID, streamer),
            getChannelsVideoByID(numID, streamer)
        ])
        .then(() => resolve(streamer));
    })
    .catch(err => console.log(err));
};

export default getStreamer;