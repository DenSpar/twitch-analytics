import React from 'react';
import sendRequest from 'js/sendRequest';
import recStreamStat from 'js/recStreamStat';
import getStreamer from 'js/twitchApiRequsts/getStreamer';

let getAccessToken = () => {
    // получение токена доступа
    let getAccessTokenURL = 'https://id.twitch.tv/oauth2/token?client_id=08i240lntql615wx8iozx8rq23krxr&client_secret=7h54c7iuzllmyvr02tw8ysyx5hplhi&grant_type=client_credentials';
    return sendRequest('POST', getAccessTokenURL)
};

const Dev = () => {
    let streamerID = 0;
    const subscribe = (event) => {
        event.preventDefault();

        if (streamerID !==0 ) {
            getAccessToken()
            .then(accessToken => {
                // подписаться на стримы
                let subscribeOnStreamURL = 'https://api.twitch.tv/helix/webhooks/hub';
                let reqHeaders = {
                    Authorization: 'Bearer ' + accessToken.access_token,
                    'Client-Id': '08i240lntql615wx8iozx8rq23krxr'
                };
                let reqBody = {
                    'hub.callback': 'https://stat.metacorp.gg/api/webhooks',
                    'hub.mode': 'subscribe',
                    'hub.topic': 'https://api.twitch.tv/helix/streams?user_id=' + streamerID,
                    'hub.lease_seconds': 300
                };
                sendRequest('POST', subscribeOnStreamURL, reqBody, reqHeaders)
                .then(r => {
                    console.log('req body: ', reqBody);
                    console.log('ответ от подписки: ', r);
                    streamerID = 0;
                });
            });
        } else {
          console.log('ID стримера не указан');
        };        
    };

    const getListSubs = () => {
        getAccessToken()
        .then(accessToken => {
            console.log('полученный токен: ', accessToken);
            // получить вебхук-подписки
            let getListSubsURL = 'https://api.twitch.tv/helix/webhooks/subscriptions';
            let reqHeaders = {
                Authorization: 'Bearer ' + accessToken.access_token,
                'Client-Id': '08i240lntql615wx8iozx8rq23krxr'
            };
            sendRequest('GET', getListSubsURL, null, reqHeaders)
            .then(r => console.log('ответ от подписки: ', r));
        });
    };

    const recHandler = (event) => {
        event.preventDefault();

        if (streamerID !==0 ) {
            recStreamStat(streamerID);
            streamerID = 0;
        } else {
            console.log('ID стримера не указан');
        }
    };

    const channelHandler = (event) => {
        event.preventDefault();

        if (streamerID !==0 ) {
            getStreamer(streamerID)
            .then(r => {
                console.log('инфо канала: ', r);
                streamerID = 0;
            });
        } else {
            console.log('ID стримера не указан');
        }
    };

    let reqURL = '';
    const submitHandlerAPI = (event) => {
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
        <p>отправить запрос на вебхук</p>
        <form onSubmit={subscribe}>            
            streamerID: <input type='textarea' onChange={event => streamerID = event.target.value} style={{ width: '350px' }} />
            <div className="flex">
                <div>
                    <p> 46947742(RIKKIDI) </p>
                    <p> 32536070(y0nd) </p>
                    <p> 63813769(pashadizel) </p>
                    <p> 148602448(MissAlina23) </p>
                    <p> 44442348(finargot) </p>
                    <p> 68950614(ybicanoooobov) </p>
                    <p> 40488774(Stray228) </p>
                    <p> 71558231(qSnake) </p>
                    <p> 136398715(Insize) </p>
                    <p> 81623587(GENSYXA) </p>
                </div>
                <div>
                    <p> 118970121(Denly) </p>
                    <p> 86277097(buster) </p>
                    <p> 195675197(steel) </p>
                    <p> 32184566(rxnexus) </p>
                    <p> 188890121(Dmitry_Lixxx) </p>
                    <p> 95793204(GN_GG) </p>
                    <p> 51435464(A1taOda) </p>
                    <p> 40974672(NekrPain) </p>
                    <p> 112619759(modestal) </p>
                    <p> 63828424(AIMLUL) </p>
                </div>
                <div>
                    <p> 36948149(TaeRss) </p>
                    <p> 118263259(CeMka) </p>
                    <p> 116780430(Spt083) </p>
                    <p> 39176452(XBOCT) </p>
                    <p> 451634552(egorkreed) </p>
                    <p> 68147611(ksun41k) </p>
                    <p> 62651386(GeneraL_HS_) </p>
                    <p> 230768385(follentass) </p>
                    <p> 218598381(SOSEDATEL) </p>
                </div>
            </div>
        </form>
        <br/>
        <br/>
        <br/>
        <p>получить список активных вебхуков</p>
        <button onClick={() => getListSubs()}>get</button>
        <br/>
        <br/>
        <br/>
        <br/><p>записать стату по стриму</p>
        <form onSubmit={recHandler}>            
            streamerID: <input type='textarea' onChange={event => streamerID = event.target.value} style={{ width: '350px' }}/>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/><p>тест получить инфо о канале</p>
        <form onSubmit={channelHandler}>            
            streamerID: <input type='textarea' onChange={event => streamerID = event.target.value} style={{ width: '350px' }}/>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>дернуть ручку на metacorp</p>
        <form onSubmit={submitHandlerAPI}>            
            <input type='textarea' onChange={event => reqURL = event.target.value} style={{ width: '350px' }}/>
            <p>https://stat.metacorp.gg/api/streamers - вернет список для дашборда</p>
            <p>https://stat.metacorp.gg/api/streamers/1234 - возвращает объект из коллекции БД</p>
            <p>https://stat.metacorp.gg/api/showlist - вернет коллекцию стримеров из БД</p>
            <p>https://stat.metacorp.gg/api/checkwebhooks - дернет ручку checkWebHooks</p>
        </form>
    </div>
)};

export default Dev;