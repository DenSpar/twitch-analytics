import React, { Fragment, useContext } from 'react';
import './table.css';
import StreamersContext from 'context/streamersContext';
import {AlertContext} from 'context/alert/alertContext';
import TrimName from 'components/trimName/TrimName';

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

const SearchTable = ({streamers}) => {
  console.log(streamers);
  
  const alert = useContext(AlertContext);
  const {setStreamers} = useContext(StreamersContext);

  const addChannel = (streamer) => {
    let newStreamer = {
      name: streamer.name,
      id: streamer._id,
      logo: streamer.logo,
      followers: {
        // здесь будет разделение по разрядам
        actual: String(streamer.followers),
        diff: "-"
      },
      onlineViewers:{
        inDays: null,
        max: "-",
        middle: "-"
      },
      // идет ли стрим
      stream: null
    };
    console.log(streamer.name, streamer._id, newStreamer);
    setStreamers(prevState => {
      if (isInTable(newStreamer, prevState)) {
        alert.show('Канал '+ newStreamer.name +' уже в основном стэке');
        return (prevState);
      } else {
        alert.show('Канал '+ newStreamer.name +' добавлен в основной стэк', 'success');
        return [...prevState, newStreamer]
      };
    });
  };

  return(
    <Fragment>
      {!streamers.length ? null : (
        <table className="table searchTable">
          <thead className="headRow">
            <tr>
              <th className="table_cell headCell logoCollumn"></th>
              <th className="table_cell headCell">Никнейм</th>
              <th className="table_cell headCell">Описание</th>
              <th className="table_cell headCell">Подписчиков</th>
              <th className="table_cell headCell">Просмотров</th>
              <th className="table_cell headCell"></th>
            </tr>
          </thead>
          <tbody>
            {streamers.map((streamer, num) => (
              <tr className="table_row" key={num}>
                <td className="table_cell">
                  <img className="table_img" src={streamer.logo} alt={streamer.name}/>
                </td>
                <td className="table_cell">
                  <TrimName name={streamer.name} />
                </td>
                <td className="table_cell">
                  {streamer.description.trim()
                    ? streamer.description
                    : (<em>описание отсутсвует</em>)}
                </td>
                <td className="table_cell">{streamer.followers}</td>
                <td className="table_cell">{streamer.views}</td>
                <td>
                  <button className="buttonAdd" onClick={() => addChannel(streamer)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
)};

export default SearchTable;