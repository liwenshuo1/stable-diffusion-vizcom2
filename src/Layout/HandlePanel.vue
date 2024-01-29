<template>
  <div class="edit-warp">
    <span class="color-picker pointer" @click="showColorPicker"></span>
    <el-color-picker ref="colorPicker" v-model="color" @change="checkColor" />

    <span class="pointer" @click="initPencil">
      <SvgIcon name="cc-pencil" color="#ffffff"></SvgIcon>
    </span>

    <span class="pointer">
      <SvgIcon name="eraser" color="#ffffff"></SvgIcon>
    </span>

    <span class="pointer">
      <SvgIcon name="move" color="#ffffff"></SvgIcon>
    </span>

    <span class="pointer">
      <SvgIcon name="line" color="#ffffff"></SvgIcon>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { initPencil } from '@/hooks/draw.js'
const colorPicker = ref('')
const color = ref('#000000')

function showColorPicker() {
  console.log(colorPicker.value)
  colorPicker.value.show()
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

// 覆盖elementplus样式
:deep(.el-popper__arrow) {
  display: none !important;
}
:deep(.el-popover) {
  --el-popover-border-radius: 10px;
}

:deep(.el-tooltip__trigger) {
  display: none;
}

:global(.el-color-picker__panel) {
  inset: 55px auto auto 5px !important;
}
</style>
