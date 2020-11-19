const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js');

module.exports = function getStreamInfo(numID, obj) {
    return new Promise((resolve, reject) => {
        getStreamsChannelById(numID)
        .then(res => {
            obj.stream = res.stream;
            resolve()
        })
    })
};