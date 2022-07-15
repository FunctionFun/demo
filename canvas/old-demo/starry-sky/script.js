let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let winW = window.innerWidth;
let winH = window.innerHeight;
let startList = [];

// 填充颜色
let fillColorBase = "#F6F152";

// 绘制星星
let drawStar = function (r, R, x, y, fillColor) {
    ctx.beginPath();
    //设置是个顶点的坐标，根据顶点制定路径   
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + 72 * i) / 180 * Math.PI) * R + x, -Math.sin((18 + 72 * i) / 180 * Math.PI) * R + y);
        ctx.lineTo(Math.cos((54 + 72 * i) / 180 * Math.PI) * r + x, -Math.sin((54 + 72 * i) / 180 * Math.PI) * r + y);
    }
    ctx.closePath();
    ctx.lineWidth = "0";
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.stroke();
}

// 随机数1~100
function randomNumber(rate = 10) {
    return Math.round(Math.random() * rate);
}

// 生成随机数量的星星
function creatStarList() {
    let starCount = 6 + randomNumber(20);
    for (let i = 0; i < starCount; i++) {
        let r = 1 + randomNumber(20),
            R = 3 + randomNumber(20),
            x = 10 + randomNumber(1910),
            y = 20 + randomNumber(1060),
            fillColor = `rgba(${126+randomNumber(98)}, ${131+randomNumber(59)}, ${72+randomNumber(10)}, ${Math.random()})`;

        startList.push({
            r,
            R,
            x,
            y,
            fillColor
        });
    }
}


// 闪烁
function BringBring() {
    // 1. 先清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 画出星星
    for (let item of startList) {
        ctx.globalAlpha = Math.random();
        drawStar(item.r, item.R, item.x, item.y, item.fillColor);
    }

    // 3. 执行动画
    setTimeout(() => {
        window.requestAnimationFrame(BringBring);
    }, 680);
}

// 渲染画布
function initCanvas() {

    // 1. 设置画布大小
    canvas.width = winW;
    canvas.height = winH;

    // 2. 绘制星星
    creatStarList();

    // 3. 闪烁动画
    BringBring();

}

initCanvas();