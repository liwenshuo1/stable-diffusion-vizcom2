<template>
  <div class="edit-warp">
    <!-- <span class="color-picker pointer" @click="showColorPicker"></span> -->
    <el-color-picker ref="colorPicker" v-model="color" @change="checkColor" />
    <span class="pointer">
      <el-popover
        v-model="pencilEdit"
        :teleported="false"
        transition="none"
        :hide-after="0"
        placement="right"
        :offset="16"
        :width="200"
        trigger="click">
        <template #reference>
          <!-- <el-tooltip
            :hide-after="0"
            ref="pencilTooltip"
            class="box-item"
            :offset="16"
            effect="dark"
            content="铅笔(B)"
            placement="right"> -->
          <SvgIcon
            name="cc-pencil"
            @click="pencil"
            :color="currentTool.get('pencil') ? themeColor : '#ffffff'"></SvgIcon>
          <!-- </el-tooltip> -->
        </template>
        <template #default>
          <div class="pencil-card">
            <span>铅笔设置</span>

            <!-- https://nightcatsama.github.io/vue-slider-component/#/api/slots -->
            <VueSlider @change="changePencilSize" v-bind="slider" v-model="pencilWidth"></VueSlider>
          </div>
        </template>
      </el-popover>
    </span>

    <span class="pointer">
      <el-popover
        v-model="pencilEdit"
        :teleported="false"
        transition="none"
        :hide-after="0"
        placement="right"
        :offset="16"
        :width="200"
        trigger="click">
        <template #reference>
          <!-- <el-tooltip
            :hide-after="0"
            ref="pencilTooltip"
            class="box-item"
            :offset="16"
            effect="dark"
            content="铅笔(B)"
            placement="right"> -->
          <SvgIcon name="eraser" @click="earser" :color="currentTool.get('earser') ? themeColor : '#ffffff'"></SvgIcon>
          <!-- </el-tooltip> -->
        </template>
        <template #default>
          <div class="pencil-card">
            <span>橡皮设置</span>

            <!-- https://nightcatsama.github.io/vue-slider-component/#/api/slots -->
            <VueSlider @change="changeEraserSize" v-bind="slider" v-model="eraserlWidth"></VueSlider>
          </div>
        </template>
      </el-popover>
    </span>

    <span class="pointer">
      <SvgIcon name="move" @click="moveLayer" :color="currentTool.get('move') ? themeColor : '#ffffff'"></SvgIcon>
    </span>

    <span class="pointer">
      <el-popover
        v-model="pencilEdit"
        :teleported="false"
        transition="none"
        :hide-after="0"
        placement="right"
        :offset="16"
        :width="200"
        trigger="click">
        <template #reference>
          <!-- <el-tooltip
            :hide-after="0"
            ref="pencilTooltip"
            class="box-item"
            :offset="16"
            effect="dark"
            content="铅笔(B)"
            placement="right"> -->
          <SvgIcon
            :name="graphName"
            @click="readyGraph(graphName)"
            :color="currentTool.get('line') || currentTool.get('circle') ? themeColor : '#ffffff'"></SvgIcon>
          <!-- </el-tooltip> -->
        </template>
        <template #default>
          <div class="pencil-card">
            <div class="graph-warp">
              <SvgIcon name="line" @click="setGraph('line')" color="#ffffff"></SvgIcon>
              <!-- <SvgIcon name="rect" @click="setGraph('rect')" color="#ffffff"></SvgIcon> -->
              <SvgIcon name="circle" @click="setGraph('circle')" color="#ffffff"></SvgIcon>
              <VueSlider @change="changeGraphWidth" v-bind="slider" v-model="eraserlWidth"></VueSlider>
            </div>
            <!-- https://nightcatsama.github.io/vue-slider-component/#/api/slots -->
          </div>
        </template>
      </el-popover>
    </span>
  </div>
</template>

<script setup>
import VicomTooltip from '@/components/VicomTooltip/VicomTooltip.vue'
import { ref } from 'vue'
import {
  currentTool,
  initPencil,
  initLine,
  setColor,
  setwidth,
  initEarser,
  moveimage,
  setEraserWidth,
  changeGraphWidth,
  initCircle
} from '@/hooks/draw.js'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const colorPicker = ref('')
const color = ref('#000000')
function checkColor(value) {
  setColor(value)
}
function showColorPicker() {
  console.log(colorPicker.value)
  colorPicker.value.show()
}

const pencilEdit = ref(false)
const pencilTooltip = ref('')

const pencilWidth = ref(10)
function changePencilSize(val) {
  setwidth(val)
}

const eraserlWidth = ref(10)
function changeEraserSize(val) {
  setEraserWidth(val)
}

function pencil() {
  // pencilTooltip.value.onClose()
  pencilEdit.value = true
  initPencil()
}

function earser() {
  initEarser()
}

function moveLayer() {
  moveimage()
}

function creatline() {
  initLine()
}

function readyGraph(value) {
  if (value == 'line') {
    initLine()
    return
  }

  if (value == 'circle') {
    initCircle()
  }
}
const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--vicom-primary')
const slider = {
  dotSize: 18,
  tooltip: 'none',
  processStyle: {
    backgroundColor: themeColor
  },
  dotStyle: {
    borderColor: themeColor
  }
}

const graphName = ref('line')
function setGraph(value) {
  graphName.value = value
  readyGraph(value)
}
</script>
<style lang="less" scoped>
.edit-warp {
  padding-top: 24px;
  display: grid;
  grid-template-rows: repeat(auto-fill, 24px);
  gap: 24px;
  justify-content: center;
  justify-items: center;
  .color-picker {
    width: 22px;
    height: 22px;
    border: 1px solid var(--vicom-icon-color);
    border-radius: 999px;
    background-color: v-bind('color');
    .color-picker-el {
      display: none;
    }
  }
  .graph-warp {
    display: grid;
    gap: 10px;
  }
}

// // 覆盖elementplus样式
// :deep(.el-popper__arrow) {
//   display: none !important;
// }
// :deep(.el-popover) {
//   --el-popover-border-radius: 10px;
// }

// :deep(.el-tooltip__trigger) {
//   display: none;
// }

:global(.el-color-picker__panel) {
  inset: 55px auto auto 50px !important;
}

.custom-class {
}
</style>
