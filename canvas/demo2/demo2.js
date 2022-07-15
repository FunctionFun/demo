const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let timer

// 清除画布
const clearCanvas = () => {
  clearTimeout(timer)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = 300
  canvas.height = 300
}

// 绘制一个200x200的实心矩形
const drawRectangle = () => {
  clearCanvas()
  // 1. 用ctx.fillRect 画出矩形路径并填充颜色
  ctx.fillStyle = 'red'
  ctx.fillRect(20, 20, 100, 100)

  // 2. 先用 ctx.rect 画出路径，再用 ctx.fill 填充颜色
  ctx.rect(20, 140, 100, 100)
  ctx.fill()

  // 3. 先用线段围成一个矩形路径，再用 ctx.fill 填充颜色
  ctx.beginPath()
  ctx.moveTo(140, 20)
  ctx.lineTo(240, 20)
  ctx.lineTo(240, 120)
  ctx.lineTo(140, 120)
  ctx.closePath()
  ctx.fill()
}

// 绘制一个外边为20x20，内边为12x12的空心矩形
const drawRectangle2 = () => {
  clearCanvas()
  ctx.fillStyle = 'red'

  // 1. 先用 ctx.fillRect 画出矩形，再用 ctx.clearRect 掏空中间
  ctx.fillRect(20, 20, 20, 20)
  ctx.clearRect(24, 24, 12, 12)

  // 2. 先设置线宽，再使用 ctx.strokeRect 绘出矩形并设置描边
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 4
  ctx.strokeRect(22, 62, 16, 16)

  // 3. 先用 ctx.rect 画出矩形路径，再用 ctx.stroke 绘制描边
  ctx.rect(62, 22, 16, 16)
  ctx.stroke()

  // 4. 设置合成类型为xor（差集）
  ctx.globalCompositeOperation = 'xor'
  ctx.fillRect(100, 100, 20, 20)
  ctx.fillStyle = 'f9f9f9'
  ctx.fillRect(104, 104, 12, 12)
}

// 不同端点样式的线条
const drawLine = () => {
  clearCanvas()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 20

  // 1. 设置一条端点为方形的线条
  ctx.beginPath()
  ctx.lineCap = 'butt'
  ctx.moveTo(20, 30)
  ctx.lineTo(110, 30)
  ctx.stroke()

  // 2. 设置一条端点为圆形的线条
  ctx.beginPath()
  ctx.lineCap = 'round'
  ctx.moveTo(20, 60)
  ctx.lineTo(110, 60)
  ctx.stroke()

  // 3. 设置一条端点为矩形的线条
  ctx.beginPath()
  ctx.lineCap = 'square'
  ctx.moveTo(20, 90)
  ctx.lineTo(110, 90)
  ctx.stroke()
}

// 不同间距的虚线
const drawLine2 = () => {
  clearCanvas()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 2

  // 1. 设置一个以[]并以此重复的虚线, 当数组为空时，虚线会变成实线
  // 即 [] 在这里会变成 [0, 0]
  ctx.beginPath()
  ctx.setLineDash([])
  ctx.moveTo(20, 10)
  ctx.lineTo(220, 10)
  ctx.stroke()

  // 2. 设置一个以5为线段长度，15为线段间距的虚线
  ctx.beginPath()
  ctx.setLineDash([5, 15])
  ctx.moveTo(20, 30)
  ctx.lineTo(220, 30)
  ctx.stroke()

  // 3. 设置一个以[ 第一个线段长度为15，第一个间距为3，第二个线段长度为3，第二个间距为3 ]并以此重复的虚线
  ctx.beginPath()
  ctx.setLineDash([15, 3, 3, 3])
  ctx.moveTo(20, 60)
  ctx.lineTo(220, 60)
  ctx.stroke()

  // 4. 设置一个以[ 第一个线段长度为12，第一个间距为3，第二个线段长度为3 ]并以此重复的虚线, 当数组不为偶数时，将在末尾复制该数组再进行重复
  // 即 [12, 3, 3] 在这里会变成 [12, 3, 3, 12, 3, 3]
  ctx.beginPath()
  ctx.setLineDash([12, 3, 3])
  ctx.moveTo(20, 90)
  ctx.lineTo(220, 90)
  ctx.stroke()

  // 5. 设置一个以上一段虚线的参数为基数，每个线段长度加2，每个间距减1的虚线
  ctx.beginPath()
  const lastDashConfig = ctx.getLineDash()
  // console.log('lastDashConfig', lastDashConfig)
  let theDashConfig = []
  for (let i in lastDashConfig) {
    if (i % 2 === 0) {
      theDashConfig.push(lastDashConfig[i] + 2)
    } else {
      theDashConfig.push(lastDashConfig[i] - 1)
    }
  }
  // console.log('theDashConfig', theDashConfig)
  ctx.setLineDash(theDashConfig)
  ctx.moveTo(20, 120)
  ctx.lineTo(220, 120)
  ctx.stroke()

  // 6. 设置一个以[ 第一个线段长度为5，第一个间距为3]，并以此重复的虚线，虚线将偏移5
  ctx.beginPath()
  ctx.setLineDash([5, 3])
  ctx.lineDashOffset = 5
  ctx.moveTo(20, 150)
  ctx.lineTo(220, 150)
  ctx.stroke()

  // 7. 绘制一个蚂蚁线效果
  let offset = 0
  const draw = () => {
    ctx.clearRect(19, 179, 102, 102)
    ctx.setLineDash([5, 3])
    ctx.lineDashOffset = -offset
    ctx.strokeRect(20, 180, 100, 100)
  }
  const march = () => {
    offset++
    if (offset > 16) {
      offset = 0
    }
    draw()
    timer = setTimeout(march, 20)
  }
  march()
}

