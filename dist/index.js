"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = exports.web3 = void 0;
//imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const keepAlive_1 = __importDefault(require("./utils/keepAlive"));
const web3_1 = __importDefault(require("web3"));
const Email_1 = __importDefault(require("./application/controllers/Email"));
const Email_2 = __importDefault(require("./application/insfrastructure/Email"));
dotenv_1.default.config();
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send('hello world');
});
// setup server needs
// keeps server active
(0, keepAlive_1.default)();
const web3 = new web3_1.default(process.env.PROVIDER_API);
exports.web3 = web3;
const wallet = web3.eth.accounts.wallet;
wallet.add(process.env.PRIVATE_KEY);
console.log(process.env.SENDGRID, "SENDER");
const emailController = new Email_1.default(Email_2.default);
exports.emailController = emailController;
app.listen(process.env.PORT || 3000);
//# sourceMappingURL=index.js.map