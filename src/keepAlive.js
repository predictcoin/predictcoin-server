// keepAlive.js
const cron = require('node-cron');
const fetch = require('node-fetch');

// globals
const url = process.env.SERVER_URL;

(() => {
  cron.schedule('0 */10 * * * *', () => {
    fetch(url)
      .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
      .catch(err => console.log(err));
  });
})();