// 不同拐点样式的折线
const drawLine3 = () => {
  clearCanvas()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 20

  // 1. 设置一条拐角为尖角的线条
  ctx.beginPath()
  ctx.lineJoin = 'miter'
  ctx.moveTo(30, 90)
  ctx.lineTo(120, 30)
  ctx.lineTo(210, 90)
  ctx.stroke()

  // 2. 设置一条拐角为圆角的线条
  ctx.beginPath()
  ctx.lineJoin = 'round'
  ctx.moveTo(30, 150)
  ctx.lineTo(120, 90)
  ctx.lineTo(210, 150)
  ctx.stroke()

  // 2. 设置一条拐角为平角的线条
  ctx.beginPath()
  ctx.lineJoin = 'bevel'
  ctx.moveTo(30, 210)
  ctx.lineTo(120, 150)
  ctx.lineTo(210, 210)
  ctx.stroke()
}

// 绘制不同字体样式的文本
const drawText = () => {
  clearCanvas()

  // 1. 创建一个填充文本
  ctx.fillText('这是一个填充文本', 10, 20)

  // 2. 创建一个描边文本
  ctx.strokeText('这是一个描边文本', 10, 50)

  // 3. 创建一个16px的文本
  ctx.font = '14px serif'
  ctx.fillText('这是一个14px的文本', 10, 83)

  // 4. 创建一个微软雅黑字体的文本
  ctx.font = '20px 微软雅黑'
  ctx.fillText('20px字体为微软雅黑的文本', 10, 120)
}

// 参考线
const drawAidLine = () => {
  ctx.strokeStyle = '#e2e2e2'
  ctx.beginPath()
  ctx.moveTo(150, 10)
  ctx.lineTo(150, 290)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(10, 150)
  ctx.lineTo(290, 150)
  ctx.stroke()
}

// 绘制不同对齐方式的文本
const drawTextAlign = () => {
  clearCanvas()

  drawAidLine()

  // 中心点x=150, y=150
  ctx.textAlign = 'center'
  ctx.fillStyle = '#dddddd'
  ctx.fillText('中心点x=150, y=150', 150, 10)
  ctx.fillStyle = '#333333'

  // 1. 左对齐
  ctx.textAlign = 'left'
  ctx.fillText('左对齐', 150, 30)

  // 2. 右对齐
  ctx.textAlign = 'right'
  ctx.fillText('右对齐', 150, 50)

  // 3. 对齐界线开始的地方
  ctx.textAlign = 'start'
  ctx.fillText('对齐界限start', 150, 70)

  // 4. 对齐界限结束的地方
  ctx.textAlign = 'end'
  ctx.fillText('对齐界限end', 150, 90)

  ctx.textAlign = 'left'
  // 5. 基线对齐 top
  ctx.textBaseline = 'top'
  ctx.fillText('bl top', 10, 150)

  // 5. 基线对齐 hanging
  ctx.textBaseline = 'hanging'
  ctx.fillText('bl hanging', 40, 150)

  // 5. 基线对齐 middle
  ctx.textBaseline = 'middle'
  ctx.fillText('bl middle', 90, 150)

  // 5. 基线对齐 alphabetic
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('bl alpha', 140, 150)

  // 5. 基线对齐 ideographic
  ctx.textBaseline = 'ideographic'
  ctx.fillText('bl ideog', 190, 150)

  // 6. 基线对齐 bottom
  ctx.textBaseline = 'bottom'
  ctx.fillText('bl bottom', 240, 150)
}

// 绘制适应文本宽度的按钮
const drawBtn = (text, centerPos = { x: 150, y: 150 }) => {
  const textWidth = ctx.measureText(text).width
  ctx.fillStyle = '#999999'
  const rectArea = {
    w: textWidth + 20,
    h: 40
  }
  const rectPos = {
    x: centerPos.x - rectArea.w / 2,
    y: centerPos.y - rectArea.h / 2
  }
  ctx.fillRect(rectPos.x, rectPos.y, rectArea.w, rectArea.h)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, centerPos.x, centerPos.y)
}

