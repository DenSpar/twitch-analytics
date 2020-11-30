const splitNumbers = require('./splitNumbers.js')

let getLastViewsOrFollowersInfo = () => {
    let obj = { lastValue: null, date: "" };
    for (var date in lastViews) {
        obj.lastValue = splitNumbers(lastViews[key]);
        obj.date = date;
    };

    let date = new Date(obj.date);
    let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    };
    obj.views.date = date.toLocaleString("ru", options);

    return obj;
};

module.exports = function getInfo4ClosedChannel (streamerFromDB, obj) {
    obj.name = streamerFromDBstreamerFromDB.name;
    obj.logo = null;
    let lastViews = streamerFromDB.views[streamerFromDB.views.length-1];
    obj.views = getLastViewsOrFollowersInfo (lastViews);
    let lastFollowers = streamerFromDB.followers[streamerFromDB.followers.length-1];
    obj.followers = getLastViewsOrFollowersInfo (lastFollowers);
};