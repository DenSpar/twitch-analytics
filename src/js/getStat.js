var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';

// api.search.channels({ query: 'modestal' }, (err, res) => {
//     // поиск каналов по имени
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('search.channel', res);
//     }
// });

// api.channels.channelByID({ channelID: 111 }, (err, res) => {
//     //поиск канала по номеру
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('channelByID', res);
//     };
// })

// api.teams.getTeam({ team: 'streamersalliance' }, (err, res) => {
//     // поиск team по имени
//     if(err) {
//         console.log(err);
//     } else {
//         let example = [];
//         res.users.map((streamer) => {
//             let streamerOBJ = {
//                 name: streamer.display_name,
//                 id: streamer._id
//             };
//             example.push(streamerOBJ);
//             return null
//         });
//         console.log('team, srcData:', res, 'streamers: ', example);
//     }
// });

// api.videos.top({ limit:20 }, (err, res) => {
//     // топ видео
//     if(err) {
//         console.log(err);
//     } else {
//         let example = [];
//         res.vods.map((video) => {
//             let videoOBJ = {
//                 game: video.game,
//                 views: video.views
//             };
//             example.push(videoOBJ);
//             return null
//         });
//         console.log('videos top, srcData:', res, 'videos top: ', example);
//     }
// });

// api.games.top({ limit:10 }, (err, res) => {
//     // топ игр
//     if(err) {
//         console.log(err);
//     } else {
//         let example = [];
//         res.top.map((game) => {
//             let gameOBJ = {
//                 game: game.game.name,
//                 viewers: game.viewers
//             };
//             example.push(gameOBJ);
//             return null
//         });
//         console.log('games top, srcData:', res, 'games top: ', example);
//     }
// });

let getStat = () => null;
export default getStat;

