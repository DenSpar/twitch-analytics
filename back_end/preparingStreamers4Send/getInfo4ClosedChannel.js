const splitNumbers = require('./splitNumbers.js')

let getLastViewsOrFollowersInfo = (lastPoint) => {
    let obj = { lastValue: null, date: "" };
    for (var lastDate in lastPoint) {
        obj.lastValue = splitNumbers(lastPoint[lastDate]);
        obj.date = new Date(lastDate);
    };

    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    obj.date = obj.date.toLocaleString("ru", options);

    return obj;
};

module.exports = function getInfo4ClosedChannel (streamerFromDB, obj) {
    obj.name = streamerFromDB.name;
    obj.logo = null;
    let lastViews = streamerFromDB.views[streamerFromDB.views.length-1];
    obj.views = getLastViewsOrFollowersInfo (lastViews);
    let lastFollowers = streamerFromDB.followers[streamerFromDB.followers.length-1];
    obj.followers = getLastViewsOrFollowersInfo (lastFollowers);
};