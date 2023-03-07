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
exports.addUrl = exports.validateInputs = exports.checkUrl = void 0;
const isURL_1 = __importDefault(require("validator/lib/isURL"));
const easyqrcodejs_nodejs_1 = __importDefault(require("easyqrcodejs-nodejs"));
const generateId_1 = __importDefault(require("../helpers/generateId"));
const Url_1 = __importDefault(require("../Schemas/Url"));
function checkUrl(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const ifUrl = yield Url_1.default.exists({ urlId: id });
        if (!ifUrl)
            return res.render('error', { domain: req.headers.host, title: "S-URLShortner", page: 'Invalid Url', message: "This is a 404 error, which means you've clicked on a bad link or entered an invalid URL." });
        const _url = yield Url_1.default.find({ urlId: id });
        if (_url.length > 1) {
            yield Url_1.default.deleteMany({ urlId: id });
            return res.render('error', { domain: req.headers.host, title: "S-URLShortner", page: 'Invalid Url', message: "This is a 404 error, which means you've clicked on a bad link or entered an invalid URL." });
        }
        const oneUrl = yield Url_1.default.findOne({ urlId: id });
        if (!(oneUrl === null || oneUrl === void 0 ? void 0 : oneUrl.url)) {
            yield Url_1.default.deleteOne({ urlId: id });
            return res.render('error', { domain: req.headers.host, title: "S-URLShortner", page: 'Invalid Url', message: "This is a 404 error, which means you've clicked on a bad link or entered an invalid URL." });
        }
        next();
    });
}
exports.checkUrl = checkUrl;
function validateInputs(req, res, next) {
    const { url } = req.body;
    if (!url)
        return res.send({ status: false, errCode: '001v', message: "Please enter/input url!" });
    if (!(0, isURL_1.default)(url))
        return res.send({ status: false, errCode: '002v', message: "Please enter/input a valid url!" });
    next();
}
exports.validateInputs = validateInputs;
function addUrl(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let newUrlId;
        let checkId;
        do {
            newUrlId = (0, generateId_1.default)(8);
            checkId = yield Url_1.default.find({ urlId: newUrlId });
        } while (checkId.length !== 0 && newUrlId.length !== 0);
        const { url } = req.body;
        const newUrl = new Url_1.default({
            url,
            urlId: newUrlId
        });
        yield newUrl.save();
        const options = {
            text: `${req.protocol}://${req.headers.host}/${newUrlId}`,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            logo: "public/img/logo.png",
            logoWidth: 80,
            logoHeight: 80,
            // ====== Title
            title: `Scan`,
            titleFont: "normal normal bold 18px Arial",
            titleColor: "#000000",
            titleBackgroundColor: "#00ffff",
            titleHeight: 50,
            titleTop: 25,
            // ====== SubTitle
            subTitle: `${req.protocol}://${req.headers.host}/${newUrlId}`,
            subTitleFont: "normal normal normal 14px Arial",
            subTitleColor: "#000000",
            subTitleTop: 43, // draws y coordinates. default is 0
        };
        const qrcode = new easyqrcodejs_nodejs_1.default(options);
        const qrcodeImage = yield qrcode.toDataURL();
        res.send({
            status: true,
            url,
            urlId: newUrlId,
            domain: `${req.protocol}://${req.headers.host}`,
            qrcodeImage: qrcodeImage
        });
    });
}
exports.addUrl = addUrl;
//# sourceMappingURL=redirectUrl.controller.js.map