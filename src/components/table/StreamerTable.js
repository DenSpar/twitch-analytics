import React, { Fragment } from 'react';
import './table.css';
import './streamerTable.css';
import splitNumbers from 'js/splitNumbers';
import dateConverter from 'js/dateConverter';

const StreamerTable = ({videos}) => {
return(
    <Fragment>
      {videos.length === 0 ? null : (
        <table className="table videoTable">
          <thead className="headRow">
            <tr>
              <th className="firstStubCol"></th>
              <th className="table_cell headCell">Игра</th>
              <th className="table_cell headCell">Описание</th>
              <th className="table_cell headCell">Дата</th>
              <th className="table_cell audienceCol" colSpan="3">Зрителей</th>
              <th className="lastStubCol"></th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th className="table_cell headCell">max</th>
              <th className="table_cell headCell">сред.</th>
              <th className="table_cell headCell">всего</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, num) => (
              <tr className="table_row" key={num}>
                <td className="table_cell"></td>
                <td className="table_cell">{video.game}</td>
                <td className="table_cell">{video.title}</td>
                <td className="table_cell">{dateConverter(video.dates.published_at)}</td>
                <td className="table_cell">{splitNumbers(Math.round(video.views * 0.8))}</td>
                <td className="table_cell">{splitNumbers(Math.round(video.views * 0.5))}</td>
                <td className="table_cell">{splitNumbers(video.views)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
)};

export default StreamerTable;