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
// 摩擦力
const f = 0.05
// 速度
let speed = 0
// 运动角度
let angle = 0

const ballNumber = 1

let balls = []

// 生成n个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = 25 // 大小
  let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16) // 颜色
  ball = new Ball(size, color)
  ball.id = `ball_${i}`
  ball.x = border.right / 2
  ball.y = border.bottom / 2
  ball.vx = Math.random() * 3
  ball.vy = Math.random() * 3

  balls.push(ball)
}

console.log('balls init', balls)

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {
  ball.x += ball.vx
  ball.y += ball.vy

  speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy)
  angle = Math.atan2(ball.vy, ball.vx)

  if (speed > f) {
    speed -= f
  } else {
    speed = 0
  }

  ball.vx = Math.cos(angle) * speed
  ball.vy = Math.sin(angle) * speed

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
