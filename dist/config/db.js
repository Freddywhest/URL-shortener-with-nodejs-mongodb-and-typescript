"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.dbUrl = void 0;
const dbUrl = () => `${process.env.MONGO_URL}`;
exports.dbUrl = dbUrl;
const options = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME
    };
};
exports.options = options;
//# sourceMappingURL=db.js.map