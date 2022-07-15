const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let mouse = {
  x: 0,
  y: 0
}
const ease = 0.05


function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

let canRotation = false

// 生成eye对象
const eye = new Eye()

function drawFrame() {
  clear()
  raf = window.requestAnimationFrame(drawFrame)
  if (canRotation) {
    const dx = mouse.x - eye.x
    const dy = mouse.y - eye.y
    const targeAngle = Math.atan2(dy, dx)
    eye.rotation += (targeAngle - eye.rotation) * ease
  }
  eye.draw(ctx)
}

running = true
drawFrame()

// 获取鼠标在canvas对象上的坐标
const getPointOnCanvas = (x, y) => {
  const canvasBox = canvas.getBoundingClientRect()
  console.log('canvasBox', canvasBox)
  return {
    x: x - canvasBox.left * (canvas.width / canvasBox.width),
    y: y - canvasBox.top * (canvas.height / canvasBox.height)
  }
}

canvas.addEventListener('click', function(e) {
  canRotation = true
  mouse = {
    x: e.x,
    y: e.y
  }
  if (!running) {
    running = true
    drawFrame()
  }
})