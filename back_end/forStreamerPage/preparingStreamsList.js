const splitNumbers = require('../preparingStreamers4Send/splitNumbers.js');
const dateConverter = require('./dateConverter.js');

module.exports = function preparingStreamsList (streamsArr) {
    let finalList = [];
    if (streamsArr.length > 0) {
        for (let i = streamsArr.length-1; i >= 0; i--) {
            let newStream = streamsArr[i];
            newStream.maxViewers = splitNumbers(newStream.maxViewers);
            newStream.med50Viewers = splitNumbers(newStream.med50Viewers);
            newStream.midViewers = splitNumbers(newStream.midViewers);
            newStream.record.start_at = dateConverter(newStream.record.start_at);
            newStream.stream.created_at = dateConverter(newStream.stream.created_at);
            if (newStream.minutes1Viewer > 1) {
                let newNote = 'первые зрители появились на ' + newStream.minutes1Viewer + ' мин.';
                newStream.notes.push(newNote);
            }
            finalList.push(newStream);
        };
    } else {
        let streamsStub = {
            games: [],
            maxViewers: "",
            med50Viewers: "",
            midViewers: "",
            notes: [],
            record: {start_at: "", length: ""},
            stream: {created_at: "", length: ""},
            title: "Нет записанных стримов"
        };

        finalList.push(streamsStub);
    };
    return finalList;
};