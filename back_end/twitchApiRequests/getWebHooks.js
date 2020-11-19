const sendRequest = require('../sendRequest.js');
const clientId = require('./clientId.js').clientId;
const getAccessToken = require('./getAccessToken.js');

module.exports = function getWebHooks() {
    return new Promise (function(resolve, reject) {
        getAccessToken()
        .then(accessToken => {
            // получить вебхук-подписки
            let getListSubsURL = 'https://api.twitch.tv/helix/webhooks/subscriptions?first=100';
            let reqHeaders = {
                Authorization: 'Bearer ' + accessToken.access_token,
                'Client-Id': clientId
            };
            sendRequest('GET', getListSubsURL, null, reqHeaders)
            .then(subs => resolve(subs))
        })
    });
};