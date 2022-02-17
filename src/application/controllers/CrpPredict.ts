import {send as sendTx, call as callTx, call} from "../../utils/transaction";
import EmailController from "./Email";
import { emailController } from "../../index";
import { Round } from "../domain/CrpPredict";
import cron from "node-cron";
import cronTime  from "cron-time-generator";
import web3 from "../insfrastructure/CrpWeb3";

import { 
  startRound, 
  endRound,
  getRound,
  getBufferSeconds,
  getIntervalSeconds,
  getCurrentRound
} from "../usecases/CrpPredict";
import {CrpPredict as _CrpPredict} from "../domain/CrpPredict";
import { destructureDate } from "../../utils/date";
import PredictionPoolController from "./CrpPredictionPools";
import { loserPoolContract, winnerPoolContract } from "../insfrastructure/CrpContracts";
import getCrpTokenPrices from "../../utils/getCrpTokenPrices";


const winnerPoolController = new PredictionPoolController(loserPoolContract);
const loserPoolController = new PredictionPoolController(winnerPoolContract)

class BscPredictController{
  contract: _CrpPredict;
  emailController: EmailController;

  private endCallback = async (status: boolean, ...msg: string[]) => {
    const epoch = await this.getCurrentRound();
    if (epoch === 0) return;
    console.log(status, epoch);
    if (status) {
      emailController.send(`Ended Epoch ${epoch} successfully`, msg.join(" ") );
      console.log(`Ended Epoch ${epoch} successfully`, msg.join(" "));
    } else {
      emailController.send(`Failed to end Epoch ${epoch}`, msg.join(" "));
      console.log(`Failed to end Epoch ${epoch}`, msg.join(" "));
    }
    if(status === true){
      await winnerPoolController.addPool(epoch);
      await loserPoolController.addPool(epoch);
    }
  };

  private startCallback = async (status:  boolean, ...msg: string[]) => {
      const epoch = await this.getCurrentRound();
      const title = status
        ? `Started Epoch ${+epoch} successfully`
        : `Failed to start Epoch ${+epoch}`;
      console.log(title, msg.join(" "));
      emailController.send( title, msg.join(" ") );
      if(status) this.scheduleEndRound();
    };

  constructor(contract: _CrpPredict){
    this.contract = contract;
    this.emailController = emailController
  }

  async startRound (){
    const {prices, tokens} = await getCrpTokenPrices();
    await sendTx( startRound(this.contract, tokens, prices), this.startCallback);
  }

  async endRound (){
    const {prices, tokens} = await getCrpTokenPrices();
    await sendTx( endRound(this.contract, tokens, prices), this.endCallback);
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
      : cronTime.every(2).minutes();
    cron.schedule(schedule,  async () => {
      await this.startRound();
    });
  }

  async scheduleEndRound (): Promise<void> {
    console.log("Scheduling end round");
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
          if (block.timestamp >= +endTimestamp) {
            break;
          }
        }

        await this.endRound();
      },
      {
        timezone: "Europe/London",
      }
    );
    console.log(`End round ${round.epoch} scheduled`, date);
  };
}

export default BscPredictController;
