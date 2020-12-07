const getStreamerFromDB = require('../collectionStreamers/getStreamerFromDB.js');
const getChannelById = require('../twitchApiRequests/getChannelById.js');
const addChannel = require('../collectionStreamers/addChannel.js');
const subscribe2WebHook = require('../twitchApiRequests/subscribe2WebHook.js');
const checkAndRecStream = require('../refreshLiveStreams/checkAndRecStream.js');

let refactorChannel = (channel) => {
    delete channel.description;
    delete channel.logo;

    channel.maxOnline = 0;
    channel.midOnline = {value: 0, inDays: 0};
    
    channel.twitchID = Number(channel.twitchID);
    let date = new Date();
    let localDate = date.toLocaleDateString();
    let followers = {};
    followers[localDate] = Number(channel.followers.replace(/\s/g, ''));
    channel.followers = [followers];
    let views = {};
    views[localDate] = Number(channel.views.replace(/\s/g, ''));
    channel.views = [views];

    return null;
};

module.exports = function addChannel2MainStack(channel) {
    return new Promise (function(resolve, reject) {
        let response = {};
        if (channel) {
            console.log("добавление нового канала " + channel.name + "(" + channel.twitchID + ")");
            refactorChannel(channel);
            getStreamerFromDB(channel.twitchID)
            .then(channelInDB => {
                if(channelInDB) {
                    response.message = "такой канал уже есть в основном стэке";
                    console.log(response.message);
                    resolve(response);
                } else {
                    getChannelById(channel.twitchID)
                    .then(actualChannel => {
                        channel.name = actualChannel.display_name; // уточнение имени стримера
                    })
                    .then(() => {
                        Promise.all([
                            addChannel(channel), // добавление канала в основной стэк
                            subscribe2WebHook(channel.twitchID, 60), // подписка на вебхуки
                            checkAndRecStream(channel.twitchID), // проверка, идет ли стрим
                            getStreamer4Dashboard(streamerFromDB), // получение нового стримера для дашборда
                        ])
                        .then(res => {
                            response.addChannel = res[0];
                            response.subsWebHook = res[1];
                            response.isStreamNow = res[2];
                            response.newStreamer = res[3];
                            resolve(response);
                        });
                    })
                };
                
            });
        } else {
            response.message = "запись в БД не создана - канал не получен";
            resolve(response);
        };
    })    
};