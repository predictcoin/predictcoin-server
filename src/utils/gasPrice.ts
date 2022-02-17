import axios from "axios";
import web3 from "../application/insfrastructure/BscWeb3";

async function getGasPrice() {
  try{
    if(process.env.NODE_ENV === "development") {
      const price = await web3.eth.getGasPrice();
      return price;
    }
    let response = await axios.get(`https://owlracle.info/gas?apikey=${process.env.OWLRACLE_API_KEY}`);
    // @ts-ignore
    return Web3.utils.toWei(response.data.fast.toString(), "gwei");
  }catch(err){
    console.log(err);
    const price = await web3.eth.getGasPrice();
    return price;
  }
}

export default getGasPrice;
