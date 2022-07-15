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

// 缓动系数
let ease = 0.05
let targeOpacity = 1
let canToggle = false

// 生成n个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = 25 // 大小
  let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16) // 颜色
  ball = new Ball(size, color)
  ball.id = `ball_${i}`
  ball.x = border.right / 2
  ball.y = border.bottom / 2

  balls.push(ball)
}

console.log('balls init', balls)

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {

  if (canToggle) {
    ball.opacity += (targeOpacity - ball.opacity) * ease
    if (ball.opacity <= 0) {
      running = false
      window.cancelAnimationFrame(raf)
    }
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

// 渐入渐隐
canvas.addEventListener('click', function(e) {
  targeOpacity = targeOpacity ? 0 : 1
  canToggle = true
  if (!running) {
    running = true
    drawFrame()
  }
})
