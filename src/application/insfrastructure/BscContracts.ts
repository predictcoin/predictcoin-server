import BscPredictionAbi from "../../data/abis/BscPrediction.json";
import BscLoserPoolAbi from "../../data/abis/BscLoserPool.json";
import BscWinnerPoolAbi from "../../data/abis/BscWinnerPool.json";
import SportOracleAbi from "../../data/abis/BscSportOracle.json";
import * as Addresses from "../../data/addresses.json";
import web3 from "./BscWeb3";
import { BscPredict } from "../../application/domain/BscPredict";
import { _BscLoserPool, _BscWinnerPool } from "../domain/BscPredictionPools";
import { BscSportOracle } from "../domain/BscSportsOracle";
import { Erc20 } from "../../contracts/Erc20";
import Erc20Abi from "../../data/abis/Erc20.json";

// @ts-ignore
const {BscPrediction: predictionAddr, PRED} = Addresses[ process.env.NODE_ENV! ];

// @ts-ignore
const predictionContract = (new web3.eth.Contract( BscPredictionAbi, predictionAddr, {
  from: web3.eth.accounts.wallet[0].address,
} )) as BscPredict;

// @ts-ignore
const {BscLoserPool: loserPoolAddr, BscWinnerPool: winnerPoolAddr} = Addresses[process.env.NODE_ENV!];

// @ts-ignore
const loserPoolContract = (new web3.eth.Contract(BscLoserPoolAbi, loserPoolAddr, 
  {from: web3.eth.accounts.wallet[0].address})) as _BscLoserPool;

// @ts-ignore
const winnerPoolContract = (new web3.eth.Contract(BscWinnerPoolAbi, winnerPoolAddr, 
  {from: web3.eth.accounts.wallet[0].address})) as _BscWinnerPool;

// @ts-ignore
const {BscSportsOracle: sportOracleAddr} = Addresses[process.env.NODE_ENV];

// @ts-ignore
const sportOracleContract = (new web3.eth.Contract(SportOracleAbi, sportOracleAddr,
  {from: web3.eth.accounts.wallet[0].address})) as BscSportOracle;

// @ts-ignore
const pred = ((new web3.eth.Contract(Erc20Abi, PRED, {from: web3.eth.accounts.wallet[0].address}))) as Erc20;

export {
  predictionContract,
  winnerPoolContract,
  loserPoolContract,
  sportOracleContract,
  pred
}