let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let winW = window.innerWidth;
let winH = window.innerHeight;
// 存储所有生成的点
let dots = [];

// 引力
let g = 0.2;
// 弹动
let bounce = -0.7;
// 摩擦力
let friction = 0.98;

// 自适应全屏
function autoCover() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    canvas.width = winW;
    canvas.height = winH;
}

// 生成点
function createCanvas(dot) {
    dot.render(ctx);
}

// 弹动点
function bounceDot(dot) {
    dot.vy += g;
    dot.x += dot.vx;
    dot.y += dot.vy;

    if (dot.x + dot.r >= winW) {
        dot.x = winW - dot.r;
        dot.vx *= bounce;
    } else if (dot.x - dot.r <= 0) {
        dot.x = dot.r;
        dot.vx *= bounce;
    }

    if (dot.y + dot.r >= winH) {
        dot.y = winH - dot.r;
        dot.vy *= bounce;

        // 触底分裂
        if (dot.vy < -0.1 && dot.r > 5) {
            // 触底时分裂1个1/4小点
            let dotChild = new Dot({
                x: dot.x + C.rp([-30, 30]),
                y: dot.y,
                vx: dot.vx,
                vy: dot.vy,
                r: dot.r * (1 / 4),
                fillStyle: dot.fillStyle
            })
            dots.push(dotChild);
            // 原来的点减小1/4
            dot.r = dot.r * (3 / 4);
        } else if (dot.r <= 5) {
            // 触底后缓慢静止
            dot.vx *= friction;
        }

    } else if (dot.y - dot.r <= 0) {
        dot.y = dot.r;
        dot.vy *= bounce;
    }
}

// 初始化画布
function initCanvas() {

    // 1. 设置画布
    autoCover();

    // 2. 监听鼠标点击
    canvas.addEventListener('mousedown', (e) => {
        // 先清除画布
        ctx.clearRect(0, 0, winW, winH);
        let pos = {
            x: e.pageX,
            y: e.pageY
        };
        // 作用力
        let vx = C.rp([-10, 10]);
        // 在鼠标点击的位置生成一个点
        let dot = new Dot({
            x: pos.x,
            y: pos.y,
            vx: vx,
            fillStyle: C.createColor()
        });
        dots.push(dot);
        dots.forEach(createCanvas);
    });


    // 自适应画布
    window.onresize = () => {
        autoCover();
    }

}

(function move() {
    window.requestAnimationFrame(move);
    ctx.clearRect(0, 0, winW, winH);
    dots.forEach(bounceDot);
    dots.forEach(createCanvas);
})();

initCanvas();