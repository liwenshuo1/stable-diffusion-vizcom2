<template>
  <svg aria-hidden="true" class="cp-icon" :width="props.size" :height="props.size">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
const props = defineProps({
  name: {},
  size: {
    default() {
      return 24
    }
  }
})
</script>

<style lang="less">
.cp-icon {
  fill: currentColor;
}
</style>
