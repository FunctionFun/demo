let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 600;
let canvasHeight = 600;
let fillColor = "#23bed5";
let rate = 0.5;
let giftBox = {
    x: canvasWidth / 2 - 420 * rate / 2,
    y: 0,
    width: 420 * rate,
    height: 453 * rate
}
let giftBoxBg;
let giftBoxBgLoad = false;
let ball1;
let ball1Load = false;
let ball2;
let ball2Load = false;
let ball3;
let ball3Load = false;
let ball1Data = {
    x: canvasWidth / 2 - 256 * rate / 2 - 10,
    y: 0,
    width: 256 * rate,
    height: 484 * rate
}
let ball2Data = {
    x: canvasWidth / 2 - 278 * rate / 2 - 80,
    y: 0,
    width: 278 * rate,
    height: 336 * rate
}
let ball3Data = {
    x: canvasWidth / 2 - 250 * rate / 2 + 68,
    y: 0,
    width: 250 * rate,
    height: 338 * rate
}
let chipData = [];
let textStyle = {
    size: "24",
    color: "#D87B86",
    shadowColor: "#AF5060"
}


// 缓存礼物盒的Y坐标
let tempGifBoxY = 600 - 453 * rate - 50;

// 判断鼠标是否在指定区域
function isAreaItem(data) {
    let res = false
    if (data.x > data.x2 && data.y > data.y2 && data.x < data.x2 + data.width && data.y < data.y2 + data.height) {
        res = true
    }
    return res
}

// 导入礼物盒
function loadGiftBox() {
    // 导入背景图
    giftBoxBg = new Image();
    giftBoxBg.onload = function () {
        giftBoxBgLoad = true;
    }
    giftBoxBg.src = './img/box.png';
}

// 导入气球
function loadBall() {
    // 导入气球2
    ball2 = new Image();
    ball2.onload = function () {
        ball2Load = true;
    }
    ball2.src = './img/ball2.png';

    // 导入气球3
    ball3 = new Image();
    ball3.onload = function () {
        ball3Load = true;
    }
    ball3.src = './img/ball3.png';

    // 导入气球1
    ball1 = new Image();
    ball1.onload = function () {
        ball1Load = true;
    }
    ball1.src = './img/ball1.png';
}

// 绘制气球和礼物盒
function drawBallBox() {
    // 设置阴影
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = -2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0,0,0,0.12)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(ball2, ball2Data.x, ball2Data.y, ball2Data.width, ball2Data.height);
    ctx.drawImage(ball3, ball3Data.x, ball3Data.y, ball3Data.width, ball3Data.height);
    ctx.drawImage(ball1, ball1Data.x, ball1Data.y, ball1Data.width, ball1Data.height);
    ctx.drawImage(giftBoxBg, giftBox.x, giftBox.y, giftBox.width, giftBox.height);
}

// 入场动画
function drawEnter() {
    let enterAni = setInterval(() => {
        if (ball1Load && ball2Load && ball3Load && giftBoxBgLoad) {
            giftBox.y = giftBox.y + 20;
            ball1Data.y = giftBox.y - 484 * rate + 12;
            ball2Data.y = giftBox.y - 336 * rate + 12;
            ball3Data.y = giftBox.y - 338 * rate + 20;
            if (giftBox.y >= tempGifBoxY) {
                clearInterval(enterAni)
            }
            drawBallBox()
        }
    }, 100);
}

let fontSize;

// 放飞气球
function flyBall() {
    let flyAni = setTimeout(() => {
        drawBallBox();
        bloomChip();
        if (ball1Data.y <= 20 || ball2Data.y <= 20 || ball3Data.y <= 20) {
            // 显示文字
            let textContent = "❤ bless you ❤";
            ctx.font = "48px Microsoft YaHei";
            let textWidth = ctx.measureText(textContent).width;
            // 清除阴影
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "rgba(0,0,0,0)";
            ctx.fillStyle = textStyle.shadowColor;
            ctx.fillText(textContent, canvasWidth / 2 - textWidth / 2 + 2, canvasHeight / 2 + 2);
            ctx.fillStyle = textStyle.color;
            ctx.fillText(textContent, canvasWidth / 2 - textWidth / 2, canvasHeight / 2);
        } else {
            ball1Data.y = ball1Data.y - 12;
            ball2Data.y = ball2Data.y - 16;
            ball3Data.y = ball3Data.y - 14;
        }
        window.requestAnimationFrame(flyBall);
    }, 100);
}

// 导入彩屑
function loadChip() {
    for (let i = 0; i < 11; i++) {
        let chipItem = new Image();
        chipItem.onload = function () {
            chipItem.offsetX = randomNumber(600);
            chipItem.offsetY = giftBox.y;
            chipData.push(chipItem);
        }
        let path = Number(i) + Number(1);
        chipItem.src = './img/chip' + path + '.png';
    }
}

// 爆炸彩屑
function bloomChip() {
    for (let chipItem of chipData) {
        let offsetX = randomNumber() < 5 ? -randomNumber(100) : randomNumber(100);
        let offsetY = randomNumber() < 5 ? -randomNumber(125) : randomNumber(5);
        chipItem.offsetX = chipItem.offsetX + offsetX;
        chipItem.offsetY = chipItem.offsetY + offsetY;
        if (chipItem.offsetX < 0 || chipItem.offsetY < 0) {
            chipItem.offsetX = giftBox.x + giftBox.width / 2;
            chipItem.offsetY = giftBox.y + 20;
        }
        ctx.drawImage(chipItem, chipItem.offsetX, chipItem.offsetY, chipItem.width * rate, chipItem.height * rate);
    }
}

// 随机数1~100
function randomNumber(rate = 10) {
    return Math.round(Math.random() * rate);
}

// 渲染画布
function initCanvas() {

    // 1. 设置画布大小
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 2. 导入气球
    loadBall();

    // 3. 导入礼物盒
    loadGiftBox();

    // 4. 气球和礼物盒入场动画
    drawEnter();

    // 5. 监听鼠标悬停事件
    let canHover = true;
    canvas.addEventListener('mousemove', (e) => {
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        if (canHover) {
            canHover = false;
            let isHover = isAreaItem({
                x: mouseX,
                y: mouseY,
                x2: canvas.offsetLeft + giftBox.x,
                y2: canvas.offsetTop + giftBox.y,
                width: giftBox.width,
                height: giftBox.height
            })
            if (isHover) {
                canvas.style.cursor = "pointer";
            } else {
                canvas.style.cursor = "auto";
            }
            setTimeout(() => {
                canHover = true;
            }, 100);
        }
    });

    // 6. 监听鼠标点击事件
    canvas.addEventListener('click', (e) => {
        let isClick = isAreaItem({
            x: e.x,
            y: e.y,
            x2: canvas.offsetLeft + giftBox.x,
            y2: canvas.offsetTop + giftBox.y,
            width: giftBox.width,
            height: giftBox.height
        })
        if (isClick) {
            // 7. 导入彩屑
            loadChip();
            // 8. 放飞气球
            flyBall();
            // 9. 爆炸彩屑
            bloomChip();
            // 10. 打开横幅
        }
    });

}

initCanvas();