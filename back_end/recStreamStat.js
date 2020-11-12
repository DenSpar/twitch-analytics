const getStreamsChannelById = require('./twitchApiRequests/getStreamsChannelById.js');
const quickSort = require('./quickSort.js');
const videoTimeConverter = require('./videoTimeConverter.js');
const saveStreamStat = require('./saveStreamStat.js');

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

function dateDif(dateStr) {
    let date = new Date(Date.parse(dateStr));
    var dif = Math.ceil(Math.abs(date.getTime() - new Date()) / 1000);
    return dif;
};

let checkStream = (numID, obj) => {
    getStreamsChannelById(numID)
    .then(stream => {
        if(stream.stream) {
            obj.stat.push(stream.stream.viewers);
            if (stream.stream.viewers > obj.maxViewers) {
                obj.maxViewers = stream.stream.viewers
            };

            // delete
            console.log(
                obj.streamerName,
                ", id:" + obj.streamID,
                ", mins:" + obj.stat.length,
                ", start:" + obj.created_at                
            );
            // delete

            setTimeout(checkStream, 60000, numID, obj)
        } else {
            console.log(obj.streamerName + "(" + obj.streamerID + ") закончил стрим");
            deleteNulls(obj);
            obj.midViewers = Math.round(obj.stat.reduce((prev, viewers) => prev + viewers, 0) / obj.stat.length);
            let sortedArr = quickSort(obj.stat);
            obj.med50Viewers = sortedArr[Math.ceil(sortedArr.length/2)];
            obj.streamLength = videoTimeConverter(dateDif(obj.created_at));
            delete obj.stat;            
            saveStreamStat(obj);
        };
    })
};

module.exports = function recStreamStat (numID, title, streamID) {
    getStreamsChannelById(numID)
    .then(stream => {
        console.log("начинаю записывать стату по стриму");
        if (stream.stream) {
            let statObj = {
                streamerName: stream.stream.channel.display_name,
                streamerID: stream.stream.channel._id,
                maxViewers: stream.stream.viewers,
                stat:[],
                created_at: stream.stream.created_at,
                game: stream.stream.game,
                title: title,
                streamID: streamID
            };
            checkStream(numID, statObj);
        } else {console.log("что-то не так: стрима - нет");}
    })
};