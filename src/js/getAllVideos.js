var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';

let getAllChannelsVideoByID = (numID) => {
    return new Promise((resolve, reject) => {
        api.channels.videos({ channelID: numID, limit:100 }, (err, res) => {
            //найти видео канала(по номеру)
            if(err) {
                console.log(err);
            } else {
                // console.log('videos', res);
                resolve(res)
            };
        })
    })
    .catch(err => console.log(err));
};

export default getAllChannelsVideoByID;