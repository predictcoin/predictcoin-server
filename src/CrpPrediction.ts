

import CrpPredictController from "./application/controllers/CroPredict";
import { predictionContract } from "./application/insfrastructure/CroContracts";

 
const predictionController = new CrpPredictController(predictionContract);


const CrpPrediction = async () => {
  //schedule start round
  const epoch = await predictionController.getCurrentRound();
  const round = await predictionController.getRound(epoch);

  // const bufferSeconds = await predictionController.getBufferSeconds();
  // const endTime = +round.closeTimestamp + bufferSeconds;

  console.log("Checking Cro Prediction");
  if (round.oraclesCalled === false) {
    if (+round.closeTimestamp*1000 > Date.now()) 
      predictionController.scheduleEndRound();
  }else if(process.env.NODE_ENV === "development"){
    await predictionController.startRound()
  }

  // add pools if they arent there already
  await predictionController.addPools()
  
  await predictionController.scheduleStartRound();
};

export default CrpPrediction;
