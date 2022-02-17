/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type AdminChanged = ContractEventLog<{
  previousAdmin: string;
  newAdmin: string;
  0: string;
  1: string;
}>;
export type BeaconUpgraded = ContractEventLog<{
  beacon: string;
  0: string;
}>;
export type Claim = ContractEventLog<{
  sender: string;
  epoch: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type EndRound = ContractEventLog<{
  epoch: string;
  roundId: string;
  price: string;
  0: string;
  1: string;
  2: string;
}>;
export type NewAdminAddress = ContractEventLog<{
  admin: string;
  0: string;
}>;
export type NewBetAmount = ContractEventLog<{
  epoch: string;
  betAmount: string;
  0: string;
  1: string;
}>;
export type NewBufferAndIntervalSeconds = ContractEventLog<{
  bufferSeconds: string;
  intervalSeconds: string;
  0: string;
  1: string;
}>;
export type NewOperatorAddress = ContractEventLog<{
  operator: string;
  0: string;
}>;
export type NewOracle = ContractEventLog<{
  oracle: string;
  token: string;
  0: string;
  1: string;
}>;
export type NewOracleUpdateAllowance = ContractEventLog<{
  oracleUpdateAllowance: string;
  0: string;
}>;
export type NewTokenMaxBet = ContractEventLog<{
  tokenMaxBet: string;
  0: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Pause = ContractEventLog<{
  epoch: string;
  0: string;
}>;
export type Paused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type PredictBear = ContractEventLog<{
  sender: string;
  epoch: string;
  token: string;
  amount: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type PredictBull = ContractEventLog<{
  sender: string;
  epoch: string;
  token: string;
  amount: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type StartRound = ContractEventLog<{
  epoch: string;
  0: string;
}>;
export type TokenAdded = ContractEventLog<{
  token: string;
  0: string;
}>;
export type TokenRecovery = ContractEventLog<{
  token: string;
  amount: string;
  0: string;
  1: string;
}>;
export type TokenRemoved = ContractEventLog<{
  token: string;
  0: string;
}>;
export type TreasuryClaim = ContractEventLog<{
  amount: string;
  0: string;
}>;
export type Unpause = ContractEventLog<{
  epoch: string;
  0: string;
}>;
export type Unpaused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type Upgraded = ContractEventLog<{
  implementation: string;
  0: string;
}>;

export interface CrpPrediction extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): CrpPrediction;
  clone(): CrpPrediction;
  methods: {
    BNB(): NonPayableTransactionObject<string>;

    MAX_TREASURY_FEE(): NonPayableTransactionObject<string>;

    addTokens(_tokens: string[]): NonPayableTransactionObject<void>;

    adminAddress(): NonPayableTransactionObject<string>;

    betAmount(): NonPayableTransactionObject<string>;

    betSeconds(): NonPayableTransactionObject<string>;

    bufferSeconds(): NonPayableTransactionObject<string>;

    claim(epochs: (number | string | BN)[]): NonPayableTransactionObject<void>;

    claimTreasury(): NonPayableTransactionObject<void>;

    crp(): NonPayableTransactionObject<string>;

    currentEpoch(): NonPayableTransactionObject<string>;

    endRound(
      _tokens: string[],
      prices: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    getRound(_round: number | string | BN): NonPayableTransactionObject<{
      epoch: string;
      lockedTimestamp: string;
      closeTimestamp: string;
      totalAmount: string;
      oraclesCalled: boolean;
      _tokens: string[];
      lockedPrices: string[];
      closePrices: string[];
      bets: string[];
      0: string;
      1: string;
      2: string;
      3: string;
      4: boolean;
      5: string[];
      6: string[];
      7: string[];
      8: string[];
    }>;

    getStats(_round: number | string | BN): NonPayableTransactionObject<{
      _tokens: string[];
      bulls: string[];
      bears: string[];
      0: string[];
      1: string[];
      2: string[];
    }>;

    getTokens(): NonPayableTransactionObject<string[]>;

    getUserRounds(
      user: string,
      cursor: number | string | BN,
      size: number | string | BN
    ): NonPayableTransactionObject<{
      0: string[];
      1: [string, string, string, boolean][];
      2: string;
    }>;

    getUserRoundsLength(user: string): NonPayableTransactionObject<string>;

    initialize(
      _crp: string,
      _adminAddress: string,
      _operatorAddress: string,
      _intervalSeconds: number | string | BN,
      _bufferSeconds: number | string | BN,
      _betSeconds: number | string | BN,
      _betAmount: number | string | BN,
      _tokenMaxBet: number | string | BN
    ): NonPayableTransactionObject<void>;

    intervalSeconds(): NonPayableTransactionObject<string>;

    ledger(
      arg0: number | string | BN,
      arg1: string
    ): NonPayableTransactionObject<{
      position: string;
      token: string;
      amount: string;
      claimed: boolean;
      0: string;
      1: string;
      2: string;
      3: boolean;
    }>;

    lostRound(
      preder: string,
      round: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    operatorAddress(): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    pause(): NonPayableTransactionObject<void>;

    paused(): NonPayableTransactionObject<boolean>;

    predictBear(
      epoch: number | string | BN,
      token: string
    ): NonPayableTransactionObject<void>;

    predictBull(
      epoch: number | string | BN,
      token: string
    ): NonPayableTransactionObject<void>;

    recoverToken(
      _token: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    refundable(
      epoch: number | string | BN,
      user: string
    ): NonPayableTransactionObject<boolean>;

    removeTokens(
      _indexes: (number | string | BN)[],
      _tokens: string[]
    ): NonPayableTransactionObject<void>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    rounds(arg0: number | string | BN): NonPayableTransactionObject<{
      epoch: string;
      lockedTimestamp: string;
      closeTimestamp: string;
      totalAmount: string;
      oraclesCalled: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: boolean;
    }>;

    setAdmin(_adminAddress: string): NonPayableTransactionObject<void>;

    setBetAmount(
      _betAmount: number | string | BN
    ): NonPayableTransactionObject<void>;

    setBufferBetAndIntervalSeconds(
      _bufferSeconds: number | string | BN,
      _intervalSeconds: number | string | BN,
      _betSeconds: number | string | BN
    ): NonPayableTransactionObject<void>;

    setOperator(_operatorAddress: string): NonPayableTransactionObject<void>;

    setTokenMaxBet(
      _tokenMaxBet: number | string | BN
    ): NonPayableTransactionObject<void>;

    startRound(
      _tokens: string[],
      prices: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    tokenMaxBet(): NonPayableTransactionObject<string>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    treasuryAmount(): NonPayableTransactionObject<string>;

    unpause(): NonPayableTransactionObject<void>;

    upgradeTo(newImplementation: string): NonPayableTransactionObject<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: string | number[]
    ): PayableTransactionObject<void>;

    userRounds(
      arg0: string,
      arg1: number | string | BN
    ): NonPayableTransactionObject<string>;

    wonRound(
      preder: string,
      round: number | string | BN
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    AdminChanged(cb?: Callback<AdminChanged>): EventEmitter;
    AdminChanged(
      options?: EventOptions,
      cb?: Callback<AdminChanged>
    ): EventEmitter;

    BeaconUpgraded(cb?: Callback<BeaconUpgraded>): EventEmitter;
    BeaconUpgraded(
      options?: EventOptions,
      cb?: Callback<BeaconUpgraded>
    ): EventEmitter;

    Claim(cb?: Callback<Claim>): EventEmitter;
    Claim(options?: EventOptions, cb?: Callback<Claim>): EventEmitter;

    EndRound(cb?: Callback<EndRound>): EventEmitter;
    EndRound(options?: EventOptions, cb?: Callback<EndRound>): EventEmitter;

    NewAdminAddress(cb?: Callback<NewAdminAddress>): EventEmitter;
    NewAdminAddress(
      options?: EventOptions,
      cb?: Callback<NewAdminAddress>
    ): EventEmitter;

    NewBetAmount(cb?: Callback<NewBetAmount>): EventEmitter;
    NewBetAmount(
      options?: EventOptions,
      cb?: Callback<NewBetAmount>
    ): EventEmitter;

    NewBufferAndIntervalSeconds(
      cb?: Callback<NewBufferAndIntervalSeconds>
    ): EventEmitter;
    NewBufferAndIntervalSeconds(
      options?: EventOptions,
      cb?: Callback<NewBufferAndIntervalSeconds>
    ): EventEmitter;

    NewOperatorAddress(cb?: Callback<NewOperatorAddress>): EventEmitter;
    NewOperatorAddress(
      options?: EventOptions,
      cb?: Callback<NewOperatorAddress>
    ): EventEmitter;

    NewOracle(cb?: Callback<NewOracle>): EventEmitter;
    NewOracle(options?: EventOptions, cb?: Callback<NewOracle>): EventEmitter;

    NewOracleUpdateAllowance(
      cb?: Callback<NewOracleUpdateAllowance>
    ): EventEmitter;
    NewOracleUpdateAllowance(
      options?: EventOptions,
      cb?: Callback<NewOracleUpdateAllowance>
    ): EventEmitter;

    NewTokenMaxBet(cb?: Callback<NewTokenMaxBet>): EventEmitter;
    NewTokenMaxBet(
      options?: EventOptions,
      cb?: Callback<NewTokenMaxBet>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Pause(cb?: Callback<Pause>): EventEmitter;
    Pause(options?: EventOptions, cb?: Callback<Pause>): EventEmitter;

    Paused(cb?: Callback<Paused>): EventEmitter;
    Paused(options?: EventOptions, cb?: Callback<Paused>): EventEmitter;

    PredictBear(cb?: Callback<PredictBear>): EventEmitter;
    PredictBear(
      options?: EventOptions,
      cb?: Callback<PredictBear>
    ): EventEmitter;

    PredictBull(cb?: Callback<PredictBull>): EventEmitter;
    PredictBull(
      options?: EventOptions,
      cb?: Callback<PredictBull>
    ): EventEmitter;

    StartRound(cb?: Callback<StartRound>): EventEmitter;
    StartRound(options?: EventOptions, cb?: Callback<StartRound>): EventEmitter;

    TokenAdded(cb?: Callback<TokenAdded>): EventEmitter;
    TokenAdded(options?: EventOptions, cb?: Callback<TokenAdded>): EventEmitter;

    TokenRecovery(cb?: Callback<TokenRecovery>): EventEmitter;
    TokenRecovery(
      options?: EventOptions,
      cb?: Callback<TokenRecovery>
    ): EventEmitter;

    TokenRemoved(cb?: Callback<TokenRemoved>): EventEmitter;
    TokenRemoved(
      options?: EventOptions,
      cb?: Callback<TokenRemoved>
    ): EventEmitter;

    TreasuryClaim(cb?: Callback<TreasuryClaim>): EventEmitter;
    TreasuryClaim(
      options?: EventOptions,
      cb?: Callback<TreasuryClaim>
    ): EventEmitter;

    Unpause(cb?: Callback<Unpause>): EventEmitter;
    Unpause(options?: EventOptions, cb?: Callback<Unpause>): EventEmitter;

    Unpaused(cb?: Callback<Unpaused>): EventEmitter;
    Unpaused(options?: EventOptions, cb?: Callback<Unpaused>): EventEmitter;

    Upgraded(cb?: Callback<Upgraded>): EventEmitter;
    Upgraded(options?: EventOptions, cb?: Callback<Upgraded>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "AdminChanged", cb: Callback<AdminChanged>): void;
  once(
    event: "AdminChanged",
    options: EventOptions,
    cb: Callback<AdminChanged>
  ): void;

  once(event: "BeaconUpgraded", cb: Callback<BeaconUpgraded>): void;
  once(
    event: "BeaconUpgraded",
    options: EventOptions,
    cb: Callback<BeaconUpgraded>
  ): void;

  once(event: "Claim", cb: Callback<Claim>): void;
  once(event: "Claim", options: EventOptions, cb: Callback<Claim>): void;

  once(event: "EndRound", cb: Callback<EndRound>): void;
  once(event: "EndRound", options: EventOptions, cb: Callback<EndRound>): void;

  once(event: "NewAdminAddress", cb: Callback<NewAdminAddress>): void;
  once(
    event: "NewAdminAddress",
    options: EventOptions,
    cb: Callback<NewAdminAddress>
  ): void;

  once(event: "NewBetAmount", cb: Callback<NewBetAmount>): void;
  once(
    event: "NewBetAmount",
    options: EventOptions,
    cb: Callback<NewBetAmount>
  ): void;

  once(
    event: "NewBufferAndIntervalSeconds",
    cb: Callback<NewBufferAndIntervalSeconds>
  ): void;
  once(
    event: "NewBufferAndIntervalSeconds",
    options: EventOptions,
    cb: Callback<NewBufferAndIntervalSeconds>
  ): void;

  once(event: "NewOperatorAddress", cb: Callback<NewOperatorAddress>): void;
  once(
    event: "NewOperatorAddress",
    options: EventOptions,
    cb: Callback<NewOperatorAddress>
  ): void;

  once(event: "NewOracle", cb: Callback<NewOracle>): void;
  once(
    event: "NewOracle",
    options: EventOptions,
    cb: Callback<NewOracle>
  ): void;

  once(
    event: "NewOracleUpdateAllowance",
    cb: Callback<NewOracleUpdateAllowance>
  ): void;
  once(
    event: "NewOracleUpdateAllowance",
    options: EventOptions,
    cb: Callback<NewOracleUpdateAllowance>
  ): void;

  once(event: "NewTokenMaxBet", cb: Callback<NewTokenMaxBet>): void;
  once(
    event: "NewTokenMaxBet",
    options: EventOptions,
    cb: Callback<NewTokenMaxBet>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Pause", cb: Callback<Pause>): void;
  once(event: "Pause", options: EventOptions, cb: Callback<Pause>): void;

  once(event: "Paused", cb: Callback<Paused>): void;
  once(event: "Paused", options: EventOptions, cb: Callback<Paused>): void;

  once(event: "PredictBear", cb: Callback<PredictBear>): void;
  once(
    event: "PredictBear",
    options: EventOptions,
    cb: Callback<PredictBear>
  ): void;

  once(event: "PredictBull", cb: Callback<PredictBull>): void;
  once(
    event: "PredictBull",
    options: EventOptions,
    cb: Callback<PredictBull>
  ): void;

  once(event: "StartRound", cb: Callback<StartRound>): void;
  once(
    event: "StartRound",
    options: EventOptions,
    cb: Callback<StartRound>
  ): void;

  once(event: "TokenAdded", cb: Callback<TokenAdded>): void;
  once(
    event: "TokenAdded",
    options: EventOptions,
    cb: Callback<TokenAdded>
  ): void;

  once(event: "TokenRecovery", cb: Callback<TokenRecovery>): void;
  once(
    event: "TokenRecovery",
    options: EventOptions,
    cb: Callback<TokenRecovery>
  ): void;

  once(event: "TokenRemoved", cb: Callback<TokenRemoved>): void;
  once(
    event: "TokenRemoved",
    options: EventOptions,
    cb: Callback<TokenRemoved>
  ): void;

  once(event: "TreasuryClaim", cb: Callback<TreasuryClaim>): void;
  once(
    event: "TreasuryClaim",
    options: EventOptions,
    cb: Callback<TreasuryClaim>
  ): void;

  once(event: "Unpause", cb: Callback<Unpause>): void;
  once(event: "Unpause", options: EventOptions, cb: Callback<Unpause>): void;

  once(event: "Unpaused", cb: Callback<Unpaused>): void;
  once(event: "Unpaused", options: EventOptions, cb: Callback<Unpaused>): void;

  once(event: "Upgraded", cb: Callback<Upgraded>): void;
  once(event: "Upgraded", options: EventOptions, cb: Callback<Upgraded>): void;
}
