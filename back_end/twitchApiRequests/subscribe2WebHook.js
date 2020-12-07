const sendRequest = require('../sendRequest.js');
const clientId = require('./clientId.js').clientId;
const getAccessToken = require('./getAccessToken.js');

module.exports = function subscribe2WebHook(streamerID, subTime = 864000) {
    return new Promise (function(resolve, reject) {
        getAccessToken()
        .then(accessToken => {
            // подписаться на стримы
            let subscribeOnStreamURL = 'https://api.twitch.tv/helix/webhooks/hub';
            let reqHeaders = {
                Authorization: 'Bearer ' + accessToken.access_token,
                'Client-Id': clientId
            };
            let reqBody = {
                'hub.callback': 'https://stat.metacorp.gg/api/webhooks',
                'hub.mode': 'subscribe',
                'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=' + streamerID,
                'hub.lease_seconds': subTime
            };
            sendRequest('POST', subscribeOnStreamURL, reqBody, reqHeaders)
            .then(subsRes => {
                let response = {};
                if (subsRes === 'запись успешно создана') {
                    response.message = 'Подписка на webhooks прошла успешно';
                    response.status = true;
                } else {
                    response.message = 'Не удалось подписаться на webhooks';
                    response.status = false;
                };
                console.log ('канал №' + streamerID + ' - ' + response.message);
                resolve(response);
            });
        });
    });
};