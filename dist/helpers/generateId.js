"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomstring_1 = require("randomstring");
function generateId(length) {
    return (0, randomstring_1.generate)({ length });
}
exports.default = generateId;
//# sourceMappingURL=generateId.js.map