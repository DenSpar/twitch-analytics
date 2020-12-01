const getDaysDiff = require('./getDaysDiff.js');
const splitNumbers = require('./splitNumbers.js')

let preparing4Send = (obj) => {
    obj.actual = splitNumbers(obj.actual);
    if(obj.diff) {
        if (obj.diff < 0) { obj.diff = splitNumbers(obj.diff); }
        else { obj.diff = '+' + splitNumbers(obj.diff); };
        obj.inDays = 'за ' + obj.inDays + ' д.'
    };
    return obj
};

module.exports = function getDiff(property, actual, streamerFromDB) {
    let obj = {
        actual: actual,
        diff: null,
        inDays: null
    };
    if (streamerFromDB.hasOwnProperty(property)) {
        let stats = streamerFromDB[property];

        if (stats.length === 1) {
            obj.diff = obj.actual - Object.values(stats[0])[0];
            let dateStr = Object.keys(stats[0])[0];
            obj.inDays = getDaysDiff(dateStr);
        } else {
            let daysOfComparison = 0;
            if (property === 'followers') { daysOfComparison = 7 };
            if (property === 'views') { daysOfComparison = 30 };
            // console.log('property = ' + property + ', daysOfComparison = ' + daysOfComparison);
            for (let i = stats.length - 1; i >= 0; i--) {
                let dateStr = Object.keys(stats[i])[0];
                if (getDaysDiff(dateStr) < daysOfComparison && i !== 0) {
                    // console.log(property + ': ', getDaysDiff(dateStr) + '<' + daysOfComparison, 'i=' + i);
                    continue
                } else {
                    obj.diff = obj.actual - Object.values(stats[i])[0];
                    let dateStr = Object.keys(stats[i])[0];
                    obj.inDays = getDaysDiff(dateStr);
                    break
                };
            };
        };
        return preparing4Send(obj);
    } else {
        obj.actual = '-';
        return obj;
    }    
};