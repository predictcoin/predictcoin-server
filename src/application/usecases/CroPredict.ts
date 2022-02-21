import { CroPredict } from "../domain/CroPredict";
import axios from "axios";

const startRound = (instance: CroPredict, tokens: string[], prices: number[]) => {
  return instance.methods.startRound(tokens, prices);
};

const endRound = (instance: CroPredict, tokens: string[], prices: number[]) => {
  return instance.methods.endRound(tokens, prices);
}

const getCurrentRound = (instance: CroPredict) => {
  return instance.methods.currentEpoch();
}

const getRound =  (instance: CroPredict, round: number|string) => {
  return instance.methods.getRound(round);
}

const getBufferSeconds = (instance: CroPredict) => {
  return instance.methods.bufferSeconds();
}

const getIntervalSeconds = (instance: CroPredict) => {
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
