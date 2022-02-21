import axios from "axios";
import bscWeb3 from "../application/insfrastructure/BscWeb3";
import croWeb3 from "../application/insfrastructure/CroWeb3";

async function getBscGasPrice() {
  try{
    if(process.env.NODE_ENV === "development") {
      const price = await bscWeb3.eth.getGasPrice();
      return price;
    }
    let response = await axios.get(`https://owlracle.info/gas?apikey=${process.env.OWLRACLE_API_KEY}`);
    // @ts-ignore
    return bscWeb3.utils.toWei(response.data.fast.toString(), "gwei");
  }catch(err){
    console.log(err);
    const price = await bscWeb3.eth.getGasPrice();
    return price;
  }
}

async function getCroGasPrice() {
  try{
    const price = await croWeb3.eth.getGasPrice();
    return price;
  }catch(err){
    console.log(err);
  }
}

async function getGasPrice(chain: string){
  if(chain === "bsc"){
    return getBscGasPrice();
  }else {
    return getCroGasPrice();
  }
}

export default getGasPrice;
