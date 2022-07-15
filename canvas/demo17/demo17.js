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
// 重力加速度
const speed = 0.2
// 反弹系数
const bounce = -0.8
const ballNumber = 2

let balls = []

// 生成n个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = 25 // 大小
  let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16) // 颜色
  ball = new Ball(size, color)
  ball.id = `ball_${i}`
  ball.x = Math.random() * border.right
  ball.y = Math.random() * border.bottom
  ball.vx = Math.random() * 2 + 1
  ball.vy = Math.random() * 2 + 1

  balls.push(ball)
}

console.log('balls init', balls)

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {
  ball.vy += speed
  ball.y += ball.vy

  // 边界反弹
  if (ball.y + ball.radius > border.bottom) {
    ball.y = border.bottom - ball.radius
    ball.vy *= bounce
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
