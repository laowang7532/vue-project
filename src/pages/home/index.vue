<template>
  <div class="cursor-pointer" @click="changeFn">切换地图</div>
  <div class="cursor-pointer" @click="pointToMapFn()">添加小伙伴</div>
  <div id="map" class="content"/>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { createMap } from '@/units/tools/mapTools'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point';

const mapObj = ref()
function changeFn(){
  mapObj.value.changeBaseMap()
}

// 打点
function pointToMapFn(){
  const arr = window.systemConfig.partnerInfoList
  console.log('🚀 ~ arr:', arr)
  arr.forEach((item:any) => {
    console.log('🚀 ~ mapObj.value.spatialReference:', toRaw(mapObj.value.partnerLayer).spatialReference)
     const point = new Graphic({
      geometry: new Point({
        longitude: item.position[0],
        latitude: item.position[1],
        spatialReference: {
          wkid: 4326
        }
      }),
      symbol: new PictureMarkerSymbol({
        url: item.avatar,
        width: 30,
        height: 30,
        yoffset: -15,
      }),
      attributes: {
        name: item.name,
        address: item.address,
        phone: item.phone
      }
    })
    console.log('🚀 ~ mapObj.value.partnerLayer:', mapObj.value.partnerLayer)
    toRaw(mapObj.value.partnerLayer).add(point)
  });
}

onMounted(() => {
  mapObj.value = createMap('map')
})
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>
