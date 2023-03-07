"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UrlSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
        lowercase: true
    },
    urlId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date()
    }
});
exports.default = (0, mongoose_1.model)('Url', UrlSchema);
//# sourceMappingURL=Url.js.map