import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import isURL from 'validator/lib/isURL';
import QRcode from 'easyqrcodejs-nodejs'
import { RequestData, UrlData } from "../@types/types";
import generateId from "../helpers/generateId";
import Url from "../Schemas/Url";

async function checkUrl(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
    const { id } = req.params;
    const ifUrl: { _id: Types.ObjectId } | null = await Url.exists({ urlId: id });

    if(!ifUrl) return res.render('error', { domain: req.headers.host, title: "S-URLShortner", page: 'Invalid Url', message: "This is a 404 error, which means you've clicked on a bad link or entered an invalid URL." });

    const _url = await Url.find<UrlData>({ urlId: id });

    if(_url.length > 1){
        await Url.deleteMany({  urlId: id });
        return res.render('error', { domain: req.headers.host, title: "S-URLShortner", page: 'Invalid Url', message: "This is a 404 error, which means you've clicked on a bad link or entered an invalid URL." });
    }

    const oneUrl = await Url.findOne<UrlData | null>({ urlId: id });

    if(!oneUrl?.url){
        await Url.deleteOne({  urlId: id });
        return res.render('error', { domain: req.headers.host, title: "S-URLShortner", page: 'Invalid Url', message: "This is a 404 error, which means you've clicked on a bad link or entered an invalid URL." });
    }
    
    next();
}

function validateInputs(req: Request, res: Response, next: NextFunction):Response | void {
    const { url }: RequestData = req.body;
    if(!url) return res.send({ status: false, errCode: '001v', message: "Please enter/input url!" });
    if(!isURL(url)) return res.send({ status: false, errCode: '002v', message: "Please enter/input a valid url!" });
    next();
}

async function addUrl(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let newUrlId: string;
    let checkId: any[];
    do {
        newUrlId = generateId(8);
        checkId = await Url.find({ urlId: newUrlId })
    } while (checkId.length !== 0 && newUrlId.length !== 0);

    const { url } = req.body;
    const newUrl = new Url({
        url,
        urlId: newUrlId
    });

    await newUrl.save();

    const options = {
        text: `${req.protocol}://${req.headers.host}/${newUrlId}`,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        logo: "public/img/logo.png", 
        logoWidth: 80,
        logoHeight: 80,
          // ====== Title
        
        title: `Scan`, // content 
        titleFont: "normal normal bold 18px Arial", //font. default is "bold 16px Arial"
        titleColor: "#000000", // color. default is "#000"
        titleBackgroundColor: "#00ffff", // background color. default is "#fff"
        titleHeight: 50, // height, including subTitle. default is 0
        titleTop: 25, // draws y coordinates. default is 30

        // ====== SubTitle
        
        subTitle: `${req.protocol}://${req.headers.host}/${newUrlId}`, // content
        subTitleFont: "normal normal normal 14px Arial", // font. default is "14px Arial"
        subTitleColor: "#000000", // color. default is "4F4F4F"
        subTitleTop: 43, // draws y coordinates. default is 0
       
       
    }

    const qrcode = new QRcode(options);
    const qrcodeImage = await qrcode.toDataURL();

    res.send({
        status: true,
        url,
        urlId: newUrlId,
        domain: `${req.protocol}://${req.headers.host}`,
        qrcodeImage: qrcodeImage
    });
    
}

export {
    checkUrl,
    validateInputs,
    addUrl
}