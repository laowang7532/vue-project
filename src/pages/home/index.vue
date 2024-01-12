<template>
  <div id="map" class="content"/>
  <div id="scaleBar" :style="scaleBarStyle" />
  <div id="zoomBar" :style="zoomBarStyle" />
  <div class="tools">
    <div class="cursor-pointer" @click="changeFn">切换地图</div>
    <div class="cursor-pointer" @click="pointToMapFn()">添加小伙伴</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw,computed } from 'vue'
import { createMap } from '@/units/tools/mapTools'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point';
import { useEventBus } from "@vueuse/core";

const mapObj = ref()
function changeFn(){
  mapObj.value.changeBaseMap()
}

// 打点
function pointToMapFn(){
  const arr = window.systemConfig.partnerInfoList
  arr.forEach((item:any) => {
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
        type:'partner',
        name: item.name,
        address: item.address,
        phone: item.phone
      }
    })
    toRaw(mapObj.value.partnerLayer).add(point)
  });
}

const scaleBarStyle = computed(() => {
  return {
    bottom: '10px',
    right: '542px',
  }
})
const zoomBarStyle = computed(() => {
  return {
    bottom: '33px',
    right: '550px',
  }
})

// 监听小伙伴信息
const partnerInfo = useEventBus<string>('partnerInfo')

partnerInfo.on((data:any) => {
  console.log('🚀 ~ data:', data)
})

onMounted(() => {
  mapObj.value = createMap('map',true,{zoomBarId:'zoomBar',scaleBarId:'scaleBar'})
  console.log('🚀 ~ mapObj.value:', mapObj.value)
})
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}

.tools{
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 999;
  .cursor-pointer{
    margin-bottom: 10px;
    cursor: pointer;
    &:hover{
      color: #409eff;
    }
  }
}

.esri-view{
  --esri-view-outline-color: transparent;
}
</style>
