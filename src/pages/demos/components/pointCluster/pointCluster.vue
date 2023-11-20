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
import { createPoint } from '@/units/tools/mapTools.ts'

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
  // 生成点
  const data = createPoint([119.5, 121.5], [35.5, 37.5], 1200)

  const pointClusterLayer = new FeatureLayer({
    source: data as any,
    objectIdField: 'ObjectID',
  })
  map.value.add(pointClusterLayer)

  // 设置要聚合的配置
  pointClusterLayer.featureReduction = {
    type: 'cluster',
    clusterRadius: 100,
    // 聚合图形点击弹窗配置
    popupTemplate: {
      title: '聚合点',
      content: '这里有 {cluster_count} 个点位.',
      fieldInfos: [
        {
          fieldName: 'cluster_count',
          format: {
            places: 0,
            digitSeparator: true,
          },
        },
      ],
    },
    // 聚合图形的样式大小
    clusterMinSize: '24px',
    clusterMaxSize: '60px',

    // 聚合图形配置
    symbol: {
      type: 'simple-marker',
      style: 'circle',
      color: '#69dcff',
      outline: {
        color: 'rgba(0, 139, 174, 0.5)',
        width: 3,
      },
    },

    // 聚合图形的展示信息配置
    labelingInfo: [
      {
        deconflictionStrategy: 'none',
        labelExpressionInfo: {
          expression: "Text($feature.cluster_count, '#,###')",
        },
        symbol: {
          type: 'text',
          color: '#004a5d',
          font: {
            weight: 'bold',
            family: 'Noto Sans',
            size: '12px',
          },
        },
        labelPlacement: 'center-center',
      },
    ],
  } as any
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
