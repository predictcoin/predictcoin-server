// keepAlive.js
import cron from "node-cron";
import fetch from "node-fetch";

// globals
const url = process.env.SERVER_URL;

const keepAlive =() => {
  cron.schedule('0 */10 * * * *', () => {
    fetch(url)
      .catch((err: any) => console.log(err));
  });
};

export default keepAlive;
