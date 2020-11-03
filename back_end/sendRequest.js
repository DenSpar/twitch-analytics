module.exports = function sendRequest(method, url, body = null, extHeaders = null) {
  var fetch = require('node-fetch');
  let options = { 
    method: method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (extHeaders) {
    options.headers = {...options.headers, ...extHeaders};
  };

  if (body) {
    options.body = JSON.stringify(body);
  };

  return fetch(url, options)
  .then(response => {
    if (response.ok) {
      if (response.status === 202) {
        return "запись успешно создана"
      } else {
        return response.json()
      }
    };
  })
  .catch(err => console.log(err))

  // return fetch(url, reqOptions)
  // .then(response => {
  //   if (response.ok) {
  //     if (response.status === 202) {
  //       return "запись успешно создана"
  //     } else {
  //       return response.json()
  //     }
  //   };
  //   return response.json().then(err => {
  //     const e = new Error('Что-то пошло не так');
  //     e.data = err;
  //     throw e
  //   });
  // })
};