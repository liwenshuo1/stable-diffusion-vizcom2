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

      <div style="margin-bottom: 10px">风格</div>
      <el-select v-model="LorasText" placeholder="请选择">
        <el-option v-for="item in LorasList" :key="item.name" :label="item.name" :value="item.name" />
      </el-select>

      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div>指导图片</div>
          </template>
          <el-upload
            list-type="picture"
            class="upload-demo"
            drag
            multiple
            v-model:file-list="fileList"
            :on-change="onChange"
            :auto-upload="false"
            action="#">
            <template #trigger>
              <div class="el-upload__text">
                拖拽文件至此或
                <em>点击上传</em>
              </div>
            </template>

            <template #file="{ file }">
              <div style="width: 100%; display: flex; justify-content: space-between; align-items: center">
                <el-popover width="200px" placement="left" :offset="50" transition="none" trigger="click">
                  <template #reference>
                    <img
                      @click="editrefImg = true"
                      class="pointer"
                      style="width: 35px; height: 25px"
                      :src="file.url"
                      alt="" />
                  </template>
                  <template #default>
                    <img style="width: 100%; height: 170px" :src="file.url" alt="" />
                    <h5 style="margin: 10px 0">影响程度</h5>
                    <VueSlider @change="changeimgReference" v-bind="slider" v-model="file.reference"></VueSlider>
                  </template>
                </el-popover>

                <el-icon class="pointer" @click="deleteImage(file)"><Close /></el-icon>
              </div>
            </template>
          </el-upload>
        </el-collapse-item>
      </el-collapse>
      <el-divider />

      <div style="margin-bottom: 40px">图片张数</div>
      <VueSlider :min="1" :max="20" v-bind="slider" v-model="form.batch_size"></VueSlider>

      <!-- <el-radio-group v-model="form.batch_size">
        <el-radio :label="1">1</el-radio>
        <el-radio :label="2">2</el-radio>
        <el-radio :label="4">4</el-radio>
      </el-radio-group> -->

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
      <div style="margin-bottom: 40px">图片生成步数</div>

      <VueSlider :min="5" :max="50" v-bind="slider" v-model="form.steps"></VueSlider>

      <!-- <el-radio-group v-model="form.steps">
        <el-radio :label="5">5</el-radio>
        <el-radio :label="25">25</el-radio>
        <el-radio :label="50">50</el-radio>
      </el-radio-group> -->
      <el-divider />

      <!-- <div style="margin-bottom: 40px">提示词引导系数</div>
      <VueSlider :min="5" :max="50" v-bind="slider" v-model="form.steps"></VueSlider>
      <el-divider /> -->

      <el-button style="width: 100%" tag="div" type="primary" @click="create">确定</el-button>
    </div>

    <div style="display: none">
      <ul id="images">
        <li v-for="(item, index) in createImgList" :key="index"><img :src="item" alt="Picture 1" /></li>
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
import { canvas, layers, initCanvas, addLayerWithImage } from '@/hooks/draw.js'
import VueSlider from 'vue-slider-component'
import { loraList } from '@/test/loarlist.js'
import reSetImg from '@/assets/reSetImg.svg'
import OptimizeImages from '@/assets/icons/OptimizeImages.svg'
console.log(reSetImg)

// 第二个controlnet

const fileList = ref([])
function onChange(file, b, c) {
  file.reference = 100
}

function getBase64(file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
      const base64String = event.target.result
      resolve(base64String)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}

function deleteImage(file) {
  let indexToDelete = fileList.value.findIndex(function (obj) {
    return obj.uid === file.uid
  })
  // 如果找到了匹配的索引，则删除该对象
  if (indexToDelete !== -1) {
    fileList.value.splice(indexToDelete, 1)
  }
}

function changeimgReference() {
  // console.log(fileList.value)
}

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
          control_mode: 'Balanced', // # 对应webui 的 Control Mode 可以直接填字符串 推荐使用下标 0 1 2
          model: 'control_v11p_sd15_lineart [43d4be0d]', // # 对应webui 的 Model
          module: 'lineart_standard (from white bg & black line)', //  # 对应webui 的 Preprocessor
          input_image: {
            image: '',
            mask: ''
          } //  # 图片 格式为base64
        }
      ]
    }
  },
  // 下面是默认参数
  // cfg_scale: 7,
  // comments: {},
  // denoising_strength: 0.7,
  // disable_extra_networks: false,
  // do_not_save_grid: false,
  // do_not_save_samples: false,
  // enable_hr: true,
  // n_iter: 1,
  // negative_prompt: '',
  // override_settings: {},
  // override_settings_restore_afterwards: true,
  // restore_faces: false,
  // s_churn: 0.0,
  // s_min_uncond: 0,
  // s_noise: 1.0,
  // s_tmax: null,
  // s_tmin: 0.0,
  // // sampler_name: 'DPM++ 2M Karras',
  // script_args: [],
  // script_name: null,
  // seed: -1,
  // seed_enable_extras: true,
  // seed_resize_from_h: -1,
  // seed_resize_from_w: -1,
  // styles: [],
  // subseed: -1,
  // subseed_strength: 0,
  // tiling: false
  // hr_negative_prompt: '',
  // hr_prompt:
  //   'scooter,simple,no people,parked in front of an art gallery,sunny,white background,realistic photo,best quality,detailed texture,super detail,ultra realistic material,--ar 3:2 --q 2 --v 5,<lora:scooter:1>,',
  // hr_resize_x: 0,
  // hr_resize_y: 0,
  hr_scale: 2
  // hr_second_pass_steps: 0,
  // hr_upscaler: 'Latent',
})

