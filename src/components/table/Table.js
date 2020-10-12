import React, { Fragment, useContext } from 'react';
import './table.css';
import StreamersContext from 'context/streamersContext';
import getStreamer from 'js/getStreamer';
import {AlertContext} from 'context/alert/alertContext';
import splitNumbers from 'js/splitNumbers';
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

const Table = ({streamers, border = '', target = 'main'}) => {
  console.log(streamers);

  let tableFor = {};
  target === 'search' 
  ? tableFor = {main: false, search: true} 
  : tableFor = {main: true, search: false}
  
  const alert = useContext(AlertContext);
  const {setStreamers} = useContext(StreamersContext);
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
                {tableFor.main ? "Видео" : "Описание"}
              </th>
              <th className="table_cell headCell">Подписчиков</th>
              <th className="table_cell headCell">Просмотров</th>
              {tableFor.search && (<th className="table_cell headCell"></th>)}
            </tr>
          </thead>
          <tbody>
            {streamers.map((streamer, num) => (
              <tr className="table_row" key={num}>
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
                <td className="table_cell">{splitNumbers(streamer.followers)}</td>
                <td className="table_cell">{splitNumbers(streamer.views)}</td>
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

export default Table;