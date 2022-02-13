import { BscPrediction } from "../../contracts/BscPrediction";

export interface Round {
  epoch: string;
  startTimestamp: string;
  endTimestamp: string;
  totalAmount: string;
  oraclesCalled: boolean;
  _tokens: string[];
  startPrices: string[];
  endPrices: string[];
  startOracleIds: string[];
  endOracleIds: string[];
  0: string;
  1: string;
  2: string;
  3: string;
  4: boolean;
  5: string[];
  6: string[];
  7: string[];
  8: string[];
  9: string[];
}

export interface BscPredict extends BscPrediction {};
