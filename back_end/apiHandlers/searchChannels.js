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
                    name: channel.name,
                    twitchID: String(channel._id),
                    logo: channel.logo,
                    description: channel.description
                };
                if (channel.followers) { newChannel.followers = splitNumbers(channel.followers); }
                else { newChannel.followers = "0"; };
                if (channel.views) { newChannel.views = splitNumbers(channel.views); }
                else { newChannel.views = "0"; };

                obj.channels.push(newChannel);
            })
            resolve(obj);
        })
    })
};