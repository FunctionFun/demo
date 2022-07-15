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

const ballNumber = 3

let balls = []
// 鼠标的位置
let mousePoint = {
  x: 0,
  y: 0
}
let mouseDrag = false
let dragId = ''
let isToss = false
let toss

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
  // 当鼠标按下时才检测
  if (mouseDrag) {
    // 如果鼠标在这个小球上
    const isInBall = containsPoint(ball.getBounds(), mousePoint.x, mousePoint.y)
    // 确保同一时间只拖拽一个小球
    if (isInBall) {
      if (!dragId) {
        console.log('拖拽目标')
        dragId = ball.id
      }
      if (dragId === ball.id) {
        console.log('未抛出')
        ball.x = mousePoint.x
        ball.y = mousePoint.y
      }
    }
  } else if (dragId === ball.id) {
    if (isToss) {
      console.log('已抛出')
      toss = calcToss(ball.x, ball.y, mousePoint.x, mousePoint.y)
      // 抛出后小球沿鼠标方向运动
      ball.vx = toss.vx
      ball.vy = toss.vy
      dragId = ''
      isToss = false
    }
  }

  // 摩擦力
  if (dragId === ball.id && toss && toss.speed) {
    if (toss.speed > f) {
      toss.speed -= f
      ball.vx = Math.cos(toss.angle) * toss.speed
      ball.vy = Math.sin(toss.angle) * toss.speed
    } else {
      toss.speed = 0
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

  // if (ball.x > border.right - ball.radius) {
  //   border.x = border.right - ball.radius
  // }

  // if (ball.x < border.left - ball.radius) {
  //   border.x = border.left - ball.radius
  // }

  // if (ball.y > border.bottom - ball.radius) {
  //   border.y = border.bottom - ball.radius
  // }

  // if (ball.y < border.top - ball.radius) {
  //   border.y = border.top - ball.radius
  // }

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

// 鼠标在canvas上的坐标
const getPointOnCanvas = (x, y) => {
  const canvasBox = canvas.getBoundingClientRect()
  return {
    x: x - canvasBox.left * (canvas.width / canvasBox.width),
    y: y - canvasBox.top * (canvas.height / canvasBox.height)
  }
}

// 拖拽小球
canvas.addEventListener('mousedown', function(e) {
  mouseDrag = true
  console.log('down', dragId)
})
canvas.addEventListener('mousemove', function(e) {
  mousePoint = getPointOnCanvas(e.x, e.y)
})
canvas.addEventListener('mouseup', function(e) {
  isToss = true
  mouseDrag = false
  console.log('up', isToss)
})

// 计算抛扔的速度和角度
function calcToss(bx, by, mx, my) {
  vx = mx - bx
  vy = my - by
  speed = Math.sqrt(vx * vx + vy * vy)
  angle = Math.atan2(vy, vx)
  return { vx, vy, speed, angle }
}
