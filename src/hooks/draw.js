import { fabric } from 'fabric-with-erasing'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
export let canvas

let color = '#000000'
let pencliWidth = 10

export async function initCanvas(canvasDom, opt) {
  canvas = new fabric.Canvas(canvasDom, {
    backgroundColor: '#FFFFFF',
    ...opt
  })
  addLayer()
  await setActiveLayer(0)
  drawGridOnLayer(activeLayer)
  function drawGridOnLayer(layer) {
    // layer.addWithUpdate(square) // 使用addWithUpdate方法添加子元素
    // canvas.requestRenderAll() // 手动更新画布
  }

  // 添加绘制完成事件监听器
  canvas.on('path:created', function (event) {
    var drawnPath = event.path
    drawnPath.set('selectable', false)
    // 获取当前活动图层
    // 如果有活动图层且是图层组
    if (activeLayer && activeLayer.type === 'group') {
      // 将绘制的路径添加到活动图层
      activeLayer.addWithUpdate(drawnPath)
      canvas.requestRenderAll()
    }
  })
}

export function initPencil() {
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

// 绘制图形到当前活动图层
function drawOnActiveLayer(object) {
  var activeLayer = canvas.getActiveObject()
  if (activeLayer && activeLayer.type === 'group') {
    activeLayer.add(object)
    canvas.requestRenderAll()
  }
}

export function moveimage() {
  const activeindex = layers.value.findIndex((item) => item.id === activeLayer.id)
  setActiveLayer(activeindex)
  canvas.isDrawingMode = false
}

// 创建图层数组
export let layers = ref([])
// 添加新图层函数
export function addLayer(img) {
  let layer = new fabric.Group([], {
    width: canvas.width,
    height: canvas.height,
    id: uuidv4(),
    titleName: uuidv4(),
    selectable: false
  })
  layers.value.push(layer)
  canvas.add(layer)
  if (img) {
    layer.addWithUpdate(img)
    canvas.requestRenderAll()
  }
}

let activeLayer
// 切换当前活动图层函数
export function setActiveLayer(index) {
  return new Promise((reslove, reject) => {
    canvas.setActiveObject(layers.value[index])

    canvas.requestRenderAll()

    canvas.on('after:render', function () {
      activeLayer = canvas.getActiveObject()
      // canvas.isDrawingMode = false
      // 可以在这里执行后续的操作
      // ...
      reslove()
      // 确保只监听一次，避免重复触发
      canvas.off('after:render')
    })
  })
}

// 设置图层顺序
export function setLayerOrder() {
  canvas.getObjects().forEach(function (obj, index) {
    obj.set('objectLayer', index)
  })
  canvas.requestRenderAll()
}

// 移动图层到指定层级
export function moveLayerToIndex(targetIndex, id) {
  // layers.value.forEach(function (layer) {
  //   canvas.remove(layer)
  // })
  // layers.value.forEach(function (layer) {
  //   canvas.add(layer)
  // })
  canvas.requestRenderAll()
}

export function addLayerWithImage(base64Image) {
  fabric.Image.fromURL(base64Image, function (img) {
    addLayer(img)
    canvas.requestRenderAll()
  })
}
