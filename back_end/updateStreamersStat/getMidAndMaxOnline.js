const getDaysDiff = require('../preparingStreamers4Send/getDaysDiff.js');

module.exports = function getMidAndMaxOnline(streamerStat) {
    let obj = {
        maxOnline: 0,
        midOnline: {
            value: 0,
            inDays: 0
        }
    };
    
    if (streamerStat) {
        let streams = streamerStat.streams;
        if(streams.length === 1) {
            obj.maxOnline = streams[0].maxViewers;
            obj.midOnline.value = streams[0].midViewers;
            obj.midOnline.inDays = getDaysDiff(streams[0].record.start_at);
        };

        if(streams.length > 1) {
            let arrMidOnline = [];
            let indexOfLastStream = streams.length - 1;
            for (let i = streams.length-1; i >= 0; i--) {
                let newDaysDiff = getDaysDiff(streams[i].record.start_at);
                if(newDaysDiff <= 30) {
                    if(obj.maxOnline < streams[i].maxViewers) { obj.maxOnline = streams[i].maxViewers };
                    arrMidOnline.push(streams[i].midViewers);
                    indexOfLastStream = i;
                } else { break };
            };
            if(arrMidOnline.length !== 0) {
                obj.midOnline.value = Math.round(arrMidOnline.reduce((prev, viewers) => prev + viewers, 0) / arrMidOnline.length);
            } else {
                obj.midOnline.value = streams[indexOfLastStream].midViewers;
            };
            obj.midOnline.inDays = getDaysDiff(streams[indexOfLastStream].record.start_at);
        };
    };
    return obj;
};