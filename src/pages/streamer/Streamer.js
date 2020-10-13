import React, {Fragment, useState, useEffect} from 'react';
import './streamer.css';
import StreamerTable from 'components/table/StreamerTable';
import getAllChannelsVideoByID from 'js/getAllVideos';
import splitNumbers from 'js/splitNumbers';
import Preloader from 'components/preloader/Preloader';
import OnAir from 'components/onAir/OnAir';

let makeStreamerDescription = (objData, totVideos) => {
    let newStreamerObj = {
        logo: objData.logo,
        name: objData.display_name,
        followers: objData.followers,
        views: objData.views,
        totalVideos: totVideos
    };    
    document.title = newStreamerObj.name;
    return newStreamerObj
};

let makeVideosList = (videosArr) => {
    let arr = [] ;  
    videosArr.map(video => arr.push({
        dates: {
            published_at: video.published_at,
            recorded_at: video.recorded_at,
            created_at: video.created_at,
            delete_at: video.delete_at
        },
        game: video.game,
        title: video.title,
        id: video._id,
        views: video.views,
        length: video.length
    }))
    return arr;
};

var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';
let getStreamsChannelByID = (numID) => {
    return new Promise((resolve, reject) => {
        api.streams.channel({ channelID: numID }, (err, res) => {
            //проверка, если канал(по номеру) сейчас стримит
            if(err) {
                console.log(err);
            } else {
                resolve(res.stream)
            };
        })
    })
};

const StreamerDescription = ({streamer}) => {    
    const [onAir, setOnAir] = useState(false);

    useEffect(() => {
        getStreamsChannelByID(streamerID)
        .then(data => setOnAir(data));
    }, []);
    
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
                    <p className="streamerDescription">подписчиков: <strong>{splitNumbers(streamer.followers)}</strong></p>
                    <p className="streamerDescription">просмотров: <strong>{splitNumbers(streamer.views)}</strong></p>
                    <p className="streamerDescription">всего видео: <strong>{streamer.totalVideos}</strong></p>
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllChannelsVideoByID(streamerID)
        .then(data => {
            setStreamer(makeStreamerDescription(data.videos[0].channel, data._total));
            setVideos(makeVideosList(data.videos));
            setLoading(false);
        });
    }, []);

    return(
        <Fragment>
            {loading && <Preloader />}
            <StreamerDescription streamer={streamer} />
            <StreamerTable videos={videos}/>
        </Fragment>
    );
};

export default Streamer;