const drawTextBtn = () => {
  clearCanvas()

  drawBtn('abcdefg', { x: 150, y: 70 })
  drawBtn('abcdefg9999999999', { x: 150, y: 150 })
  drawBtn('abcdefgsssss', { x: 150, y: 230 })
}

// 绘制不同的圆和弧
const drawCircle = () => {
  clearCanvas()

  // 1. 一个空心圆
  ctx.strokeStyle = '#999999'
  ctx.beginPath()
  ctx.arc(150, 150, 50, 0, 2 * Math.PI)
  ctx.stroke()

  // 2. 一个实心圆
  ctx.fillStyle = '#999999'
  ctx.beginPath()
  ctx.arc(150, 150, 30, 0, 2 * Math.PI)
  ctx.fill()

  // 3. 180°扇形，下半圆
  ctx.beginPath()
  ctx.arc(150, 250, 30, 0, Math.PI)
  ctx.fill()

  // 4. 180°扇形，上半圆
  ctx.beginPath()
  ctx.arc(150, 50, 30, Math.PI, 0)
  ctx.fill()

  // 5. 90°弧形
  ctx.beginPath()
  ctx.arc(150, 150, 65, 0, Math.PI / 2)
  ctx.stroke()

  // 6. 90°弧形
  ctx.beginPath()
  ctx.arc(150, 150, 75, Math.PI / 4, Math.PI / 4 + Math.PI / 2)
  ctx.stroke()

  // 7. 270°弧形
  ctx.beginPath()
  ctx.arc(150, 150, 85, Math.PI / 2, 0)
  ctx.stroke()

  // 8. 根据三个点和半径画出圆弧
  ctx.beginPath()
  ctx.moveTo(250, 20)
  ctx.arcTo(260, 100, 50, 20, 30)
  ctx.stroke()
}

// 360°起始角度分解
const drawAngle = (text, x, y, r, start, end) => {
  ctx.beginPath()
  ctx.arc(x, y, r, start, end)
  ctx.fill()
  ctx.fillText(`${text}`, x - r, y + r + 20)
}

const drawArc = () => {
  clearCanvas()
  canvas.width = 1000
  canvas.height = 320
  ctx.fillStyle = '#333333'
  // 1. 0° >> 360°， 从 0°开始自循环一周， 起始角度始终为 0°, 结束角度每次加 45 °
  let x = 0
  let y = 40
  let r = 20
  let start = 0
  let end = 0
  const xStep = r * 2 + 30
  const angleStep = Math.PI / 4

  for (let i = 0; i < 360 / 45; i++) {
    x = x + xStep
    end = end + angleStep
    drawAngle(`0° - ${i * 45 + 45}°`, x, y, r, start, end)
  }

  // 1. 0° >> 360°， 从 0°开始自循环一周， 起始角度每次加 30 °, 结束角度 = 起始角度 加 30 °
  let x2 = 0
  let y2 = 140
  let r2 = 20
  let start2 = 0
  let end2 = 0
  const xStep2 = r2 * 2 + 30
  const angleStep2 = Math.PI / 6

  for (let i = 0; i < 360 / 30; i++) {
    x2 = x2 + xStep2
    if (start2 > Math.PI * 2) {
      start2 = 0
    }
    end2 = start2 + angleStep2
    drawAngle(`${i * 30}° - ${i * 30 + 30}°`, x2, y2, r2, start2, end2)
    start2 = start2 + angleStep2
  }

  // 1. 0° >> 360°， 从 0°开始自循环一周， 起始角度每次加 90 °, 结束角度 = 起始角度 加 90 °
  let x3 = 0
  let y3 = 240
  let r3 = 20
  let start3 = 0
  let end3 = 0
  const xStep3 = r3 * 2 + 30
  const angleStep3 = Math.PI / 2

  for (let i = 0; i < 360 / 90; i++) {
    x3 = x3 + xStep3
    if (start3 > Math.PI * 2) {
      start3 = 0
    }
    end3 = start3 + angleStep3
    drawAngle(`${i * 90}° - ${i * 90 + 90}°`, x3, y3, r3, start3, end3)
    start3 = start3 + angleStep3
  }
}

