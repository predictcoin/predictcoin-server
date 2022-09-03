import { _BscLoserPool, _BscWinnerPool } from "../domain/BscPredictionPools";

const addPool = (instance: _BscLoserPool | _BscLoserPool, round: number | string) => {
  return instance.methods.add(round);
}

const getEpochLength = (instance: _BscLoserPool | _BscLoserPool) => {
  return instance.methods.getPoolLength();
}

const getPool = (instance: _BscLoserPool | _BscLoserPool, round: number | string) => {
  return instance.methods.poolInfo(round);
}

export {
  addPool,
  getPool,
  getEpochLength
}