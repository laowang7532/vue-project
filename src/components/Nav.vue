<template>
  <div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
interface NavItem {
  name: string
  path: string
  icon?: string | undefined
  
}
const props = defineProps<{list:NavItem}>()

</script>

<style lang="scss" scoped></style>
