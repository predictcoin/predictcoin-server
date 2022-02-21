import { _CroLoserPool, _CroWinnerPool } from "../domain/CroPredictionPools";

const addPool = (instance: _CroLoserPool | _CroLoserPool, round: number | string) => {
  return instance.methods.add(round);
}

export {
  addPool
}