class Aquatic {
  constructor() {
    this.startPoint = {
      x: 0,
      y: 0
    }
    this.endPoint = {
      x: 0,
      y: 0
    }
    this.ctrlPoint = {
      x: 0,
      y: 0
    }
    this.opacity = 0.8
    this.lineWidth = 1
    this.color = 'blue'
    this.amp = 0
    this.id = ''
  }

  draw(ctx) {
    ctx.save()
    ctx.beginPath()

    ctx.lineCap = 'round'
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.color
    ctx.globalAlpha = this.opacity

    ctx.moveTo(this.startPoint.x, this.startPoint.y)

    // 使用二次贝塞尔曲线绘制
    ctx.quadraticCurveTo(
      this.ctrlPoint.x,
      this.ctrlPoint.y,
      this.endPoint.x,
      this.endPoint.y
    )

    ctx.stroke()
    ctx.restore()
  }
}
