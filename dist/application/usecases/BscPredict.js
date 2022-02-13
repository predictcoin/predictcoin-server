"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntervalSeconds = exports.getBufferSeconds = exports.getRound = exports.getCurrentRound = exports.endRound = exports.startRound = void 0;
const startRound = (instance) => {
    return instance.methods.startRound();
};
exports.startRound = startRound;
const endRound = (instance) => {
    return instance.methods.endRound();
};
exports.endRound = endRound;
const getCurrentRound = (instance) => {
    return instance.methods.currentEpoch();
};
exports.getCurrentRound = getCurrentRound;
const getRound = (instance, round) => {
    return instance.methods.getRound(round);
};
exports.getRound = getRound;
const getBufferSeconds = (instance) => {
    return instance.methods.bufferSeconds();
};
exports.getBufferSeconds = getBufferSeconds;
const getIntervalSeconds = (instance) => {
    return instance.methods.intervalSeconds();
};
exports.getIntervalSeconds = getIntervalSeconds;
//# sourceMappingURL=BscPredict.js.map