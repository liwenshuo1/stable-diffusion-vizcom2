import { fabric } from 'fabric-with-erasing'

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
  console.log(canvas.freeDrawingBrush)
  canvas.isDrawingMode = true
  let pencilBrush = new fabric.PencilBrush(canvas)
  canvas.freeDrawingBrush = pencilBrush
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

export function initEarser() {
  canvas.isDrawingMode = true // 进入绘画模式
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas) // 使用橡皮擦画笔
  canvas.freeDrawingBrush.width = 10 // 设置画笔粗细为 10
}
