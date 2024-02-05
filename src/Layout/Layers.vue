<template>
  <div class="layers-warp">
    <div class="layers-title">
      <SvgIcon name="layers" color="#ffffff"></SvgIcon>
      <span style="padding-left: 10px">图层</span>
    </div>
    <div class="edit">
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
        <li @click="setActiveLayer(index)" class="list-group-item" :key="element.id">
          <div class="list-group-item" style="padding: 0">
            <SvgIcon :size="16" class="pointer" name="eye" color="#ffffff"></SvgIcon>
            <img class="canvas-img" src="../assets/6ee7d1303aa749a9848740034eec3bae201124.jpeg" alt="图层缩略图" />
            <span>图层{{ index + 1 }}</span>
          </div>

          <span class="ellipsis pointer">...</span>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable-es'
import { addLayer, layers, setActiveLayer, moveLayerToIndex } from '@/hooks/draw.js'
import { ref, reactive } from 'vue'

function add() {
  addLayer()
}

const isDragging = ref(false)
const dragOptions = reactive({
  animation: 0,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
})
function endDrag(val, aaa) {
  console.log(val)
  moveLayerToIndex(val.newIndex)
  isDragging.value = false
}
</script>
<style lang="less" scoped>
.layers-warp {
  .layers-title {
    display: flex;
    align-items: center;
  }

  .edit {
    display: flex;
    height: 40px;
    align-items: center;
  }
  .layers-content {
    margin-top: 20px;
    .list-group-item {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
}
</style>
