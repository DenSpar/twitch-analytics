const getStreamsChannelById = require('../twitchApiRequests/getStreamsChannelById.js');
const splitNumbers = require('./splitNumbers.js');

module.exports = function getStreamInfo(numID, obj) {
    return new Promise((resolve, reject) => {
        getStreamsChannelById(numID)
        .then(res => {
            if (res.stream) {
                let viewers = splitNumbers(res.stream.viewers);
                obj.stream = {viewers: viewers};
            } else { obj.stream = res.stream };
            resolve()
        })
    })
};