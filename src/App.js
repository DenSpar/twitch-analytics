import React, { Fragment, useState } from 'react';
import './App.css';
import Table from 'components/table/Table';
import getList from 'js/getList';
import Preloader from 'components/preloader/Preloader';
import SearchChannel from 'components/searchChannel/SearchChannel';

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
  const [tableState, setTableState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAllianceLoaded, setIsAllianceLoaded] = useState(false);

  let btnHandler = () => {
    setLoading(true);
    getList()
    .then(dataArr => {
      setTableState(dataArr);
      setIsAllianceLoaded(true);
      setLoading(true);
    });
  };
  
  return (
    <div className="App">
        <h1 className="serviceName">twitch-analytics</h1>
        <SearchChannel />
        {!isAllianceLoaded && (
            <Fragment>
              <div className="getData_container">
                <p className="getData_head">Показать сримеров из команды "Streamers Alliance"</p>
                <button className="greenBtn" onClick={btnHandler}>Загрузить данные</button>
              </div>
              {loading && <Preloader />}
            </Fragment>
          )
        }
        {tableState.length !== 0 && (
            <div className="flex">
              <Table streamers={splitInto3.getFirstPart(tableState)} />
              <Table streamers={splitInto3.getSecondPart(tableState)} />
              <Table streamers={splitInto3.getThirdPart(tableState)} />
            </div>
          )
        }
      </div>
  )
};

export default App;

