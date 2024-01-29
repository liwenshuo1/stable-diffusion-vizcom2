let painting = false
let EraserEnabled = false
let startPoint
export let canvas
export let ctx

export function initCanvas(canvasDom) {
  canvas = canvasDom
  ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  ctx.mozImageSmoothingEnabled = false
  ctx.webkitImageSmoothingEnabled = false
  ctx.msImageSmoothingEnabled = false
}

export function initPencil() {
  ctx.globalAlpha = 1
  canvas.onmousedown = function (e) {
    console.log(e)
    let x = e.offsetX
    let y = e.offsetY
    painting = true
    if (EraserEnabled) {
      ctx.clearRect(x - 15, y - 15, 30, 30)
    }
    startPoint = { x: x, y: y }

    // drawLine(startPoint.x, startPoint.y, startPoint.x, startPoint.y)
  }

  canvas.onmousemove = function (e) {
    let x = e.offsetX
    let y = e.offsetY
    let newPoint = { x: x, y: y }
    if (painting) {
      if (EraserEnabled) {
        ctx.clearRect(x - 15, y - 15, 30, 30)
      } else {
        drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y)
      }
      startPoint = newPoint
    }
  }

  canvas.onmouseup = function () {
    painting = false
  }

  function drawLine(xStart, yStart, xEnd, yEnd) {
    //开始绘制路径
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    //线宽
    ctx.lineWidth = 5
    //起始位置
    ctx.moveTo(xStart, yStart)
    //停止位置
    ctx.lineTo(xEnd, yEnd)
    //描绘线路
    ctx.stroke()
    //结束绘制
    ctx.closePath()
  }
}
