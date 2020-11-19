const getStreamer4Dashboard = require('./getStreamer4Dashboard.js');

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

module.exports = function getList(listFromDB) {
    return (
        new Promise ((resolve, reject) => (
            Promise.all(
                listFromDB.map(channel => (getStreamer4Dashboard(channel)))
            )
            .then(allChannels => filterDeadChannels(allChannels))
            .then(onlyLiveChannels => {
                onlyLiveChannels.map(channel => {
                    delete channel.lastVideo;
                    delete channel.description;
                });
                resolve(onlyLiveChannels)
            })        
        ))
        .catch(err => console.log(err))
    )
};