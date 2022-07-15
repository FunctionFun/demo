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
let oldTime = new Date().getTime()
let newTime
let beta = 0
let del

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const aquNumber = 30

let aqus = []

// 生成水草
for (let i = 0; i < aquNumber; i++) {
  let aqu = new Aquatic()
  aqu.id = `aqu_${i}`
  aqu.startPoint = {
    x: Math.random() * 20 + i * 18,
    y: border.bottom
  }
  aqu.endPoint = {
    x: aqu.startPoint.x,
    y: border.bottom / 1.5 - Math.random() * 50
  }
  aqu.ctrlPoint = {
    x: aqu.startPoint.x,
    y: border.bottom - 120
  }
  aqu.color = '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
  aqu.amp = Math.random() * 10 + 40
  aqu.opacity = Math.random()
  aqu.lineWidth = Math.random() * 10
  aqus.push(aqu)
}

console.log('aqus', aqus)

function drawAqu(aqu, pos) {
  newTime = new Date().getTime()
  del = new Date().getTime() - oldTime
  oldTime = newTime
  // console.log('del', del)
  // 这里可以对比一下随机数和del的不同效果
  // const randomValue = Math.round(Math.random() * 3)
  // beta += randomValue * 0.0012
  // console.log('randomValue', randomValue)
  // 根据打印出来的数据，可以看出，虽然randomValue的值和del的值都是0~10以内的整数，但是两者的排列规律是不一样的
  // 即 del 的值依次例如：7 1 0 1 0 1 0 1 0 1 0 1 3 1 0 1
  // randomValue 的值依次例如：0 1 2 3 0 1 3 4 6 1
  // 对比看出，del 的值近似波形变化
  beta += del * 0.0012
  let l = Math.sin(beta)
  // console.log('l', l)
  aqu.endPoint.x = aqu.startPoint.x + l * aqu.amp
  aqu.draw(ctx)
}

function drawFrame() {
  clear()
  raf = window.requestAnimationFrame(drawFrame)
  let i = aqus.length
  while (i--) {
    drawAqu(aqus[i], i)
  }
}

setTimeout(() => {
  window.cancelAnimationFrame(raf)
}, 3000)

drawFrame()
