const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js');
const recStreamStat = require('../recStreamStat/recStreamStat.js');
const addLiveStream = require('../collectionLiveStreams/addLiveStream.js');

module.exports = function checkAndRecStream (channelID) {
    return new Promise (function(resolve, reject) {
        getStreamsChannelById(channelID)
        .then(isStream => {
            if (isStream.stream) {
                let newStream = {
                    streamerID: channelID,
                    streamID: isStream.stream._id,
                    streamerName: isStream.stream.channel.name,
                    title: isStream.stream.channel.status
                };
                addLiveStream(newStream);
                recStreamStat(newStream);
                resolve('идет стрим, запущена запись статы');
            } else {
                resolve('стрим не идет');
            };
        })
    });
};