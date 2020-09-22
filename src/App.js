import React, { useState } from 'react';
import './App.css';
import Table from 'components/table/Table';
import getList from 'js/getList';

let channelsArr = [70075625, 83597658, 142022455];

function App() {
  const [tableState, setTableState] = useState([]);
  if (tableState.length === 0) {
    getList(channelsArr)
    .then(dataArr => {console.log(dataArr);setTableState(dataArr)});
    return (
      <div className="App">
        <h1 className="serviceName">twitch-analytics</h1>
        <p>loading...</p>
      </div>
    )
  };
  return (
    <div className="App">
      <h1 className="serviceName">twitch-analytics</h1>
      <Table streamers={tableState} />
    </div>
  );
};

export default App;