import React from 'react';
import sendRequest from 'js/sendRequest';

const ApiButtonAndForm = ({request, apiURL}) => {
    let num = '';
    const submitHandlerAPI = (event) => {
        event.preventDefault();
    
        if (num.trim()) {
            sendRequest('GET', apiURL+num)
            .then(response => console.log(response));
        } else {
          console.log('id не введен');
        }
    };

    return (
        <div className="flex devContainer_column ApiButtonAndForm">
            {request}
            <form onSubmit={submitHandlerAPI}>
                <input type='textarea' onChange={event => num = event.target.value} style={{ width: '200px' }}/>
                <input type='submit' />
            </form>
        </div>
    )
};

export default ApiButtonAndForm;