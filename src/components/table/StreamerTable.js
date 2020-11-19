import React, { Fragment, useState, useEffect } from 'react';
import './table.css';
import './streamerTable.css';
import splitNumbers from 'js/splitNumbers';
import dateConverter from 'js/dateConverter';
import videoTimeConverter from 'js/videoTimeConverter';

const RedLamp = () => (
  <img src="https://www.pngkey.com/png/detail/16-164591_glossy-red-icon-button-clip-art-at-clker.png"
  alt="идет стрим" className="imgRedLamp" />
);

const GoOnStreamTimer = ({videoLength}) => {
  const [length, setLength] = useState(videoLength);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLength(length + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [length]);

  return (<span>{videoTimeConverter(length)}</span>)
};

const StreamerTable = ({videos,onAir}) => {
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
              <th className="table_cell headCell">Просмотров</th>
              <th className="lastStubCol"></th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, num) => (
              <tr className="table_row" key={num}>
                <td className="table_cell">{onAir && num === 0 ? <RedLamp /> : null}</td>
                <td className="table_cell">{video.game}</td>
                <td className="table_cell">{video.title}</td>
                <td className="table_cell">{dateConverter(video.dates.published_at)}</td>
                <td className="table_cell">
                  {onAir && num === 0 ? <GoOnStreamTimer videoLength={video.length}/> : videoTimeConverter(video.length)}
                </td>
                <td className="table_cell">
                  {onAir && num === 0 ? splitNumbers(onAir.viewers) : splitNumbers(video.views)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Fragment>
)};

export default StreamerTable;