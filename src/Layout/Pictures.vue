<template>
  <el-space style="padding: 20px 50px" direction="vertical">
    <el-input v-model="input1" style="width: 100%" placeholder="请输入要搜索的图片">
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-image v-for="(item, index) in images" :key="index" :src="index" fit="cover" />
  </el-space>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const images = import.meta.glob('@/pictures/*.{png,jpg,jpeg,gif}')
const input1 = ref('')
console.log(images)
</script>
<style lang="less" scoped></style>
