import React, { useContext } from 'react';
import './alert.css';
import {AlertContext} from 'context/alert/alertContext';
import {CSSTransition} from 'react-transition-group';

const Alert = () => {
    const {alert, hide} = useContext(AlertContext);

    return (
        <CSSTransition
        in={alert.visible}
        timeout={750}
        classNames={'alert'}
        mountOnEnter
        unmountOnExit
        >
            <div className={`alert_outerContainer alert-${alert.type || "warning"}`}>
                <div className='alert_innerContainer flex'>
                    <p className="alertText"><strong>Внимание!</strong> {alert.text}</p>
                    <button className='hideAlertBtn' onClick={hide}>&times;</button>
                </div>
            </div>
        </CSSTransition>
    )
};

export default Alert;