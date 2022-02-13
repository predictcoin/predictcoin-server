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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.sendgrid.com",
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});
transporter.verify(function (error) {
    if (error) {
        console.log("Email server error: ", error);
    }
    else {
        console.log("Email server is ready to take our messages");
    }
});
function sendEmail(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, body, receivers, sender } = params;
        try {
            yield transporter.sendMail({
                from: sender,
                to: receivers,
                subject: title,
                text: body
            });
        }
        catch (err) {
            console.log("Email error", err);
        }
    });
}
const EmailClient = {
    sender: process.env.SENDER,
    recievers: (_a = process.env.RECEVERS) === null || _a === void 0 ? void 0 : _a.split(","),
    send: sendEmail
};
exports.default = EmailClient;
//# sourceMappingURL=Email.js.map