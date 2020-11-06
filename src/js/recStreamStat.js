import getStreamsChannelById from 'js/twitchApiRequsts/getStreamsChannelById';
import quickSort from 'js/quickSort';

let deleteNulls = (obj) => {
    let firstViewer = 1;
    for (let i = 0; i < obj.stat.length; i++) {
        if (obj.stat[i] === 0) {firstViewer++}
        else {break};
    };
    obj.minutes1Viewer = firstViewer;
    if (firstViewer > 5) {obj.stat.splice(0, 5)};
    if (firstViewer > 1 && firstViewer <= 5) {obj.stat.splice(0, firstViewer)};
    return null
};

let checkStream = (numID, obj) => {
    getStreamsChannelById(numID)
    .then(stream => {
        if(stream.stream) {
            obj.stat.push(stream.stream.viewers);
            if (stream.stream.viewers > obj.maxViewers) {
                obj.maxViewers = stream.stream.viewers
            };
            console.log(obj);
            setTimeout(checkStream, 60000, numID, obj)
        } else {
            deleteNulls(obj);
            obj.midViewers = Math.round(obj.stat.reduce((prev, viewers) => prev + viewers, 0) / obj.stat.length);
            let sortedArr = quickSort(obj.stat);
            obj.med50Viewers = sortedArr[Math.ceil(sortedArr.length/2)];
            console.log("удаляю массив ", obj.stat);
            delete obj.stat;
            console.log("stream stopped", obj);
        };
    })
};

let recStreamStat = (numID) => {
    getStreamsChannelById(numID)
    .then(stream => {
        if (stream.stream) {
            console.log("stream is on air, begin to record...",stream);
            let statObj = {
                streamerName: stream.stream.channel.display_name,
                streamerID: stream.stream.channel._id,
                maxViewers: 0,
                stat:[],
                created_at: stream.stream.created_at
            };
            console.log("statArr: ", statObj);
            checkStream(numID, statObj);
        } else {console.log("stream is off, nothing to record");}
    })
};

export default recStreamStat;