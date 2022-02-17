import CrpPredictionAbi from "../../data/abis/CrpPrediction.json";
import CrpLoserPoolAbi from "../../data/abis/CrpLoserPool.json";
import CrpWinnerPoolAbi from "../../data/abis/CrpWinnerPool.json";
import * as Addresses from "../../data/addresses.json";
import web3 from "./CrpWeb3";
import { CrpPredict } from "../../application/domain/CrpPredict";
import { _CrpLoserPool, _CrpWinnerPool } from "../domain/CrpPredictionPools";

// @ts-ignore
const {CrpPrediction: predictionAddr} = Addresses[ process.env.NODE_ENV! ];

// @ts-ignore
const predictionContract = (new web3.eth.Contract( CrpPredictionAbi, predictionAddr, {
  from: web3.eth.accounts.wallet[0].address,
} )) as CrpPredict;

// @ts-ignore
const {CrpLoserPool: loserPoolAddr, CrpWinnerPool: winnerPoolAddr} = Addresses[process.env.NODE_ENV!];

// @ts-ignore
const loserPoolContract = (new web3.eth.Contract(CrpLoserPoolAbi, loserPoolAddr, 
  {from: web3.eth.accounts.wallet[0].address})) as _CrpLoserPool;

// @ts-ignore
const winnerPoolContract = (new web3.eth.Contract(CrpWinnerPoolAbi, winnerPoolAddr, 
  {from: web3.eth.accounts.wallet[0].address})) as _CrpWinnerPool;

export {
  predictionContract,
  winnerPoolContract,
  loserPoolContract
}