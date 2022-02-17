import { _BscLoserPool, _BscWinnerPool } from "../domain/BscPredictionPools";

const addPool = (instance: _BscLoserPool | _BscLoserPool, round: number | string) => {
  return instance.methods.add(round);
}

export {
  addPool
}