// 定义一个小球的类
class Ball {
  constructor(radius = 25, color = 'blue') {
    this.x = 100
    this.y = 100
    this.vx = 5
    this.vy = 2
    this.ax = 0
    this.ay = 0
    this.scale = 1
    this.radius = radius
    this.color = color
    this.id = ''
    this.angle = 0
    this.opacity = 1
  }
  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
  getBounds() {
    return {
      left: this.x - this.radius,
      top: this.y - this.radius,
      right: this.x + this.radius,
      bottom: this.y + this.radius
    }
  }
}