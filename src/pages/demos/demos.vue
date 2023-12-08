<template>
  <div class="content">
    <div
      class="demoItem w-full cursor-pointer my-10px"
      v-for="item in list"
      :key="item.id"
      :class="{ active: item.active }"
      @click="gotoFn(item)"
    >
      <div class="text-16px mb-10px">{{ item.name }}</div>
      <div class="flex justify-between items-center">
        <div class="text-12px text-#aaa">{{ item.des }}</div>
        <div class="text-right text-#aaa">—— {{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@/router/route'

interface itemType {
  id: number
  icon?: string
  name: string
  router: string
  active: boolean
}
const list = ref([
  {
    id: 1,
    // icon: '@/assets/spaceShip.svg',
    name: '区域地图Echart',
    des: 'Echart中的地图统计, 以及地图的自定义展示位置',
    date: '2023-8-15',
    router: '/echartToMap',
    active: false,
  },
  {
    id: 2,
    name: 'arcgis点聚合',
    des: '用FeatureLayer实现点聚合',
    date: '2023-11-20',
    router: '/pointCluster',
    active: false,
  },
  {
    id: 3,
    name: '循环请求数据并返回处理数组',
    des: '在循环中请求数据, 并返回处理后的数组',
    date: '2023-12-4',
    router: '/asyncData',
    active: false,
  },
  {
    id: 4,
    name: 'vue3拖拽和缩放的插件',
    des: '能够控制元素的拖拽和缩放, 并且可以控制缩放的方向',
    date: '2023-12-6',
    router: '/dragAndReSize',
    active: false,
  },
  {
    id: 5,
    name: 'vue3生命周期',
    des: 'vue3生命周期的使用，页面的生命周期，以及组件的生命周期',
    date: '2023-12-6',
    router: '/lifeCycle',
    active: false,
  },
  {
    id: 6,
    name: 'echarts动画',
    des: 'echarts动画的使用，以及echarts的基本使用',
    date: '2023-12-8',
    router: '/echartAnimation',
    active: false,
  },
])

function gotoFn(params: itemType) {
  params.active = true
  setTimeout(() => {
    router.push(params.router)
  }, 500)
}
</script>

<style lang="scss" scoped>
.content {
  width: 600px;
  margin: 50px auto;

  .demoItem {
    padding: 6px 10px;
    backdrop-filter: blur(1px);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    &.active {
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }
}
</style>
