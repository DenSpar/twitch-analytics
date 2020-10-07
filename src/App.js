import React, { useState, useEffect } from 'react';
import './App.css';
import Table from 'components/table/Table';
import getList from 'js/getList';
import Preloader from 'components/preloader/Preloader';
import SearchChannel from 'components/searchChannel/SearchChannel';
import StreamersContext from 'context/streamersContext';
import Alert from 'components/alert/Alert';
import {AlertState} from 'context/alert/AlertState';
import splitInto2 from 'js/splitInto3';

//delete after
// import splitInto3 from 'js/splitInto3';
// import getStat from 'js/getStat';
// getStat();

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
      <Alert />
      <div className="App">        
        <StreamersContext.Provider value={{ setStreamers }}>
          <SearchChannel />
          {loading && <Preloader />}
          {streamers.length !== 0 && (
              <div className="mainTable">
                <Table streamers={splitInto2.getFirstPart(streamers)} border={"border-right"} />
                <Table streamers={splitInto2.getSecondPart(streamers)} border={"border-left"} />
              </div>
            )
          }
        </StreamersContext.Provider>
      </div>
    </AlertState>
  )
};

export default App;