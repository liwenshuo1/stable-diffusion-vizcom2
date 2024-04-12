import { ElMessage } from 'element-plus'
import { fabric } from 'fabric-with-erasing'
import { v4 as uuidv4 } from 'uuid'
import { ref, reactive } from 'vue'
export let canvas

let color = '#000000'
let pencliWidth = 10
let eraserWidth = 10
let graphWidth = 10
export let currentTool = reactive(
  new Map([
    ['pencil', true],
    ['move', false],
    ['eraser', false],
    ['line', false],
    ['circle', false]
  ])
)

let canMoveImg = false
function setCurrentTool(currentKey) {
  currentTool.forEach((value, key, map) => {
    currentTool.set(key, false)
  })
  currentTool.set(currentKey, true)

  const activeindex = layers.value.findIndex((item) => item.id === activeLayer.id)
  if (currentTool.get('move')) {
    layers.value[activeindex].lockMovementX = false // 锁定水平移动
    layers.value[activeindex].lockMovementY = false // 锁定垂直移动
  } else {
    layers.value[activeindex].lockMovementX = true // 锁定水平移动
    layers.value[activeindex].lockMovementY = true // 锁定垂直移动
  }
}

export async function initCanvas(canvasDom, opt) {
  canvas = new fabric.Canvas(canvasDom, {
    // backgroundColor: '#FFFFFF',
    selection: false,
    ...opt
  })
  addLayer()
  await setActiveLayer(0)
  initPencil()
  // // 添加绘制完成事件监听器
  canvas.on('path:created', function (event) {
    if (canvas.isDrawingMode) {
      let drawnPath = event.path
      drawnPath.set('selectable', false)
      // 获取当前活动图层
      // 如果有活动图层且是图层组
      if (activeLayer && activeLayer.type === 'group') {
        // 将绘制的路径添加到活动图层
        activeLayer.addWithUpdate(drawnPath)
        // canvas.requestRenderAll()
      }
    }
  })
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
export function initPencil() {
  // if (currentTool.get('pencil')) return
  setCurrentTool('pencil')
  canvas.isDrawingMode = true
  let pencilBrush = new fabric.PencilBrush(canvas)
  canvas.freeDrawingBrush = pencilBrush
  setColor(color)
}

export function initEarser() {
  // if (currentTool.get('pencil')) return
  setCurrentTool('earser')
  canvas.isDrawingMode = true // 进入绘画模式
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas) // 使用橡皮擦画笔
  canvas.freeDrawingBrush.width = eraserWidth // 设置画笔粗细为 10
}

export function setEraserWidth(val) {
  eraserWidth = val
  canvas.freeDrawingBrush.width = eraserWidth
}

// 设置图形宽度

export function changeGraphWidth(val) {
  graphWidth = val
}
// 直线

export function initLine() {
  if (currentTool.get('line')) return
  setCurrentTool('line')
  canvas.isDrawingMode = false
  let line
  let isDrawing
  // 鼠标按下事件处理函数
  function onMouseDown(event) {
    if (!currentTool.get('line')) return
    isDrawing = true
    let pointer = canvas.getPointer(event.e)
    let points = [pointer.x, pointer.y, pointer.x, pointer.y]
    line = new fabric.Line(points, {
      strokeWidth: graphWidth,
      stroke: color,
      strokeLineCap: 'round', // 设置直线端点样式为圆形
      selectable: false
    })
    canvas.add(line)
  }

  // 鼠标移动事件处理函数
  function onMouseMove(event) {
    if (!currentTool.get('line')) return
    if (!isDrawing) return
    let pointer = canvas.getPointer(event.e)
    line.set({ x2: pointer.x, y2: pointer.y })
    // canvas.renderAll()
    canvas.requestRenderAll()
  }

  // 鼠标释放事件处理函数
  function onMouseUp(event) {
    if (!currentTool.get('line')) return
    isDrawing = false
    line.set('selectable', false)
    activeLayer.addWithUpdate(line)
    canvas.discardActiveObject()
  }
  // 绑定鼠标事件监听器
  canvas.on('mouse:down', onMouseDown)
  canvas.on('mouse:move', onMouseMove)
  canvas.on('mouse:up', onMouseUp)
  //
}

