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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redirectUrl_controller_1 = require("../controllers/redirectUrl.controller");
const Url_1 = __importDefault(require("../Schemas/Url"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    console.log(`${req.protocol}://${req.headers.host}`);
    res.render('index', { page: "Homepage", title: "S-URLShortner" });
});
router.get('/:id', redirectUrl_controller_1.checkUrl, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const getUrl = yield Url_1.default.findOne({ urlId: id });
    if (!getUrl)
        return res.render('error', { title: "" });
    res.redirect(getUrl.url);
}));
router.post('/shorten', redirectUrl_controller_1.validateInputs, redirectUrl_controller_1.addUrl);
exports.default = router;
//# sourceMappingURL=main.router.js.map