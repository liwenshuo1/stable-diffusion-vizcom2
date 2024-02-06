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
          <SvgIcon name="cc-pencil" @click="pencil" color="#ffffff"></SvgIcon>
          <!-- </el-tooltip> -->
        </template>
        <template #default>
          <div class="pencil-card">
            <span>铅笔设置</span>

            <!-- https://nightcatsama.github.io/vue-slider-component/#/api/slots -->
            <VueSlider @change="changePencilSize" :dotSize="18" tooltip="none" v-model="pencilWidth"></VueSlider>
          </div>
        </template>
      </el-popover>
    </span>

    <span class="pointer">
      <SvgIcon name="eraser" @click="earser" color="#ffffff"></SvgIcon>
    </span>

    <span class="pointer">
      <SvgIcon name="move" @click="moveLayer" color="#ffffff"></SvgIcon>
    </span>

    <span class="pointer">
      <SvgIcon name="line" @click="creatline" color="#ffffff"></SvgIcon>
    </span>
  </div>
</template>

<script setup>
import VicomTooltip from '@/components/VicomTooltip/VicomTooltip.vue'
import { ref } from 'vue'
import { initPencil, initLine, setColor, setwidth, initEarser, moveimage } from '@/hooks/draw.js'
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
