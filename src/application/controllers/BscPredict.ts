import {send as sendTx, call as callTx, call} from "../../utils/transaction";
import EmailController from "./Email";
import { emailController } from "../../index";
import { Round } from "../domain/BscPredict";

import { 
  startRound, 
  endRound,
  getRound,
  getBufferSeconds,
  getIntervalSeconds,
  getCurrentRound
} from "../usecases/BscPredict";
import {BscPredict as _BscPredict} from "../domain/BscPredict";

class BscPredictController{
  contract: _BscPredict;
  emailController: EmailController;

  private endCallback = async (status: boolean, ...msg: string[]) => {
    const epoch = await this.getCurrentRound();
    if (epoch === 0) return;
    if (status) {
      emailController.send(`Ended Epoch ${epoch} successfully`, msg.join(" ") );
      console.log(`Ended Epoch ${epoch} successfully`, msg.join(" "));
    } else {
      emailController.send(`Failed to end Epoch ${epoch}`, msg.join(" "));
      console.log(`Failed to end Epoch ${epoch}`, msg.join(" "));
    }
  };

  private startCallback = async (status:  boolean, ...msg: string[]) => {
      const epoch = await this.getCurrentRound();
      const title = status
        ? `Started Epoch ${+epoch + 1} successfully`
        : `Failed to start Epoch ${+epoch + 1}`;
      console.log(title, msg.join(" "));
      emailController.send( title, msg.join(" ") );
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
}

export default BscPredictController;
