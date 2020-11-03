import sendRequest from 'js/sendRequest';
import clientId from './clientId';

let getChannelsVideoById = (streamerID,limit = 10) => {
    let getChannelInfoURL = 'https://api.twitch.tv/kraken/channels/' + streamerID + '/videos?limit=' + limit;
    let reqHeaders = {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-Id': clientId
    };
    return sendRequest('GET', getChannelInfoURL, null, reqHeaders)
};

export default getChannelsVideoById;