import axios from "axios";
import { tokens, ids } from "../data/crpTokens";

const getPrices = async () => {
  const axiosConfig = {
    params : {
      ids: "bitcoin,ethereum,dogecoin,crypto-com-chain,litecoin",
      vs_currencies: "usd"
    }
  }
  const data = (await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",axiosConfig
  )).data as {[key:string]: {usd: number}};

  const prices = Object.keys(data).map(key => Math.trunc(data[key].usd*10**8))
  const _tokens = Object.keys(data).map(key => `${tokens[ids.indexOf(key)]}`);

  return {prices, tokens: _tokens}
}

export default getPrices;