const createImgList = ref()
async function create() {
  let base64Data = canvas.toDataURL()
  form.value.alwayson_scripts.controlnet.args[0].input_image.image = base64Data
  form.value.alwayson_scripts.controlnet.args[0].input_image.mask = base64Data

  if (fileList.value.length) {
    // 第二个controlnet
    const secondControlnet = (form.value.alwayson_scripts.controlnet.args[1] = {
      enabled: true, // # 启用
      control_mode: 'Balanced', // # 对应webui 的 Control Mode 可以直接填字符串 推荐使用下标 0 1 2
      model: 'control_v11p_sd15_lineart [43d4be0d]', // # 对应webui 的 Model
      module: 'lineart_standard (from white bg & black line)', //  # 对应webui 的 Preprocessor
      input_image: {
        image: '',
        mask: ''
      } //  # 图片 格式为base64
    })

    const secondImg = await getBase64(fileList.value[0].raw)
    secondControlnet.input_image.image = secondImg
    secondControlnet.input_image.mask = secondImg
    secondControlnet.weight = fileList.value[0].reference / 100
  }

  const requertParams = JSON.parse(JSON.stringify(form.value))
  if (LorasText.value) {
    requertParams.prompt = `${requertParams.prompt}<lora:${LorasText.value}:1>`
  }

  let loading = ElLoading.service({
    lock: true,
    text: '图片生成中',
    background: 'rgba(0, 0, 0, 0.5)'
  })
  request
    .post(`/sdapi/v1/txt2img`, {
      ...requertParams
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
        // 添加将图片再利用元素

        let toolBar = document.querySelector('.viewer-toolbar>ul')
        let liDom = document.createElement('li')
        liDom.style.backgroundImage = `url(${reSetImg})`
        liDom.style.backgroundSize = '20px 20px'
        liDom.style.backgroundPosition = 'center'
        toolBar.appendChild(liDom)
        liDom.addEventListener('click', () => {
          canvas.clear()
          layers.value = []
          addLayerWithImage(gallery.image.src)
          gallery.hide()
        })

        // 添加高清图片元素
        let OptimizeImagesliDom = document.createElement('li')
        OptimizeImagesliDom.style.backgroundImage = `url(${OptimizeImages})`
        OptimizeImagesliDom.style.backgroundSize = '20px 20px'
        OptimizeImagesliDom.style.backgroundPosition = 'center'
        toolBar.appendChild(OptimizeImagesliDom)
        OptimizeImagesliDom.addEventListener('click', () => {
          console.log(gallery)
          request
            .post('/sdapi/v1/extra-single-image', {
              resize_mode: 0,
              show_extras_results: true,
              gfpgan_visibility: 0,
              codeformer_visibility: 0,
              codeformer_weight: 0,
              upscaling_resize: 2,
              upscaling_resize_w: 512,
              upscaling_resize_h: 512,
              upscaling_crop: true,
              upscaler_1: 'None',
              upscaler_2: 'None',
              extras_upscaler_2_visibility: 0,
              upscale_first: false,
              image: gallery.image.src
            })
            .then((res) => {
              console.log(res)
              createImgList.value[gallery.index] = `data:image/jpeg;base64,${res.image}`
              setTimeout(() => {
                gallery.update()
              })
            })
        })
      })
    })
}

function getModels() {
  // request.get('/sdapi/v1/sd-models').then((res) => {
  //   console.log('模型列表', res)
  // })
}

const LorasList = ref([])
const LorasText = ref('')
function getLoras() {
  request.get('/sdapi/v1/loras').then((res) => {
    console.log('loras列表', res)
    LorasList.value = res
  })
}

function getControlnetVersion() {
  request.get('/controlnet/version').then((res) => {
    console.log('getControlnetVersion', res)
  })
}

function getControlnetModel_list() {
  request.get('/controlnet/model_list').then((res) => {
    console.log('getControlnetModel_list', res)
  })
}

function getControlnetModule_list() {
  request.get('/controlnet/module_list').then((res) => {
    console.log('module_list', res)
  })
}

function getControlnetSettings() {
  request.get('/controlnet/settings').then((res) => {
    console.log('getControlnetSettings', res)
  })
}
const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--vicom-primary')
const slider = {
  dotSize: 15,
  dotOptions: {
    tooltip: 'always'
  },
  processStyle: {
    backgroundColor: themeColor
  },
  dotStyle: {
    borderColor: themeColor
  }
}
function changeGraphWidth() {}
getControlnetSettings()
getControlnetModel_list()
getControlnetModule_list()
getControlnetVersion()
getLoras()
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

.el-collapse {
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .el-collapse-item__header {
    border-bottom: none;
    color: #787575;
  }
}
</style>
