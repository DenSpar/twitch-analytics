const sendRequest = require('../sendRequest.js');
const clientId = require('./clientId.js').clientId;

module.exports = function getStreamsChannelById(streamerID) {
    let getChannelInfoURL = 'https://api.twitch.tv/kraken/streams/' + streamerID;
    let reqHeaders = {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-Id': clientId
    };
    return sendRequest('GET', getChannelInfoURL, null, reqHeaders)
};