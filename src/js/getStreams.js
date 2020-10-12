var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';

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

export default getStreamsChannelByID;