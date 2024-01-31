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
import { fabric } from 'fabric'
import { initCanvas } from '@/hooks/draw.js'
const canvasDom = ref('')
const maicRef = ref('')
let ctx

let handle = ref('pencil')

let mainArea

onMounted(() => {
  mainArea = maicRef.value

  const options = {}
  options.width = mainArea.offsetWidth
  options.height = mainArea.offsetHeight

  initCanvas(canvasDom.value, options)
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
