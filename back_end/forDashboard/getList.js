const getStreamer4Dashboard = require('./getStreamer4Dashboard.js');
const formatedLog = require('../formatedLog.js');

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
            .then(onlyLiveChannels => resolve(onlyLiveChannels))        
        ))
        .catch(err => formatedLog(err, 'ERROR'))
    )
};