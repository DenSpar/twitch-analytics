import React from 'react';
import sendRequest from 'js/sendRequest';

// clientID = '08i240lntql615wx8iozx8rq23krxr';
// ClientSecret = '7h54c7iuzllmyvr02tw8ysyx5hplhi'

// рабочий код для отправки заявки на вебхук
/*
    // // рабочий код для отправки заявки на вебхук
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
*/

const Dev = () => {
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
                // 'hub.callback': 'https://webhook.site/31065a78-5e81-40d8-a18a-4fe66f6d9f43',
                'hub.callback': 'https://stat.metacorp.gg/api/webhooks',
                'hub.mode': 'subscribe',
                'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=95793204',
                'hub.lease_seconds': 10000
            };
            sendRequest('POST', subscribeOnStreamURL, subscribeOnStreamBody, subscribeOnStreamHeaders)
            .then(r => console.log('ответ от подписки: ', r));
        });
    };

    let reqURL = '';

    const submitHandler = (event) => {
        event.preventDefault();
    
        if (reqURL.trim()) {
            sendRequest('GET', reqURL)
            .then(response => console.log(response));
        } else {
          console.log('реквест не введен');
        }
      }; 

    return (
    <div>
        <h1>LOCAL HOST</h1>
        <p>отправить запрос на вебхук</p>
        <button onClick={() => subscribe()}>subscribe</button>
        <br/>
        <br/>
        <br/>

        <p>дернуть ручку</p>
        <form onSubmit={submitHandler}>            
            <input type='textarea' onChange={event => reqURL = event.target.value} />
            <p>https://stat.metacorp.gg/api/streamers - вернет список стримеров</p>
            <p>https://stat.metacorp.gg//api/streamer/1234 - пока возвращает 1234</p>
        </form>
    </div>
)};

export default Dev;