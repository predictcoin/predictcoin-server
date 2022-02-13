"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const node_cron_1 = __importDefault(require("node-cron"));
const cron_time_generator_1 = __importDefault(require("cron-time-generator"));
const BscPredict_1 = __importDefault(require("./application/controllers/BscPredict"));
const BscPredictionAbi = __importStar(require("./data/abis/BscPrediction.json"));
const Addresses = __importStar(require("./data/addresses.json"));
const _1 = require(".");
const date_1 = require("./utils/date");
// @ts-ignore
console.log(process.env.NODE_ENV, Addresses[process.env.NODE_ENV]);
// @ts-ignore
const { Prediction: predictionAddr } = Addresses[process.env.NODE_ENV];
// @ts-ignore
const predictionContract = (new _1.web3.eth.Contract(BscPredictionAbi, predictionAddr));
const predictionController = new BscPredict_1.default(predictionContract);
// const poolCallback = (pool, epoch) => (status, ...msg) => {
//   if(status){
//     msg = `Added ${pool} pool for round ${epoch} successfully.`;
//     sendEmail(msg, msg.join(" "));
//     console.log(msg);
//   }else{
//     msg = `Failed to add ${pool} pool for round ${epoch}.`;
//     sendEmail(msg, msg.join(" "));
//     console.log(msg);
//   }
// };
const scheduleEndRound = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("scheduling end round");
    const epoch = yield predictionController.getCurrentRound();
    const round = yield predictionController.getRound(epoch);
    const endTimestamp = round.endTimestamp;
    const date = new Date(+endTimestamp * 1000);
    const { seconds, minutes, hour, monthDay, month, weekDay } = (0, date_1.destructureDate)(date);
    node_cron_1.default.schedule(`${seconds} ${minutes} ${hour} ${monthDay} ${month + 1} ${weekDay}`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            for (;;) {
                const block = yield _1.web3.eth.getBlock("pending");
                if (block.timestamp >= +endTimestamp) {
                    break;
                }
            }
            // await sendTx(predictionContract.endRound, predictionCallback);
            // await sendTx(
            //   loserPoolContract.addLoserPool(epoch),
            //   poolCallback("loser", epoch)
            // );
            // await sendTx(
            //   winnerPoolContract.addWinnerPool(epoch),
            //   poolCallback("winner", epoch)
            // );
        });
    }, {
        timezone: "Europe/London",
    });
});
const BscPrediction = () => {
    //schedule start round
    node_cron_1.default.schedule(cron_time_generator_1.default.everyMondayAt(13, 0), function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield predictionController.startRound();
            scheduleEndRound();
        });
    });
    //checks and schedules end round
    const checkPrediction = () => __awaiter(void 0, void 0, void 0, function* () {
        const epoch = yield predictionController.getCurrentRound();
        const round = yield predictionController.getRound(epoch);
        const bufferSeconds = yield predictionController.getBufferSeconds();
        const endTime = +round.endTimestamp + bufferSeconds;
        if (round.oraclesCalled === false) {
            if (+round.endTimestamp * 1000 > Date.now())
                scheduleEndRound();
            else if (+round.endTimestamp * 1000 < Date.now() &&
                Date.now() < endTime * 1000) {
                // sendTx(predictionContract.endRound, predictionCallback);
            }
        }
    });
    checkPrediction();
};
exports.default = BscPrediction;
//# sourceMappingURL=BscPrediction.js.map