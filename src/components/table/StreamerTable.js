import React, { Fragment } from 'react';
import './table.css';
import './streamerTable.css';
import splitNumbers from 'js/splitNumbers';
import dateConverter from 'js/dateConverter';
import videoTimeConverter from 'js/videoTimeConverter';

const StreamerTable = ({videos}) => {
return(
  <Fragment>
    {videos.length === 0 ? null : (
      <div className="block wideBlock">
        <h1 className="tableTitle">Список трансляций</h1>
        <table className="table videoTable">
          <thead className="headRow">
            <tr>
              <th className="firstStubCol"></th>
              <th className="table_cell headCell">Игра</th>
              <th className="table_cell headCell">Описание</th>
              <th className="table_cell headCell">Дата и время начала записи</th>
              <th className="table_cell headCell">Длинна видео</th>
              <th className="table_cell headCell"></th>
              <th className="table_cell headCell"></th>
              <th className="table_cell headCell">Зрителей</th>
              <th className="lastStubCol"></th>
            </tr>
            <tr>
              <th></th>
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
                <td className="table_cell">{videoTimeConverter(video.length)}</td>
                <td className="table_cell">----</td>
                <td className="table_cell">----</td>
                <td className="table_cell">{splitNumbers(video.views)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Fragment>
)};

export default StreamerTable;