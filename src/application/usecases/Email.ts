import {EmailClient, SendEmailParams} from "../domain/Email";

export const sendEmail = async (client: EmailClient, content: SendEmailParams) => {
  const sent = await client.send(content);
  return sent
}

export const getSender = (client:EmailClient) => {
  return client.sender
}

export const getReceivers = (client:EmailClient) => {
  return client.recievers
}