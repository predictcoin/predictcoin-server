"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../index");
function getGasPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.NODE_ENV === "development")
                throw new Error("No be prod we de");
            let response = yield axios_1.default.get(`https://owlracle.info/gas?apikey=${process.env.OWLRACLE_API_KEY}`);
            // @ts-ignore
            return Web3.utils.toWei(response.data.fast.toString(), "gwei");
        }
        catch (err) {
            console.log(err);
            const price = yield index_1.web3.eth.getGasPrice();
            return price;
        }
    });
}
exports.default = getGasPrice;
//# sourceMappingURL=gasPrice.js.map