<template>
  <div class="DB-container">
    <VicomHeader></VicomHeader>
    <main>主要绘画区域</main>

    <div>工具栏</div>
    <aside>侧边栏</aside>
  </div>
</template>

<script setup>
import VicomHeader from '@/Layout/VicomHeader.vue'
</script>
<style lang="less" scoped>
.DB-container {
  height: 100vh;
}
</style>