// 绘制月相变化
const drawMoon = () => {
  clearCanvas()

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawAidLine()

  // 1. 新月 0°
  ctx.fillStyle = '#333333'
  ctx.beginPath()
  ctx.arc(250, 150, 20, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`新月`, 270, 170)

  // 2. 峨眉月
  ctx.fillStyle = '#FFF111'
  ctx.beginPath()
  ctx.arc(200, 100, 20, Math.PI * 2 - Math.PI / 4, Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#333333'
  ctx.beginPath()
  ctx.arc(200, 100, 20, Math.PI / 4, Math.PI * 2 - Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`峨眉月`, 220, 80)

  // 3. 上弦月 180°
  ctx.fillStyle = '#FFF111'
  ctx.beginPath()
  ctx.arc(150, 50, 20, Math.PI * 2 - Math.PI / 2, Math.PI / 2)
  ctx.fill()
  ctx.fillStyle = '#333333'
  ctx.beginPath()
  ctx.arc(150, 50, 20, Math.PI / 2, Math.PI * 2 - Math.PI / 2)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`上弦月`, 170, 30)

  // 4. 盈凸月
  ctx.fillStyle = '#FFF111'
  ctx.beginPath()
  ctx.arc(100, 100, 20, Math.PI + Math.PI / 4, Math.PI - Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#333333'
  ctx.beginPath()
  ctx.arc(100, 100, 20, Math.PI - Math.PI / 4, Math.PI + Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`盈凸月`, 50, 80)

  // 5. 满月 360°
  ctx.fillStyle = '#FFF111'
  ctx.beginPath()
  ctx.arc(50, 150, 20, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`满月`, 10, 170)

  // 6. 亏凸月
  ctx.fillStyle = '#FFF111'
  ctx.beginPath()
  ctx.arc(100, 200, 20, Math.PI / 4, Math.PI * 2 - Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#333333'
  ctx.beginPath()
  ctx.arc(100, 200, 20, Math.PI * 2 - Math.PI / 4, Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`亏凸月`, 50, 220)

  // 8. 下弦月 180°
  ctx.fillStyle = '#333333'
  ctx.beginPath()
  ctx.arc(150, 250, 20, Math.PI * 2 - Math.PI / 2, Math.PI / 2)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.beginPath()
  ctx.arc(150, 250, 20, Math.PI / 2, Math.PI * 2 - Math.PI / 2)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`下弦月`, 110, 280)

  // 9. 残月
  ctx.fillStyle = '#FFF111'
  ctx.beginPath()
  ctx.arc(200, 200, 20, Math.PI - Math.PI / 4, Math.PI + Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#333333'
  ctx.beginPath()
  ctx.arc(200, 200, 20, Math.PI + Math.PI / 4, Math.PI - Math.PI / 4)
  ctx.fill()
  ctx.fillStyle = '#FFF111'
  ctx.fillText(`残月`, 220, 220)
}

// 绘制二次贝塞尔曲线
const drawBezier2 = () => {
  clearCanvas()

  ctx.beginPath()
  ctx.moveTo(50, 20)
  ctx.quadraticCurveTo(180, 90, 50, 100)
  ctx.stroke()

  ctx.fillStyle = 'blue'
  // start point
  ctx.fillRect(50, 20, 10, 10)
  // end point
  ctx.fillRect(50, 100, 10, 10)

  ctx.fillStyle = 'red'
  // control point
  ctx.fillRect(180, 90, 10, 10)
}

// 绘制三次贝塞尔曲线
const drawBezier3 = () => {
  clearCanvas()

  ctx.beginPath()
  ctx.moveTo(50, 20)
  ctx.bezierCurveTo(230, 30, 150, 60, 50, 100)
  ctx.stroke()

  ctx.fillStyle = 'blue'
  // start point
  ctx.fillRect(50, 20, 10, 10)
  // end point
  ctx.fillRect(50, 100, 10, 10)

  ctx.fillStyle = 'red'
  // control point one
  ctx.fillRect(230, 30, 10, 10)
  // control point two
  ctx.fillRect(150, 60, 10, 10)
}

// 绘制焦点
const drawFocus = () => {
  clearCanvas()

  ctx.beginPath()
  ctx.rect(10, 10, 30, 30)
  canvas.innerHTML = `<input id="abcFocus" />`
  const abcFocus = document.getElementById('abcFocus')
  if (abcFocus) {
    abcFocus.focus()
    ctx.drawFocusIfNeeded(abcFocus)
  }
}

// 非零环绕填充
const drawFillRule = () => {
  clearCanvas()

  ctx.fillStyle = 'red'

  // 1. 非零环绕填充 ctx.lineTo 顺时针画出外框，逆时针画出内框, 再用 ctx.fill 填充
  // 大框顺时针方向
  ctx.moveTo(40, 20)
  ctx.lineTo(140, 20)
  ctx.lineTo(140, 120)
  ctx.lineTo(40, 120)
  ctx.closePath()

  // 小框逆时针方向
  ctx.moveTo(60, 40)
  ctx.lineTo(60, 100)
  ctx.lineTo(120, 100)
  ctx.lineTo(120, 40)
  ctx.closePath()

  // 默认为'nonzero'
  ctx.fill()

  // 2. 非零环绕2, 大圆逆时针，小圆顺时针
  ctx.beginPath()
  ctx.arc(220, 220, 50, 0, Math.PI * 2, false)
  ctx.arc(220, 220, 20, 0, Math.PI * 2, true)
  ctx.fill()

  // 3. 非零环绕3
  ctx.beginPath()
  ctx.arc(80, 240, 50, 0, Math.PI * 2, true)
  ctx.arc(70, 200, 20, 0, Math.PI * 2, false)
  ctx.arc(90, 180, 20, 0, Math.PI * 2, true)
  ctx.fill()
}

// 奇偶环绕填充
const drawFillRule2 = () => {
  clearCanvas()

  ctx.fillStyle = 'red'

  // 1. 偶数交点区域不会被填充
  ctx.moveTo(40, 180)
  ctx.lineTo(140, 80)
  ctx.lineTo(190, 170)
  ctx.closePath()

  ctx.moveTo(40, 120)
  ctx.lineTo(240, 120)
  ctx.lineTo(90, 190)
  ctx.closePath()

  // 2. 奇数交点区域被填充
  ctx.rect(182, 130, 60, 60)

  // ctx.stroke()
  ctx.fill('evenodd')
}

// 绘制剪切路径
const drawClip = () => {
  clearCanvas()

  ctx.fillStyle = 'red'

  // 1. 通过剪切路径创建一个90°扇形
  ctx.arc(100, 100, 75, 0, Math.PI * 2)
  ctx.clip()
  ctx.fillRect(0, 0, 100, 100)
}

// 绘制复杂的镂空图形
const drawClip2 = () => {
  clearCanvas()

  ctx.fillStyle = 'red'

  // 2. 通过剪切路径绘制一个镂空图形
  ctx.arc(190, 120, 75, 0, Math.PI * 2)
  ctx.arc(110, 120, 75, 0, Math.PI * 2)
  ctx.arc(140, 160, 65, 0, Math.PI * 2)
  // ctx.stroke()

  ctx.clip()
  ctx.rect(80, 80, 160, 160)
  ctx.fill('evenodd')
}

// 检测点的位置
const checkPoint = () => {
  clearCanvas()

  ctx.strokeStyle = 'red'

  // 1. 判断点是否在路径内部
  ctx.rect(20, 20, 100, 100)
  ctx.stroke()
  console.log('点20x20是否在路径的内部里', ctx.isPointInPath(20, 20))
  console.log('点50x50是否在路径的内部里', ctx.isPointInPath(50, 50))
  console.log('点222x222是否在路径的内部里', ctx.isPointInPath(222, 222))

  // 2. 判断点是否在路径描边上
  ctx.rect(150, 150, 100, 100)
  ctx.stroke()
  console.log('点150x150是否在路径的描边上', ctx.isPointInStroke(150, 150))
  console.log('点200x200是否在路径的描边上', ctx.isPointInStroke(200, 200))
}

// 旋转画布
const drawRotate = () => {
  clearCanvas()

  ctx.rotate((45 * Math.PI) / 180)
  ctx.fillRect(70, 0, 100, 30)
}

// 缩放比例
const drawScale = () => {
  clearCanvas()

  // 0. 原比例参照
  ctx.fillStyle = 'red'
  ctx.fillRect(10, 10, 10, 10)
  ctx.fillStyle = 'green'
  ctx.fillRect(200, 110, 30, 180)
  ctx.fillText('这是正常的字', 20, 120)

  // 1. x轴放大10倍，即1原来1像素的宽度变为10像素；y轴单位放大3倍。
  ctx.fillStyle = 'red'
  ctx.scale(10, 3)
  // 即fillReact实际获得的参数等同于：ctx.fillRect(100, 30, 100, 30)
  ctx.fillRect(10, 10, 10, 10)

  // 重置
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // 2. x轴缩小0.5倍，即1原来1像素的宽度变为0.5像素；y轴单位缩小0.6倍。
  ctx.fillStyle = 'green'
  ctx.scale(0.5, 0.6)
  // 即fillReact实际获得的参数等同于：ctx.fillRect(100, 66, 15, 108)
  ctx.fillRect(200, 110, 30, 180)

  // 重置
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // 3. 水平翻转
  ctx.scale(-1, 1)
  ctx.fillText('这是水平翻转的字', -90, 150)

  // 重置
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // 3. 垂直翻转
  ctx.scale(1, -1)
  ctx.fillText('这是垂直翻转的字', 10, -170)
}

// 移动画布原点
const translateOrigin = () => {
  clearCanvas()

  ctx.fillStyle = 'red'

  // 1. 将画布原点x轴向右移动150像素，y轴向下移动150像素
  ctx.translate(150, 150)
  ctx.fillRect(0, 0, 100, 100)

  // 重置
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // 1. 将画布原点x轴向左移动200像素，y轴向上移动100像素
  ctx.translate(-200, -100)
  ctx.fillRect(0, 0, 250, 220)
}

// 叠加变换
const transformOverlay = () => {
  clearCanvas()

  // 正常的矩形
  ctx.fillStyle = 'red'
  ctx.fillRect(200, 100, 50, 50)

  ctx.fillStyle = 'blue'
  // 1. 垂直倾斜
  ctx.transform(1, 1, 0, 1, 0, 0)
  ctx.fillRect(0, 0, 100, 100)

  // 2. 叠加水平移动
  ctx.transform(1, 0, 0, 1, 100, 0)
  ctx.fillRect(0, 100, 100, 100)

  // 3.重置画布变换，恢复默认画布设置
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillRect(200, 0, 50, 50)
}

// 叠加缩放
const transformScale = () => {
  clearCanvas()

  // 正常的矩形
  ctx.fillStyle = 'red'
  ctx.fillRect(250, 0, 50, 50)

  // 1. xy整体乘以1.5，即比原先比例放大0.5倍: x * 1.5, y * 1.5, w * 1.5, h * 1.5
  ctx.transform(1.5, 0, 0, 1.5, 0, 0)
  // 即fillReact实际获得的参数等同于：ctx.fillRect(0, 0, 75, 75)
  ctx.fillRect(0, 0, 50, 50)

  // 2. xy叠加乘以1.5，即比之前的比例再放大0.5倍: x * 1.5 * 1.5, y * 1.5 * 1.5, w * 1.5 * 1.5, h * 1.5 * 1.5
  ctx.transform(1.5, 0, 0, 1.5, 0, 0)
  // 即fillReact实际获得的参数等同于：ctx.fillRect(0, 112.5, 112.5, 112.5)
  ctx.fillRect(0, 50, 50, 50)

  ctx.fillStyle = 'blue'
  // 3. xy叠加乘以1，此时和上个图形比例一致, x、y、w、h的比例不会变化: x * 1.5 * 1.5 * 1, y * 1.5 * 1.5 * 1, w * 1.5 * 1.5 * 1, h * 1.5 * 1.5 * 1
  ctx.transform(1, 0, 0, 1, 0, 0)
  ctx.fillRect(50, 50, 50, 50)

  ctx.fillStyle = 'green'
  // 4. xy叠加乘以0.5, 即比上一个比例再缩小0.5倍：
  // x * 1.5 * 1.5 * 1 * 0.5, y * 1.5 * 1.5 * 1 * 0.5, w * 1.5 * 1.5 * 1 * 0.5, h * 1.5 * 1.5 * 1 * 0.5
  ctx.transform(0.5, 0, 0, 0.5, 0, 0)
  // 即fillReact实际获得的参数等同于：ctx.fillRect(112.5, 112.5, 56.25, 56.25)
  ctx.fillRect(100, 100, 50, 50)
}

// 倾斜角度
const transformSlope = () => {
  clearCanvas()

  // 正常的矩形
  ctx.fillStyle = 'red'
  ctx.fillRect(250, 0, 50, 50)

  ctx.fillStyle = 'blue'
  // 1. b 垂直倾斜1，即y轴向下倾斜45°，1 = tan45°
  ctx.transform(1, 1, 0, 1, 0, 0)
  ctx.fillRect(0, 0, 50, 50)

  // 重置
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  ctx.fillStyle = 'green'
  // 2. c 水平倾斜1，即x轴向右倾斜45°，1 = tan45°
  ctx.transform(1, 0, 1, 1, 0, 0)
  ctx.fillRect(0, 50, 50, 50)

  // 重置
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  ctx.fillStyle = 'gray'
  // 3. x 轴向左倾斜30°，y 轴向上倾斜 15°
  // 即 b = -0.27; c = -0.58;
  ctx.transform(1, -0.27, -0.58, 1, 0, 0)
  ctx.fillRect(150, 150, 50, 50)
}

// 线性渐变
const drawGradientLinear = () => {
  clearCanvas()

  // 1. 一个从左到右的渐变
  const gradient = ctx.createLinearGradient(10, 10, 280, 10)
  gradient.addColorStop(0, 'red')
  gradient.addColorStop(1, 'white')
  ctx.fillStyle = gradient
  ctx.fillRect(10, 10, 280, 50)

  // 2. 一个从右到左的渐变
  const gradient2 = ctx.createLinearGradient(10, 10, 280, 10)
  gradient2.addColorStop(0, 'white')
  gradient2.addColorStop(1, 'red')
  ctx.fillStyle = gradient2
  ctx.fillRect(10, 70, 280, 50)

  // 3. 一个从上到下的渐变
  const gradient3 = ctx.createLinearGradient(10, 110, 10, 200)
  gradient3.addColorStop(0, '#000333')
  gradient3.addColorStop(1, '#ffffff')
  ctx.fillStyle = gradient3
  ctx.fillRect(10, 130, 280, 50)

  // 4. 一个从下到上的渐变
  const gradient4 = ctx.createLinearGradient(10, 300, 10, 190)
  gradient4.addColorStop(0, '#000333')
  gradient4.addColorStop(1, '#ffffff')
  ctx.fillStyle = gradient4
  ctx.fillRect(10, 190, 280, 50)

  // 5. 多色线性渐变
  const gradient5 = ctx.createLinearGradient(10, 250, 10, 300)
  gradient5.addColorStop(0, 'rgba(255, 0, 128, 0.6)')
  gradient5.addColorStop(0.5, 'rgb(47, 242, 15)')
  gradient5.addColorStop(1, 'hsl(231, 90%, 50%)')
  ctx.fillStyle = gradient5
  ctx.fillRect(10, 250, 280, 50)
}

// 放射性渐变
const drawGradientRadial = () => {
  clearCanvas()

  // 1. 一个放射性渐变
  const gradient = ctx.createRadialGradient(50, 50, 50, 50, 50, 0)
  gradient.addColorStop(0, 'white')
  gradient.addColorStop(1, 'green')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 100, 100)

  // 2. 反向放射性渐变
  const gradient2 = ctx.createRadialGradient(170, 50, 0, 170, 50, 50)
  gradient2.addColorStop(0, 'white')
  gradient2.addColorStop(1, 'green')
  ctx.fillStyle = gradient2
  ctx.fillRect(120, 0, 100, 100)

  // 3. 多色放射性渐变
  const gradient3 = ctx.createRadialGradient(50, 170, 50, 50, 170, 0)
  gradient3.addColorStop(0, 'white')
  gradient3.addColorStop(0.2, 'orange')
  gradient3.addColorStop(0.6, 'red')
  gradient3.addColorStop(1, 'green')
  ctx.fillStyle = gradient3
  ctx.fillRect(0, 120, 100, 100)

  // 4. 放射中心点不在显示区域内，且不为同心圆
  const gradient4 = ctx.createRadialGradient(270, 170, 100, 200, 120, 50)

  gradient4.addColorStop(0, '#8000FF')
  gradient4.addColorStop(1, '#FF0080')
  ctx.fillStyle = gradient4
  ctx.rect(120, 120, 100, 100)
  ctx.stroke()
  ctx.fill()

  ctx.strokeStyle = '#dddddd'
  // 小圆
  ctx.arc(270, 170, 150, 0, 2 * Math.PI)
  ctx.stroke()
  // 大圆
  ctx.arc(200, 120, 50, 0, 2 * Math.PI)
  ctx.stroke()
}

// 重复图案
const drawPattern = () => {
  clearCanvas()

  // 1. 引入一张图片作为图案
  const img = new Image()
  img.src = 'img/cat.jpg'
  img.onload = function() {
    const pattern = ctx.createPattern(img, 'repeat')
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, 100, 100)
  }

  // 2. 引入一个canvas对象作为图片
  showOtherCanvas()
  const canvas2 = document.getElementById('canvas2')
  const pattern2 = ctx.createPattern(canvas2, 'repeat')
  // 使用CanvasPattern.setTransform()对图形进行变形
  const svg1 = document.getElementById('svg1')
  const matrix = svg1.createSVGMatrix()
  pattern2.setTransform(matrix.scale(0.1).translate(-150, -150))
  ctx.fillStyle = pattern2
  ctx.fillRect(0, 120, 100, 100)
}

