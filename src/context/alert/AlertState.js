import React, {useReducer} from 'react';
import {AlertContext} from './alertContext';
import {alertReducer} from './alertReducer';

export const AlertState = ({children}) => {
    const [state, dispatch] = useReducer(alertReducer, {visible: false});

    const hide = () => dispatch({type: "HIDE_ALERT"});

    const show = (text, type = "warning") => {
        console.log("show");
        dispatch({
            type: "SHOW_ALERT",
            payload: {text, type}
        });
        setTimeout(() => {
            hide();
        }, 3000);
    };

    

    return (
        <AlertContext.Provider value={{
            show, hide,
            alert: state
        }}>
            {children}
        </AlertContext.Provider>
    )
}