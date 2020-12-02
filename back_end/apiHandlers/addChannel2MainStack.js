const addChannel = require('../collectionStreamers/addChannel.js');
const subscribe2WebHook = require('../twitchApiRequests/subscribe2WebHook.js');
const checkAndRecStream = require('../refreshLiveStreams/checkAndRecStream.js');

let refactorChannel = (channel) => {
    delete channel.description;
    delete channel.logo;

    channel.maxOnline = 0;
    channel.midOnline = {value: 0, inDays: 0};
    
    let localDate = date.toLocaleDateString();
    let followers = {};
    followers[localDate] = channel.followers;
    channel.followers = [followers];
    let views = {};
    views[localDate] = channel.views;
    channel.views = [views];

    return null;
};

module.exports = function addChannel2MainStack(channel) {
    return new Promise (function(resolve, reject) {
        let answer = {};
        if (channel) {
            console.log("добавление канала " + channel.name + "(" + channel.twitchID + ") в основной стэк");
            refactorChannel(channel);
            Promise.all([
                addChannel(channel), // добавление канала в основной стэк
                subscribe2WebHook(channel.twitchID, 60), // подписка на вебхуки
                checkAndRecStream(channel.twitchID), // проверка, идет ли стрим
            ])
            .then(res => {
                answer.addChannel = res[0];
                answer.subsWebHook = res[1];
                answer.isStreamNow = res[2];
                resolve(answer);
            });
        } else {
            answer.addChannel = "запись в БД не создана - канал не получен";
            resolve(answer);
        };
    })    
};