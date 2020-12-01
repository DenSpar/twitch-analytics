const getStreamerStats = require('./collectionStats/getStreamerStats.js');
const getDaysDiff = require('../preparingStreamers4Send/getDaysDiff.js');

module.exports = function howManyStreamsIn7Days(streamerID, obj) {
    return new Promise ((resolve, reject) => {
        getStreamerStats(streamerID)
        .then(streamerStats => {
            if (streamerStats) {
                let streams = streamerStats.streams;
                let streamsCounter = 0;
                for (let i = streams.length-1; i >= 0; i--) {
                    let newDaysDiff = getDaysDiff(streams[i].record.start_at);
                    if(newDaysDiff <= 7) {
                        streamsCounter++;
                    } else { break };
                };
                obj.streamsIn7Days = streamsCounter;
            } else { obj.streamsIn7Days = '-' };
            resolve();
        });
    });    
};