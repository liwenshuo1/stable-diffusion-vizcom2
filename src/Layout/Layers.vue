<template>
  <div class="layers-warp">
    <div class="layers-title">
      <SvgIcon name="layers" color="#ffffff"></SvgIcon>
      <span style="padding-left: 10px">图层</span>
    </div>
    <div class="edit">
      <el-upload
        v-model:file-list="fileList"
        :on-change="onChange"
        :show-file-list="false"
        class="upload-demo"
        :auto-upload="false"
        action="#">
        <SvgIcon :size="16" class="pointer" name="import-img" color="#ffffff"></SvgIcon>
      </el-upload>
      <SvgIcon @click="add" :size="16" class="pointer" name="plus" color="#ffffff"></SvgIcon>
    </div>

    <draggable
      class="layers-content"
      item-key="id"
      tag="transition-group"
      :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
      v-model="layers"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="endDrag">
      <template #item="{ element, index }">
        <li
          @click="setActive(index)"
          class="list-group-item-warp"
          :class="{ 'acitve-item': index === currentIndex }"
          :key="element.id">
          <el-tooltip v-model:visible="element.showTooltips" effect="dark" placement="left" trigger="contextmenu">
            <div class="list-group-item">
              <SvgIcon
                v-if="element.visible"
                :size="16"
                class="pointer"
                name="eye"
                color="#ffffff"
                @click="hiddenLayerItem(index)"></SvgIcon>
              <SvgIcon
                v-else
                :size="16"
                class="pointer"
                name="eye-close"
                color="#ffffff"
                @click="hiddenLayerItem(index)"></SvgIcon>
              <img class="canvas-img" src="../assets/6ee7d1303aa749a9848740034eec3bae201124.jpeg" alt="图层缩略图" />
              <span>{{ element.titleName }}</span>
              <span class="ellipsis pointer" @click="showMoreEdit(index)">...</span>
            </div>
            <template #content>
              <div class="layer-edit-warp">
                <div class="layer-edit-item pointer" @click="deleteLayerItem(index)">
                  <SvgIcon :size="16" class="pointer" name="delete" color="#ffffff"></SvgIcon>
                  <span>删除</span>
                </div>
              </div>
            </template>
          </el-tooltip>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable-es'
import {
  addLayer,
  layers,
  setActiveLayer,
  moveLayerToIndex,
  addLayerWithImage,
  canvas,
  deleteLayer,
  hiddenLayer
} from '@/hooks/draw.js'
import { ref, reactive, watch } from 'vue'

const fileList = ref([])
function onChange(file, b, c) {
  console.log(file)
  getBase64(file.raw).then((res) => {
    addLayerWithImage(res)
  })
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

function add() {
  addLayer()
}

const currentIndex = ref(0)

watch(currentIndex, (newval) => {
  setActiveLayer(newval)
})

function setActive(index) {
  if (index === currentIndex.value) {
    setActiveLayer(index)
  } else {
    currentIndex.value = index
  }
}

const isDragging = ref(false)
const dragOptions = reactive({
  animation: 0,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
})
function endDrag(val, aaa) {
  const activeindex = layers.value.findIndex((item) => item.id === canvas.getActiveObject().id)
  currentIndex.value = activeindex
  moveLayerToIndex(val.newIndex)
  isDragging.value = false
}

const tooltips = ref([])
function showMoreEdit(index) {
  console.log(tooltips.value)
  layers.value[index].showTooltips = true
}

function deleteLayerItem(index) {
  if (index >= layers.value.length - 1) {
    currentIndex.value = layers.value.length - 2
  } else {
    currentIndex.value = index
  }
  deleteLayer(index, currentIndex.value)
}

function hiddenLayerItem(index) {
  hiddenLayer(index)
}
</script>
<style lang="less" scoped>
.layers-warp {
  .layers-title {
    padding: 20px;
    padding-bottom: 0;
    display: flex;
    align-items: center;
  }

  .edit {
    padding: 20px;
    padding-bottom: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 30px);
    align-content: center;
    height: 40px;
  }
  .layers-content {
    margin-top: 20px;
    .list-group-item-warp {
      padding: 10px 20px;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid var(--vicom-primary);
      }

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .acitve-item {
      background-color: var(--vicom-primary);
    }
    .list-group-item {
      display: flex;
      align-items: center;

      .canvas-img {
        margin-left: 8px;
        margin-right: 8px;
        width: 58px;
        height: 32px;
        border-radius: 6px;
      }
      .ellipsis {
        justify-self: end;
      }
    }
  }
  .ghost {
    opacity: 0.2;
    background: #c8ebfb;
  }
  .flip-list-move {
    transition: transform 0.2s;
  }
}

.layer-edit-warp {
  width: 100px;
  .layer-edit-item {
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 6px;
    &:hover {
      border: 1px solid var(--vicom-primary);
    }
  }
}
</style>
