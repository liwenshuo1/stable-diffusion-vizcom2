<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
defineProps(['name'])
</script>

<style lang="less">
.cp-icon {
  fill: currentColor;
}
</style>
