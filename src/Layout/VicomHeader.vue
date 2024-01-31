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
    </div>
    <h2 style="text-align: center">画板项目</h2>
    <div>其他操作</div>
  </header>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
</script>
<style lang="less" scoped>
.header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
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
  }
}
</style>
