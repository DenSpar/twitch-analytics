import React, { Fragment, useState } from 'react';
import './App.css';
import Table from 'components/table/Table';
import getList from 'js/getList';
import Preloader from 'components/preloader/Preloader';

//delete after
import getStat from 'js/getStat';
getStat();

function App() {
  const [tableState, setTableState] = useState([]);
  const [loading, setLoading] = useState(false);

  let btnHandler = () => {
    setLoading(true);
    getList()
    .then(dataArr => setTableState(dataArr));
  };

  // if (tableState.length === 0) {
  //   return (
  //     <div className="App">
  //       <h1 className="serviceName">twitch-analytics</h1>
  //       <div className="getData_container">
  //         <p className="getData_head">Показать сримеров из команды "Streamers Alliance"</p>
  //         <button className="getData_btn" onClick={btnHandler}>Загрузить данные</button>
  //       </div>
  //       {loading && <Preloader />}
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className="App">
  //       <h1 className="serviceName">twitch-analytics</h1>
  //       <Table streamers={tableState} />
  //     </div>
  //   );
  // };
  
  return (
    <div className="App">
        <h1 className="serviceName">twitch-analytics</h1>
        {tableState.length === 0 ? 
          (
            <Fragment>
              <div className="getData_container">
                <p className="getData_head">Показать сримеров из команды "Streamers Alliance"</p>
                <button className="getData_btn" onClick={btnHandler}>Загрузить данные</button>
              </div>
              {loading && <Preloader />}
            </Fragment>
          ) : <Table streamers={tableState} />
        }
      </div>
  )
};

export default App;