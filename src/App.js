import React, { useState } from 'react';
import './App.css';
import Table from 'components/table/Table';

var api = require('twitch-api-v5');

api.clientID = '08i240lntql615wx8iozx8rq23krxr';

let strSilverName = {
  id: 70075625,
  name: "SilverName",
  logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/55d2c6d9-9d70-40e2-b30b-773ea9b19cd6-profile_image-300x300.png",
  onAir: false,
  videosNum: 77,
  followers: 123456
};
let strAsmadey = {
  id: 83597658,
  name: "Asmadey",
  logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/c0f1ee2c-1d3c-42c9-b963-cbdba2728d1f-profile_image-300x300.png",
  onAir: false,
  videosNum: 55,
  followers: 780012
};
let streamersArrTest = [strSilverName,strAsmadey];

//пример
// api.users.userByID({ userID: '12826' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - userByID', res);
//     /* Example response
//       {
//         display_name: 'Twitch',
//         _id: '12826',
//         name: 'twitch',
//         type: 'user',
//         ...
//       }
//     */
//   }
// });

//поиск каналов по имени
// api.search.channels({ query: 'Asmadey' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - search.channel', res);
//   }
// });

// //поиск канала по номеру
// api.channels.channelByID({ channelID: '70075625' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - channels.channelByID', res);
//   }
// });

// //проверка, если канал(по номеру) сейчас стримит
// api.streams.channel({ channelID: '70075625' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - streams.channel', res);
//   }
// });

// //найти видео канала(по номеру)
// api.channels.videos({ channelID: '70075625', limit:10 }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - channels.videos', res);
//   }
// });

function App() {
  const [tableState, setTableState] = useState(streamersArrTest);
  return (
    <div className="App">
      <h1>twitch-analytics</h1>
      <Table streamers={tableState} />
    </div>
  );
}

export default App;