const showOtherCanvas = () => {
  const canvas2 = document.getElementById('canvas2')
  const ctx2 = canvas2.getContext('2d')
  ctx2.translate(150, 150)
  for (let i = 0; i < 8; i++) {
    ctx2.rotate((45 * Math.PI) / 180)
    ctx2.rect(0, 0, 150, 150)
    ctx2.stroke()
  }
}

// 绘制图像
const drawImage = () => {
  clearCanvas()

  // 引入一张图片显示在canvas上

  const img = new Image()
  img.src = 'img/cat.jpg'
  img.onload = function() {
    // 1. 不对引入的图片做任何处理，只指定了图片左上角的点位于画布中的位置
    ctx.drawImage(img, 0, 0)

    // 2. 缩放引入的图片，并显示在指定的位置, 注意此处图片变形了
    ctx.drawImage(img, 30, 0, 100, 50)

    // 3. 等比缩放图片
    const scaleW = 100
    const ratio = scaleW / img.width
    ctx.drawImage(img, 150, 0, scaleW, ratio * img.height)

    // 4. 剪裁图片
    ctx.drawImage(img, 10, 2, 20, 10, 0, 100, 200, 100)
  }
}

// 设置透明度
const drawAlpha = () => {
  clearCanvas()

  ctx.globalAlpha = 0.5

  ctx.fillStyle = 'blue'
  ctx.fillRect(10, 10, 100, 100)

  ctx.fillStyle = 'red'
  ctx.fillRect(50, 50, 100, 100)
}

