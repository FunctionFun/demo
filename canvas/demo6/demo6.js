const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// 绘制图形
ctx.arc(100, 150, 50, 0, Math.PI * 2)
ctx.fill()
ctx.fillRect(350, 100, 100, 100)

// --------- 鼠标监听 ----------------

// 1. 添加鼠标事件监听

// // 鼠标移动
// const doMouseMove = (e) => {
//   console.log('mouse move', e)
// }

// canvas.addEventListener('mousemove', doMouseMove, false)

// // 鼠标按下
// const doMouseDown = (e) => {
//   console.log('mouse down', e)
// }

// canvas.addEventListener('mousedown', doMouseDown, false)

// // 鼠标抬起
// const doMouseUp = (e) => {
//   console.log('mouse up', e)
// }

// canvas.addEventListener('mouseup', doMouseUp, false)

// // 鼠标点击
// const doMouseClick = (e) => {
//   console.log('mouse click', e)
// }

// canvas.addEventListener('click', doMouseClick, false)

// 2. 调用canvas鼠标事件

// // 鼠标移动
// canvas.onmousemove = function(e){
//   console.log('mouse move', e)
// }

// // 鼠标按下
// canvas.onmousedown = function(e){
//   console.log('mouse down', e)
// }

// // 鼠标抬起
// canvas.onmouseup = function(e){
//   console.log('mouse up', e)
// }

// // 鼠标点击
// canvas.onclick = function(e){
//   console.log('mouse click', e)
// }

// 3. 获取鼠标在canvas对象上的坐标
const getPointOnCanvas = (x, y) => {
  const canvasBox = canvas.getBoundingClientRect()
  console.log('canvasBox', canvasBox)
  return {
    x: x - canvasBox.left * (canvas.width / canvasBox.width),
    y: y - canvasBox.top * (canvas.height / canvasBox.height)
  }
}

canvas.addEventListener('click', (e) => {
  const mousePoint = getPointOnCanvas(e.x, e.y)
  console.log('获取鼠标在canvas对象上的坐标', e, mousePoint)
}, false)

// --------- 键盘监听 --------------

// 1. window 对象全局监听
const doKeyDown = (e) => {
  console.log('doKeyDown', e)
}
window.addEventListener('keydown', doKeyDown, true)

// 2. 给canvas增加支持键盘事件的DOM元素
// canvas.addEventListener('keydown', doKeyDown, true)
// canvas.focus()