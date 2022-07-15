const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let mouse = {
  x: 0,
  y: 0
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// 绘制图形
function draw(mouse) {
  const eye = new Eye()
  const dx = mouse.x - eye.x
  const dy = mouse.y - eye.y
  eye.rotation = Math.atan2(dy, dx)
  eye.draw(ctx)
}

// 鼠标移动
const doMouseMove = e => {
  // console.log('mouse move', e)
  mouse = {
    x: e.x,
    y: e.y
  }
  clear()
  draw(mouse)
}

canvas.addEventListener('mousemove', doMouseMove, false)

// 获取鼠标在canvas对象上的坐标
const getPointOnCanvas = (x, y) => {
  const canvasBox = canvas.getBoundingClientRect()
  console.log('canvasBox', canvasBox)
  return {
    x: x - canvasBox.left * (canvas.width / canvasBox.width),
    y: y - canvasBox.top * (canvas.height / canvasBox.height)
  }
}
