const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 300, 100)

const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d')
const svgPath = 'M10 10 h 80 v 80 h -80 Z'
const canvasPath = new Path2D(svgPath)
ctx2.stroke(canvasPath)
