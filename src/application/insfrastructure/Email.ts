import nodemailer from "nodemailer"
import { EmailClient, SendEmailParams } from "../domain/Email";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.com",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error) {
  if (error) {
    console.log("Email server error: ", error);
  } else {
    console.log("Email server is ready to take our messages");
  }
});

async function sendEmail (params: SendEmailParams) {
  const {title, body, receivers, sender} = params;
  try {
    await transporter.sendMail({
      from: sender, // sender address
      to: receivers,// list of receivers , 
      subject: title,
      text: body
    });  
  }catch(err){
    console.log("Email error", err);
  }
}

const EmailClient: EmailClient = {
  sender: process.env.SENDER!,
  recievers: process.env.RECEVERS?.split(",")!,
  send: sendEmail
}

export default EmailClient;
