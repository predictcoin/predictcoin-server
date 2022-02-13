
import cron from "node-cron";
import cronTime  from "cron-time-generator";
import BscPredictController from "./application/controllers/BscPredict";
import * as BscPredictionAbi from "./data/abis/BscPrediction.json";
import * as Addresses from "./data/addresses.json";
import { web3 } from ".";
import { BscPredict } from "./application/domain/BscPredict";
import { destructureDate } from "./utils/date";

// @ts-ignore
console.log(process.env.NODE_ENV, Addresses[process.env.NODE_ENV]);
// @ts-ignore
const {Prediction: predictionAddr} = Addresses[ process.env.NODE_ENV! ];

// @ts-ignore
const predictionContract = (new web3.eth.Contract( BscPredictionAbi, predictionAddr )) as BscPredict; 
const predictionController = new BscPredictController(predictionContract);

// const poolCallback = (pool, epoch) => (status, ...msg) => {
//   if(status){
//     msg = `Added ${pool} pool for round ${epoch} successfully.`;
//     sendEmail(msg, msg.join(" "));
//     console.log(msg);
//   }else{
//     msg = `Failed to add ${pool} pool for round ${epoch}.`;
//     sendEmail(msg, msg.join(" "));
//     console.log(msg);
//   }
// };


const scheduleEndRound = async () => {
  console.log("scheduling end round");
  const epoch = await predictionController.getCurrentRound()
  const round = await predictionController.getRound(epoch);
  const endTimestamp = round.endTimestamp;

  const date = new Date(+endTimestamp * 1000);

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
      // await sendTx(predictionContract.endRound, predictionCallback);
      // await sendTx(
      //   loserPoolContract.addLoserPool(epoch),
      //   poolCallback("loser", epoch)
      // );
      // await sendTx(
      //   winnerPoolContract.addWinnerPool(epoch),
      //   poolCallback("winner", epoch)
      // );
    },
    {
      timezone: "Europe/London",
    }
  );
};

const BscPrediction = () => {
  //schedule start round
  cron.schedule(cronTime.everyMondayAt(13, 0),  async function () {
    await predictionController.startRound();
    scheduleEndRound();
  }
  );

  //checks and schedules end round
  const checkPrediction = async () => {
    const epoch = await predictionController.getCurrentRound();
    const round = await predictionController.getRound(epoch);
    const bufferSeconds = await predictionController.getBufferSeconds();
    const endTime = +round.endTimestamp + bufferSeconds;

    if (round.oraclesCalled === false) {
      if (+round.endTimestamp*1000 > Date.now()) scheduleEndRound();
      else if(
        +round.endTimestamp*1000 < Date.now() &&
        Date.now() < endTime*1000 
      ){
        // sendTx(predictionContract.endRound, predictionCallback);
      }
    }
  }

  checkPrediction();
};

export default BscPrediction;