// const splitNumbers = require('../preparingStreamers4Send/splitNumbers.js');
const dateConverter = require('./dateConverter.js');

module.exports = function preparingStreamsList (streamsArr) {
    let finalList = [];
    for (let i = streamsArr.length-1; i >= 0; i--) {
        let newStream = streamsArr[i]
        newStream.record.start_at = dateConverter(newStream.record.start_at);
        newStream.stream.created_at = dateConverter(newStream.stream.created_at);
        finalList.push(newStream);
    };
    return finalList;
};