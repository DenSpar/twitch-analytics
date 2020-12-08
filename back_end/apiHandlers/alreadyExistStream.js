const findLiveStream = require('../collectionLiveStreams/findLiveStream.js');
const updateLiveStream = require('../collectionLiveStreams/updateLiveStream.js');
const addLiveStream = require('../collectionLiveStreams/addLiveStream.js');

module.exports = function alreadyExistStream (srcStream) {
    return new Promise (function(resolve, reject) {
        let response;
        findLiveStream(srcStream.streamerID)
        .then(findStream => {
            if (findStream) {
                if (findStream.streamID !== srcStream.streamID) {
                        console.log('в БД записан устаревший стрим, заменяю актуальным ...');
                        updateLiveStream(srcStream);
                        response = false;
                    }
                else {
                    console.log('стрим №' + srcStream.streamID + ' уже есть в БД');
                    response = true;
                };
            }
            else {
                console.log('в БД нет стрима №' + srcStream.streamID);
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