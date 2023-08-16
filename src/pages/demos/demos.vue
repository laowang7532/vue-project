<template>
  <div class="content">
    <div class="demoItem w-full h-60px cursor-pointer" v-for="item in list" :key="item.id" @click="gotoFn(item)">
      <div class="text-16px mb-10px">{{item.name}}</div>
      <div class="text-12px text-#aaa">{{item.des}}</div>
      <div class="text-right text-#aaa">—— {{item.date}}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import { router } from '@/router/route';

interface itemType {
  id: number,
  icon: string,
  name: string,
  router: string
}

const list = ref([
  {
    id: 1,
    // icon: '@/assets/spaceShip.svg',
    name: '区域地图Echart',
    des: 'Echart中的地图统计, 以及地图的自定义展示位置',
    date: '2023-8-15',
    router: '/echartToMap'
  }
])

function gotoFn(params:itemType) {
  router.push(params.router)
}
</script>

<style lang="scss" scoped>
.content{
  width: 600px;
  margin: 50px auto;
}
</style>