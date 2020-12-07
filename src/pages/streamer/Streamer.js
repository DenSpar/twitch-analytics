import React, {Fragment, useState, useEffect} from 'react';
import './streamer.css';
import StreamerTable from 'components/table/StreamerTable';
import Preloader from 'components/preloader/Preloader';
import OnAir from 'components/onAir/OnAir';
import IsClosed from 'components/isClosed/IsClosed';
import sendRequest from 'js/sendRequest';
import greenOrRedDiff from 'js/greenOrRedDiff';
import Return2Dashbord from 'components/return2Dashbord/Return2Dashbord';

let denly = {
    "description":{"isClosed":false,"logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/2ceffe1a-95cd-4928-aa90-d429346ce70c-profile_image-300x300.png","name":"y0nd","followers":{"actual":"2 475 237","diff":"-22 498","inDays":"за 7 д."},"views":{"actual":"84 596 294","diff":"+2 263 237","inDays":"за 28 д."},"totalVideos":42,"totalStreams":12,"onlineViewers":{"max":"1 110","middle":"455","inDays":"за 30 д."}},"videos":[{"published_at":"13.10.2020 23:19:25","game":"Minecraft","title":"Тестовая экскурсия в Майнкрафте :) РОДИНА МАТЬ! Культурное наследние","id":"v769468484","views":"4 381","length":"0:51:56","url":"https://www.twitch.tv/videos/769468484"},{"published_at":"06.10.2020 20:59:40","game":"Just Chatting","title":"ФИНАЛ РОЗЫГРЫША МОНИКОВ ОТ LG: оглашение победителей!","id":"v762459112","views":"4 983","length":"0:45:20"}],"stream":{"viewers":"519"},"streams":[{"maxViewers":"592","stream":{"created_at":"17.11.2020 17:47:35","length":"3:12:32"},"record":{"start_at":"17.11.2020 17:49:06","length":"3:11:00"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40021158204,"notes":[],"minutes1Viewer":1,"midViewers":"416","med50Viewers":"456"},{"maxViewers":"803","stream":{"created_at":"17.11.2020 09:54:03","length":"3:51:32"},"record":{"start_at":"17.11.2020 13:39:32","length":"0:06:03"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40018253212,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"726","med50Viewers":"803"},{"maxViewers":"1 110","stream":{"created_at":"16.11.2020 14:28:12","length":"6:00:30"},"record":{"start_at":"16.11.2020 19:57:31","length":"0:31:11"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40007187340,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"1 049","med50Viewers":"1 045"}]
};
let closedChannel = {
    "description":{"logo":null,"name":"modestal","followers":{"lastValue":"384 929","date":"29.11.2020"},"views":{"lastValue":"20 909 227","date":"29.11.2020"},"totalVideos":0,"totalStreams":11,"url":null,"onlineViewers":{"max":"35 726","middle":null,"inDays":"за 14 д."},"isClosed":true},"videos":[{"published_at":"","game":"Видео скрыты для просмотра или еще не созданы","title":"","id":"","views":"","length":""}],"stream":null,"streams":[{"maxViewers":"8 883","stream":{"created_at":"29.11.2020 19:59:15","length":"3:36:23"},"record":{"start_at":"29.11.2020 20:00:35","length":"3:35:03"},"games":["Just Chatting"],"title":"ЕЩЁ ЖИВЕМ,ДВА ПОДБИТЫХ ГОЛУБЯ /НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40175823932,"notes":[],"minutes1Viewer":2,"midViewers":"7 936","med50Viewers":"8 051"},{"maxViewers":"10 245","stream":{"created_at":"28.11.2020 20:00:54","length":"3:10:42"},"record":{"start_at":"28.11.2020 20:01:39","length":"3:09:56"},"games":["Just Chatting"],"title":"ЧЕМПИОНАТ РОФЛОВ, МЫ НА КАРИБАХ (там где снимали \"Пираты Карибского моря\") /НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40162078252,"notes":[],"minutes1Viewer":2,"midViewers":"8 477","med50Viewers":"8 588"},{"maxViewers":"10 053","stream":{"created_at":"27.11.2020 20:00:55","length":"3:58:35"},"record":{"start_at":"27.11.2020 20:02:21","length":"3:57:09"},"games":["Just Chatting"],"title":"ПОДГОТОВИЛИ ПОДАРОК ДЛЯ ЧАТА, В ОЖИДАНИИ ЧУДА /НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40148249388,"notes":[],"minutes1Viewer":2,"midViewers":"7 712","med50Viewers":"7 527"},{"maxViewers":"10 849","stream":{"created_at":"25.11.2020 19:58:25","length":"3:08:44"},"record":{"start_at":"25.11.2020 19:59:13","length":"3:07:55"},"games":["Just Chatting"],"title":"КУКИНГ С ДВУМЯ ДУБИЛАМИ+БАЛЛЫ /НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40126883180,"notes":[],"minutes1Viewer":3,"midViewers":"9 207","med50Viewers":"9 519"},{"maxViewers":"1 259","stream":{"created_at":"24.11.2020 19:59:51","length":"0:02:56"},"record":{"start_at":"24.11.2020 20:00:45","length":"0:02:01"},"games":["Just Chatting"],"title":"МОЛОДЕЖНОЕ ДВИЖЕНИЕ, СТОП КРИНЖ /НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40116332940,"notes":[],"minutes1Viewer":2,"midViewers":null,"med50Viewers":null},{"maxViewers":"9 684","stream":{"created_at":"22.11.2020 20:00:54","length":"3:21:46"},"record":{"start_at":"22.11.2020 20:01:39","length":"3:21:01"},"games":["Just Chatting"],"title":"ЗАПИСЫВАЕМ КЕЙ ПОП В ПРЯМОМ ЭФИРЕ /НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40094606956,"notes":[],"minutes1Viewer":2,"midViewers":"6 287","med50Viewers":"6 350"},{"maxViewers":"9 951","stream":{"created_at":"21.11.2020 20:00:42","length":"2:52:30"},"record":{"start_at":"21.11.2020 20:02:20","length":"2:50:52"},"games":["Just Chatting"],"title":"УМНЫЕ ОЛЕМПИЙСКИЕ ИГРЫ /НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40079838588,"notes":[],"minutes1Viewer":2,"midViewers":"8 512","med50Viewers":"8 668"},{"maxViewers":"35 726","stream":{"created_at":"20.11.2020 20:03:03","length":"3:34:52"},"record":{"start_at":"20.11.2020 20:04:50","length":"3:33:04"},"games":["Just Chatting"],"title":"ДОДЕЛАЛИ СТРИМЕРСКУЮ И СЛУШАЕМ  НОВЫЙ ТРЕК https://band.link/JbRTK ","streamID":40063714316,"notes":[],"minutes1Viewer":2,"midViewers":"10 853","med50Viewers":"8 082"},{"maxViewers":"9 964","stream":{"created_at":"18.11.2020 20:00:08","length":"2:54:40"},"record":{"start_at":"18.11.2020 20:00:54","length":"2:53:53"},"games":["Just Chatting"],"title":"ИНТЕРАКТИВЫ ЗА БАЛЛЫ МОДЕСТАЛ /НОВЫЙ ТРЕК https://band.link/hm7qH / Мерч: https://modestal.shop","streamID":40036329724,"notes":[],"minutes1Viewer":2,"midViewers":"8 592","med50Viewers":"8 947"},{"maxViewers":"11 194","stream":{"created_at":"17.11.2020 20:01:20","length":"3:44:58"},"record":{"start_at":"17.11.2020 20:02:06","length":"3:44:11"},"games":["Just Chatting"],"title":"ЧЕЛЕНДЖ: СТРОИМ СКВОРЕЧНИКИ НА ЗИМУ СНЕГИРЯМ /НОВЫЙ ТРЕК https://band.link/hm7qH / Мерч: https://modestal.shop","streamID":40023059244,"notes":[],"minutes1Viewer":2,"midViewers":"9 239","med50Viewers":"9 786"},{"maxViewers":"8 873","stream":{"created_at":"16.11.2020 20:01:26","length":"2:47:18"},"record":{"start_at":"16.11.2020 20:02:50","length":"2:45:53"},"games":["Just Chatting"],"title":"ЧЕЛЕНДЖ: СТРОИМ СКВОРЕЧНИКИ НА ЗИМУ СНЕГИРЯМ /НОВЫЙ ТРЕК https://band.link/hm7qH / Мерч: https://modestal.shop","streamID":40010465660,"notes":[],"minutes1Viewer":2,"midViewers":"7 438","med50Viewers":"7 672"}]
};

const StreamerDescription = ({streamer, onAir}) => {
    if(Object.keys(streamer).length === 0) {return null} 
    else return (
        <div className="block contentSizeBlock">
            <div className="flex streamer_container">
                <div className="streamerLogo_container">
                    {
                        !streamer.isClosed
                        ? <img className="streamerLogo" src={streamer.logo} alt={streamer.name}/>
                        : <div className="streamerLogo" />
                    }
                    <div className="onAir_container">
                        <OnAir stream={onAir} />
                        <IsClosed isClosed={streamer.isClosed} />
                    </div>
                </div>
                <div className="streamerDescription_container">
                    <div className="flex wideBlock">
                        <p className="streamerName">{streamer.name}</p>
                        {streamer.url && 
                            <a className="channelLink defaultLink"
                            href={streamer.url}
                            target="_blank"
                            rel="noreferrer noopener">
                                на канал
                            </a>
                        }
                    </div>
                    <div className="streamerDescription_column">                    
                        <div className="streamerDescription">подписчиков:
                            <div className="streamerDescription_valueColumn">
                                {
                                    !streamer.isClosed
                                    ? (<Fragment>
                                        <span className="streamerDescription_value">{streamer.followers.actual}</span>
                                        {streamer.followers.diff && streamer.followers.diff.length > 1 && (
                                            <span className={greenOrRedDiff("streamerDescription_valueDiff", streamer.followers.diff)}>
                                                {streamer.followers.diff + ' ' + streamer.followers.inDays}
                                            </span>
                                        )}
                                    </Fragment>)
                                    : (<Fragment>
                                        <span className="streamerDescription_value">{streamer.followers.lastValue}</span>
                                        <span className="streamerDescription_valueDiff">
                                            {streamer.followers.date}
                                        </span>
                                    </Fragment>)
                                }
                            </div>
                        </div>
                        {/* <div className="streamerDescription">просмотров:
                            <div className="streamerDescription_valueColumn">
                                <span className="streamerDescription_value">{streamer.views.actual}</span>
                                <span className="streamerDescription_valueDiff">{streamer.views.diff + ' ' + streamer.views.inDays}</span>
                            </div>
                        </div> */}
                        <p className="streamerDescription">
                            видео в архиве: <span className="streamerDescription_value">{streamer.totalVideos}</span>
                        </p>
                        <p className="streamerDescription">
                            стримов записано: <span className="streamerDescription_value">{streamer.totalStreams}</span>
                        </p>
                    </div>
                    <div className="streamerDescription_column">
                        <div className="streamerDescription_onlinesContainer">
                            <p className="streamerDescription">онлайн-зрителей
                                {streamer.onlineViewers.inDays && 
                                    <span>&nbsp;{streamer.onlineViewers.inDays}</span>
                                }
                                :
                            </p>
                            <p className="streamerDescription leftMargin">
                                макс.:<span className="streamerDescription_value">{streamer.onlineViewers.max}</span>
                            </p>
                            <p className="streamerDescription leftMargin">
                                среднее:<span className="streamerDescription_value">{streamer.onlineViewers.middle}</span>
                            </p>
                        </div>
                        {onAir && 
                            <p className="streamerDescription">
                                сейчас смотрят: <span className="streamerDescription_value">
                                    {onAir.viewers}
                                </span>
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

let nowURL = new URL(window.location.href);
const streamerID = nowURL.searchParams.get('streamerID');

const Streamer = () => {
    const [streamer, setStreamer] = useState({});
    const [videos, setVideos] = useState([]);
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onAir, setOnAir] = useState(false);

    //delete
        // eslint-disable-next-line
        let testStreamer = () => {
            console.log('denly', denly);
            setTimeout(() => {
                setStreamer(denly.description);
                setLoading(false);
                document.title = denly.description.name;
                
                setTimeout(() => {
                    setVideos(denly.videos)
                    setStreams(denly.streams)
                    setOnAir(denly.stream)
                }, 1000)
            }, 2000);
        };
    //delete
        let testClosedChannel = () => {
            console.log('closedChannel', closedChannel);
            setTimeout(() => {
                setStreamer(closedChannel.description);
                setLoading(false);
                document.title = closedChannel.description.name;
                
                setTimeout(() => {
                    setVideos(closedChannel.videos)
                    setStreams(closedChannel.streams)
                    setOnAir(closedChannel.stream)
                }, 1000)
            }, 2000);
        };

    useEffect(() => {
        setLoading(true);
        // удалить условие
        if (nowURL.hostname === 'localhost') {
            console.log ('на localhost');
            // testStreamer();
            testClosedChannel();
        } else {
            sendRequest('GET', 'https://stat.metacorp.gg/api/streamers/' + streamerID)
            .then(streamer => {
                setStreamer(streamer.description);
                setVideos(streamer.videos);
                setStreams(streamer.streams);
                setOnAir(streamer.stream);
                setLoading(false);
                document.title = streamer.description.name;
            })
        };
    }, []);

    return(
        <Fragment>
            <Return2Dashbord />
            {loading && <Preloader />}
            <StreamerDescription streamer={streamer} onAir={onAir} />
            <StreamerTable videos={videos} streams={streams} onAir={onAir} views={streamer.views}/>
        </Fragment>
    );
};

export default Streamer;