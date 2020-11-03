import React, {Fragment, useState, useEffect} from 'react';
import './streamer.css';
import StreamerTable from 'components/table/StreamerTable';
import getChannelById from 'js/twitchApiRequsts/getChannelById';
import getChannelsVideoById from 'js/twitchApiRequsts/getChannelsVideoById';
import getStreamsChannelById from 'js/twitchApiRequsts/getStreamsChannelById';
import splitNumbers from 'js/splitNumbers';
import Preloader from 'components/preloader/Preloader';
import OnAir from 'components/onAir/OnAir';

let channelInfo = (numID) => {
    return new Promise((resolve, reject) => {
        getChannelById(numID)
        .then(res => {
            let obj = {
                name: res.display_name,
                logo: res.logo,
                followers: splitNumbers(res.followers),
                views: splitNumbers(res.views),
                totalVideos: 0
            };
            document.title = obj.name;
            resolve(obj);
        })
    })
};

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
                    <p className="streamerDescription">подписчиков: <strong>{splitNumbers(streamer.followers)}</strong></p>
                    <p className="streamerDescription">просмотров: <strong>{splitNumbers(streamer.views)}</strong></p>
                    <p className="streamerDescription">всего видео: <strong>{streamer.totalVideos}</strong></p>
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
    const [loading, setLoading] = useState(false);
    const [onAir, setOnAir] = useState(false);

    useEffect(() => {
        setLoading(true);
        getChannelsVideoById(streamerID, 100)
        .then(data => {
            console.log("data", data);
            if (data._total) {
                setStreamer(makeStreamerDescription(data.videos[0].channel, data._total));
                setVideos(makeVideosList(data.videos));
            } else {
                channelInfo(streamerID)
                .then(streamerDescr => setStreamer(streamerDescr));                
                let videosStub = {
                    dates: {
                        published_at: "",
                        recorded_at: "",
                        created_at: "",
                        delete_at: ""
                    },
                    game: "Видео скрыты для просмотра или еще не созданы",
                    title: "",
                    id: "",
                    views: "",
                    length: ""
                };
                setVideos([videosStub]);
            };
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        getStreamsChannelById(streamerID)
        .then(data => setOnAir(data.stream));
    }, []);

    return(
        <Fragment>
            {loading && <Preloader />}
            <StreamerDescription streamer={streamer} onAir={onAir} />
            <StreamerTable videos={videos} onAir={onAir}/>
        </Fragment>
    );
};

export default Streamer;