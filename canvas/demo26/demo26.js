const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let raf
let txt
let defR = 6 //粒子的最大半径
let gap = 10 //粒子间隙
let fontS = canvas.width / 5 //文字大小
const border = {
  top: 0,
  left: 0,
  right: canvas.width,
  bottom: canvas.height
}

// 清除画布
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = canvas.width
  canvas.height = canvas.height
}

// 创建文字
function createdTxt() {
  txt = document.querySelector('#canvasInp').value
  console.log('文字', txt)
  ctx.font = `${fontS}px 微软雅黑`
  ctx.fillStyle = 'red'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(txt, border.right / 2, border.bottom / 2)
}

// 创建圆点
function createRadius(data) {
  clear()
  for (var i = 0; i < data.length; i++) {
    ctx.beginPath()
    ctx.arc(Math.random() + data[i].x, Math.random() + data[i].y, Math.random() * defR, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
}

// 查找文字位置
function findText() {
  let imageData = ctx.getImageData(border.left, border.top, border.right, border.bottom)
  let data = imageData.data
  let pos = []
  // 获取像素点
  for (let i = 0; i < border.right; i += gap) {
    for (let j = 0; j < border.bottom; j += gap) {
      let index = (j * border.right + i) * 4
      if (data[index] > 128) {
        pos.push({
          x: i,
          y: j
        })
      }
    }
  }
  createRadius(pos)
}

function drawFrame() {
  clear()
  raf = window.requestAnimationFrame(drawFrame)
  createdTxt()
  findText()
}
