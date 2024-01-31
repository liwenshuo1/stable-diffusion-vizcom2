let painting = false
let EraserEnabled = false
let startPoint
export let canvas
export let ctx
var isDrawing = false
var lastX = 0
var lastY = 0

export function initCanvas(canvasDom) {
  canvas = canvasDom
  ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false
  ctx.webkitImageSmoothingEnabled = false
  ctx.msImageSmoothingEnabled = false
}

export function initPencil() {
  // ctx.globalAlpha = 0.1

  let points = []

  canvas.addEventListener('mouseenter', (e) => {
    ctx.beginPath()
    ctx.arc(e.clientX, e.clientY, 20, 0, 2 * Math.PI)
    ctx.stroke()
  })

  // 监听鼠标点击事件
  canvas.addEventListener('mousedown', function (event) {
    console.log(event)
    isDrawing = true
    points.push({
      x: event.clientX - canvas.getBoundingClientRect().left,
      y: event.clientY - canvas.getBoundingClientRect().top
    })
    draw()
  })

  // 监听鼠标移动事件
  canvas.addEventListener('mousemove', function (event) {
    if (isDrawing) {
      points.push({
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top
      })
      draw()
    }
  })

  // 监听鼠标释放事件
  canvas.addEventListener('mouseup', function () {
    isDrawing = false
    points = []
  })

  // 绘制平滑路径
  function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 10
    // if (points.length < 2) {
    //   return
    // }
    ctx.lineCap = 'round' // 圆形线帽
    ctx.lineJoin = 'round' // 圆形连接
    ctx.lineWidth = 50 // 圆形连接
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (var i = 1; i < points.length; i++) {
      var xc = (points[i].x + points[i - 1].x) / 2
      var yc = (points[i].y + points[i - 1].y) / 2
      ctx.lineTo(xc, yc)
    }

    ctx.stroke()
  }
}
