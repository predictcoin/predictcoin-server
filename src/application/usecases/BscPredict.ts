import { BscPredict } from "../domain/BscPredict";

const startRound = (instance: BscPredict) => {
  return instance.methods.startRound();
};

const endRound = (instance: BscPredict) => {
  return instance.methods.endRound();
}

const getCurrentRound = (instance: BscPredict) => {
  return instance.methods.currentEpoch();
}

const getRound =  (instance: BscPredict, round: number|string) => {
  return instance.methods.getRound(round);
}

const getBufferSeconds = (instance: BscPredict) => {
  return instance.methods.bufferSeconds();
}

const getIntervalSeconds = (instance: BscPredict) => {
  return instance.methods.intervalSeconds();
}

export {
  startRound, 
  endRound, 
  getCurrentRound, 
  getRound, 
  getBufferSeconds, 
  getIntervalSeconds
};
