const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js');
const recStreamStat = require('../recStreamStat/recStreamStat.js');
const alreadyExistStream = require('../apiHandlers/alreadyExistStream.js');

const formatedLog = require('../formatedLog.js');

module.exports = function checkAndRecStream (channelID) {
    return new Promise (function(resolve, reject) {
        getStreamsChannelById(channelID)
        .then(isStream => {
            let response = {};
            if (isStream.stream) {
                let newStream = {
                    streamerID: channelID,
                    streamID: isStream.stream._id,
                    streamerName: isStream.stream.channel.name,
                    title: isStream.stream.channel.status
                };
                
                alreadyExistStream(newStream)
                    .then(isStreamExist => {
                        if(isStreamExist) {
                            response.message = 'На канале №' + channelID + ' идет стрим, но запись статистики была запущенна ранее';
                            response.status = true;
                        } else {
                            recStreamStat(newStream);
                            response.message = 'На канале №' + channelID + ' идет стрим - запущена запись статистики';
                            response.status = true;
                        };
                        formatedLog(response.message, 'INFO');
                        resolve(response);
                    })
            } else {
                response.message = 'На канале №' + channelID + ' стрим не идет';
                response.status = false;
                
                resolve(response);
            };
        })
    });
};