import React from 'react';
import sendRequest from 'js/sendRequest';

const ApiButton = ({request, apiURL}) => {
    const submitApiButton = () => {
        sendRequest('GET', apiURL)
        .then(response => console.log(response));
    };

    return (
        <button onClick={() => submitApiButton()}>{request}</button>
    )
};

export default ApiButton;