import React from 'react';
import './table.css';

const Table = ({streamers}) => {
    console.log('table begin');
    return(
      <table className="table">
        <thead>
          <tr>
            <th className="table_cell">name/logo</th>
            <th className="table_cell">num videos</th>
            <th className="table_cell">followers</th>
          </tr>
        </thead>
        <tbody>
          {streamers.map((streamer) => (
            <tr>
              <td className="table_cell">
                <div className="flex">
                  <img className="table_img" src={streamer.logo} />
                  <p>{streamer.name}</p>
                </div>                
              </td>
              <td className="table_cell">{streamer.videosNum}</td>
              <td className="table_cell">{streamer.followers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  };

  export default Table;