import React from 'react';
import './table.css';

//если не стримит - onAir: {stream: null}

const OnAir = ({stream}) => {
  if (stream) {
    return(
      <span className="table_onAir" >В ЭФИРЕ</span>
    )
  } else {return null}
};

const Table = ({streamers}) => {
    return(
      <table className="table">
        <thead>
          <tr>
            <th className="table_cell">logo/name</th>
            <th className="table_cell">videos</th>
            <th className="table_cell">followers</th>
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
              <td className="table_cell">{streamer.totalVideos}</td>
              <td className="table_cell">{streamer.followers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  };

  export default Table;