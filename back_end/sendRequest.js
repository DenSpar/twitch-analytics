var fetch = require('node-fetch');
const formatedLog = require('./formatedLog.js');

module.exports = function sendRequest(method, url, body = null, extHeaders = null) {  
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
  .catch(err => formatedLog(err, 'ERROR'));
};