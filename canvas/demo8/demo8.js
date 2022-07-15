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
const ballNumber = 10

let balls = []

// 生成10个不同形状和颜色的小球
for (let i = 0; i < ballNumber; i++) {
  let size = Math.random() * 20 + 5 // 大小
  let color = '#' + Math.floor( Math.random() * 0xffffff ).toString(16) // 颜色
  ball = new Ball(size, color)
  ball.id = `ball_${i}`
  ball.x = Math.random() * border.right
  ball.y = Math.random() * border.bottom
  ball.vx = Math.random() * 2 - 1
  ball.vy = Math.random() * 2 - 1

  balls.push(ball)
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBall(ball, pos) {
  //让小球加上它的速度值
  ball.x += ball.vx
  ball.y += ball.vy

  //判断是否超出边界，不论超出哪一边
  if (
    ball.x - ball.radius > border.right ||
    ball.radius + ball.x < border.left ||
    ball.y - ball.radius > border.bottom ||
    ball.y + ball.radius < border.top
  ) {
    //将超出边界的小球从数组中删除
    balls.splice(pos, 1)
    if (balls.length > 0) {
      //将超出的小球的id值输出
      console.log(`移除小球，${ball.id}`)
    } else {
      console.log('全部移除')
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
