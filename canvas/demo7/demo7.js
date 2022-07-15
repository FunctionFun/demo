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

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

function clear() {
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function draw() {
  clear()
  ball.draw()
  ball.x += ball.vx
  ball.y += ball.vy
  if (ball.y + ball.vy > border.bottom || ball.y + ball.vy < border.top) {
    ball.vy = -ball.vy
  }
  if (ball.x + ball.vx > border.right || ball.x + ball.vx < border.left) {
    ball.vx = -ball.vx
  }
  ball.vy *= 0.99
  ball.vy += 0.25
  raf = window.requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove', function(e) {
  if (!running) {
    clear()
    ball.x = e.clientX
    ball.y = e.clientY
    ball.draw()
  }
})

canvas.addEventListener('click', function(e) {
  if (!running) {
    raf = window.requestAnimationFrame(draw)
    running = true
  }
})

canvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf)
  running = false
})

ball.draw()
