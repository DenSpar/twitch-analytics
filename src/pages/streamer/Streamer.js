import React, {Fragment, useState, useEffect} from 'react';
import './streamer.css';
import StreamerTable from 'components/table/StreamerTable';
import getAllChannelsVideoByID from 'js/getAllVideos';
// eslint-disable-next-line
import getStreamsChannelByID from 'js/getStreams';
import splitNumbers from 'js/splitNumbers';
import Preloader from 'components/preloader/Preloader';

let makeVideosList = (objData) => { 
    let arr = [] ;  
    objData.videos.map(video => arr.push({
        dates: {
            published_at: video.published_at,
            recorded_at: video.recorded_at,
            created_at: video.created_at,
            delete_at: video.delete_at
        },
        game: video.game,
        title: video.title,
        id: video._id,
        views: video.views
    }))
    return arr;
};

let streamer = {
    // буду получать из родительского элемента
    logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/c0f1ee2c-1d3c-42c9-b963-cbdba2728d1f-profile_image-300x300.png",
    name: "Asmadey",
    followers: 44124,
    views: 3928352,
    id: 83597658,
    totalVideos: 55
};
// Asmadey - 83597658
// getAllChannelsVideoByID(streamer.id)
// .then(data => {
//     streamer.videos = makeVideosList(data);
//     getStreamsChannelByID(streamer.id, streamer)    
// })
// .then(() => {
//     console.log("Asmadey's all videos: ", streamer)
// });

const Streamer = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllChannelsVideoByID(streamer.id)
        .then(data => {
            setVideos(makeVideosList(data));
            setLoading(false);
        });
    }, []);

    return(
        <Fragment>
            <div className="flex streamer_container">
                <img className="streamerLogo" src={streamer.logo} alt={streamer.name}/>
                <div className="streamerDescription_container">
                    <p className="streamerName"><strong>{streamer.name}</strong></p>
                    <p className="streamerDescription">подписчиков: <strong>{splitNumbers(streamer.followers)}</strong></p>
                    <p className="streamerDescription">просмотров: <strong>{splitNumbers(streamer.views)}</strong></p>
                    <p className="streamerDescription">всего видео: <strong>{streamer.totalVideos}</strong></p>
                </div>
            </div>
            {loading && <Preloader />}
            <h1 className="tableTitle">Список трансляций</h1>
            <StreamerTable videos={videos}/>
        </Fragment>
    );
};

export default Streamer;