import { EmailClient, SendEmailParams } from "../domain/Email";
import {sendEmail, getReceivers, getSender} from "../usecases/Email"

class EmailController {
  client: EmailClient;
  sender: string;
  receivers: string[];

  constructor(emailClient: EmailClient){
    this.client = emailClient;
    this.sender = getSender(emailClient);
    this.receivers = getReceivers(emailClient)
  }

  async send(title:string, body:string) {
    return sendEmail(this.client, {
      title, body, 
      sender: this.sender, 
      receivers: this.receivers
    });
  }
}

export default EmailController;


