let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let winW = window.innerWidth;
let winH = window.innerHeight;

// 坐标轴设置为离画布内边距100px
let canvasPaddingNumber = 100;

// 线条颜色
let lineColor = "#666999";

// 填充颜色
let fillColor = "#23bed5";

// 激活颜色
let activeColor = "#de5585";

// x轴的分段数
let xAxisBlock = 7;
let xAxisWidth = winW - canvasPaddingNumber * 2;
let xAxisBlockWidth = xAxisWidth / xAxisBlock;
let textContentX = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

// y轴的分段数
let yAxisBlock = 5;
let yAxisWidth = winH - canvasPaddingNumber * 2;
let yAxisBlockWidth = yAxisWidth / yAxisBlock;
let textContentY = ["0", "1000", "2000", "3000", "4000", "5000"]

// 定义原点坐标
let originDot = {
    x: canvasPaddingNumber,
    y: winH - canvasPaddingNumber
}

// 图表数据
let data = [998, 3163, 2323, 2945, 1111, 4346, 3612]

// 自适应全屏
function autoCover() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    canvas.width = winW;
    canvas.height = winH;
    xAxisWidth = winW - canvasPaddingNumber * 2;
    xAxisBlockWidth = xAxisWidth / xAxisBlock;
    yAxisWidth = winH - canvasPaddingNumber * 2;
    yAxisBlockWidth = yAxisWidth / yAxisBlock;
    originDot = {
        x: canvasPaddingNumber,
        y: winH - canvasPaddingNumber
    }
}

// 坐标轴
function drawAxis() {
    // 设置线条颜色
    ctx.strokeStyle = lineColor;

    // 定位笔触为左下角圆点
    ctx.moveTo(originDot.x, originDot.y);

    // 计算出x轴端点的坐标值
    let xAxisDot = {
        x: winW - canvasPaddingNumber,
        y: winH - canvasPaddingNumber
    }
    ctx.lineTo(xAxisDot.x, xAxisDot.y);

    // 写出x轴的刻度和文字
    for (let i = 0; i < xAxisBlock; i++) {
        let xAxisBlockDot = {
            x: originDot.x + xAxisBlockWidth * i + xAxisBlockWidth / 2,
            y: winH - canvasPaddingNumber
        }
        ctx.moveTo(xAxisBlockDot.x, xAxisBlockDot.y);
        ctx.lineTo(xAxisBlockDot.x, xAxisBlockDot.y + 10);
        ctx.fillText(textContentX[i], xAxisBlockDot.x - 10, xAxisBlockDot.y + 25);
    }


    // 计算出Y轴端点的坐标值
    ctx.moveTo(originDot.x, originDot.y);

    let yAxisDot = {
        x: canvasPaddingNumber,
        y: canvasPaddingNumber
    }
    ctx.lineTo(yAxisDot.x, yAxisDot.y);

    // 写出y轴的刻度和文字
    for (let i = 0; i < yAxisBlock + 1; i++) {
        let yAxisBlockDot = {
            x: canvasPaddingNumber,
            y: xAxisDot.y - yAxisBlockWidth * i
        }
        ctx.moveTo(yAxisBlockDot.x, yAxisBlockDot.y);
        ctx.lineTo(yAxisBlockDot.x - 10, yAxisBlockDot.y);
        ctx.fillText(textContentY[i], yAxisBlockDot.x - 40, yAxisBlockDot.y + 4);
    }

    ctx.stroke();
}

// 柱形
function drawCylindrical({
    x = 0,
    y = 0
}) {
    // 清除画布内容
    ctx.clearRect(canvasPaddingNumber, canvasPaddingNumber, xAxisWidth, yAxisWidth);
    let isHover = false;
    for (let i = 0; i < data.length + 1; i++) {
        let dataBlock = {
            width: xAxisBlockWidth - 20,
            height: data[i] / 1000 * yAxisBlockWidth,
            x: originDot.x + xAxisBlockWidth * i + 10,
            y: originDot.y - data[i] / 1000 * yAxisBlockWidth
        }
        // 判断当前鼠标位置
        if (x > dataBlock.x && y > dataBlock.y && x < dataBlock.x + dataBlock.width && y < dataBlock.y + dataBlock.height) {
            // 设置填充颜色为激活色
            ctx.fillStyle = activeColor;
            isHover = true;
            // 显示当前柱形的数值
            ctx.font = "24px serif";
            let textWidth = ctx.measureText(data[i]).width;
            // 获取文本的居中坐标
            let txtCenterX = dataBlock.x + (dataBlock.width / 2 - textWidth / 2);
            ctx.fillText(data[i], txtCenterX, dataBlock.y - 20);
        } else {
            // 设置填充颜色为默认色
            ctx.fillStyle = fillColor;
        }


        ctx.moveTo(dataBlock.x, dataBlock.y);
        ctx.fillRect(dataBlock.x, dataBlock.y, dataBlock.width, dataBlock.height)
    }
    if (isHover) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "auto";
    }
}

// 鼠标悬停
function mouseHoverSth() {
    let canRun = true;
    canvas.addEventListener('mousemove', (e) => {
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        if (canRun) {
            canRun = false;
            drawCylindrical({
                x: mouseX,
                y: mouseY
            })
            setTimeout(() => {
                canRun = true;
            }, 100);
        }
    });
}

// 渲染画布
function initCanvas() {

    // 1. 设置画布
    autoCover();

    // 2. 画出坐标轴
    drawAxis();

    // 3. 画出柱形
    drawCylindrical({
        x: 0,
        y: 0
    });

    // 4. 鼠标悬停效果
    mouseHoverSth();

    // 自适应画布
    window.onresize = () => {
        autoCover();
        drawAxis();
        drawCylindrical({
            x: 0,
            y: 0
        });
    }

}

initCanvas();