import {send as sendTx, call as callTx, call} from "../insfrastructure/transaction";
import EmailController from "./Email";
import { emailController } from "../../index";
import { Round } from "../domain/CroPredict";
import cron from "node-cron";
import cronTime  from "cron-time-generator";
import web3 from "../insfrastructure/CroWeb3";

import { 
  startRound, 
  endRound,
  getRound,
  getBufferSeconds,
  getIntervalSeconds,
  getCurrentRound
} from "../usecases/CroPredict";
import {CroPredict as _CrpPredict} from "../domain/CroPredict";
import { destructureDate } from "../../utils/date";
import PredictionPoolController from "./CroPredictionPools";
import { loserPoolContract, winnerPoolContract } from "../insfrastructure/CroContracts";
import getCrpTokenPrices from "../../utils/getCrpTokenPrices";


const winnerPoolController = new PredictionPoolController(loserPoolContract);
const loserPoolController = new PredictionPoolController(winnerPoolContract)

class BscPredictController{
  contract: _CrpPredict;
  emailController: EmailController;

  private endCallback = async (status: boolean, ...msg: string[]) => {
    const epoch = await this.getCurrentRound();
    if (epoch === "0") return;
    let title;
    if (status) {
      title = `CroPredict: Ended Epoch ${epoch} successfully`;
    } else {
      title = `CroPredict: Failed to end Epoch ${epoch}`;
    }

    console.log(title, msg.join(" "));
    emailController.send(title, msg.join(" "));
    if(status === true){
      // added pools after 10 seconds to account for slow node update
      setTimeout(
        async () => {
          await winnerPoolController.addPool(epoch);
          await loserPoolController.addPool(epoch);
        },
        10000
      )
    }
  };

  private startCallback = async (status:  boolean, ...msg: string[]) => {
      const epoch = await this.getCurrentRound();
      const title = status
        ? `CroPredict: Started Epoch ${+epoch} successfully`
        : `CroPredict: Failed to start Epoch ${+epoch+1}`;
      console.log(title, msg.join(" "));
      emailController.send( title, msg.join(" ") );
      if(status) this.scheduleEndRound();
    };

  constructor(contract: _CrpPredict){
    this.contract = contract;
    this.emailController = emailController
  }


  async addPools(){
    const epoch = await this.getCurrentRound();
    const round = await this.getRound(epoch);
    const winnerEpoch = await winnerPoolController.currentEpoch();
    const loserEpoch = await loserPoolController.currentEpoch();

    // add pools if round ends with no pools
    if(round.oraclesCalled === true ) {
      if(winnerEpoch.epoch !== epoch ){
        winnerPoolController.addPool(epoch)
      }
      if(loserEpoch.epoch !== epoch){
        loserPoolController.addPool(epoch)
      }
    }
    else {
      const formerRound = await this.getRound(+epoch-1);
      if(!formerRound.oraclesCalled) return;
      if(winnerEpoch.epoch !== formerRound.epoch ){
        winnerPoolController.addPool(formerRound.epoch)
      }
      if(loserEpoch.epoch !== formerRound.epoch){
        loserPoolController.addPool(formerRound.epoch)
      }
    }
  }

  async startRound (){
    const {prices, tokens} = await getCrpTokenPrices();
    await sendTx( startRound(this.contract, tokens, prices), this.startCallback);
  }

  async endRound (){
    const {prices, tokens} = await getCrpTokenPrices();
    await sendTx( endRound(this.contract, tokens, prices), this.endCallback);
  }

  async getCurrentRound(): Promise<string>{
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
    // await this.startRound();
  }

  async scheduleEndRound (): Promise<void> {
    console.log("CroPredict: Scheduling end round");
    const epoch = await this.getCurrentRound()
    const round = await this.getRound(epoch);
    const endTimestamp = round.closeTimestamp;
    const date = new Date(+endTimestamp * 1000);

    const { seconds, minutes, hour, monthDay, month, weekDay } =
      destructureDate(date);

    cron.schedule(
      `${seconds} ${minutes} ${hour} ${monthDay} ${month + 1} ${weekDay}`,
      async () => {
        for (;;) {
          const block = await web3.eth.getBlock("pending");
          // added 10 seconds to account for blockchain time
          if (block.timestamp  >= +endTimestamp+10) {
            break;
          }
        }
        await this.endRound();
      },
      {
        timezone: "Europe/London",
      }
    );
    console.log(`CroPredict: End round ${round.epoch} scheduled`, date);
  };
}

export default BscPredictController;
