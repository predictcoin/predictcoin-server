import {send as sendTx, call as callTx, call} from "../../utils/transaction";
import EmailController from "./Email";
import { emailController } from "../../index";
import { Round } from "../domain/BscPredict";
import cron from "node-cron";
import cronTime  from "cron-time-generator";
import web3 from "../insfrastructure/BscWeb3";

import { 
  startRound, 
  endRound,
  getRound,
  getBufferSeconds,
  getIntervalSeconds,
  getCurrentRound
} from "../usecases/BscPredict";
import {BscPredict as _BscPredict} from "../domain/BscPredict";
import { destructureDate } from "../../utils/date";
import PredictionPoolController from "./BscPredictionPools";
import { loserPoolContract, winnerPoolContract } from "../insfrastructure/BscContracts";


const winnerPoolController = new PredictionPoolController(loserPoolContract);
const loserPoolController = new PredictionPoolController(winnerPoolContract)

class BscPredictController{
  contract: _BscPredict;
  emailController: EmailController;

  private endCallback = async (status: boolean, ...msg: string[]) => {
    const epoch = await this.getCurrentRound();
    if (epoch === 0) return;
    let title;
    if (status) {
      title = `Predictcoin: Ended Epoch ${epoch} successfully`;
    } else {
      title = `Predictcoin: Failed to end Epoch ${epoch}`;
    }

    console.log(title, msg.join(" "));
    emailController.send(title, msg.join(" "));
    if(status === true){
      await winnerPoolController.addPool(epoch);
      await loserPoolController.addPool(epoch);
    }
  };

  private startCallback = async (status:  boolean, ...msg: string[]) => {
      const epoch = await this.getCurrentRound();
      const title = status
        ? `Predictcoin: Started Epoch ${+epoch} successfully`
        : `Predictcoin: Failed to start Epoch ${+epoch+1}`;
      console.log(title, msg.join(" "));
      emailController.send( title, msg.join(" ") );
      if(status) this.scheduleEndRound();
    };

  constructor(contract: _BscPredict){
    this.contract = contract;
    this.emailController = emailController
  }

  async startRound (){
    await sendTx(startRound(this.contract), this.startCallback);
  }

  async endRound (){
    await sendTx(endRound(this.contract), this.endCallback);
  }

  async getCurrentRound(): Promise<number>{
    return callTx(getCurrentRound(this.contract));
  }

  async getRound (round: number|string): Promise<Round>{
    return callTx(getRound(this.contract, round));
  }

  async getBufferSeconds (): Promise<number>{
    return callTx(getBufferSeconds(this.contract));
  }

  async getIntervalSeconds (): Promise<number>{
    return callTx(getIntervalSeconds(this.contract));
  }

  async scheduleStartRound (): Promise<void> {
    const schedule = process.env.NODE_ENV === "production" 
      ? cronTime.everyMondayAt(13, 0) 
      : cronTime.every(6).minutes();
    cron.schedule(schedule,  async () => {
      await this.startRound();
    });
  }

  async scheduleEndRound (): Promise<void> {
    console.log("Predictcoin: Scheduling end round");
    const epoch = await this.getCurrentRound()
    const round = await this.getRound(epoch);
    const endTimestamp = round.endTimestamp;

    const date = new Date(+endTimestamp * 1000);

    const { seconds, minutes, hour, monthDay, month, weekDay } =
      destructureDate(date);

    cron.schedule(
      `${seconds} ${minutes} ${hour} ${monthDay} ${month + 1} ${weekDay}`,
      async () => {
        for (;;) {
          const block = await web3.eth.getBlock("pending");
          // added 10 seconds to account for blockchain time
          if (block.timestamp >= +endTimestamp+10) {
            break;
          }
        }

        await this.endRound();
      },
      {
        timezone: "Europe/London",
      }
    );
    console.log(`Predictcoin: End round ${round.epoch} scheduled`, date);
  };
}

export default BscPredictController;
