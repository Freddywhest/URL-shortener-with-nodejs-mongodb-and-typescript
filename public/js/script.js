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
const urlForm = document.querySelector('#urlForm');
const feedback = document.querySelector('.feedback');
const urlBtn = document.querySelector('.urlBtn');
const resultPreview = document.querySelector('.result-preview');
const urlInput = document.querySelector('[name="url"]');
function showResult(data) {
    return `
        <div class="created-url">
            <span>Your destination Url: </span> <span> <a href="${data.url}" target="_blank"> ${data.url}</a> </span>
        </div>
        <div class="created-url">
            <span>Your short url: </span> <span> <a href="${data.domain}/${data.urlId}" target="_blank">${data.domain}/${data.urlId}</a> </span>
        </div>
        <div class="qrcode">
            <span>QR Code of your short url</span>
            <img src="${data.qrcodeImage}" width="270" alt="${data.domain}/${data.urlId}">
        </div>
    `;
}
function requestFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            url: urlInput.value.toLowerCase()
        };
        const request = yield fetch('/shorten', {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        });
        const result = yield request.json();
        console.log(result);
        if (result.status) {
            resultPreview.innerHTML = `<img src="/img/loading-loader.gif" width="120" alt="">`;
            setTimeout(() => {
                resultPreview.innerHTML = showResult(result);
                urlBtn.removeAttribute('disabled');
                urlBtn.innerText = 'Create';
                urlInput.value = '';
            }, 1500);
        }
        else {
            if (result.message) {
                feedback.innerText = `${result.message}`;
                urlBtn.removeAttribute('disabled');
                urlBtn.innerText = 'Create';
            }
        }
    });
}
urlForm === null || urlForm === void 0 ? void 0 : urlForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    feedback.innerText = '';
    urlBtn.setAttribute('disabled', 'true');
    urlBtn.innerText = 'Loading....';
    yield requestFunction();
}));
urlInput === null || urlInput === void 0 ? void 0 : urlInput.addEventListener('input', () => {
    feedback.innerText = '';
});
//# sourceMappingURL=script.js.map