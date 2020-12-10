const fetch = require('node-fetch');

async function logResponse(log) {
    // Send log to log service
  await fetch(`http://localhost:8000/api/logs`, {
    method: 'POST',
    headers: { "content-type": 'application/json' },
    body: JSON.stringify(log)
  }).then((resp) => {
    return resp.json();
  }).then((body) => {
    console.log(`*****LOGGED ACTION*****`);
    console.dir(body);
  }).catch((error) => {
    console.log(`ERROR LOGGING: ` + error)
  });
}

module.exports = {logResponse};