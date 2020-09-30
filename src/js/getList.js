import getStreamer from 'js/getStreamer';

//delete
var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';
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