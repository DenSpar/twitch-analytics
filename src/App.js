import React from 'react';
import './App.css';

var api = require('twitch-api-v5');

api.clientID = '08i240lntql615wx8iozx8rq23krxr';

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

// api.search.channels({ query: 'SilverName' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - search.channel', res);
//   }
// });

api.channels.channelByID({ channelID: '70075625' }, (err, res) => {
  if(err) {
    console.log(err);
  } else {
    console.log('test example - channels.channelByID', res);
  }
});

// api.streams.channel({ channelID: '70075625' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - streams.channel', res);
//   }
// });

// api.streams.featured({ channelID: '70075625' }, (err, res) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('test example - streams.featured', res);
//   }
// });

function App() {
  return (
    <div className="App">
      <h1>twitch-analytics</h1>
      <p>some text</p>
    </div>
  );
}

export default App;
