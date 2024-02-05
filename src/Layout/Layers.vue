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
        <li
          @click="setActive(index)"
          class="list-group-item-warp"
          :class="{ 'acitve-item': index === currentIndex }"
          :key="element.id">
          <div class="list-group-item">
            <SvgIcon :size="16" class="pointer" name="eye" color="#ffffff"></SvgIcon>
            <img class="canvas-img" src="../assets/6ee7d1303aa749a9848740034eec3bae201124.jpeg" alt="图层缩略图" />
            <span>{{ element.titleName }}</span>
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

const currentIndex = ref(0)
function setActive(index) {
  currentIndex.value = index
  setActiveLayer(index)
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
    padding: 20px;
    padding-bottom: 0;
    display: flex;
    align-items: center;
  }

  .edit {
    padding: 20px;
    padding-bottom: 0;
    display: flex;
    height: 40px;
    align-items: center;
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
</style>
