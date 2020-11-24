import React, { Fragment, useContext } from 'react';
import './table.css';
import StreamersContext from 'context/streamersContext';
import getStreamer from 'js/twitchApiRequsts/getStreamer';
import {AlertContext} from 'context/alert/alertContext';
import OnAir from 'components/onAir/OnAir';

const isInTable = (newStreamer, tableState) => {
  let isIn = false;
  for (let i = 0; i < tableState.length; i++) {
    if (tableState[i].id === newStreamer.id) {
      isIn = true;
      break
    };
  };
  return isIn;
};

const greenOrRedDiff = (diff) => {
  let classes = ["cell_valueDiff"];
  if (diff[0] === '+') { classes.push("greenDiff") }
  else { classes.push("redDiff") };
  return classes.join(' ')
};

const DashboardTable = ({streamers, border = '', target = 'main'}) => {
  console.log(streamers);

  let tableFor = {};
  target === 'search' 
  ? tableFor = {main: false, search: true} 
  : tableFor = {main: true, search: false}
  
  const alert = useContext(AlertContext);
  const {setStreamers} = useContext(StreamersContext);

  const openStreamerPage = (streamer) => {
    //условие проверки - костыль, потом удалить tableFor.search
    if (tableFor.search || !streamer) return null
    else {
      let streamerURL = new URL(window.location.href);
      streamerURL.searchParams.set('streamerID', streamer.id);
      streamerURL.pathname = 'streamer';
      document.location.href = streamerURL;
    };
  };

  const addChannel = (streamer) => {
    console.log(streamer.name, streamer._id);
    getStreamer(streamer._id)
    .then(newStreamer => {
      console.log("newStreamer", newStreamer);
      setStreamers(prevState => {
        if (isInTable(newStreamer, prevState)) {
          alert.show('Канал '+ newStreamer.name +' уже в основном стэке');
          return (prevState);
        } else {
          alert.show('Канал '+ newStreamer.name +' добавлен в основной стэк', 'success');
          return [...prevState, newStreamer]
        };
      });
    });    
  };

  return(
    <Fragment>
      {!streamers.length ? null : (
        <table className={"table " + border}>
          <thead className="headRow">
            <tr>
              <th className="table_cell headCell logoCollumn"></th>
              <th className="table_cell headCell">Никнейм</th>
              <th className="table_cell headCell">
                {tableFor.main ? (<Fragment>Cтримов<br />за 7 д.</Fragment>) : "Описание"}
              </th>
              <th className="table_cell headCell">Подписчиков<br />изм. за 7 д.</th>
              {/* <th className="table_cell headCell">Просмотров изм. за 30 д.</th> */}
              {tableFor.main && (
                <Fragment>
                  <th className="table_cell headCell">Max онлайн<br />за 30 д.</th>
                  <th className="table_cell headCell">Средний онлайн<br />за 30 д.</th>
                </Fragment>
              )}              
              {tableFor.search && (<th className="table_cell headCell"></th>)}
            </tr>
          </thead>
          <tbody>
            {streamers.map((streamer, num) => (
              <tr className={tableFor.main && streamer ? "table_row mainTableRow" : "table_row"}
              key={num} onClick={() => openStreamerPage(streamer)}>
                <td className="table_cell">
                  <img className="table_img" src={streamer.logo} alt={streamer.name}/>
                </td>
                <td className="table_cell">
                  <p className="table_name">{streamer.name}</p>
                  <OnAir stream={streamer.stream}/>
                </td>
                <td className="table_cell">
                  {tableFor.main
                  ? streamer.totalVideos
                  : (
                    streamer.description.trim()
                    ? streamer.description
                    : (<em>описание отсутсвует</em>)
                  )}
                </td>
                <td className="table_cell">
                  <div className="cellContainer">
                    <span>{streamer.followers.actual}</span>
                    <span className={greenOrRedDiff(streamer.followers.diff)}>
                      {streamer.followers.diff}
                      {/* &nbsp;
                      {streamer.followers.inDays} */}
                    </span>
                  </div>
                </td>
                {/* <td className="table_cell">
                  <div className="cellContainer">
                    <span>{streamer.views.actual}</span>
                    <span className="cell_valueDiff">{streamer.views.diff}</span>
                    <span className="cell_valueDiff">{streamer.views.inDays}</span>
                  </div>
                </td> */}
                {tableFor.main && (
                  <Fragment>
                    <td className="table_cell">
                      <div className="cellContainer">
                        <span>{streamer.onlineViewers.max}</span>
                        {/* <span className="cell_valueDiff">{streamer.onlineViewers.inDays}</span> */}
                      </div>
                    </td>
                    <td className="table_cell">
                      <div className="cellContainer">
                        <span>{streamer.onlineViewers.middle}</span>
                        {/* <span className="cell_valueDiff">{streamer.onlineViewers.inDays}</span> */}
                      </div>
                    </td>
                  </Fragment>
                )}
                {tableFor.search && (
                  <td>
                    <button className="buttonAdd" onClick={() => addChannel(streamer)}>+</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
)};

export default DashboardTable;