function sendRequest(method, url, body = null, extHeaders = null) {
    let headers = {
      'Content-Type': 'application/json'
    };
    if (extHeaders) {
      headers = {...headers, ...extHeaders};
    };
  
    let reqOptions = {
      method: method,
      headers: headers
    };
    if (body) {
      reqOptions.body = JSON.stringify(body);
    };
  
    return fetch(url, reqOptions)
    .then(response => {
        if (response.ok) {
            if (response.status === 202) {
                return "запись успешно создана"
            } else {
                return response.json()
            }
        };
      return response.json().then(err => {
        const e = new Error('Что-то пошло не так');
        e.data = err;
        throw e
      });
    })
};

export default sendRequest;