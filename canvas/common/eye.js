class Eye {
  constructor() {
    this.x = 250
    this.y = 250
    this.vx = 0
    this.vy = 0
    this.radius = 50
    this.rotation = 0
    this.id = ''
  }
  draw(ctx) {
    ctx.save()
    //将坐标移到this.x 和 this.y
    ctx.beginPath()
    // 重置
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.translate(this.x, this.y)
    //设置旋转角度
    ctx.rotate(this.rotation)
    ctx.arc(
      this.radius / 2,
      0,
      this.radius / 5,
      0,
      Math.PI * 2,
      true
    )
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}
