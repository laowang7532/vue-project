<template>
  <div id="MyMap"></div>
</template>
<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import Map from '@arcgis/core/Map.js'
import MapView from '@arcgis/core/views/MapView.js'
import Point from '@arcgis/core/geometry/Point.js'
import Graphic from '@arcgis/core/Graphic.js'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js'

const map = shallowRef()
const view = shallowRef()

// 初始化地图
function initMap() {
  map.value = new Map({
    basemap: 'topo-vector',
  })

  view.value = new MapView({
    map: map.value, // References a Map instance
    container: 'MyMap', // References the ID of a DOM element
    zoom: 12,
    center: [120.43788, 36.12096],
  })
}

// 添加点位
function addPoint() {
  const point = new Point({
    longitude: 120.43788,
    latitude: 36.15096,
  })

  const markerSymbol = {
    type: 'simple-marker',
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 2,
    },
  }

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol,
  })

  // map.value.pointClusterLayer.add(pointGraphic)
}

// 添加图层
function addLayer() {
  // 创建地图数据
  let features = [
    {
      geometry: {
        type: 'point',
        longitude: 120.43788,
        latitude: 36.15196,
      },
      symbol: {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
      attributes: {
        ObjectID: 1,
        DepArpt: 'KATL',
        MsgTime: Date.now(),
        FltId: 'UAL1',
      },
    },
    {
      geometry: {
        type: 'point',
        longitude: 120.43788,
        latitude: 36.15296,
      },
      symbol: {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
      attributes: {
        ObjectID: 2,
        DepArpt: 'KATL',
        MsgTime: Date.now(),
        FltId: 'UAL1',
      },
    },
    {
      geometry: {
        type: 'point',
        longitude: 120.43788,
        latitude: 36.15396,
      },
      symbol: {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
      attributes: {
        ObjectID: 3,
        DepArpt: 'KATL',
        MsgTime: Date.now(),
        FltId: 'UAL1',
      },
    },
  ]
  const pointClusterLayer = new FeatureLayer({
    source: features as any,
    objectIdField: "ObjectID"
  })
  map.value.add(pointClusterLayer)
}

onMounted(() => {
  initMap()
  addLayer()
  addPoint()
})
</script>
<style>
#MyMap {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
