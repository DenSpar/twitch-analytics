import React, {Fragment, useState, useEffect} from 'react';
import './streamer.css';
import StreamerTable from 'components/table/StreamerTable';
import Preloader from 'components/preloader/Preloader';
import OnAir from 'components/onAir/OnAir';
import sendRequest from 'js/sendRequest';
import { Link } from 'react-router-dom';

let denly = {
    "description":{"logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/2ceffe1a-95cd-4928-aa90-d429346ce70c-profile_image-300x300.png","name":"y0nd","followers":{"actual":"2 475 237","diff":"+22 498","inDays":"за 7 д."},"views":{"actual":"84 596 294","diff":"+2 263 237","inDays":"за 28 д."},"totalVideos":42,"totalStreams":12,"onlineViewers":{"max":"1 110","middle":"455","inDays":"за 30 д."}},"videos":[{"published_at":"23.11.2020 13:47:42","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v812917751","views":"8","length":"2:26:16"},{"published_at":"22.11.2020 19:01:25","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v812032697","views":"4 497","length":"2:22:28"},{"published_at":"22.11.2020 12:22:33","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v811782273","views":"5 333","length":"2:10:50"},{"published_at":"21.11.2020 11:44:04","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v810501277","views":"7 699","length":"4:13:36"},{"published_at":"20.11.2020 17:47:39","game":"Just Chatting","title":"9к карусели =) заходи, учись, бр0","id":"v809447509","views":"4 560","length":"2:49:39"},{"published_at":"20.11.2020 12:20:08","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v809291214","views":"8 075","length":"3:57:41"},{"published_at":"19.11.2020 10:47:51","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v808154520","views":"10 543","length":"5:42:08"},{"published_at":"18.11.2020 21:05:19","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v807403680","views":"1 307","length":"0:51:19"},{"published_at":"18.11.2020 19:17:45","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v807303151","views":"1 997","length":"1:09:47"},{"published_at":"18.11.2020 10:25:57","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v807046761","views":"5 304","length":"2:09:53"},{"published_at":"17.11.2020 17:47:46","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v806136877","views":"6 964","length":"3:11:00"},{"published_at":"17.11.2020 09:54:14","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v805939640","views":"8 462","length":"3:50:50"},{"published_at":"16.11.2020 14:28:23","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v804967355","views":"16 383","length":"5:59:13"},{"published_at":"13.11.2020 13:53:19","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v801344598","views":"6 689","length":"3:39:22"},{"published_at":"11.11.2020 12:25:50","game":"Dota 2","title":"9к карусели =) заходи, учись, бр0","id":"v799067704","views":"10 274","length":"4:00:41"},{"published_at":"10.11.2020 11:34:40","game":"Just Chatting","title":"даровааааааааааа","id":"v797934035","views":"2 349","length":"1:35:31"},{"published_at":"02.11.2020 09:18:56","game":"Dota 2","title":"даровааааааааааа","id":"v789551635","views":"8 053","length":"6:04:14"},{"published_at":"16.10.2020 10:18:41","game":"Dota 2","title":"9k no tilt ","id":"v771903431","views":"7 919","length":"2:53:08"},{"published_at":"15.10.2020 09:18:36","game":"Dota 2","title":"9k no tilt ","id":"v770884692","views":"8 096","length":"3:31:28"},{"published_at":"14.10.2020 11:15:32","game":"Dota 2","title":"9k no tilt ","id":"v769974307","views":"2 640","length":"1:28:20"},{"published_at":"09.10.2020 09:44:34","game":"Dota 2","title":"9k no tilt ","id":"v765005939","views":"5 747","length":"3:29:36"},{"published_at":"08.10.2020 09:27:07","game":"Dota 2","title":"приношу пАзиТифФФ0))","id":"v764026691","views":"5 668","length":"3:42:44"},{"published_at":"07.10.2020 10:11:43","game":"Dota 2","title":"приношу пАзиТифФФ0))","id":"v763085076","views":"5 333","length":"3:17:00"},{"published_at":"05.10.2020 09:44:55","game":"Dota 2","title":"приношу пАзиТифФФ0))","id":"v761204300","views":"5 006","length":"4:10:06"},{"published_at":"04.10.2020 12:09:56","game":"Dota 2","title":"приношу пАзиТифФФ0))","id":"v760320038","views":"4 785","length":"3:35:59"},{"published_at":"02.10.2020 17:45:26","game":"Dota 2","title":"приношу пАзиТифФФ0))","id":"v758389951","views":"6 256","length":"3:53:46"},{"published_at":"02.10.2020 10:06:01","game":"Dota 2","title":"приношу пАзиТифФФ0))","id":"v758206148","views":"4 032","length":"2:49:12"},{"published_at":"01.10.2020 09:31:52","game":"Dota 2","title":"приношу пАзиТифФФ0))","id":"v757242655","views":"6 105","length":"4:45:23"},{"published_at":"30.09.2020 16:38:13","game":"Dota 2","title":"88rank  ULU =)","id":"v756447932","views":"6 963","length":"5:16:48"},{"published_at":"29.09.2020 18:59:22","game":"Dota 2","title":"88rank  ULU =)","id":"v755578991","views":"3 742","length":"2:28:38"},{"published_at":"29.09.2020 13:47:02","game":"Dota 2","title":"9k main \n","id":"v755416509","views":"1 823","length":"1:27:06"},{"published_at":"27.09.2020 13:52:39","game":"Dota 2","title":"9k main \n","id":"v753559152","views":"4 863","length":"3:36:22"},{"published_at":"26.09.2020 12:18:26","game":"Dota 2","title":"АБУЗ МИДОВОЙ БАБКИ =)\n","id":"v752496987","views":"333","length":"0:10:12"},{"published_at":"25.09.2020 11:35:26","game":"Dota 2","title":"АБУЗ МИДОВОЙ БАБКИ =)\n","id":"v751435133","views":"5 135","length":"2:24:54"},{"published_at":"14.01.2015 10:33:49","game":null,"title":"Ммр с Лостом за 13.01.2015","id":"v42080082","views":"12 095","length":"6:12:47"},{"published_at":"05.01.2015 04:39:52","game":null,"title":"Игра в cs 1.6 со зрителями","id":"v42219712","views":"2 574","length":"0:30:01"},{"published_at":"01.01.2015 03:26:39","game":null,"title":"Последняя игра в 2014 году с Vjlink'oм","id":"v42275896","views":"3 831","length":"0:50:37"},{"published_at":"28.12.2014 02:17:04","game":null,"title":"Побег из Шоушенка ","id":"v42331489","views":"3 836","length":"0:02:00"},{"published_at":"26.12.2014 01:02:57","game":null,"title":"Маме привет передавай :D","id":"v42356188","views":"3 165","length":"0:00:39"},{"published_at":"26.12.2014 00:57:32","game":null,"title":"Покатушки с LighTofHeaveN.","id":"v42356265","views":"3 009","length":"3:21:42"},{"published_at":"22.12.2014 22:21:49","game":null,"title":"Как же они ебошут :O","id":"v42399072","views":"2 285","length":"0:01:10"},{"published_at":"21.12.2014 02:34:23","game":null,"title":"Epic blyat pizdec triple kill by mikushiru","id":"v42432961","views":"1 516","length":"0:01:10"}],"stream":{"viewers":"519"},"streams":[{"maxViewers":"459","stream":{"created_at":"22.11.2020 19:01:14","length":"2:23:40"},"record":{"start_at":"22.11.2020 19:02:10","length":"2:22:43"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40093603548,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"300","med50Viewers":"332"},{"maxViewers":"625","stream":{"created_at":"22.11.2020 12:22:22","length":"2:11:24"},"record":{"start_at":"22.11.2020 12:23:06","length":"2:10:39"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40088676108,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"514","med50Viewers":"567"},{"maxViewers":"527","stream":{"created_at":"21.11.2020 11:43:53","length":"4:14:59"},"record":{"start_at":"21.11.2020 11:44:36","length":"4:14:15"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40073671788,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"411","med50Viewers":"431"},{"maxViewers":"386","stream":{"created_at":"20.11.2020 17:47:29","length":"2:51:05"},"record":{"start_at":"20.11.2020 17:48:41","length":"2:49:52"},"games":["Just Chatting","Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40061495068,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"285","med50Viewers":"293"},{"maxViewers":"673","stream":{"created_at":"20.11.2020 12:19:57","length":"3:59:07"},"record":{"start_at":"20.11.2020 12:20:51","length":"3:58:12"},"games":["Dota 2","Just Chatting"],"title":"9к карусели =) заходи, учись, бр0","streamID":40058810988,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"448","med50Viewers":"474"},{"maxViewers":"421","stream":{"created_at":"19.11.2020 10:47:40","length":"5:42:46"},"record":{"start_at":"19.11.2020 15:34:08","length":"0:56:18"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40044778396,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"384","med50Viewers":"384"},{"maxViewers":"277","stream":{"created_at":"18.11.2020 21:05:08","length":"0:52:04"},"record":{"start_at":"18.11.2020 21:05:55","length":"0:51:16"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40037488396,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"175","med50Viewers":"197"},{"maxViewers":"314","stream":{"created_at":"18.11.2020 19:17:35","length":"1:11:09"},"record":{"start_at":"18.11.2020 19:18:21","length":"1:10:22"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40035660060,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"232","med50Viewers":"269"},{"maxViewers":"739","stream":{"created_at":"18.11.2020 10:25:46","length":"2:11:25"},"record":{"start_at":"18.11.2020 10:26:30","length":"2:10:40"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40031461276,"notes":["первые зрители появились на 2 минуте"],"minutes1Viewer":2,"midViewers":"515","med50Viewers":"591"},{"maxViewers":"592","stream":{"created_at":"17.11.2020 17:47:35","length":"3:12:32"},"record":{"start_at":"17.11.2020 17:49:06","length":"3:11:00"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40021158204,"notes":[],"minutes1Viewer":1,"midViewers":"416","med50Viewers":"456"},{"maxViewers":"803","stream":{"created_at":"17.11.2020 09:54:03","length":"3:51:32"},"record":{"start_at":"17.11.2020 13:39:32","length":"0:06:03"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40018253212,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"726","med50Viewers":"803"},{"maxViewers":"1 110","stream":{"created_at":"16.11.2020 14:28:12","length":"6:00:30"},"record":{"start_at":"16.11.2020 19:57:31","length":"0:31:11"},"games":["Dota 2"],"title":"9к карусели =) заходи, учись, бр0","streamID":40007187340,"notes":["сбор статистики не с начала стрима"],"minutes1Viewer":1,"midViewers":"1 049","med50Viewers":"1 045"}]
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
                        <Link className="channelLink">на канал</Link>
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