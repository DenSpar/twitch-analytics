import sendRequest from 'js/sendRequest';
import clientId from './clientId';

let getStreamsChannelById = (streamerID) => {
    let getChannelInfoURL = 'https://api.twitch.tv/kraken/streams/' + streamerID;
    let reqHeaders = {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-Id': clientId
    };
    return sendRequest('GET', getChannelInfoURL, null, reqHeaders)
};

export default getStreamsChannelById;