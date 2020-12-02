const getChannelById = require('../twitchApiRequests/getChannelById.js');
const addChannel = require('../collectionStreamers/addChannel.js');
const subscribe2WebHook = require('../twitchApiRequests/subscribe2WebHook.js');
const checkAndRecStream = require('../refreshLiveStreams/checkAndRecStream.js');

let makeNewChannel = (channelID) => {
    return new Promise (function(resolve, reject) {
        getChannelById(channelID)
        .then(channel => {
            if (channel) {
                let newChannel = {
                    followers: [],
                    maxOnline: 0,
                    midOnline: {value: 0, inDays: 0},
                    name: channel.name,
                    twitchID: channelID,
                    views: []
                };
                let localDate = date.toLocaleDateString();
                let followers = {};
                followers[localDate] = channel.followers;
                newChannel.followers.push(followers);
                let views = {};
                views[localDate] = channel.views;
                newChannel.views.push(views);

                resolve(newChannel);
            } else {
                console.log("канал №" + channelID + " на twitch не найден");
                resolve(false);
            };
        });
    });
};

module.exports = function addChannel2MainStack(reqBody) {
    return new Promise (function(resolve, reject) {
        let answer = {};
        if (reqBody.id) {
            console.log("добавление канала №" + reqBody.id + " в основной стэк");
            // создание канала
            makeNewChannel(reqBody.id)
            .then(newChannel => {
                if(newChannel) {
                    Promise.all([
                        // добавление канала в основной стэк
                        addChannel(newChannel),
                        // подписка на вебхуки
                        subscribe2WebHook(reqBody.id, 60),
                        // проверка, идет ли стрим
                        checkAndRecStream(reqBody.id),
                    ])
                    .then(res => {
                        answer.addChannel = res[0];
                        answer.subsWebHook = res[1];
                        answer.isStreamNow = res[2];
                        resolve(answer);
                    })
                } else {
                    answer.addChannel = "запись в БД не создана - канал не найден";
                    resolve(answer);
                };
            });
        } else {
            console.log("добавление канала - не указан id");
            resolve("не указан id");
        };
    })    
};