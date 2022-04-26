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
export type Deposit = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type EmergencyWithdraw = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type NewOperatorAddress = ContractEventLog<{
  operator: string;
  0: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Paused = ContractEventLog<{
  account: string;
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
export type Withdraw = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;

export interface LoserPool extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): LoserPool;
  clone(): LoserPool;
  methods: {
    BID(): NonPayableTransactionObject<string>;

    BONUS_MULTIPLIER(): NonPayableTransactionObject<string>;

    add(_epoch: number | string | BN): NonPayableTransactionObject<void>;

    allocPoint(): NonPayableTransactionObject<string>;

    bidPerBlock(): NonPayableTransactionObject<string>;

    deposit(
      _pid: number | string | BN,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    emergencyWithdraw(
      _pid: number | string | BN
    ): NonPayableTransactionObject<void>;

    getMultiplier(
      _from: number | string | BN,
      _to: number | string | BN
    ): NonPayableTransactionObject<string>;

    getPoolLength(): NonPayableTransactionObject<string>;

    initialize(
      _operator: string,
      _pred: string,
      _bid: string,
      _bidPerBlock: number | string | BN,
      _startBlock: number | string | BN,
      _maxPredDeposit: number | string | BN,
      _wallet: string,
      _prediction: string
    ): NonPayableTransactionObject<void>;

    lostRound(
      preder: string,
      round: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    maxPredDeposit(): NonPayableTransactionObject<string>;

    operatorAddress(): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    pause(): NonPayableTransactionObject<void>;

    paused(): NonPayableTransactionObject<boolean>;

    pendingBID(
      _pid: number | string | BN,
      _user: string
    ): NonPayableTransactionObject<string>;

    poolInfo(arg0: number | string | BN): NonPayableTransactionObject<{
      allocPoint: string;
      lastRewardBlock: string;
      accBIDPerShare: string;
      epoch: string;
      amount: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
    }>;

    poolLength(): NonPayableTransactionObject<string>;

    pred(): NonPayableTransactionObject<string>;

    prediction(): NonPayableTransactionObject<string>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    setAllocPoint(
      _allocPoint: number | string | BN
    ): NonPayableTransactionObject<void>;

    setMaxPredDeposit(
      _maxPredDeposit: number | string | BN
    ): NonPayableTransactionObject<void>;

    setOperator(_operatorAddress: string): NonPayableTransactionObject<void>;

    setPoolAllocPoint(
      _allocPoint: number | string | BN
    ): NonPayableTransactionObject<void>;

    startBlock(): NonPayableTransactionObject<string>;

    totalRewardDebt(): NonPayableTransactionObject<string>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    unpause(): NonPayableTransactionObject<void>;

    updateMultiplier(
      multiplierNumber: number | string | BN
    ): NonPayableTransactionObject<void>;

    updatePool(_pid: number | string | BN): NonPayableTransactionObject<void>;

    upgradeTo(newImplementation: string): NonPayableTransactionObject<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: string | number[]
    ): PayableTransactionObject<void>;

    userInfo(
      arg0: number | string | BN,
      arg1: string
    ): NonPayableTransactionObject<{
      amount: string;
      rewardDebt: string;
      0: string;
      1: string;
    }>;

    wallet(): NonPayableTransactionObject<string>;

    withdraw(
      _pid: number | string | BN,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

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

    Deposit(cb?: Callback<Deposit>): EventEmitter;
    Deposit(options?: EventOptions, cb?: Callback<Deposit>): EventEmitter;

    EmergencyWithdraw(cb?: Callback<EmergencyWithdraw>): EventEmitter;
    EmergencyWithdraw(
      options?: EventOptions,
      cb?: Callback<EmergencyWithdraw>
    ): EventEmitter;

    NewOperatorAddress(cb?: Callback<NewOperatorAddress>): EventEmitter;
    NewOperatorAddress(
      options?: EventOptions,
      cb?: Callback<NewOperatorAddress>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Paused(cb?: Callback<Paused>): EventEmitter;
    Paused(options?: EventOptions, cb?: Callback<Paused>): EventEmitter;

    Unpaused(cb?: Callback<Unpaused>): EventEmitter;
    Unpaused(options?: EventOptions, cb?: Callback<Unpaused>): EventEmitter;

    Upgraded(cb?: Callback<Upgraded>): EventEmitter;
    Upgraded(options?: EventOptions, cb?: Callback<Upgraded>): EventEmitter;

    Withdraw(cb?: Callback<Withdraw>): EventEmitter;
    Withdraw(options?: EventOptions, cb?: Callback<Withdraw>): EventEmitter;

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

  once(event: "Deposit", cb: Callback<Deposit>): void;
  once(event: "Deposit", options: EventOptions, cb: Callback<Deposit>): void;

  once(event: "EmergencyWithdraw", cb: Callback<EmergencyWithdraw>): void;
  once(
    event: "EmergencyWithdraw",
    options: EventOptions,
    cb: Callback<EmergencyWithdraw>
  ): void;

  once(event: "NewOperatorAddress", cb: Callback<NewOperatorAddress>): void;
  once(
    event: "NewOperatorAddress",
    options: EventOptions,
    cb: Callback<NewOperatorAddress>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Paused", cb: Callback<Paused>): void;
  once(event: "Paused", options: EventOptions, cb: Callback<Paused>): void;

  once(event: "Unpaused", cb: Callback<Unpaused>): void;
  once(event: "Unpaused", options: EventOptions, cb: Callback<Unpaused>): void;

  once(event: "Upgraded", cb: Callback<Upgraded>): void;
  once(event: "Upgraded", options: EventOptions, cb: Callback<Upgraded>): void;

  once(event: "Withdraw", cb: Callback<Withdraw>): void;
  once(event: "Withdraw", options: EventOptions, cb: Callback<Withdraw>): void;
}
