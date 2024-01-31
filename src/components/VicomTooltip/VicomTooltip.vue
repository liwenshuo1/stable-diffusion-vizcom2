<template>
  <div class="warp">
    <slot name="default"></slot>
    <div class="tooltip">设置内容</div>
  </div>
</template>

<script setup></script>
<style lang="less" scoped>
.warp {
  position: relative;
  .tooltip {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
