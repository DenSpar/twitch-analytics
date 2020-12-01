import React, { Fragment } from 'react';
import './commonTable.css';
import './dashboardTable.css';
import OnAir from 'components/onAir/OnAir';
import IsClosed from 'components/isClosed/IsClosed';
import greenOrRedDiff from 'js/greenOrRedDiff';
import TrimName from 'components/trimName/TrimName';

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
              <th className="table_cell headCell">Max онлайн<br />за 30 д.</th>
              <th className="table_cell headCell">Средний онлайн<br />за 30 д.</th>
            </tr>
          </thead>
          <tbody>
            {streamers.map((streamer, num) => (
              <tr className="table_row dashboardTableRow"
              key={num} onClick={() => openStreamerPage(streamer)}>
                <td className="table_cell">
                  {
                    !streamer.isClosed || streamer.logo
                    ? <img className="table_img" src={streamer.logo} alt={streamer.name} />
                    : <div className="table_img"></div>
                  }
                </td>
                <td className="table_cell">
                  <TrimName name={streamer.name} />
                  <OnAir stream={streamer.stream} />
                  <IsClosed isClosed={streamer.isClosed} />
                </td>
                <td className="table_cell">{streamer.streamsIn7Days}</td>
                <td className="table_cell">
                  <div className="cellContainer">
                    {
                      !streamer.isClosed
                      ? (<Fragment>
                        <span>{streamer.followers.actual}</span>
                        <span className={greenOrRedDiff("cell_valueDiff", streamer.followers.diff)}>
                          {streamer.followers.diff}
                        </span>
                      </Fragment>)
                      : (<Fragment>
                        <span>{streamer.followers.lastValue}</span>
                        <span className="cell_valueDiff">{streamer.followers.date}</span>
                      </Fragment>)
                    }
                    
                  </div>
                </td>
                <td className="table_cell">
                  <div className="cellContainer">
                    <span>{streamer.onlineViewers.max}</span>
                  </div>
                </td>
                <td className="table_cell">
                  <div className="cellContainer">
                    <span>{streamer.onlineViewers.middle}</span>
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