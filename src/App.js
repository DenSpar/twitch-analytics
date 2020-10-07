import React, { useState, useEffect } from 'react';
import './App.css';
import Table from 'components/table/Table';
import splitInto3 from 'js/splitInto3';
import getList from 'js/getList';
import Preloader from 'components/preloader/Preloader';
import SearchChannel from 'components/searchChannel/SearchChannel';
import StreamersContext from 'context/streamersContext';
import Alert from 'components/alert/Alert';
import {AlertState} from 'context/alert/AlertState';

//delete after
import getStat from 'js/getStat';
getStat();

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
    <AlertState>
      <div className="App">
        <h1 className="appName">twitch-analytics</h1>
        <Alert />
        <StreamersContext.Provider value={{ setStreamers }}>
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
        </StreamersContext.Provider>
      </div>
    </AlertState>
  )
};

export default App;