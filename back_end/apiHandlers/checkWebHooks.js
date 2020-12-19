const getWebHooks = require('../twitchApiRequests/getWebHooks.js');
const formatedLog = require('../formatedLog.js');

let makeSubsArr = (arr) => {
    let resArr = [];
    arr.map(sub => {
        resArr.push({
            id: Number(sub.topic.match(/\d+$/)[0]),
            secLeft: Math.round((new Date(sub.expires_at).getTime() - new Date().getTime())/1000)
        })
    })
    return resArr;
};

module.exports = function checkWebHooks(streamersIdArr) {
    return new Promise (function(resolve, reject) {
        getWebHooks()
        .then(subsList => {
            if (subsList.total === 0) { formatedLog('нет активных подписок', 'INFO'); };
            let subsArr = makeSubsArr(subsList.data);
            let resObj = {
                ok: [],
                needRefresh: [],
                over: []
            };
            streamersIdArr.map(streamerId => {
                let isSub = false;
                for (let i = 0; i < subsArr.length; i++) {
                    if (subsArr[i].id === Number(streamerId)) {
                        if (subsArr[i].secLeft > 260000) {
                            resObj.ok.push(subsArr[i]);
                        } else {
                            resObj.needRefresh.push(subsArr[i]);
                        };
                        isSub = true;
                        subsArr.splice(i, 1);
                        break
                    };
                };
                if (!isSub) {resObj.over.push(Number(streamerId));};
            });
            resolve(resObj);
        });
    })
};

// от твича должен вернуться ответ типа:
// {
//      data: Array(1)
//         0: {
//             callback: "https://stat.metacorp.gg/api/webhooks",
//             expires_at: "2020-11-06T13:28:50Z",
//             topic: "https://api.twitch.tv/helix/streams?user_id=46947742",
//             length: 1,
//         },
//     pagination: {},
//     total: 1,
// }