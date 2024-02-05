<template>
  <div class="DB-container">
    <VicomHeader class="header"></VicomHeader>
    <div class="bottom">
      <HandlePanel class="handle"></HandlePanel>

      <main class="main" ref="maicRef">
        <canvas ref="canvasDom" class="canvas">抱歉，您的浏览器暂不支持本项目</canvas>
      </main>

      <div class="tool">
        <SdDes v-if="activeName === 'sdDes'"></SdDes>
        <Layers v-if="activeName === 'layers'" />
      </div>

      <aside class="aside">
        <SvgIcon class="pointer" name="create-img" @click="activeName = 'sdDes'" color="#ffffff"></SvgIcon>
        <SvgIcon class="pointer" name="layers" @click="activeName = 'layers'" color="#ffffff"></SvgIcon>
      </aside>
    </div>
  </div>
</template>

<script setup>
import SdDes from '@/Layout/SdDes.vue'
import Layers from '@/Layout/Layers.vue'
import VicomHeader from '@/Layout/VicomHeader.vue'
import HandlePanel from '@/Layout/HandlePanel.vue'
import { onMounted, ref } from 'vue'
import { fabric } from 'fabric'
import { initCanvas, addLayer } from '@/hooks/draw.js'
const canvasDom = ref('')
const maicRef = ref('')

const activeName = ref('sdDes')

let ctx

let handle = ref('pencil')
function pencil() {}
let mainArea

onMounted(() => {
  mainArea = maicRef.value

  const options = {}
  options.width = mainArea.offsetWidth
  options.height = mainArea.offsetHeight

  initCanvas(canvasDom.value, options)
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
    flex: 2.5;
    background-color: var(--vicom-bg-color);
    border-top: 1px solid var(--vicom-border-color);
    border-right: 1px solid var(--vicom-border-color);
  }

  .aside {
    padding-top: 24px;
    width: 50px;
    // grid-column: 3 / 4;
    background-color: var(--vicom-bg-color);
    border-top: 1px solid var(--vicom-border-color);
    display: grid;
    grid-template-rows: repeat(auto-fill, 24px);
    gap: 24px;
    justify-content: center;
  }
  .canvas {
    // background-color: red;
  }
}
</style>
