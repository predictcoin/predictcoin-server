"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destructureDate = void 0;
const destructureDate = (date) => {
    const seconds = date.getUTCSeconds();
    const minutes = date.getUTCMinutes();
    const hour = date.getUTCHours();
    const weekDay = date.getUTCDay();
    const monthDay = date.getUTCDate();
    const month = date.getUTCMonth();
    return { seconds, minutes, hour, weekDay, monthDay, month };
};
exports.destructureDate = destructureDate;
//# sourceMappingURL=date.js.map