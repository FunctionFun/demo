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

const ballNumber = 6

let balls = []

let spring = 0.03

// 生成n个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = 25 // 大小
  let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16) // 颜色
  ball = new Ball(size, color)
  ball.id = `ball_${i}`
  ball.x = Math.random() * border.right - ball.radius
  ball.y = Math.random() * border.bottom - ball.radius
  ball.vx = Math.random() * 5 - 1
  ball.vy = Math.random() * 5 - 1

  balls.push(ball)
}

console.log('balls init', balls)

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {
  // 碰撞检测
  for (let i = 0; i < balls.length; i++) {
    if (i !== pos) {
      let dx = ball.x - balls[i].x
      let dy = ball.y - balls[i].y
      let dist = Math.sqrt(dx * dx + dy * dy)
      let min_dist = balls[i].radius + ball.radius
      if (dist < min_dist) {
        let angle = Math.atan2(dy, dx)
        let targetX = balls[i].x + Math.cos(angle) * min_dist
        let targetY = balls[i].y + Math.sin(angle) * min_dist
        ball.vx += (targetX - ball.x) * spring
        ball.vy += (targetY - ball.y) * spring
      }
    }
  }

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

  ball.x += ball.vx
  ball.y += ball.vy

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

drawFrame()

// 检查鼠标是否在物体上
function containsPoint(bound, x, y) {
  return !(
    x < bound.left ||
    x > bound.right ||
    y < bound.top ||
    y > bound.bottom
  )
}

// 检查两个物体是否重叠
function intersects(rectA, rectB) {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  )
}
