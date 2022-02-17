import { _CrpLoserPool, _CrpWinnerPool } from "../domain/CrpPredictionPools";

const addPool = (instance: _CrpLoserPool | _CrpLoserPool, round: number | string) => {
  return instance.methods.add(round);
}

export {
  addPool
}