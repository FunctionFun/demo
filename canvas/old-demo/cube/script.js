let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let winW = window.innerWidth;
let winH = window.innerHeight;
let x = 100;
let z = 100;
let y = 100;
let color = document.querySelector('#color');

// 渲染图形
function draw() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Wobble the cube using a sine wave
    let wobble = Math.sin(Date.now() / 250) * window.innerHeight / 50;

    // draw the cube
    drawCube(
        winW / 2,
        winH / 2 + wobble + y / 2,
        x,
        z,
        y,
        '#23bed5'
    );

    requestAnimationFrame(draw);
}

// 计算立面颜色
function shadeColor(color, percent) {
    color = color.substr(1);
    let num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function drawCube(x, y, wx, wy, h, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - wx, y - wx * 0.5);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, -10);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + wy, y - wy * 0.5);
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, 10);
    ctx.strokeStyle = shadeColor(color, 50);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, 20);
    ctx.strokeStyle = shadeColor(color, 60);
    ctx.stroke();
    ctx.fill();
}

// 自适应全屏
function autoCover() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    canvas.width = winW;
    canvas.height = winH;
}

// 初始化画布
function initCanvas() {
    autoCover();
    // 自适应画布
    window.onresize = () => {
        autoCover();
    }
    draw();
}

initCanvas()