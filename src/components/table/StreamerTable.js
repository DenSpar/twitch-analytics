import React, { Fragment, useState
  // , useEffect 
} from 'react';
import './table.css';
import './streamerTable.css';
// import videoTimeConverter from 'js/videoTimeConverter';

const RedLamp = () => (
  <img src="https://www.pngkey.com/png/detail/16-164591_glossy-red-icon-button-clip-art-at-clker.png"
  alt="идет стрим" className="imgRedLamp" />
);

// const GoOnStreamTimer = ({videoLength}) => {
//   const [length, setLength] = useState(videoLength);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setLength(length + 1);
//     }, 1000);
//     return () => clearInterval(intervalId);
//   }, [length]);

//   return (<span>{videoTimeConverter(length)}</span>)
// };

const VideoTable = ({videos, onAir}) => {
  return(
    <table className="table videoTable">
      <thead className="headRow">
        <tr>
          <th className="firstStubCol"></th>
          <th className="table_cell headCell">Игра</th>
          <th className="table_cell headCell">Описание</th>
          {/* <th className="table_cell headCell">Ссылка на видео</th> */}
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
            <td className="table_cell">
              {video.title}
              {video.url && (<Fragment>
                &nbsp;
                <a  className="defaultLink"
                href={video.url} target="_blank"
                rel="noreferrer noopener">
                  ссылка
                </a>
              </Fragment>)}
              </td>
            {/* <td className="table_cell">
              <a  className="defaultLink" href={video.url} target="_blank">открыть</a>
            </td> */}
            <td className="table_cell">{video.published_at}</td>
            <td className="table_cell">
              {//onAir && num === 0 ? <GoOnStreamTimer videoLength={video.length}/> : 
              video.length}
            </td>
            <td className="table_cell">
              {onAir && num === 0 ? onAir.viewers : video.views}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

const StreamsTable = ({streams}) => {
  return(
    <table className="table videoTable">
      <thead className="headRow">
        <tr>
          <th className="firstStubCol"></th>
          <th className="table_cell headCell" rowSpan="2">Игры</th>
          <th className="table_cell headCell" rowSpan="2">Описание</th>
          <th className="table_cell headCell" rowSpan="2">Дата и время начала записи</th>
          <th className="table_cell headCell" rowSpan="2">Длинна видео</th>
          <th className="table_cell headCell textAlign_center" colSpan="3">
            Количество зрители
          </th>
          <th className="table_cell headCell" rowSpan="2">Примечание</th>
          <th className="lastStubCol"></th>
        </tr>
        <tr>
          <th className="firstStubCol"></th>
          <th className="table_cell headCell">Макс.</th>
          <th className="table_cell headCell">Среднее</th>
          <th className="table_cell headCell">Медиана 50%</th>
          <th className="lastStubCol"></th>
        </tr>
      </thead>
      <tbody>
        {streams.map((stream, num) => (
          <tr className="table_row" key={num}>
            <td className="table_cell"></td>
            <td className="table_cell">
              {stream.games.map((game, gameNum) => <p className="table_cell_gameName" key={gameNum}>
                &#8226;&#160;{game}
                </p>)}
            </td>
            <td className="table_cell">{stream.title}</td>
            <td className="table_cell">{stream.stream.created_at}</td>
            <td className="table_cell">{stream.stream.length}</td>
            <td className="table_cell">{stream.maxViewers}</td>
            <td className="table_cell">{stream.midViewers}</td>
            <td className="table_cell">{stream.med50Viewers}</td>
            <td className="table_cell">{stream.notes.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

const StreamerTable = ({videos, streams, onAir}) => {
  const [activeTable, setActiveTable] = useState({streams: true, video: false});

  const showStreamsTable = () => {
    setActiveTable({video: false, streams: true});
  };

  const showVideoTable = () => {
    setActiveTable({video: true, streams: false});
  };

  const tableTitleClass = (prop) => {
    let classes = ["tableTitle"];
    if (prop === "video" && activeTable.video) { classes.push("tableTitle_active") };
    if (prop === "streams" && activeTable.streams) { classes.push("tableTitle_active") };
    return classes.join(" ");
  };

  return(
    <Fragment>
      {videos.length === 0 ? null : (
        <div className="block wideBlock">
          <div className="tableTitle_container">
            <h1 className={tableTitleClass("streams")} onClick={() => showStreamsTable()}>Список трансляций</h1>
            <h1 className={tableTitleClass("video")} onClick={() => showVideoTable()}>Архивные видео</h1>
          </div>
          {activeTable.streams && <StreamsTable streams={streams}/>}
          {activeTable.video && <VideoTable videos={videos} onAir={onAir}/>}
        </div>
      )}
    </Fragment>
  )
};

export default StreamerTable;