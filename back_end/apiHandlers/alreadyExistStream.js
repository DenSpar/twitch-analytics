const findLiveStream = require('../collectionLiveStreams/findLiveStream.js');
const updateLiveStream = require('../collectionLiveStreams/updateLiveStream.js');
const addLiveStream = require('../collectionLiveStreams/addLiveStream.js');
const formatedLog = require('../formatedLog.js');

module.exports = function alreadyExistStream (srcStream) {
    return new Promise (function(resolve, reject) {
        let response;
        findLiveStream(srcStream.streamerID)
        .then(findStream => {
            if (findStream) {
                if (findStream.streamID !== srcStream.streamID) {
                        formatedLog('в БД записан устаревший стрим, заменяю актуальным ...', 'INFO');
                        updateLiveStream(srcStream);
                        response = false;
                    }
                else {
                    formatedLog('стрим №' + srcStream.streamID + ' уже есть в БД', 'INFO');
                    response = true;
                };
            }
            else {
                formatedLog('в БД нет стрима №' + srcStream.streamID, 'INFO');
                addLiveStream(srcStream);
                response = false;
            };
            resolve(response);
        })
    });
};

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});