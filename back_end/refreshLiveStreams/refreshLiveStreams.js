const getAllStreamersFromDB = require('../collectionStreamers/getAllStreamersFromDB.js');
const clearLivesStreams = require('../collectionLiveStreams/clearLivesStreams.js');
const checkAndRecStream = require('./checkAndRecStream.js');

module.exports = function refreshLiveStreams () {
    clearLivesStreams()
    .then(() => getAllStreamersFromDB())
    .then(streamers => {
        streamers.map(streamer => checkAndRecStream(streamer.twitchID))
    })
};