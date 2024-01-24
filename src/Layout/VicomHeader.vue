<template>
  <header class="header">
    <div class="header-left">
      <el-popover
        :teleported="false"
        transition="none"
        :hide-after="0"
        placement="top-start"
        :offset="16"
        :width="200"
        trigger="click">
        <template #reference>
          <span class="logo pointer">
            <SvgIcon name="r" color="#ffffff"></SvgIcon>
          </span>
        </template>
        <template #default>其他操作</template>
      </el-popover>
      <div class="edit-warp">
        <span class="color-picker pointer" @click="showColorPicker"></span>
        <el-color-picker ref="colorPicker" v-model="color" @change="checkColor" />

        <span class="color-picker"></span>
        <span class="color-picker"></span>
        <span class="color-picker"></span>
      </div>
    </div>
    <div>2</div>
    <div>3</div>
  </header>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'

const colorPicker = ref('')
const color = ref('#000000')

function showColorPicker() {
  // if (colorPicker.value.__v_skip) return
  console.log(colorPicker.value)
  colorPicker.value.show()
}

function checkColor(value) {}
</script>
<style lang="less" scoped>
.header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  height: 50px;
  background-color: var(--vicom-bg-color);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 0.5rem;
  color: #ffffff;
  .header-left {
    display: flex;
    align-items: center;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      border-right: 1px solid var(--vicom-border-color);
    }

    .edit-warp {
      padding-left: 24px;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fill, 24px);
      align-items: center;
      gap: 24px;
    }
    .color-picker {
      width: 24px;
      height: 24px;
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
    // .el-color-dropdown__link-btn {
    //   display: none;
    // }
  }
  .el-input__wrapper {
    // box-shadow: none;
  }
}
</style>
