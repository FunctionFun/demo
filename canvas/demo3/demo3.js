const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let timer

// 清除画布
const clearCanvas = () => {
  x = 0
  x2 = 0
  x3 = 0
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = canvas.width
  canvas.height = canvas.height
}

// 延时器
let x = 0
const doSetTimeout = () => {
  timer = setTimeout(() => {
    x += 0.05
    // console.log('x', x)
    ctx.fillRect(0, 200, 10, 10)
    ctx.translate(x, 0)
    doSetTimeout()
    if (x > 7) {
      clearTimeout(timer)
    }
  }, 10)
}

// 定时器
let x2 = 0
const doSetInterval = () => {
  timer = setInterval(() => {
    x2 += 0.05
    // console.log('x2', x2)
    ctx.fillRect(0, 200, 10, 10)
    ctx.translate(x2, 0)
    if (x2 > 7) {
      clearInterval(timer)
    }
  }, 10)
}

// requestAnimationFrame
let x3 = 0
const doRequestAnimationFrame = () => {
  window.requestAnimationFrame(drawLoading)
}
const drawLoading = () => {
  x3 += 0.05
  // console.log('x3', x3)
  ctx.fillRect(0, 200, 10, 10)
  ctx.translate(x3, 0)
  if (x3 <= 7) {
    window.requestAnimationFrame(drawLoading)
  }
}
