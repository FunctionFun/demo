const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let raf
let running = false
const border = {
  top: 0,
  left: 0,
  right: canvas.width,
  bottom: canvas.height
}
const speed = 0.05
const ballNumber = 2

let balls = []

// 生成n个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = 25 // 大小
  let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16) // 颜色
  if (i === 0) {
    // 匀速运动
    ball = new Ball(size, color)
    ball.id = `ball_${i}`
    ball.x = 0
    ball.y = border.bottom / 2 - 100
    ball.vx = 1
    balls.push(ball)
  } else {
    // 加速度
    ball = new Ball(size, color)
    ball.id = `ball_${i}`
    ball.x = 0
    ball.y = border.bottom / 2 + 100
    ball.vx = 1
    ball.ax = speed * Math.cos((30 * Math.PI) / 180)
    balls.push(ball)
  }
}

console.log('balls init', balls)

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {
  if (pos === 0) {
    // 匀速运动
    ball.x += ball.vx
  } else {
    // 加速度
    ball.vx += ball.ax
    ball.x += ball.vx
  }

  ball.draw(ctx)
}

function drawFrame() {
  clear()
  raf = window.requestAnimationFrame(drawFrame)
  let i = balls.length
  while (i--) {
    drawBall(balls[i], i)
  }
  ctx.fillText('匀速运动', 50, 50)
  ctx.fillText('加速运动', 50, 450)
}

canvas.addEventListener('click', function(e) {
  if (!running) {
    drawFrame()
    running = true
  } else {
    window.cancelAnimationFrame(raf)
    running = false
    clear()
  }
})
