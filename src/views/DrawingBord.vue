<template>
  <div class="DB-container">
    <VicomHeader class="header"></VicomHeader>
    <div class="bottom">
      <HandlePanel class="handle"></HandlePanel>

      <main class="main" ref="maicRef">
        <canvas ref="canvasDom" class="canvas">抱歉，您的浏览器暂不支持本项目</canvas>
      </main>

      <div class="tool">工具栏</div>
      <aside class="aside">侧边栏</aside>
    </div>
  </div>
</template>

<script setup>
import VicomHeader from '@/Layout/VicomHeader.vue'
import HandlePanel from '@/Layout/HandlePanel.vue'
import { onMounted, ref } from 'vue'

import { initCanvas } from '@/hooks/draw.js'
const canvasDom = ref('')
const maicRef = ref('')
let canvas
let ctx

let handle = ref('pencil')

let mainArea
let painting = false
let EraserEnabled = false
let startPoint

onMounted(() => {
  initCanvas(canvasDom.value)

  mainArea = maicRef.value
  canvas = canvasDom.value
  wh()

  drawBackground()

  var scaleFactor = 1.0
  // canvas.addEventListener('wheel', function (event) {
  //   event.preventDefault()

  //   // 根据缩放方向调整缩放比例
  //   if (event.deltaY < 0) {
  //     scaleFactor *= 1.1 // 放大
  //   } else {
  //     scaleFactor /= 1.1 // 缩小
  //   }

  //   // 限制最小和最大缩放比例
  //   scaleFactor = Math.max(0.1, Math.min(scaleFactor, 3.0))

  //   // 重新绘制
  //   var x = event.layerX
  //   var y = event.layerY
  //   ctx.drawImage(canvas, Math.abs(x - 5), Math.abs(y - 5), 10, 10, 0, 0, 200, 200)
  // })
})

function drawBackground(scaleFactor = 1) {
  // console.log(scaleFactor)
  // ctx.globalAlpha = 0.1 // 设置透明度
  // var cellSize = 8
  // for (var row = 0; row < canvas.height / cellSize; row++) {
  //   for (var col = 0; col < canvas.width / cellSize; col++) {
  //     if ((row + col) % 2 === 0) {
  //       ctx.fillStyle = 'black'
  //     } else {
  //       ctx.fillStyle = 'white'
  //     }
  //     ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
  //   }
  // }
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

function wh() {
  const width = mainArea.offsetWidth
  const height = mainArea.offsetHeight
  canvas.width = width
  canvas.height = height
}
window.addEventListener('resize', () => {
  wh()
})
</script>
<style lang="less" scoped>
.DB-container {
  height: 100vh;
  display: grid;
  grid-template-rows: 50px auto;
  color: var(--vicom-icon-active-color);
  .bottom {
    display: flex;
  }
  .header {
    // grid-column: 1 / 4;
    // grid-row: 1;
  }

  .handle {
    width: 50px;
    // grid-column: 3 / 4;
    background-color: var(--vicom-bg-color);
    border-top: 1px solid var(--vicom-border-color);
  }
  .main {
    flex: 8;
    user-select: none;
  }

  .pencil {
    cursor: none;
  }

  .tool {
    flex: 2;
    // display: none;
    background-color: var(--vicom-bg-color);
    border-top: 1px solid var(--vicom-border-color);
    border-right: 1px solid var(--vicom-border-color);
  }

  .aside {
    width: 50px;
    // grid-column: 3 / 4;
    background-color: var(--vicom-bg-color);
    border-top: 1px solid var(--vicom-border-color);
  }
  .canvas {
    // background-color: red;
  }
}
</style>
