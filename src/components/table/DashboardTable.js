import React, { Fragment } from 'react';
import './table.css';
import OnAir from 'components/onAir/OnAir';
import greenOrRedDiff from 'js/greenOrRedDiff';

const DashboardTable = ({streamers, border = ''}) => {
  console.log(streamers);

  const openStreamerPage = (streamer) => {
    if (streamer.id) {
      let streamerURL = new URL(window.location.href);
      streamerURL.searchParams.set('streamerID', streamer.id);
      streamerURL.pathname = 'streamer';
      document.location.href = streamerURL;
    };
  };

  return(
    <Fragment>
      {!streamers.length ? null : (
        <table className={"table " + border}>
          <thead className="headRow">
            <tr>
              <th className="table_cell headCell logoCollumn"></th>
              <th className="table_cell headCell">Никнейм</th>
              <th className="table_cell headCell">Cтримов<br />за 7 д.</th>
              <th className="table_cell headCell">Подписчиков<br />изм. за 7 д.</th>
              {/* <th className="table_cell headCell">Просмотров изм. за 30 д.</th> */}
              <th className="table_cell headCell">Max онлайн<br />за 30 д.</th>
              <th className="table_cell headCell">Средний онлайн<br />за 30 д.</th>
            </tr>
          </thead>
          <tbody>
            {streamers.map((streamer, num) => (
              <tr className="table_row mainTableRow"
              key={num} onClick={() => openStreamerPage(streamer)}>
                <td className="table_cell">
                  <img className="table_img" src={streamer.logo} alt={streamer.name}/>
                </td>
                <td className="table_cell">
                  <p className="table_name">{streamer.name}</p>
                  <OnAir stream={streamer.stream}/>
                </td>
                <td className="table_cell">{streamer.totalVideos}</td>
                <td className="table_cell">
                  <div className="cellContainer">
                    <span>{streamer.followers.actual}</span>
                    <span className={greenOrRedDiff("cell_valueDiff", streamer.followers.diff)}>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
)};

export default DashboardTable;