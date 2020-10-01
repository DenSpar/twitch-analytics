import React, { useState, useEffect } from 'react';
import './App.css';
import Table from 'components/table/Table';
import getList from 'js/getList';
import Preloader from 'components/preloader/Preloader';
import SearchChannel from 'components/searchChannel/SearchChannel';
import StreamersContext from 'context/streamersContext';

//delete after
import getStat from 'js/getStat';
getStat();

let splitInto3 = {
  getFirstPart: (arr) => {
    let firstPart = [];
    for (let i = 0; i < Math.ceil(arr.length/3); i++) {
      firstPart.push(arr[i])
    };
    return firstPart
  },
  getSecondPart: (arr) => {
    let secondPart = [];
    for (let i = Math.ceil(arr.length/3); i < Math.ceil(arr.length*2/3); i++) {
      secondPart.push(arr[i])
    };
    return secondPart
  },
  getThirdPart: (arr) => {
    let thirdPart = [];
    for (let i = Math.ceil(arr.length*2/3); i < arr.length; i++) {
      thirdPart.push(arr[i])
    };
    return thirdPart
  }
};

function App() {
  const [streamers, setStreamers] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("streamers", streamers);

  useEffect(() => {
    setLoading(true);
    getList()
    .then(dataArr => {
      setStreamers(dataArr);
      setLoading(false);
    });
  }, [])
  
  return (
    <StreamersContext.Provider value={{ setStreamers }}>
      <div className="App">
        <h1 className="appName">twitch-analytics</h1>
        <SearchChannel />
        {loading && <Preloader />}
        {streamers.length !== 0 && (
            <div className="flex mainTable">
              <Table streamers={splitInto3.getFirstPart(streamers)} />
              <Table streamers={splitInto3.getSecondPart(streamers)} />
              <Table streamers={splitInto3.getThirdPart(streamers)} />
            </div>
          )
        }
      </div>
    </StreamersContext.Provider>
  )
};

export default App;

