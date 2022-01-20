const { web3 } = require("./config");
const cron = require("node-cron");
const cronTime = require("cron-time-generator");
const { send: sendTx, call: callTx } = require("./transaction");
const sendEmail = require("./email");

const { predictionContract, loserPoolContract, winnerPoolContract } = 
require("./contracts");

const poolCallback = (pool, epoch) => (status, ...msg) => {
  if(status){
    msg = `Added ${pool} pool for round ${epoch} successfully.`;
    sendEmail(msg, msg.join(" "));
    console.log(msg);
  }else{
    msg = `Failed to add ${pool} pool for round ${epoch}.`;
    sendEmail(msg, msg.join(" "));
    console.log(msg);
  }
};

const predictionCallback = async (status, ...msg) => {
  const epoch = await callTx(predictionContract.getEpoch);
  if (epoch === 0) return;
  if (status) {
    sendEmail(`Ended Epoch ${epoch} successfully`, msg.join(" ") );
    console.log(`Ended Epoch ${epoch} successfully`, msg.join(" "));
  } else {
    sendEmail(`Failed to end Epoch ${epoch}`, msg.join(" "));
    console.log(`Failed to end Epoch ${epoch}`, msg.join(" "));
  }
};

const destructureDate = (date) => {
  const seconds = date.getUTCSeconds();
  const minutes = date.getUTCMinutes();
  const hour = date.getUTCHours();
  const weekDay = date.getUTCDay();
  const monthDay = date.getUTCDate();
  const month = date.getUTCMonth();

  return { seconds, minutes, hour, weekDay, monthDay, month };
};

const scheduleEndRound = async () => {
  console.log("scheduling end round");
  const epoch = await callTx(predictionContract.getEpoch);
  const round = await callTx(predictionContract.getRound(epoch));
  const endTimestamp = round.endTimestamp;

  const date = new Date(endTimestamp * 1000);

  const { seconds, minutes, hour, monthDay, month, weekDay } =
    destructureDate(date);

  cron.schedule(
    `${seconds} ${minutes} ${hour} ${monthDay} ${month + 1} ${weekDay}`,
    async function () {
      for (;;) {
        const block = await web3.eth.getBlock("pending");
        if (block.timestamp >= +endTimestamp) {
          break;
        }
      }
      await sendTx(predictionContract.endRound, predictionCallback);
      await sendTx(
        loserPoolContract.addLoserPool(epoch),
        poolCallback("loser", epoch)
      );
      await sendTx(
        winnerPoolContract.addWinnerPool(epoch),
        poolCallback("winner", epoch)
      );
    },
    {
      timezone: "Europe/London",
    }
  );
};

module.exports = () => {
  //schedule start round
  cron.schedule(cronTime.everyMondayAt(13, 0),  async function () {
    const epoch = await callTx(predictionContract.getEpoch);
    const callback = (status, ...msg) => {
      const title = status
        ? `Started Epoch ${+epoch + 1} successfully`
        : `Failed to start Epoch ${+epoch + 1}`;
      console.log(title, msg.join(" "));
      sendEmail( title, msg.join(" ") );
      if (status) scheduleEndRound();
    };
    console.log("starting round");
    await sendTx(predictionContract.startRound, callback);
  }
  );

  //checks and schedules end round
  const checkPrediction = async () => {
    const epoch = await callTx(predictionContract.getEpoch);
    const round = await callTx(predictionContract.getRound(epoch));
    const bufferSeconds = await callTx(predictionContract.getBufferSeconds);
    const endTime = round.endTimestamp + bufferSeconds;

    if (round.oraclesCalled === false) {
      if (round.endTimestamp*1000 > Date.now()) scheduleEndRound();
      else if(
        round.endTimestamp*1000 < Date.now() &&
        Date.now() < endTime*1000 
      ){
        sendTx(predictionContract.endRound, predictionCallback);
      }
    }
  }

  checkPrediction();
};
