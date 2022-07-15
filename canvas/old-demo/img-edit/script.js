let canvas = document.getElementById('canvas');
let aideLayout = document.getElementById('aideLayout');
let ctrLayout = document.getElementById('ctrLayout');
let ctx = canvas.getContext('2d');
let alCtx = aideLayout.getContext('2d');
let ctrCtx = ctrLayout.getContext('2d');
let img = new Image();
let cWmax = 540;
let cWmax2 = 600;
let cHmax = 440;
let cHmax2 = 500;
let rate = 1;
let editUploadBtn = document.querySelector("#editUploadBtn");
let editUploadCancel = document.querySelector("#editUploadCancel");
let editUpload = document.querySelector("#editUpload");
let importImg = document.querySelector("#importImg");
let imgSize = document.querySelector("#imgSize");
let imgFilter = document.querySelector("#imgFilter");
let editFilter = document.querySelector("#editFilter");
let editRange = document.querySelector("#editRange");
let rangeR = document.querySelector("#rangeR");
let rangeG = document.querySelector("#rangeG");
let rangeB = document.querySelector("#rangeB");
let winW = window.innerWidth;
let winH = window.innerHeight;
let rgbFilter = {
    r: 0,
    g: 0,
    b: 0
};
let edit;
let posEdit = {
    x: 0,
    y: 0
}
let controls = [];
aideLayout.width = cWmax2;
aideLayout.height = cHmax2;
ctrLayout.width = cWmax2;
ctrLayout.height = cHmax2;
alCtx.strokeStyle = "rgba(0,0,0,0.08)";
let lineW = cWmax2 / 3;
let lineH = cHmax2 / 3;
let ctrDot = null;
let mouse = C.getOffset(ctrLayout);

// 上传图片
editUploadBtn.addEventListener('click', (e) => {
    editUpload.click();
    editFilter.style = "display: block";
})

// 重置
editUploadCancel.addEventListener('click', (e) => {
    editUploadBtn.style = "display: block";
    editUploadCancel.style = "display: none";
    importImg.style = "display: none";
    imgFilter.value = 0;
    editRange.style = "display: none";
    rgbFilter = {
        r: 0,
        g: 0,
        b: 0
    }
    rangeR.value = 50;
    rangeG.value = 50;
    rangeB.value = 50;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    alCtx.clearRect(0, 0, aideLayout.width, aideLayout.height);
    ctrCtx.clearRect(0, 0, ctrLayout.width, ctrLayout.height);
    window.cancelAnimationFrame(ctrDot);
})

// 渲染提交的图片
editUpload.addEventListener('change', (e) => {
    editUploadBtn.style = "display: none";
    editUploadCancel.style = "display: block";
    importImg.style = "display: block";
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
            renderImg();
        }
    };
    reader.readAsDataURL(file);
})

// 过滤图片
imgFilter.addEventListener('change', (e) => {
    rgbFilter = {
        r: 0,
        g: 0,
        b: 0
    }
    rangeR.value = 50;
    rangeG.value = 50;
    rangeB.value = 50;
    let type = Number(e.target.value);
    if (type === 0) {
        edit.render(ctx);
    }
    if (type > 0 && type !== 9) {
        edit.filter(ctx, type);
    }
    if (type === 9) {
        editRange.style = "display: block";
    } else {
        editRange.style = "display: none";
    }
})

// RGB
rangeR.addEventListener('change', (e) => {
    // value转换成-255~255值
    let value = Number(e.target.value);
    rgbFilter.r = C.rangeRGB(value);
    edit.filter(ctx, 9, rgbFilter);
})
rangeG.addEventListener('change', (e) => {
    // value转换成-255~255值
    let value = Number(e.target.value);
    rgbFilter.g = C.rangeRGB(value);
    edit.filter(ctx, 9, rgbFilter);
})
rangeB.addEventListener('change', (e) => {
    // value转换成-255~255值
    let value = Number(e.target.value);
    rgbFilter.b = C.rangeRGB(value);
    edit.filter(ctx, 9, rgbFilter);
})

// 重置RGB颜色
function resetRGB(type) {
    if (type === 'r') {
        rangeR.value = 50;
    }
    if (type === 'g') {
        rangeG.value = 50;
    }
    if (type === 'b') {
        rangeB.value = 50;
    }
    rgbFilter[type] = C.rangeRGB(50);
    edit.filter(ctx, 9, rgbFilter);
}

// 渲染图片
function renderImg() {
    let imgW = img.width;
    let imgH = img.height;
    if (imgW > cWmax || imgH > cHmax) {
        rate = imgW > imgH ? cWmax / imgW : cHmax / imgH;
    }
    imgW *= rate;
    imgH *= rate;
    let pos = {
        x: 0,
        y: 0
    }
    canvas.width = imgW;
    canvas.height = imgH;
    edit = new Edit({
        img: img,
        x: pos.x,
        y: pos.y,
        width: imgW,
        height: imgH
    })
    posEdit = {
        x: cWmax2 / 2 - edit.width / 2,
        y: cHmax2 / 2 - edit.height / 2
    }
    edit.render(ctx);
}

// 导出图片
function importFile() {
    let newImg = new Image();
    let type = edit.img.src.match(/^data:image\/\w+;/)[0].split('/')[1].replace(';', '');
    newImg = canvas.toDataURL(`image/${type}`)
    newImg = newImg.replace(`image/${type}`, 'image/octet-stream');
    let filename = (new Date()).getTime() + '.' + type;
    saveFile(newImg, filename)
}

// 保存文件
function saveFile(data, filename) {
    let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;

    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
}
