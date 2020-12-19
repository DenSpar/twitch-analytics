const sendRequest = require('../sendRequest.js');
const clientId = require('./clientId.js').clientId;
const getAccessToken = require('./getAccessToken.js');

const formatedLog = require('../formatedLog.js');

module.exports = function unsubscribeOfWebHook(streamerID) {
    return new Promise (function(resolve, reject) {
        getAccessToken()
        .then(accessToken => {
            let subscribeOnStreamURL = 'https://api.twitch.tv/helix/webhooks/hub';
            let reqHeaders = {
                Authorization: 'Bearer ' + accessToken.access_token,
                'Client-Id': clientId
            };
            let reqBody = {
                'hub.callback': 'https://stat.metacorp.gg/api/webhooks',
                'hub.mode': 'unsubscribe',
                'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=' + streamerID,
                'hub.lease_seconds': 0
            };
            sendRequest('POST', subscribeOnStreamURL, reqBody, reqHeaders)
            .then(subsRes => {
                let response = {};
                if (subsRes === 'запись успешно создана') {
                    response.message = 'Отписка от webhooks прошла успешно';
                    response.status = true;
                } else {
                    response.message = 'Не удалось отписаться от webhooks';
                    response.status = false;
                };
                formatedLog('канал №' + streamerID + ' - ' + response.message, 'INFO');
                resolve(response);
            });
        });
    });
};