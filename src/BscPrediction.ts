

import BscPredictController from "./application/controllers/BscPredict";
import { predictionContract } from "./application/insfrastructure/BscContracts";

 
const predictionController = new BscPredictController(predictionContract);


const BscPrediction = () => {
  //schedule start round
  predictionController.scheduleStartRound();

  //checks and schedules end round
  // const checkPrediction = async () => {
  //   const epoch = await predictionController.getCurrentRound();
  //   const round = await predictionController.getRound(epoch);
  //   const bufferSeconds = await predictionController.getBufferSeconds();
  //   const endTime = +round.endTimestamp + bufferSeconds;
  //   console.log("checking Prediction");
  //   if (round.oraclesCalled === false) {
  //     if (+round.endTimestamp*1000 > Date.now()) scheduleEndRound();
  //     else if(
  //       +round.endTimestamp*1000 < Date.now() &&
  //       Date.now() < endTime*1000 
  //     ){
  //       predictionController.endRound();
  //     }
  //   }
  // }

  // checkPrediction();
};

export default BscPrediction;