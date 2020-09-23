import React, { useState } from 'react';
import './App.css';
import Table from 'components/table/Table';
import getList from 'js/getList';

let channelsArr = [70075625, 83597658, 142022455, 92202465];

function App() {
  const [tableState, setTableState] = useState([]);

  let btnHandler = () => {
    getList(channelsArr)
    .then(dataArr => {;setTableState(dataArr)});
  };

  if (tableState.length === 0) {
    return (
      <div className="App">
        <h1 className="serviceName">twitch-analytics</h1>
        <button className="btn_getData" onClick={btnHandler}>Загрузить данные</button>
      </div>
    )
  } else {
    return (
      <div className="App">
        <h1 className="serviceName">twitch-analytics</h1>
        <Table streamers={tableState} />
      </div>
    );
  };  
};

export default App;