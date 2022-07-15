let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 600;
let canvasHeight = 600;
let fillColor = "#23bed5";

// 获取当前时间
function getTime(type = 1) {
    // 存储时间数字，由十位小时、个位小时、冒号、十位分钟、个位分钟、冒号、十位秒钟、个位秒钟这7个数字组成
    let temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());

    // 返回处理好时间格式
    let data = []
    if (type === 1) {
        data = [temp[1], 11, temp[2], 11, 10, 11, temp[3], 11, temp[4], 11, 10, 11, temp[5], 11, temp[6]];
    } else {
        data = [String(temp[1]) + String(temp[2]), String(temp[3]) + String(temp[4]), String(temp[5]) + String(temp[6])];
    }
    return data;
}

// 随机数1~100
function randomNumber(rate = 10) {
    return Math.round(Math.random() * rate);
}

// 渲染文字区块
function renderNumberBlock(timeCode) {
    // 组成全部的时间文字，如 12:12:12，则需要8个点阵组合, 其中文字之间有1列的间隔，即 (3*8+7)*5 = 31*5个像素点
    // 设置全部文字的宽度为canvas的1/3
    let numberContentWidth = canvasWidth / 3;
    // 得到一个像素点的宽
    let numberItemWidth = numberContentWidth / 31;
    // 得到一个圆点的半径
    let dotR = numberItemWidth / 2;
    // 计算出一个像素点的坐标
    let muberItemAxis = {
        x: numberContentWidth,
        y: canvasHeight / 2 - numberItemWidth * 5 / 2
    }
    // 移动笔触
    ctx.moveTo(muberItemAxis.x, muberItemAxis.y);
    // 设置填充颜色
    ctx.fillStyle = fillColor;
    // 渲染文字
    for (let i = 0; i < 5; i++) {
        muberItemAxis = {
            x: numberContentWidth,
            y: canvasHeight / 2 - numberItemWidth * 5 / 2 + numberItemWidth * i
        }
        for (let j = 0; j < 31; j++) {
            muberItemAxis.x = muberItemAxis.x + numberItemWidth;
            if (timeCode[i][j] === '1') {
                // 随机透明色
                ctx.globalAlpha = 0.4 + Math.random();
                // 随机发光效果
                ctx.shadowOffsetX = 1 + randomNumber(3);
                ctx.shadowOffsetY = 0 + randomNumber(3);
                ctx.shadowBlur = 1 + randomNumber(6);
                ctx.shadowColor = "rgba(35, 190, 213, " + Math.random() + ")";
                ctx.beginPath();
                ctx.arc(muberItemAxis.x, muberItemAxis.y, dotR, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

}

// 渲染数字
function renderNumberItem(time) {
    // 通过五行三列的点阵来组成一个数字
    let numData = [
        "111/101/101/101/111", //0
        "010/010/010/010/010", //1
        "111/001/010/100/111", //2
        "111/001/111/001/111", //3
        "101/101/111/001/001", //4
        "111/100/111/001/111", //5
        "111/100/111/101/111", //6
        "111/001/001/001/001", //7
        "111/101/111/101/111", //8
        "111/101/111/001/001", //9
        "000/010/000/010/000", //10, 表示冒号:
        "0/0/0/0/0", // 11, 表示间隔
    ]
    let timeCode = []
    for (let item of time) {
        let itemCode = numData[item].split("/");
        for (let i = 0; i < 5; i++) {
            if (timeCode[i]) {
                timeCode[i] = [...timeCode[i], ...itemCode[i]]
            } else {
                timeCode[i] = [...itemCode[i]]
            }

        }
    }
    return timeCode;
}



// 绘制数字时钟
function drawClock() {

    // 1. 获取当前时间
    let timeText = getTime(1);
    // 编组成 5行二进制结构
    let timeCode = renderNumberItem(timeText);

    // 2. 渲染出文字
    renderNumberBlock(timeCode);

}

// 绘制环形时钟
function drawCircle() {

    // 1. 获取当前时间
    let timeText = getTime(2);
    // 2. 计算时分秒的弧长
    let timeData = {
        h: {
            rate: timeText[0] / 24,
            radius: canvasWidth / 3,
            lineWidth: 8,
            alpha: 0.12
        },
        m: {
            rate: timeText[1] / 60,
            radius: canvasWidth / 3.3,
            lineWidth: 4,
            alpha: 0.38
        },
        s: {
            rate: timeText[2] / 60,
            radius: canvasWidth / 3.4,
            lineWidth: 1,
            alpha: 1
        }
    }
    // 3. 绘制时分秒的弧长
    // 圆心
    let circleCenter = {
        x: canvasWidth / 2,
        y: canvasHeight / 2
    }
    // 设置线条端点为圆角
    ctx.lineCap = "round";
    // 设置线条颜色
    ctx.strokeStyle = fillColor;
    // 清除阴影效果
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0,0,0,0)";
    // 绘制弧线
    for (let i in timeData) {
        ctx.beginPath();
        let circle = {
            x: circleCenter.x,
            y: circleCenter.y,
            r: timeData[i].radius
        }
        ctx.globalAlpha = timeData[i].alpha;
        ctx.lineWidth = timeData[i].lineWidth;
        ctx.arc(circle.x, circle.y, circle.r, Math.PI/2, 2 * Math.PI * timeData[i].rate, false);
        ctx.stroke();
    }
}

function drawDigit() {
    // 绘制数字时钟
    drawClock();

    // 绘制环形时钟
    drawCircle();
}

// 渲染画布
function initCanvas() {

    // 1. 设置画布大小
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 2. 绘制时钟
    drawDigit();

    // 9. 让时钟自动更新
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.requestAnimationFrame(drawDigit);
    }, 500);

}

initCanvas();