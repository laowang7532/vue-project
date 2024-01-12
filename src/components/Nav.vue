<template>
  <div class="flex-b-c">
    <div v-for="item in navList" :key="item.name" class="navItem" @click="gotoFn(item)">
      <div v-if="item.icon">
        <img class="h-20px w-20px" :src="item.icon" :title="item.name">
      </div>
      <div v-else>{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from '@/router/route'

interface NavItem {
  name: string
  path: string
  icon?: string | undefined
}
const props = defineProps<{ navList: Array<NavItem> }>()

function gotoFn(params: NavItem) {
  if (params.path.includes('http')) {
    window.open(params.path)
    return
  }
  router.push(params.path)
}
</script>

<style lang="scss" scoped>
.navItem {
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}
</style>
