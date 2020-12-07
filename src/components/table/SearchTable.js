import React, { Fragment, useContext } from 'react';
import './commonTable.css';
import './searchTable.css';
import StreamersContext from 'context/streamersContext';
import {AlertContext} from 'context/alert/alertContext';
import TrimName from 'components/trimName/TrimName';
import sendRequest from 'js/sendRequest';

const isInTable = (newStreamer, tableState) => {
  let isIn = false;
  for (let i = 0; i < tableState.length; i++) {
    if (tableState[i].id === newStreamer.id) {
      isIn = true;
      break
    };
  };
  return isIn;
};

const addChannelAlertResult = (servResponse) => {
  let alertOpt = {};
  if(servResponse.addChannel.status && servResponse.subsWebHook.status) {
    // если стример успешно добавлен в БД и успешно прошла подписка на вебхуки
    alertOpt.text = servResponse.addChannel.message + ". " + servResponse.subsWebHook.message;
    alertOpt.type = "success";
    alertOpt.time = 3000;
  } else {
    if(!servResponse.addChannel.status && !servResponse.subsWebHook.status) {
      // если стример не добавлен в БД и подписка на вебхуки не прошла
      alertOpt.text = servResponse.addChannel.message + ". " + servResponse.subsWebHook.message;
      alertOpt.type = "alarm";
      alertOpt.time = 4000;
    } else {
      // если удалось что-то одно: стример добавлен в БД или подписка на вебхуки
      alertOpt.text = servResponse.addChannel.message + ". НО! " + servResponse.subsWebHook.message;
      alertOpt.type = "alarm";
      alertOpt.time = 4000;
    };
  };
  return alertOpt
};

// delete
  let makeFakeResponseFromServer = (newStreamer) => {
    return {
      newStreamer: newStreamer,
      addChannel: {
        message: "Канал " + newStreamer.name + "(" + newStreamer.id + ") добавлен в основной стэк",
        status: true
        // status: false
      },
      subsWebHook: {
        message: "Подписка на webhooks прошла успешно",
        status: true
        // status: false
      },
      isStreamNow: {
        message: 'На добавленном канале идет стрим - запущена запись статистики',
        status: true
        // status: false
      }
    };
  };
// delete

const SearchTable = ({streamers}) => {
  console.log(streamers);
  
  const alert = useContext(AlertContext);
  const {setStreamers} = useContext(StreamersContext);

  const addChannel = (streamer) => {
    //delete
      console.log("streamer", streamer);
      let nowURL = new URL(window.location.href);
      if (nowURL.hostname === 'localhost') {
        let newStreamer = {
          name: streamer.name,
          id: streamer._id,
          logo: streamer.logo,
          followers: {
            actual: String(streamer.followers),
            diff: "-"
          },
          onlineViewers:{
            inDays: null,
            max: "-",
            middle: "-"
          }
        };
        console.log(streamer.name, streamer._id, newStreamer);
        setStreamers(prevState => {
          if (isInTable(newStreamer, prevState)) {
            alert.show('Канал '+ newStreamer.name +' уже в основном стэке');
            return prevState;
          } else {
            let servResponse = makeFakeResponseFromServer(newStreamer);
            let alertObj = addChannelAlertResult(servResponse);
            alert.show(alertObj.text, alertObj.type, alertObj.time);
            if(servResponse.isStreamNow.status) {
              let timeDelay = alertObj.time + 750;
              console.log("timeDelay",timeDelay);
              let streamMessage = servResponse.isStreamNow.message;
              setTimeout(alert.show, timeDelay, streamMessage, "success");
            };
            return [...prevState, servResponse.newStreamer]
          };
        });
      // delete
    } else {
      sendRequest('POST', 'https://stat.metacorp.gg/api/addchannel', streamer)
      .then(res => {
        console.log("addChannel res:", res);
        let newStreamer = res.newStreamer;

        setStreamers(prevState => {
          if (isInTable(newStreamer, prevState)) {
            alert.show('Канал '+ newStreamer.name +' уже в основном стэке');
            return prevState;
          } else {
            let alertObj = addChannelAlertResult(res);
            alert.show(alertObj.text, alertObj.type, alertObj.time);
            if(res.isStreamNow.status) {
              let timeDelay = alertObj.time + 750;
              let streamMessage = res.isStreamNow.message;
              setTimeout(alert.show, timeDelay, streamMessage, "success");
            };
            return [...prevState, newStreamer]
          };
        });
      });
    };
  };

  return(
    <Fragment>
      {!streamers.length ? null : (
        <table className="table searchTable">
          <thead className="headRow">
            <tr>
              <th className="table_cell headCell logoCollumn"></th>
              <th className="table_cell headCell">Никнейм</th>
              <th className="table_cell headCell">Описание</th>
              <th className="table_cell headCell">Подписчиков</th>
              <th className="table_cell headCell">Просмотров</th>
              <th className="table_cell headCell"></th>
            </tr>
          </thead>
          <tbody>
            {streamers.map((streamer, num) => (
              <tr className="table_row" key={num}>
                <td className="table_cell">
                  <img className="table_img" src={streamer.logo} alt={streamer.name}/>
                </td>
                <td className="table_cell">
                  <TrimName name={streamer.name} />
                </td>
                <td className="table_cell">
                  {streamer.description.trim()
                    ? streamer.description
                    : (<em>описание отсутсвует</em>)}
                </td>
                <td className="table_cell">{streamer.followers}</td>
                <td className="table_cell">{streamer.views}</td>
                <td>
                  <button className="buttonAdd" onClick={() => addChannel(streamer)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
)};

export default SearchTable;