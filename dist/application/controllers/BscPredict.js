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
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../utils/transaction");
const index_1 = require("../../index");
const BscPredict_1 = require("../usecases/BscPredict");
class BscPredictController {
    constructor(contract) {
        this.endCallback = (status, ...msg) => __awaiter(this, void 0, void 0, function* () {
            const epoch = yield this.getCurrentRound();
            if (epoch === 0)
                return;
            if (status) {
                index_1.emailController.send(`Ended Epoch ${epoch} successfully`, msg.join(" "));
                console.log(`Ended Epoch ${epoch} successfully`, msg.join(" "));
            }
            else {
                index_1.emailController.send(`Failed to end Epoch ${epoch}`, msg.join(" "));
                console.log(`Failed to end Epoch ${epoch}`, msg.join(" "));
            }
        });
        this.startCallback = (status, ...msg) => __awaiter(this, void 0, void 0, function* () {
            const epoch = yield this.getCurrentRound();
            const title = status
                ? `Started Epoch ${+epoch + 1} successfully`
                : `Failed to start Epoch ${+epoch + 1}`;
            console.log(title, msg.join(" "));
            index_1.emailController.send(title, msg.join(" "));
        });
        this.contract = contract;
        this.emailController = index_1.emailController;
    }
    startRound() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, transaction_1.send)((0, BscPredict_1.startRound)(this.contract), this.startCallback);
        });
    }
    endRound() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, transaction_1.send)((0, BscPredict_1.endRound)(this.contract), this.endCallback);
        });
    }
    getCurrentRound() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, transaction_1.call)((0, BscPredict_1.getCurrentRound)(this.contract));
        });
    }
    getRound(round) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, transaction_1.call)((0, BscPredict_1.getRound)(this.contract, round));
        });
    }
    getBufferSeconds() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, transaction_1.call)((0, BscPredict_1.getBufferSeconds)(this.contract));
        });
    }
    getIntervalSeconds() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, transaction_1.call)((0, BscPredict_1.getIntervalSeconds)(this.contract));
        });
    }
}
exports.default = BscPredictController;
//# sourceMappingURL=BscPredict.js.map