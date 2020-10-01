import React, { useContext } from 'react';
import './alert.css';
import {AlertContext} from 'context/alert/alertContext';

const Alert = () => {
    const {alert, hide} = useContext(AlertContext);

    if (!alert.visible) return null
    else return (
        <div className={`alert_container alert-${alert.type || "warning"} flex`}>
            <p><strong>Внимание!</strong> {alert.text}</p>
            <button onClick={hide}>&times;</button>
        </div>
    )
};

export default Alert;