// 绘制阴影
const drawShadow = () => {
  clearCanvas()

  // 1. 设置一个 x = 10, y = 10, b = 10的阴影
  ctx.shadowColor = 'black'
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 10
  ctx.shadowBlur = 10
  ctx.fillStyle = 'white'
  ctx.fillRect(20, 20, 100, 100)

  // 2. 设置一个 x = 0, y = 0, b = 10的阴影
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.fillRect(150, 20, 100, 100)

  // 3. 设置一个 x = -10, y = -20, b = 20的阴影
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.shadowOffsetX = -10
  ctx.shadowOffsetY = -20
  ctx.shadowBlur = 20
  ctx.fillRect(20, 180, 100, 100)

  // 4. 设置一个 x = -10, y = -10, b = 0的阴影
  ctx.shadowColor = 'black'
  ctx.shadowOffsetX = -10
  ctx.shadowOffsetY = -10
  ctx.shadowBlur = 0
  ctx.fillRect(150, 180, 100, 100)
}

// 像素控制
const controlPixel = () => {
  clearCanvas()

  ctx.fillStyle = 'red'
  ctx.rect(10, 10, 100, 100)
  ctx.fill()

  // 1. 获取当前canvas的像素数据
  const theImgData = ctx.getImageData(10, 10, 100, 100)
  console.log('theImgData', theImgData)

  // 2. 创建1个新的ImageData对象
  const newImgData = ctx.createImageData(100, 100)
  console.log('newImgData', newImgData)

  // 3. 复制 1 中获得的数据，并绘制到指定的位置
  ctx.putImageData(theImgData, 150, 150)
}

