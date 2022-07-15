const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const offCanvas = document.createElement("canvas")
offCanvas.width = canvas.width
offCanvas.height = canvas.height
const offCtx = offCanvas.getContext('2d')

offCtx.fillStyle = 'green'
offCtx.fillRect(10, 10, 100, 50)

ctx.drawImage(offCanvas, 0, 0)
