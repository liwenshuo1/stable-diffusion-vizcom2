import { fabric } from 'fabric'

let canvas

let color = '#000000'
let pencliWidth = 10

export function initCanvas(canvasDom, opt) {
  canvas = new fabric.Canvas(canvasDom, {
    backgroundColor: '#FFFFFF',
    ...opt
  })
  console.log(canvas)
}

export function initPencil() {
  canvas.isDrawingMode = true
  setColor(color)
  // pencil.width = 30
}

export function setColor(val) {
  color = val
  if (canvas.isDrawingMode) {
    // 如果是绘画模式，同时设置画笔颜色
    canvas.freeDrawingBrush.color = color
    canvas.freeDrawingBrush.width = pencliWidth
  }
}

export function setwidth(val) {
  pencliWidth = val
  if (canvas.isDrawingMode) {
    // 如果是绘画模式，同时设置画笔颜色
    canvas.freeDrawingBrush.width = pencliWidth
  }
}
