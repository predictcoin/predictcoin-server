import { _BscLoserPool, _BscWinnerPool } from "../domain/BscPredictionPools";
import {send as sendTx, call as callTx} from "../insfrastructure/transaction";

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