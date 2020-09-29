import React, { Fragment } from 'react';
import './table.css';

const OnAir = ({stream}) => {
  if (stream) {
    return(
      <span className="table_onAir" >В ЭФИРЕ</span>
    )
  } else {return null}
};

const Table = ({streamers}) => (
  <Fragment>
    {!streamers.length ? null : (
      <table className="table">
        <thead>
          <tr>
            <th className="table_cell">logo/name</th>
            <th className="table_cell">videos</th>
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
              <td className="table_cell">{streamer.totalVideos}</td>
              <td className="table_cell">{streamer.followers}</td>
              <td className="table_cell">{streamer.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Fragment>
);

  export default Table;