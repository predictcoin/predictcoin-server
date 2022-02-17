import { CrpPredict } from "../domain/CrpPredict";
import axios from "axios";

const startRound = (instance: CrpPredict, tokens: string[], prices: number[]) => {
  return instance.methods.startRound(tokens, prices);
};

const endRound = (instance: CrpPredict, tokens: string[], prices: number[]) => {
  return instance.methods.endRound(tokens, prices);
}

const getCurrentRound = (instance: CrpPredict) => {
  return instance.methods.currentEpoch();
}

const getRound =  (instance: CrpPredict, round: number|string) => {
  return instance.methods.getRound(round);
}

const getBufferSeconds = (instance: CrpPredict) => {
  return instance.methods.bufferSeconds();
}

const getIntervalSeconds = (instance: CrpPredict) => {
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
