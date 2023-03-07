const urlForm: HTMLFormElement | null = document.querySelector('#urlForm');
const feedback: HTMLDivElement | null = document.querySelector('.feedback');
const urlBtn: HTMLButtonElement | null = document.querySelector('.urlBtn');
const resultPreview: HTMLDivElement | null = document.querySelector('.result-preview');
const urlInput: HTMLInputElement | null = document.querySelector('[name="url"]');

type ResponseData = {
    status: boolean,
    url?: string,
    urlId?: string,
    domain?: string,
    qrcodeImage?: string,
    message?: string,
    errCode?: string
}

type RequestData = {
    url: string
}

function showResult(data: ResponseData): string {
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

async function requestFunction(): Promise<void> {
    const data: RequestData = {
        url: urlInput!.value.toLowerCase()
    }
    const request: Response = await fetch('/shorten', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    });

    const result: ResponseData = await request.json();
    console.log(result);

    if (result.status) {
        resultPreview!.innerHTML = `<img src="/img/loading-loader.gif" width="120" alt="">`;
        setTimeout(() => {
            resultPreview!.innerHTML = showResult(result);
            urlBtn!.removeAttribute('disabled');
            urlBtn!.innerText = 'Create';
            urlInput!.value = '';
        }, 1500);
        
    }else{
        if(result.message){
            feedback!.innerText = `${result.message}`;
            urlBtn!.removeAttribute('disabled');
            urlBtn!.innerText = 'Create';
        }
    }
    
}

urlForm?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    feedback!.innerText = '';
    urlBtn!.setAttribute('disabled', 'true');
    urlBtn!.innerText = 'Loading....';
    await requestFunction();
});

urlInput?.addEventListener('input', () => {
    feedback!.innerText = '';
})