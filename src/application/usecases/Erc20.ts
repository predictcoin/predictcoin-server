import { Erc20 } from "../../contracts/Erc20";

const maxUint256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const giveAllowance = (instance: Erc20, spender: string, amount: string = maxUint256,) => {
  return instance.methods.approve(spender, amount)
}

export { giveAllowance };
