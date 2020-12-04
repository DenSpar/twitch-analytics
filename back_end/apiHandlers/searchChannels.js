const searchChannelbyName = require('../twitchApiRequests/searchChannelByName.js');
const splitNumbers = require('../preparingStreamers4Send/splitNumbers.js');

module.exports = function searchChannels(name, limit=10) {
    return new Promise (function(resolve, reject) {
        searchChannelbyName(name, limit)
        .then(searchRes => {
            let obj = {
                total: searchRes._total,
                channels: []
            };
            searchRes.channels.map(channel => {
                let newChannel = {
                    followers: splitNumbers(channel.followers),
                    name: channel.name,
                    twitchID: String(channel._id),
                    views: splitNumbers(channel.views),
                    logo: channel.logo,
                    description: channel.description
                };
                obj.channels.push(newChannel);
            })
            resolve(obj);
            // resolve({searchRes: searchRes});
        })
    })
};