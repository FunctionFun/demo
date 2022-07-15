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

// 生成n个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = Math.random() * 20 + 5 // 大小
  let color = '#' + Math.floor( Math.random() * 0xffffff ).toString(16) // 颜色
  ball = new Ball(size, color)
  ball.id = `ball_${i}`
  ball.x = 0
  ball.y = border.bottom / 2
  ball.vx = Math.random() * 2 + 0.6

  balls.push(ball)
}

console.log('balls init', balls)

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {
  // 让小球加上它的速度值
  ball.x += ball.vx

  ball.y = border.bottom / 2 +  Math.sin(ball.angle) * 50

  console.log('波形运动', ball.y)

  ball.angle += 0.05

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
