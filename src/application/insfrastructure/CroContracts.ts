import CroPredictionAbi from "../../data/abis/CrpPrediction.json";
import CroLoserPoolAbi from "../../data/abis/CrpLoserPool.json";
import CroWinnerPoolAbi from "../../data/abis/CrpWinnerPool.json";
import * as Addresses from "../../data/addresses.json";
import web3 from "./CroWeb3";
import { CroPredict } from "../domain/CroPredict";
import { _CroLoserPool, _CroWinnerPool } from "../domain/CroPredictionPools";

// @ts-ignore
const {CrpPrediction: predictionAddr} = Addresses[ process.env.NODE_ENV! ];

// @ts-ignore
const predictionContract = (new web3.eth.Contract( CroPredictionAbi, predictionAddr, {
  from: web3.eth.accounts.wallet[0].address,
} )) as CroPredict;

// @ts-ignore
const {CrpLoserPool: loserPoolAddr, CrpWinnerPool: winnerPoolAddr} = Addresses[process.env.NODE_ENV!];

// @ts-ignore
const loserPoolContract = (new web3.eth.Contract(CroLoserPoolAbi, loserPoolAddr, 
  {from: web3.eth.accounts.wallet[0].address})) as _CroLoserPool;

// @ts-ignore
const winnerPoolContract = (new web3.eth.Contract(CroWinnerPoolAbi, winnerPoolAddr, 
  {from: web3.eth.accounts.wallet[0].address})) as _CroWinnerPool;

export {
  predictionContract,
  winnerPoolContract,
  loserPoolContract
}