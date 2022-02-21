

import BscPredictController from "./application/controllers/BscPredict";
import { predictionContract } from "./application/insfrastructure/BscContracts";

 
const predictionController = new BscPredictController(predictionContract);


const BscPrediction = async () => {
  //schedule start round
  const epoch = await predictionController.getCurrentRound();
  const round = await predictionController.getRound(epoch);

  // const bufferSeconds = await predictionController.getBufferSeconds();
  // const endTime = +round.closeTimestamp + bufferSeconds;
  
  console.log("Checking Bsc Prediction");
  if (round.oraclesCalled === false) {
    if (+round.endTimestamp*1000 > Date.now()) 
      predictionController.scheduleEndRound();
  }
  
  await predictionController.scheduleStartRound();
};

export default BscPrediction;
