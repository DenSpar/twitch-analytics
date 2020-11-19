const sendRequest = require('../sendRequest.js');
const clientId = require('./clientId.js').clientId;

module.exports = function getChannelsVideoById(streamerID, limit = 10) {
    let getChannelInfoURL = 'https://api.twitch.tv/kraken/channels/' + streamerID + '/videos?limit=' + limit;
    let reqHeaders = {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-Id': clientId
    };
    return sendRequest('GET', getChannelInfoURL, null, reqHeaders)
};