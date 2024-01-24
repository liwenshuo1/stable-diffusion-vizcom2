<template>
  <svg aria-hidden="true" class="cp-icon" width="24" height="24">
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
