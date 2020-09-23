var api = require('twitch-api-v5');

api.clientID = '08i240lntql615wx8iozx8rq23krxr';

//пример
// api.users.userByID({ userID: '12826' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test: userByID', res);
//     /* Example response
//       {
//         display_name: 'Twitch',
//         _id: '12826',
//         name: 'twitch',
//         type: 'user',
//         ...
//       }
//     */
//   }
// });


// api.search.channels({ query: 'Domontovich' }, (err, res) => {
//     // поиск каналов по имени
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('search.channel', res);
//     }
// });

let getChannelByID = (numID, obj) => {
    return new Promise((resolve, reject) => {
        api.channels.channelByID({ channelID: numID }, (err, res) => {
            //поиск канала по номеру
            if(err) {
                console.log(err);
            } else {
                obj.id = res._id;
                obj.name = res.display_name;
                obj.logo = res.logo;
                obj.followers = res.followers;
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

let getList = (channelsID) => {
    return new Promise ((resolve, reject) => {
        Promise.all(
            channelsID.map(channelID => (getStreamer(channelID)))
        )
        .then((channelsArr) => resolve(channelsArr));
    });
};

export default getList;