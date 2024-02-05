import { fabric } from 'fabric-with-erasing'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
let canvas

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
    console.log('layer', layer)
    // console.log(activeLayer)
    // console.log(layer.width)
    // console.log(layer.height)
    var gridSize = 20 // 每个格子的大小
    var numCols = Math.ceil(layer.width / gridSize)
    var numRows = Math.ceil(layer.height / gridSize)

    // for (var i = 0; i < numCols; i++) {
    //   for (var j = 0; j < numRows; j++) {
    //     var rect = new fabric.Rect({
    //       left: i * gridSize,
    //       top: j * gridSize,
    //       width: gridSize,
    //       height: gridSize,
    //       fill: (i + j) % 2 === 0 ? 'lightgray' : 'white',
    //       selectable: false,
    //       evented: false
    //     })
    //     layer.addWithUpdate(rect)
    //   }
    // }

    var square = new fabric.Rect({
      left: 50,
      top: 50,
      width: 50,
      height: 50,
      fill: 'blue',
      selectable: false,
      evented: false
    })
    layer.addWithUpdate(square) // 使用addWithUpdate方法添加子元素
    canvas.requestRenderAll() // 手动更新画布
  }

  // 添加绘制完成事件监听器
  canvas.on('path:created', function (event) {
    var drawnPath = event.path
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
  alert(123123)
}

// 创建图层数组
export let layers = ref([])
// 添加新图层函数
export function addLayer() {
  let layer = new fabric.Group([], { width: canvas.width, height: canvas.height, id: uuidv4(), selectable: false })
  layers.value.push(layer)
  canvas.add(layer)
}

let activeLayer
// 切换当前活动图层函数
export function setActiveLayer(index) {
  return new Promise((reslove, reject) => {
    canvas.setActiveObject(layers.value[index])

    canvas.requestRenderAll()

    canvas.on('after:render', function () {
      activeLayer = canvas.getActiveObject()
      canvas.isDrawingMode = false
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
  canvas.renderAll()
}

// 移动图层到指定层级
export function moveLayerToIndex(targetIndex) {
  var activeLayer = canvas.getActiveObject()
  if (activeLayer && activeLayer.type === 'group') {
    var currentIndex = layers.indexOf(activeLayer)
    if (currentIndex !== -1 && targetIndex >= 0 && targetIndex < layers.length) {
      layers.splice(currentIndex, 1)
      layers.splice(targetIndex, 0, activeLayer)
      setLayerOrder()
    }
  }
}