// 圆圈

export function initCircle() {
  if (currentTool.get('circle')) return

  setCurrentTool('circle')
  canvas.isDrawingMode = false
  let isDrawing = false
  let circle

  // 鼠标按下事件处理函数
  canvas.on('mouse:down', function (event) {
    if (!currentTool.get('circle')) return
    if (!isDrawing) {
      isDrawing = true
      let pointer = canvas.getPointer(event.e)
      let startX = pointer.x
      let startY = pointer.y
      circle = new fabric.Circle({
        selectable: false,
        left: startX,
        top: startY,
        radius: 0,
        strokeWidth: graphWidth, // 设置线条宽度
        stroke: color, // 设置线条颜色
        fill: 'transparent' // 设置填充颜色为透明，实现空心效果
      })
      canvas.add(circle)
    }
  })

  // 鼠标移动事件处理函数
  canvas.on('mouse:move', function (event) {
    if (!currentTool.get('circle')) return
    if (isDrawing) {
      let pointer = canvas.getPointer(event.e)
      let endX = pointer.x
      let endY = pointer.y
      let radius = Math.sqrt(Math.pow(endX - circle.left, 2) + Math.pow(endY - circle.top, 2))
      circle.set({
        radius: radius
      })
      canvas.requestRenderAll()
    }
  })

  // 鼠标释放事件处理函数
  canvas.on('mouse:up', function (event) {
    if (!currentTool.get('circle')) return
    isDrawing = false
    activeLayer.addWithUpdate(circle)
    canvas.discardActiveObject()
  })
}

// 方形

// 绘制图形到当前活动图层
function drawOnActiveLayer(object) {
  console.log(object)
  if (activeLayer && activeLayer.type === 'group') {
    activeLayer.addWithUpdate(object)
    canvas.requestRenderAll()
  }
}

export function moveimage() {
  setCurrentTool('move')
  const activeindex = layers.value.findIndex((item) => item.id === activeLayer.id)
  setActiveLayer(activeindex)
  canvas.isDrawingMode = false
}

// 创建图层数组
export let layers = ref([])
// 添加新图层函数
export function addLayer(img) {
  let layer = new fabric.Group([], {
    visible: true,
    width: canvas.width,
    height: canvas.height,
    id: uuidv4(),
    titleName: uuidv4(),
    selectable: false,
    lockMovementX: true, // 锁定水平移动
    lockMovementY: true // 锁定垂直移动
  })
  layers.value.push(layer)
  canvas.add(layer)
  if (img) {
    layer.addWithUpdate(img)
    canvas.requestRenderAll()
  }
}

// 删除图层
export function deleteLayer(index, acitveindex) {
  if (layers.value.length <= 1) {
    ElMessage.warning('当前只有一个图层，不能删除')
    return
  }
  canvas.clear()
  layers.value.forEach(function (layer, j) {
    if (j != index) {
      canvas.add(layer)
    }
  })
  canvas.requestRenderAll()
  layers.value.splice(index, 1)
  setActiveLayer(acitveindex)
}

// 隐藏图层
export function hiddenLayer(index, acitveindex) {
  canvas.clear()
  layers.value.forEach(function (layer, j) {
    if (j == index) {
      layers.value[index].visible = !layers.value[index].visible
    }
    canvas.add(layer)
  })
  canvas.requestRenderAll()
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
    let scaleX = canvas.width / img.width
    let scaleY = canvas.height / img.height
    let scale = Math.min(scaleX, scaleY)

    img.set({
      scaleX: scale,
      scaleY: scale,
      left: (canvas.width - img.width * scale) / 2,
      top: (canvas.height - img.height * scale) / 2,
      selectable: false // 图片不可选中
    })

    addLayer(img)
    canvas.requestRenderAll()
  })
}
