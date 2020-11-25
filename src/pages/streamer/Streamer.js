import React, {Fragment, useState, useEffect} from 'react';
import './streamer.css';
import StreamerTable from 'components/table/StreamerTable';
import Preloader from 'components/preloader/Preloader';
import OnAir from 'components/onAir/OnAir';
import sendRequest from 'js/sendRequest';

let denly = {
    "description":{"logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/2ceffe1a-95cd-4928-aa90-d429346ce70c-profile_image-300x300.png","name":"y0nd","followers":{"actual":"2 475 237","diff":"+22 498","inDays":"за 7 д."},"views":{"actual":"84 596 294","diff":"+2 263 237","inDays":"за 28 д."},"totalVideos":42,"totalStreams":12,"onlineViewers":{"max":"1 110","middle":"455","inDays":"за 30 д."}},"videos":[{"published_at":"13.10.2020 23:19:25","game":"Minecraft","title":"Тестовая экскурсия в Майнкрафте :) РОДИНА МАТЬ! Культурное наследние","id":"v769468484","views":"4 381","length":"0:51:56","url":"https://www.twitch.tv/videos/769468484"},{"published_at":"06.10.2020 20:59:40","game":"Just Chatting","title":"ФИНАЛ РОЗЫГРЫША МОНИКОВ ОТ LG: оглашение победителей!","id":"v762459112","views":"4 983","length":"0:45:20"}],"stream":{"viewers":"519"},"streams":[{"maxViewers":"459","stream":{"created_at":"22.11.2020 19:01:14","length":"2:23:40"},"record":{"start_at":"22.11.2020 19:02:10","length":"2:22:43"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40093603548,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"300","med50Viewers":"332"},{"maxViewers":"625","stream":{"created_at":"22.11.2020 12:22:22","length":"2:11:24"},"record":{"start_at":"22.11.2020 12:23:06","length":"2:10:39"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40088676108,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"514","med50Viewers":"567"},{"maxViewers":"527","stream":{"created_at":"21.11.2020 11:43:53","length":"4:14:59"},"record":{"start_at":"21.11.2020 11:44:36","length":"4:14:15"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40073671788,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"411","med50Viewers":"431"},{"maxViewers":"386","stream":{"created_at":"20.11.2020 17:47:29","length":"2:51:05"},"record":{"start_at":"20.11.2020 17:48:41","length":"2:49:52"},"games":["Just Chatting","Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40061495068,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"285","med50Viewers":"293"},{"maxViewers":"673","stream":{"created_at":"20.11.2020 12:19:57","length":"3:59:07"},"record":{"start_at":"20.11.2020 12:20:51","length":"3:58:12"},"games":["Dota 2","Just Chatting"],"title":"9к карусели =) заходи, учись, бр0","streamID":40058810988,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"448","med50Viewers":"474"},{"maxViewers":"421","stream":{"created_at":"19.11.2020 10:47:40","length":"5:42:46"},"record":{"start_at":"19.11.2020 15:34:08","length":"0:56:18"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40044778396,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"384","med50Viewers":"384"},{"maxViewers":"277","stream":{"created_at":"18.11.2020 21:05:08","length":"0:52:04"},"record":{"start_at":"18.11.2020 21:05:55","length":"0:51:16"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40037488396,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"175","med50Viewers":"197"},{"maxViewers":"314","stream":{"created_at":"18.11.2020 19:17:35","length":"1:11:09"},"record":{"start_at":"18.11.2020 19:18:21","length":"1:10:22"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40035660060,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"232","med50Viewers":"269"},{"maxViewers":"739","stream":{"created_at":"18.11.2020 10:25:46","length":"2:11:25"},"record":{"start_at":"18.11.2020 10:26:30","length":"2:10:40"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40031461276,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"515","med50Viewers":"591"},{"maxViewers":"592","stream":{"created_at":"17.11.2020 17:47:35","length":"3:12:32"},"record":{"start_at":"17.11.2020 17:49:06","length":"3:11:00"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40021158204,"notes":[],"minutes1Viewer":1,"midViewers":"416","med50Viewers":"456"},{"maxViewers":"803","stream":{"created_at":"17.11.2020 09:54:03","length":"3:51:32"},"record":{"start_at":"17.11.2020 13:39:32","length":"0:06:03"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40018253212,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"726","med50Viewers":"803"},{"maxViewers":"1 110","stream":{"created_at":"16.11.2020 14:28:12","length":"6:00:30"},"record":{"start_at":"16.11.2020 19:57:31","length":"0:31:11"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40007187340,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"1 049","med50Viewers":"1 045"}]
};

const StreamerDescription = ({streamer, onAir}) => {
    if(Object.keys(streamer).length === 0) {return null} 
    else return (
        <div className="block contentSizeBlock">
            <div className="flex streamer_container">
                <div className="streamerLogo_container">
                    <img className="streamerLogo" src={streamer.logo} alt={streamer.name}/>
                    <div className="onAir_container">{onAir && <OnAir stream={onAir}/>}</div>
                </div>
                <div className="streamerDescription_container">
                    <div className="flex wideBlock">
                        <p className="streamerName">{streamer.name}</p>
                        <a className="channelLink defaultLink"
                        href=""
                        target="_blank"
                        rel="noreferrer noopener">
                            на канал
                        </a>
                    </div>
                    <div className="streamerDescription_column">                    
                        <div className="streamerDescription">подписчиков:
                            <div className="streamerDescription_valueColumn">
                                <span className="streamerDescription_value">{streamer.followers.actual}</span>
                                <span className="streamerDescription_valueDiff">{streamer.followers.diff + ' ' + streamer.followers.inDays}</span>
                            </div>
                        </div>
                        <div className="streamerDescription">просмотров:
                            <div className="streamerDescription_valueColumn">
                                <span className="streamerDescription_value">{streamer.views.actual}</span>
                                <span className="streamerDescription_valueDiff">{streamer.views.diff + ' ' + streamer.views.inDays}</span>
                            </div>
                        </div>
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

    useEffect(() => {
        setLoading(true);
        // удалить условие
        if (nowURL.hostname === 'localhost') {
            console.log ('на localhost');
            testStreamer();
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
            {loading && <Preloader />}
            <StreamerDescription streamer={streamer} onAir={onAir} />
            <StreamerTable videos={videos} streams={streams} onAir={onAir}/>
        </Fragment>
    );
};

export default Streamer;