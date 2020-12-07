import React from 'react';
import sendRequest from 'js/sendRequest';

const ApiDeleteForm = ({request, apiURL}) => {
    let num = '';
    let password = '';
    const submitHandlerAPI = (event) => {
        event.preventDefault();
    
        if (num.trim()) {
            sendRequest('POST', apiURL+num, {password: password})
            .then(response => console.log(response));
        } else {
          console.log('id не введен');
        }
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