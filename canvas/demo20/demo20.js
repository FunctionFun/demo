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

const ballNumber = 1

let balls = []
// 鼠标的位置
let mousePoint = {
  x: 0,
  y: 0
}

// 缓动系数
let ease = 0.05

let hasTarget = false

// 生成n个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = 25 // 大小
  let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16) // 颜色
  ball = new Ball(size, color)
  ball.id = `ball_${i}`
  ball.x = border.right / 2
  ball.y = border.bottom / 2
  ball.vx = Math.random() * 2 - 1
  ball.vy = Math.random() * 2 - 1

  balls.push(ball)
}

console.log('balls init', balls)

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {
  // 当目标点出现时，使用缓动效果, 由快到慢，最后移动到目标点
  if (hasTarget) {
    if (
      mousePoint.x === Math.round(ball.x) &&
      mousePoint.y === Math.round(ball.y)
    ) {
      running = false
      console.log('已移动到目标点', ball.x, ball.y)
      console.log('running', running)
      window.cancelAnimationFrame(raf)
    } else {
      ball.vx = (mousePoint.x - ball.x) * ease
      ball.vy = (mousePoint.y - ball.y) * ease
    }
  }

  ball.x += ball.vx
  ball.y += ball.vy

  // 边界反弹
  if (
    ball.y + ball.radius > border.bottom ||
    ball.y - ball.radius < border.top
  ) {
    ball.vy = -ball.vy
  }

  if (
    ball.x + ball.radius > border.right ||
    ball.x - ball.radius < border.left
  ) {
    ball.vx = -ball.vx
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

running = true
drawFrame()

// 鼠标在canvas上的坐标
const getPointOnCanvas = (x, y) => {
  const canvasBox = canvas.getBoundingClientRect()
  return {
    x: x - canvasBox.left * (canvas.width / canvasBox.width),
    y: y - canvasBox.top * (canvas.height / canvasBox.height)
  }
}

canvas.addEventListener('click', function(e) {
  console.log('目标点', e.x, e.y)
  console.log('running', running)
  mousePoint = getPointOnCanvas(e.x, e.y)
  hasTarget = true
  if (!running) {
    running = true
    drawFrame()
  }
})
