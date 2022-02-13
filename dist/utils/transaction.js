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
exports.send = exports.call = void 0;
const gasPrice_1 = __importDefault(require("./gasPrice"));
function send(tx, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        //passing true to callback indicates a successfull tx and vice-versa
        try {
            const gas = yield tx.estimateGas();
            const gasPrice = yield (0, gasPrice_1.default)();
            yield tx.send({ gas: gas + 100000, gasPrice })
                .on('confirmation', function (confirmation, receipt) {
                if (confirmation !== 0)
                    return;
                callback && callback(true, receipt.transactionHash);
            })
                .on('error', function (error, receipt) {
                callback && callback(false, error.message, receipt ? receipt.transactionHash : "");
            });
        }
        catch (error) {
            callback && callback(false, error.message);
        }
    });
}
exports.send = send;
function call(tx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield tx.call();
            return res;
        }
        catch (error) {
            return error;
        }
    });
}
exports.call = call;
//# sourceMappingURL=transaction.js.map