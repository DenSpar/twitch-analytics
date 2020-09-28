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
                resolve()
            };
        })
    })
};

let getChannelsVideoByID = (numID, obj) => {
    return new Promise((resolve, reject) => {
        api.channels.videos({ channelID: numID, limit:10 }, (err, res) => {
            //найти видео канала(по номеру)
            if(err) {
                console.log(err);
            } else {
                // console.log('videos', res);
                obj.videos = res.videos;
                obj.totalVideos = res._total;
                resolve()
            };
        })
    })
};

let getStreamer = (numID) => {
    let streamer = {};
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

let getStreamersbyTeam = (team) => {
    return new Promise((resolve, reject) => {
        api.teams.getTeam({ team: team }, (err, res) => {
            // поиск team по имени
            if(err) {
                console.log(err);
            } else {
                let streamers = [];
                res.users.map((streamer) => {
                    let streamerOBJ = {
                        name: streamer.display_name,
                        id: streamer._id
                    };
                    streamers.push(streamerOBJ);
                    resolve(streamers);
                    return null
                });
                //console.log('team, srcData:', res, 'streamers: ', streamers);
            }
        });
    })
};

let filterDeadChannels = (channels) => {
    let onlyUndead = [];
    channels.map(channel => {
        if (
            channel.name !== undefined 
            && channel.logo !== undefined 
            && channel.id !== undefined
            && channel.followers !== undefined 
            ) {
            onlyUndead.push(channel);
        }
        return null
    })
    return onlyUndead
};

let getList = () => (
    new Promise ((resolve, reject) => (
        getStreamersbyTeam ('streamersalliance')
        .then(teamData => (
            Promise.all(
                teamData.map(channel => (getStreamer(channel.id)))
            )
        ))
        .then(allChannels => filterDeadChannels(allChannels))
        .then(onlyLiveChannels => resolve(onlyLiveChannels))        
    ))
    .catch(err => console.log(err))
);

export default getList;