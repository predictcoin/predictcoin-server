import Web3 from "web3";
const rpcUrls = [
  "https://rpc.vvs.finance",
  "https://mmf-rpc.xstaking.sg/",
  "https://evm-cronos.crypto.org",
  "https://cronosrpc-1.xstaking.sg",
  "https://rpc.nebkas.ro/",
  "https://cronosrpc-2.xstaking.sg",
  "https://rpc.artemisone.org/cronos/",
];

const web3 = new Web3(rpcUrls[0]!);

let counter = 1;

export const setCroProvider = async () => {
  for(;;){
    let connected = false;

    try{
      connected = await web3.eth.net.isListening();
    }catch(error){
      // @ts-ignore
      console.warn("Provider Message", error.message);
      connected = false;
    }

    if(!connected){
      console.log("changing provider");
      web3.setProvider(rpcUrls[counter]);
      counter = counter+1 === rpcUrls.length ? 0 : counter+1;
    }else{
      break
    }
  }
}

const wallet = web3.eth.accounts.wallet;
wallet.add(process.env.PRIVATE_KEY!);

export default web3;