import React, {Fragment, useState, useEffect} from 'react';
import './streamer.css';
import StreamerTable from 'components/table/StreamerTable';
import getStreamsChannelById from 'js/twitchApiRequsts/getStreamsChannelById';
import Preloader from 'components/preloader/Preloader';
import OnAir from 'components/onAir/OnAir';

let denly = {
    description:{
        logo:"https://static-cdn.jtvnw.net/jtv_user_pictures/b3208605-3e0d-40a6-8bed-1e2f9d17303e-profile_image-300x300.png",
        name:"Denly",
        followers:{actual:"191 095",diff:"+140",inDays:"за 7 д."},
        views:{actual:"8 908 482",diff:"+269 942",inDays:"за 14 д."},
        totalVideos:10,
        totalStreams:2
    },
    videos:[
        {published_at:"17.11.2020 19:31:31",
        game:"Just Chatting",
        title:"Дотка, розыгрыши баллов, фильм  !tg !gta",
        id:"v806213280",
        views:8503,
        length:"6:09:46"},
        {published_at:"16.11.2020 17:36:54",
        game:"Just Chatting",
        title:"Приветики",
        id:"v805059673",
        views:58110,
        length:"4:46:13"},
        {published_at:"14.11.2020 21:54:20",
        game:"Just Chatting",
        title:"Приветики",
        id:"v803013637",
        views:34579,
        length:"2:28:24"}],
    stream:null,
    streams:[
        {maxViewers:1101,
        stream:{created_at:"2020-11-16T14:36:36Z",length:"6:11:08"},
        record:{start_at:"2020-11-16T16:57:31.646Z",length:"3:50:13"},
        games:["Just Chatting","Counter-Strike: Global Offensive","Among Us"],
        title:"Приветики конфетики !tg !gta",
        streamID:40008639836,
        notes:["сбор статистики не с начала стрима"],
        minutes1Viewer:1,
        midViewers:690,
        med50Viewers:849},
        {maxViewers:335,
        stream:{created_at:"2020-11-17T16:31:13Z",length:"4:47:22"},
        record:{start_at:"2020-11-17T16:32:04.749Z",length:"4:46:30"},
        games:["Just Chatting","Dota 2"],
        title:"Дотка, розыгрыши баллов, фильм  !tg !gta",
        streamID:40022559324,
        notes:[],
        minutes1Viewer:2,
        midViewers:186,
        med50Viewers:178}],
    maxOnline:"1 101",
    midOnline:{value:"438",inDays:"за 1 д."}
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
                    <p className="streamerName"><strong>{streamer.name}</strong></p>
                    <div className="streamerDescription">подписчиков:
                        <div className="streamerDescription_column">
                            <strong>{streamer.followers.actual}</strong>
                            <strong>{streamer.followers.diff + ' ' + streamer.followers.inDays}</strong>
                        </div>
                    </div>
                    <div className="streamerDescription">просмотров:
                        <div className="streamerDescription_column">
                            <strong>{streamer.views.actual}</strong>
                            <strong>{streamer.views.diff + ' ' + streamer.views.inDays}</strong>
                        </div>
                    </div>
                    <p className="streamerDescription">видео в архиве: <strong>{streamer.totalVideos}</strong></p>
                    <p className="streamerDescription">стримов записано: <strong>{streamer.totalStreams}</strong></p>
                    {onAir && 
                        <p className="streamerDescription">сейчас смотрят: <strong>{onAir.viewers}</strong></p>
                    }
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

    useEffect(() => {
        setLoading(true);
        console.log('denly', denly);
        setTimeout(() => {
            setStreamer(denly.description);
            setLoading(false);
            
            setTimeout(() => {
                setVideos(denly.videos)
                setStreams(denly.streams)
            }, 1000)
        }, 2000);
    }, []);

    useEffect(() => {
        getStreamsChannelById(streamerID)
        .then(data => setOnAir(data.stream));
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