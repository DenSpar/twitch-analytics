import React, {useContext} from 'react';
import {AlertContext} from 'context/alert/alertContext';
import sendRequest from 'js/sendRequest';

// delete
    // eslint-disable-next-line
    // let asmadey = {
    //     delStats: {
    //         message: 'статистика стримера №83597658 не найдена, нечего удалять',
    //         status: true
    //     },
    //     delStreamer: {
    //         message: 'стример №83597658 удален из основного списка',
    //         status: true,
    //     },
    //     nowStream: false,
    //     unsubWebHook: {
    //         message: 'Отписка от webhooks прошла успешно',
    //         status: true,
    //     }
    // };
// delete
const delAlertResult = (servResponse) => {
    let arrAlerts = [];
    let delay = 0;
    if(servResponse.message) {
        let alertOpt = {};
        alertOpt.text = servResponse.message;
        if(servResponse.status) { alertOpt.type = "success"; }
        else { alertOpt.type = "alarm"; }
        alertOpt.time = 3000;
        alertOpt.delay = delay;
        arrAlerts.push(alertOpt);
    } else {
        if(servResponse.delStreamer.status && servResponse.delStats.status && servResponse.unsubWebHook.status) {
            // если стример успешно удален из БД со стримерами и из БД статой + отписка от вебхуков прошла успешно
            let successResult = {
                text: "Канал успешно удален из всех БД и успешно отписан от вебхуков",
                type: "success",
                time: 4000,
                delay: delay
            };
            delay += 3750;
            arrAlerts.push(successResult);
        } else {
            // т.к. полей много, то все результаты по очереди буду выводить в алерты
            // резутат удаления из основной коллекции
            let delStreamer = {
                text: servResponse.delStreamer.message,
                time: 3000,
                delay: delay
            };
            delay += 3750;
            if(servResponse.delStreamer.status) { delStreamer.type = "success"; }
            else { delStreamer.type = "alarm"; };
            arrAlerts.push(delStreamer);

            // резутат удаления из коллекции со статой
            let delStats = {
                text: servResponse.delStats.message,
                time: 3000,
                delay: delay
            };
            delay += 3750;
            if(servResponse.delStats.status) { delStats.type = "success"; }
            else { delStats.type = "alarm"; };
            arrAlerts.push(delStats);

            // резутат отписки от вебхуков
            let unsubWebHook = {
                text: servResponse.unsubWebHook.message,
                time: 3000,
                delay: delay
            };
            delay += 3750;
            if(servResponse.unsubWebHook.status) { unsubWebHook.type = "success"; }
            else { unsubWebHook.type = "alarm"; };
            arrAlerts.push(unsubWebHook);
        };
        if(servResponse.nowStream) {
            let nowStream = {
                text: "Стример сейчас в эфире - после окончания стрима необходимо удалить новую запись из коллекции со статой",
                type: "warning",
                time: 4000,
                delay: delay
            };
            arrAlerts.push(nowStream);
        };
    };
    return arrAlerts;
};

const ApiDeleteForm = ({request, apiURL}) => {
    const alert = useContext(AlertContext);
    let num = '';
    let password = '';
    const submitHandlerAPI = (event) => {
        event.preventDefault();
    
        if (num.trim()) {
            sendRequest('POST', apiURL+num, {password: password})
            // new Promise (function (resolve, reject) { resolve(asmadey); })
            .then(response => {
                console.log(response);
                let alertsArr = delAlertResult(response);
                alertsArr.map(oneAlert => {
                    return setTimeout(alert.show, oneAlert.delay, oneAlert.text, oneAlert.type)
                });
            });
        } else {
            alert.show('id не введен');
        };
    };

    return (
        <div className="flex devContainer_column ApiDeleteForm">
            {request}
            <form onSubmit={submitHandlerAPI}>
                <input type='textarea' onChange={event => num = event.target.value} style={{ width: '200px' }}/>
                <input type='password' onChange={event => password = event.target.value} style={{ width: '200px' }}/>
                <input type='submit' />
            </form>
        </div>
    )
};

export default ApiDeleteForm;