"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// keepAlive.js
const node_cron_1 = __importDefault(require("node-cron"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// globals
const url = process.env.SERVER_URL;
const keepAlive = () => {
    node_cron_1.default.schedule('0 */10 * * * *', () => {
        (0, node_fetch_1.default)(url)
            .then((res) => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
            .catch((err) => console.log(err));
    });
};
exports.default = keepAlive;
//# sourceMappingURL=keepAlive.js.map