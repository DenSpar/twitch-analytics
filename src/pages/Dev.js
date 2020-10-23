import React from 'react';
import sendRequest from 'js/sendRequest';

// clientID = '08i240lntql615wx8iozx8rq23krxr';
// ClientSecret = '7h54c7iuzllmyvr02tw8ysyx5hplhi'

// // this work
// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'https://id.twitch.tv/oauth2/token?client_id=08i240lntql615wx8iozx8rq23krxr&client_secret=7h54c7iuzllmyvr02tw8ysyx5hplhi&grant_type=client_credentials');
// xhr.responseType = 'json';
// xhr.onload = () => {
//   console.log(xhr.response)
// };
// xhr.send();
    
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.twitch.tv/helix')
// xhr.setRequestHeader('Authorization','Bearer <access token>');
// xhr.send()


// let hub = JSON.stringify({
//   callback: 'https://webhook.site/85d6762b-29ec-434f-9218-f236143376e8',
//   mode: 'subscribe',
//   topic: 'https://api.twitch.tv/helix/streams?user_id=39712840428',
//   lease_seconds: 10000
// });
// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'https://api.twitch.tv/helix/webhooks/hub');
// xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
// xhr.setRequestHeader('Client-ID','08i240lntql615wx8iozx8rq23krxr');
// xhr.send(hub);



const Dev = () => {
    const createServer = () => {
        const http = require('http');
        const url = require('url');
        const { parse } = require('querystring');

        http.createServer((request, response) => {
            console.log('server work');
            console.log('request.method ' + request.method); // !!!!
            if (request.method === 'GET') {
                // GET -> получить обработать
                let urlRequest = url.parse(request.url, true);
                console.log(urlRequest);
                // console.log(urlRequest.query.test); // ! GET Params
                // if (urlRequest.query.test % 2 == 0) {
                //     response.end('even');
                // }
                // response.end('odd');
            }
            else {
                // POST
                let body = '';
                request.on('data', chunk => {
                    body += chunk.toString();
                });
                request.on('end', () => {
                    console.log(body);
                    let params = parse(body);
                    console.log(params);
                    console.log(params.hi);
                    // response.end('ok');
                });
            };
        }).listen(3000);
    };

    const subscribe = () => {
        // получение токена доступа
        let getAccessTokenURL = 'https://id.twitch.tv/oauth2/token?client_id=08i240lntql615wx8iozx8rq23krxr&client_secret=7h54c7iuzllmyvr02tw8ysyx5hplhi&grant_type=client_credentials';
        sendRequest('POST', getAccessTokenURL)
        .then(accessToken => {
            console.log('полученный токен: ', accessToken);
            // попытка подписаться на стримы 95793204(GN_GG)
            let subscribeOnStreamURL = 'https://api.twitch.tv/helix/webhooks/hub';
            let subscribeOnStreamHeaders = {
                Authorization: 'Bearer ' + accessToken.access_token,
                'Client-Id': '08i240lntql615wx8iozx8rq23krxr'
            };
            let subscribeOnStreamBody = {
                'hub.callback': 'https://twitch-analytics-da42.web.app/',
                'hub.mode': 'subscribe',
                'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=95793204',
                'hub.lease_seconds': 10000
            };
            sendRequest('POST', subscribeOnStreamURL, subscribeOnStreamBody, subscribeOnStreamHeaders)
            .then(r => console.log('ответ от подписки: ', r));
        });
    };

    const requst2Server = () => {
        // получение токена доступа
        sendRequest('GET', 'http://80.249.151.190:8080/?test=from_local_host');
    };

    return (
    <div>
        <button onClick={() => createServer()}>create server</button>
        <button onClick={() => subscribe()}>subscribe</button>
        <button onClick={() => requst2Server()}>get requst to server</button>
    </div>
)};

export default Dev;