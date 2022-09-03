import { _CroLoserPool, _CroWinnerPool } from "../domain/CroPredictionPools";

const addPool = (instance: _CroLoserPool | _CroLoserPool, round: number | string) => {
  return instance.methods.add(round);
}

const getEpochLength = (instance: _CroLoserPool | _CroLoserPool) => {
  return instance.methods.getPoolLength();
}

const getPool = (instance: _CroLoserPool | _CroLoserPool, round: number | string) => {
  return instance.methods.poolInfo(round);
}

export {
  addPool,
  getEpochLength,
  getPool
}