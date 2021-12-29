// keepAlive.js
const cron = require('node-cron');
const fetch = require('node-fetch');

// globals
const url = "https://predictcoin-server.herokuapp.com/";

(() => {
  cron.schedule('0 */10 * * * *', () => {
    fetch(url)
      .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
      .catch(err => console.log(err));
  });
})();