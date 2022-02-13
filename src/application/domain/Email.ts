
export interface SendEmailParams {
  sender: string,
  receivers: string[],
  title: string,
  body: string,
}

export interface EmailClient {
  recievers: string[],
  sender: string,
  send: (params: SendEmailParams) => Promise<void>
}