// 状态的保存与恢复
const saveRestore = () => {
  clearCanvas()

  ctx.fillStyle = 'red'
  ctx.fillRect(10, 10, 100, 100)

  // 1. 保存当前状态
  ctx.save()

  ctx.fillStyle = 'blue'
  ctx.rotate((45 * Math.PI) / 180)
  ctx.fillRect(220, 0, 100, 100)

  // 2. 恢复 1 中的状态
  ctx.restore()

  ctx.fillRect(220, 120, 20, 20)
}

// 获取上下文中的 HTMLCanvasElement 对象
const getCanvas = () => {
  console.log('ctx.canvas', ctx.canvas)
  console.log(
    'canvas width',
    ctx.canvas.width,
    'canvas height',
    ctx.canvas.height
  )

  ctx.canvas.height = 400
  console.log('通过 ctx.canvas 修改画布高度', ctx.canvas.height)
}

// canvas 转 base64 格式
const toBase64 = () => {
  clearCanvas()

  // 1. 当前画布为空，此时获得的 dataUrl 长度也比较小，把打印出来的这段字符串复制到浏览器的地址栏中会看到页面中什么图像也没有
  const dataUrl = canvas.toDataURL()
  console.log('dataUrl', dataUrl)

  // 2. 引入图片到canvas中，再把打印出来的dataUrl复制到浏览器地址栏中，会看到与canvas相同的图像

  const img = new Image()
  img.setAttribute('crossOrigin', 'anonymous')
  img.src = 'https://img9.doubanio.com/view/subject/s/public/s33534105.jpg'
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const dataUrl2 = canvas.toDataURL()
    console.log('dataUrl2', dataUrl2)

    // 3. 压缩图片质量，传参0~1之间的数值，传 1 是不压缩， 传 0 是 图片仍然显示，但是几乎无法识别了，变成了马赛克
    const dataUrl3 = canvas.toDataURL('image/jpeg', 0)
    console.log('dataUrl3', dataUrl3)
  }
}

// 下载图片到本地
const downloadImg = () => {
  clearCanvas()

  ctx.strokeStyle = 'red'

  ctx.beginPath()
  ctx.arc(100, 120, 50, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(160, 120, 50, 0, 2 * Math.PI)
  ctx.stroke()

  // 创建下载
  canvas.toBlob(blob => {
    const a = document.createElement('a')
    a.textContent = 'Download'
    a.id = 'download'
    document.body.appendChild(a)
    a.style.display = 'none'
    a.download = 'abc.jpg'
    // 以blob对象为基础创建一个url
    a.href = window.URL.createObjectURL(blob)
    document.querySelector('#download').click()
  })
}
