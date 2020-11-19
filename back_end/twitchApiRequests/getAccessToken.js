const sendRequest = require('../sendRequest.js');
const clientId = require('./clientId.js').clientId;
const clientSecret = require('./clientId.js').clientSecret

module.exports = function getAccessToken() {
    // получение токена доступа
    let getAccessTokenURL = 'https://id.twitch.tv/oauth2/token?client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=client_credentials';
    return sendRequest('POST', getAccessTokenURL)
};