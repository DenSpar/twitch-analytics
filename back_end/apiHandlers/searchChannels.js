const searchChannelbyName = require('../twitchApiRequests/searchChannelByName.js');

module.exports = function searchChannels(name, limit) {
    return new Promise (function(resolve, reject) {
        searchChannelbyName(name, limit)
        .then(data => {
            let obj = {
                total = data._total,
                channels: []
            };
            data.channels.map(channel => {
                let newChannel = {
                    followers: channel.followers,
                    name: channel.name,
                    twitchID: channel._id,
                    views: channel.views,
                    logo: channel.logo,
                    description: channel.description
                };
                obj.channels.push(newChannel);
            })
            resolve(obj)
        })
    })
};