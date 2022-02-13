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
exports.getReceivers = exports.getSender = exports.sendEmail = void 0;
const sendEmail = (client, content) => __awaiter(void 0, void 0, void 0, function* () {
    const sent = yield client.send(content);
    return sent;
});
exports.sendEmail = sendEmail;
const getSender = (client) => {
    return client.sender;
};
exports.getSender = getSender;
const getReceivers = (client) => {
    return client.recievers;
};
exports.getReceivers = getReceivers;
//# sourceMappingURL=Email.js.map