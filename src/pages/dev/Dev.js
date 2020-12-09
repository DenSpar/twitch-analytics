import React from 'react';
import './dev.css';
import sendRequest from 'js/sendRequest';
import Return2Dashbord from 'components/return2Dashbord/Return2Dashbord';
import ApiButton from './components/ApiButton';
import ApiButtonAndForm from './components/ApiButtonAndForm';
import ApiDeleteForm from './components/ApiDeleteForm';

const Dev = () => {
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
        <Return2Dashbord />
        <div className="flex devContainer devContainer_column">
            <p>дернуть ручку на metacorp</p>
            <div className="flex">
                <div className="flex devContainer_column" style={{ width: '200px' }}>
                    <ApiButton request={"список для дашборда"} apiURL={"https://stat.metacorp.gg/api/streamers"}></ApiButton>
                    <ApiButton request={"проверка вебхуков"} apiURL={"https://stat.metacorp.gg/api/checkwebhooks"} />
                </div>
                <div className="flex devContainer_column" style={{ width: '200px' }}>
                    <ApiButton request={"коллекция стримеров"} apiURL={"https://stat.metacorp.gg/api/showlist"} />
                    <ApiButton request={"коллекция статистик"} apiURL={"https://stat.metacorp.gg/api/showstats"} />
                    <ApiButton request={"коллекция текущих стримов"} apiURL={"https://stat.metacorp.gg/api/showlives"} />
                </div>
            </div>
            <ApiButtonAndForm request={"получить стример для дашборда, по айди стримера:"}
            apiURL={"https://stat.metacorp.gg/api/streamers/"} />
            <ApiButtonAndForm request={"подписаться на вебхуки по стримам, по айди стримера:"}
            apiURL={"https://stat.metacorp.gg/api/subwebhook/"} />

            <ApiDeleteForm request={"удалит стрим № из коллекции стримов, по айди стрима:"}
            apiURL={"https://stat.metacorp.gg/api/deletestream"}/>
            <ApiDeleteForm request={"тотальное удаление стримера из всех БД, по айди стримера:"}
            apiURL={"https://stat.metacorp.gg/api/totaldel"}/>

            <form className="ApiButtonAndForm"onSubmit={submitHandlerAPI}>
                <p className="noMargin">полный url запроса:</p>
                <input type='textarea' onChange={event => reqURL = event.target.value} style={{ width: '350px' }}/>
            </form>
        </div>
        <div className="flex devContainer">
            <div className="devContainer_column">
                <p className="streamerList_item"> 46947742(RIKKIDI) </p>
                <p className="streamerList_item"> 32536070(y0nd) </p>
                <p className="streamerList_item"> 63813769(pashadizel) </p>
                <p className="streamerList_item"> 148602448(MissAlina23) </p>
                <p className="streamerList_item"> 44442348(finargot) </p>
                <p className="streamerList_item"> 68950614(ybicanoooobov) </p>
                <p className="streamerList_item"> 40488774(Stray228) </p>
                <p className="streamerList_item"> 71558231(qSnake) </p>
                <p className="streamerList_item"> 136398715(Insize) </p>
                <p className="streamerList_item"> 81623587(GENSYXA) </p>
            </div>
            <div className="devContainer_column">
                <p className="streamerList_item"> 118970121(Denly) </p>
                <p className="streamerList_item"> 86277097(buster) </p>
                <p className="streamerList_item"> 195675197(steel) </p>
                <p className="streamerList_item"> 32184566(rxnexus) </p>
                <p className="streamerList_item"> 188890121(Dmitry_Lixxx) </p>
                <p className="streamerList_item"> 95793204(GN_GG) </p>
                <p className="streamerList_item"> 51435464(A1taOda) </p>
                <p className="streamerList_item"> 40974672(NekrPain) </p>
                <p className="streamerList_item"> 112619759(modestal) </p>
                <p className="streamerList_item"> 63828424(AIMLUL) </p>
            </div>
            <div className="devContainer_column">
                <p className="streamerList_item"> 36948149(TaeRss) </p>
                <p className="streamerList_item"> 118263259(CeMka) </p>
                <p className="streamerList_item"> 116780430(Spt083) </p>
                <p className="streamerList_item"> 39176452(XBOCT) </p>
                <p className="streamerList_item"> 451634552(egorkreed) </p>
                <p className="streamerList_item"> 68147611(ksun41k) </p>
                <p className="streamerList_item"> 62651386(GeneraL_HS_) </p>
                <p className="streamerList_item"> 230768385(follentass) </p>
                <p className="streamerList_item"> 218598381(SOSEDATEL) </p>
            </div>
        </div>
    </div>
)};

export default Dev;