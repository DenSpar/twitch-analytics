const sendRequest = require('../sendRequest.js');
const clientId = require('./clientId.js').clientId;

module.exports = function searchChannelByName(name, limit) {
    let getChannelInfoURL = 'https://api.twitch.tv/kraken/search/channels?query=' + name + '&limit=' + limit;
    let reqHeaders = {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-Id': clientId
    };
    return sendRequest('GET', getChannelInfoURL, null, reqHeaders)
};