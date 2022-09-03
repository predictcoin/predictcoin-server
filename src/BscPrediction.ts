

import BscPredictController from "./application/controllers/BscPredict";
import { predictionContract, } from "./application/insfrastructure/BscContracts";

 
const predictionController = new BscPredictController(predictionContract);


const BscPrediction = async () => {
  //schedule start round
  const epoch = await predictionController.getCurrentRound();
  const round = await predictionController.getRound(epoch);

  // const bufferSeconds = await predictionController.getBufferSeconds();
  // const endTime = +round.closeTimestamp + bufferSeconds;

  console.log("Checking Bsc Prediction");
  // schedule end round if round has started
  if (round.oraclesCalled === false) {
    if (+round.endTimestamp*1000 > Date.now()) 
    await predictionController.scheduleEndRound();
  }else if(process.env.NODE_ENV === "development"){
    await predictionController.startRound()
  }

  // add pools if they arent there already
  await predictionController.addPools()
  
  await predictionController.scheduleStartRound();
};

export default BscPrediction;
