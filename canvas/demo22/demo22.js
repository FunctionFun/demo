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
let ease = 0.1
let targetColor = ''
let targetColorRgb = null
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
    // TODO: 这里的变色有点问题，待调试
    const curColorRgb = hexToRgb(ball.color)
    curColorRgb.r += Math.round((targetColorRgb.r - curColorRgb.r) * ease)
    //curColorRgb.g += Math.round((targetColorRgb.g - curColorRgb.g) * ease)
    // curColorRgb.b += Math.round((targetColorRgb.b - curColorRgb.b) * ease)
    curColorRgb.g = targetColorRgb.g
    curColorRgb.b = targetColorRgb.b
    const newColor = rgbToHex(
      `rgb(${curColorRgb.r},${curColorRgb.g},${curColorRgb.b})`
    )
    ball.color = newColor
    if (ball.color === targetColor) {
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

// 颜色格式hex转换成rgb
function hexToRgb(color) {
  const r = parseInt(color.slice(1, 3), 16).toString()
  const g = parseInt(color.slice(3, 5), 16).toString()
  const b = parseInt(color.slice(5, 7), 16).toString()
  return { r, g, b }
}

// 颜色格式rgb转换成hex
function rgbToHex(color) {
  const rgb = color.split(',')
  const r = parseInt(rgb[0].split('(')[1])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2].split(')')[0])
  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return hex
}

// 变色
canvas.addEventListener('click', function(e) {
  canToggle = true
  targetColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
  targetColorRgb = hexToRgb(targetColor)
  if (!running) {
    running = true
    drawFrame()
  }
})
