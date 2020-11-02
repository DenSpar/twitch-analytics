import getStreamsChannelById from 'js/twitchApiRequsts/getStreamsChannelById';

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
            obj.midViewers = Math.round(obj.stat.reduce((prev, viewers) => prev + viewers, 0) / obj.stat.length);            
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