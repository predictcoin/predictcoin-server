import axios from "axios";
import bscWeb3 from "../application/insfrastructure/BscWeb3";
import croWeb3 from "../application/insfrastructure/CroWeb3";
import BN from "bn.js";

async function getBscGasPrice() {
  let price;
  try{
    if(process.env.NODE_ENV === "development") {
      price = await bscWeb3.eth.getGasPrice();
    }
    let response = await axios.get(`https://owlracle.info/gas?apikey=${process.env.OWLRACLE_API_KEY}`);
    // @ts-ignore
    price = bscWeb3.utils.toWei(response?.data.fast.toString() as string, "gwei");
  }catch(err){
    console.log(err);
    price = await bscWeb3.eth.getGasPrice() || bscWeb3.utils.toWei("5", "gwei");
  }

  return (new BN(price).add(new BN(price).mul(new BN(0.1))).toString());
}

async function getCroGasPrice() {
  let price;
  try{
    price = await croWeb3.eth.getGasPrice();
  }catch(err){
    console.log(err);
    price = croWeb3.utils.toWei("5000", "gwei");
  }

  return (new BN(price).add(new BN(price).mul(new BN(0.1))).toString());
}

async function getGasPrice(chain: string){
  if(chain === "bsc"){
    return getBscGasPrice();
  }else {
    return getCroGasPrice();
  }
}

export default getGasPrice;
