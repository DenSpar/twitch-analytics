import React, { Fragment, useContext, useState } from 'react';
import './table.css';
import StreamersContext from 'context/streamersContext';
import getStreamer from 'js/getStreamer';
import {AlertContext} from 'context/alert/alertContext';

const OnAir = ({stream}) => {
  if (stream) {
    return(
      <span className="table_onAir" >В ЭФИРЕ</span>
    )
  } else {return null}
};

const Table = ({streamers, target = 'main'}) => {
  let tableTarget = {};
  target === 'search' 
  ? tableTarget = {main: false, search: true} 
  : tableTarget = {main: true, search: false}
  // eslint-disable-next-line
  const [tableFor, setTableFor] = useState(tableTarget);
  
  const alert = useContext(AlertContext);
  const {setStreamers} = useContext(StreamersContext);
  const addChannel = (streamer) => {
    console.log(streamer.name, streamer._id);
    getStreamer(streamer._id)
    .then(newStreamer => {
      console.log("newStreamer", newStreamer);
      setStreamers(prevState => ([
        ...prevState,
        newStreamer
      ]));
      alert.show('Канал '+ (<strong>{newStreamer.name}</strong>) +' добавлен в основной стэк', 'success');
    });    
  };

  return(
    <Fragment>
      {!streamers.length ? null : (
        <table className="table">
          <thead>
            <tr>
              <th className="table_cell">logo/name</th>
              <th className="table_cell">
                {tableFor.main ? "videos" : "description"}
                
              </th>
              <th className="table_cell">followers</th>
              <th className="table_cell">views</th>
            </tr>
          </thead>
          <tbody>
            {streamers.map((streamer, num) => (
              <tr key={num}>
                <td className="table_cell">
                  <div className="table_nameContainer">
                    <img className="table_img" src={streamer.logo} alt={streamer.name}/>
                    <p className="table_name">{streamer.name}</p>
                    <OnAir stream={streamer.stream}/>
                  </div>
                </td>
                <td className="table_cell">
                  {tableFor.main ? streamer.totalVideos : streamer.description}
                </td>
                <td className="table_cell">{streamer.followers}</td>
                <td className="table_cell">{streamer.views}</td>
                {tableFor.search && (<td>
                  <button className="buttonAdd" onClick={() => addChannel(streamer)}>+</button>
                </td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
)};

  export default Table;