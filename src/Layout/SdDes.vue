<template>
  <div class="sd-des-warp">
    <div class="title">
      <SvgIcon class="pointer" name="create-img" @click="activeName = 'sdDes'" color="#ffffff"></SvgIcon>
      <span style="padding-left: 10px">生成图片设置</span>
    </div>
    <el-divider />
    <div class="content">
      <div style="margin-bottom: 10px">Prompt</div>
      <el-input v-model="form.prompt" :rows="8" type="textarea" placeholder="你想要创造什么" />
      <el-divider />
      <div style="margin-bottom: 10px">图片张数</div>
      <el-radio-group v-model="form.batch_size">
        <el-radio :label="1">1</el-radio>
        <el-radio :label="2">2</el-radio>
        <el-radio :label="4">4</el-radio>
      </el-radio-group>

      <el-divider />
      <div style="margin-bottom: 10px">图片生成尺寸</div>
      <div class="size-warp">
        <el-form label-width="50px">
          <el-form-item label="长度">
            <el-input v-model.number="form.width" placeholder="请出入图片宽" />
          </el-form-item>
          <el-form-item label="宽度">
            <el-input v-model.number="form.height" placeholder="请出入图片长" />
          </el-form-item>
        </el-form>
      </div>

      <el-divider />
      <div style="margin-bottom: 10px">图片生成步数</div>
      <el-radio-group v-model="form.steps">
        <el-radio :label="5">5</el-radio>
        <el-radio :label="25">25</el-radio>
        <el-radio :label="50">50</el-radio>
      </el-radio-group>
      <el-divider />

      <el-button style="width: 100%" tag="div" type="primary" @click="create">确定</el-button>
    </div>

    <div style="display: none">
      <ul id="images">
        <li v-for="item in createImgList"><img :src="item" alt="Picture 1" /></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
import { request } from '@/utils/request.js'
import { nextTick, onMounted, ref } from 'vue'
import { ElLoading } from 'element-plus'
import { canvas } from '@/hooks/draw.js'
// {
//   "enable_hr": false,                 // 开启高清hr
//   "denoising_strength": 0,            // 降噪强度
//   "hr_scale": 2,                      // 高清级别
//   "hr_upscaler": "string",
//   "hr_second_pass_steps": 0,
//   "hr_resize_x": 0,
//   "hr_resize_y": 0,
//   "hr_sampler_name": "string",
//   "hr_prompt": "",
//   "hr_negative_prompt": "",
//   "prompt": "",                       // 正向关键字
//   "styles": [
//     "string"
//   ],
//   "seed": -1,                         // 随机种子
//   "subseed": -1,                      // 子级种子
//   "subseed_strength": 0,              // 子级种子影响力度
//   "seed_resize_from_h": -1,
//   "seed_resize_from_w": -1,
//   "sampler_name": "string",
//   "batch_size": 1,                    // 每次生成的张数
//   "n_iter": 1,                        // 生成批次
//   "steps": 50,                        // 生成步数
//   "cfg_scale": 7,                     // 关键词相关性
//   "width": 512,                       // 生成图像宽度
//   "height": 512,                      // 生成图像高度
//   "restore_faces": false,             // 面部修复
//   "tiling": false,                    // 平铺
// init_images: [sourceImage.value],
//   "do_not_save_samples": false,
//   "do_not_save_grid": false,
//   "negative_prompt": "string",        // 反向关键字
//   "eta": 0,                           // 等待时间
//   "s_min_uncond": 0,
//   "s_churn": 0,
//   "s_tmax": 0,
//   "s_tmin": 0,
//   "s_noise": 1,
//   "override_settings": {},             // 覆盖性配置
//   "override_settings_restore_afterwards": true,
//   "script_args": [],                   // lora 模型参数配置
//   "sampler_index": "Euler",            // 采样方法
//   "script_name": "string",
//   "send_images": true,                 // 是否发送图像
//   "save_images": false,                // 是否在服务端保存生成的图像
//   "alwayson_scripts": {}               // alwayson配置
// }

let gallery

function createGallery() {
  gallery = new Viewer(document.getElementById('images'), {
    toolbar: {
      zoomIn: 4,
      zoomOut: 4,
      oneToOne: 4,
      reset: 4,
      prev: 4,
      play: {
        show: 0,
        size: 'large'
      },
      next: 4,
      rotateLeft: 4,
      rotateRight: 4,
      flipHorizontal: 4,
      flipVertical: 4,
      download: function () {
        const a = document.createElement('a')
        a.href = gallery.image.src
        a.download = gallery.image.alt
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
  })
}

onMounted(() => {})

const url = '/api'

const form = ref({
  prompt: '',
  batch_size: 1,
  steps: 5,
  width: 512,
  height: 512,
  alwayson_scripts: {
    controlnet: {
      args: [
        {
          enabled: true, // # 启用
          control_mode: 0, // # 对应webui 的 Control Mode 可以直接填字符串 推荐使用下标 0 1 2
          model: 'sd-v1-5-inpainting.ckpt [c6bbc15e32]', // # 对应webui 的 Model
          module: 'lineart_standard (from white bg & black line)', //  # 对应webui 的 Preprocessor
          weight: 0.45, //  # 对应webui 的Control Weight
          resize_mode: 'Crop and Resize',
          threshold_a: 200, //  # 阈值a 部分control module会用上
          threshold_b: 245, //  # 阈值b
          guidance_start: 0, //  # 什么时候介入 对应webui 的 Starting Control Step
          guidance_end: 0.7, //  # 什么时候退出 对应webui 的 Ending Control Step
          pixel_perfect: true, //  # 像素完美
          processor_res: 512, //  # 预处理器分辨率
          save_detected_map: false, //  # 因为使用了 controlnet API会返回生成controlnet的效果图，默认是True，如何不需要，改成False
          input_image: '' //  # 图片 格式为base64
        }
      ]
    }
  }
})

const createImgList = ref()
function create() {
  let base64Data = canvas.toDataURL()
  console.log(form.value.alwayson_scripts.args)
  form.value.alwayson_scripts.controlnet.args[0].input_image = base64Data
  console.log(base64Data)
  // createGallery()
  // gallery.show()
  // return

  let loading = ElLoading.service({
    lock: true,
    text: '图片生成中',
    background: 'rgba(0, 0, 0, 0.5)'
  })
  request
    .post(`/sdapi/v1/txt2img`, {
      ...form.value
    })
    .then((res) => {
      createImgList.value = res.images.map((item) => `data:image/jpeg;base64,${item}`)
      console.log(createImgList.value)
      console.log('res, rees', res)
      loading.close()
      nextTick(() => {
        if (gallery) {
          gallery.destroy()
        }
        createGallery()
        gallery.show()
      })
    })
}

function getModels() {
  request.get('/sdapi/v1/sd-models').then((res) => {
    console.log(res)
  })
}
getModels()
</script>
<style lang="less">
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

.viewer-download {
  background-image: url('../assets/download.png');
  background-size: 20px 20px;
  background-position: center;
}

.size-warp {
  display: flex;
}
</style>
