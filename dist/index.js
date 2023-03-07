"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const db_1 = require("./config/db");
const main_router_1 = __importDefault(require("./routers/main.router"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.use('/', main_router_1.default);
app.get('*', (req, res) => {
    res.render('404', { title: "S-URLShortener", page: '404' });
});
mongoose_1.default
    .connect((0, db_1.dbUrl)(), (0, db_1.options)())
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(`Fail to connect to DB \nERR: ${err}`));
app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map