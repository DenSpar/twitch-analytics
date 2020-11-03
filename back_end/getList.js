const getStreamer = require('./twitchApiRequests/getStreamer.js');

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

module.exports = function getList(list) {
    return (
        new Promise ((resolve, reject) => (
            Promise.all(
                list.map(channel => (getStreamer(channel.twitchID)))
            )
            .then(allChannels => filterDeadChannels(allChannels))
            .then(onlyLiveChannels => resolve(onlyLiveChannels))        
        ))
        .catch(err => console.log(err))
    )
};