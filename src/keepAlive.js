// keepAlive.js
const cron = require('node-cron');
const fetch = require('node-fetch');

// globals
const url = "http://127.0.0.1:3000/";

(() => {
  cron.schedule('0 */25 * * * *', () => {

    fetch(url)
      .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
      .catch(err => {});

  });
})();