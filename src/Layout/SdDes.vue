<template>
  <div class="sd-des-warp">
    <div class="title">
      <SvgIcon class="pointer" name="create-img" @click="activeName = 'sdDes'" color="#ffffff"></SvgIcon>
      <span style="padding-left: 10px">生成图片设置</span>
    </div>
    <el-divider />
    <div class="content">
      <div style="margin-bottom: 10px">Prompt</div>
      <el-input v-model="textarea" :rows="8" type="textarea" placeholder="你想要创造什么" />
      <el-divider />
      <div style="margin-bottom: 10px">图片张数</div>
      <el-radio-group v-model="imageNumber">
        <el-radio :label="1">1</el-radio>
        <el-radio :label="2">2</el-radio>
        <el-radio :label="4">4</el-radio>
      </el-radio-group>
      <el-divider />
      <el-button style="width: 100%" tag="div" type="primary">Primary</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textarea = ref('')
const imageNumber = ref(1)
</script>
<style lang="less" scoped>
.sd-des-warp {
  .title {
    padding: 20px;
    padding-bottom: 0;
    display: flex;
    align-items: center;
  }
  .content {
    padding: 20px;
    font-weight: 700;
  }
}
</style>
