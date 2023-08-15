<template>
  <div class="text-center">
    <h1>自定义区域地图Echart图</h1>
    <div class="flex-center">
      <div class="cursor-pointer locationItem" v-for="item in locationList" :key="item.name" @click="selectLocalFn(item)" >
        {{ item.name }}
      </div>
    </div>
  </div>
  <Echart :option="option"></Echart>
</template>

<script setup lang='ts'>
import { ref, computed,onMounted } from "vue";
import Echart from '@/components/Echart/Echart.vue'
import * as echarts from 'echarts'
import {Qingdao,Weifang,Dezhou,Yantai} from './mapData.ts'

// 制作区域地图的链接
// https://www.makeapie.cn/echarts_content/xuxzITMEj6.html
// https://www.makeapie.cn/echarts_content/xcLUF3K7vP.html  通过echart自带的地图获取城市数据
// https://blog.csdn.net/Code_LT/article/details/130076617  中国城市编码
// https://www.makeapie.cn/doc/echarts/zh/option.html#series-effectScatter

// 点位信息数组
const nowDataList = ref([])
const dataList = ref([])

const locationList = ref([
  {
    name: '青岛',
    value: Qingdao,
  },
  {
    name: '潍坊',
    value: Weifang,
  },
  {
    name: '德州',
    value: Dezhou,
  },
  {
    name: '烟台',
    value: Yantai,
  },
])
const location = ref(Yantai)
interface LocalItem {
  name: string
  value: any
}
function selectLocalFn(params:LocalItem) {
  console.log("🚀 ~ file: echartToMap.vue:53 ~ selectLocalFn ~ params:", params)
  location.value = params.value
  echarts.registerMap('map', { features: params.value })
}


const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(35,90,178,.8)',
      // linear-gradient(to bottom,  #51bfd4 0%,rgba(35,90,178,.8) 100%)
      // '#00bcb3' : '#057d7d'
      borderColor: 'transparent',
      extraCssText: 'z-index:9999999;color:#fff;',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params, ticket, callback) => {},
    },
    geo: [
      {
        show: true,
        map: 'map',
        zoom: 0.52,
        layoutCenter: ['50%', '45%'],
        layoutSize: '100%',
        label: {
          normal: {
          // 静态的时候展示样式
            show: true, // 是否显示地图省份得名称
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Arial',
            },
          },
          emphasis: {
          // 动态展示的样式
            color: '#fff',
          },
        },

        blur: {
          label: { show: true, color: 'red' },
        },
        roam: false, // 是否开启鼠标滚轮缩放
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: '#fff',
            },
            color: '#fff',
            borderColor: '#32CBE0',
            borderWidth: 1.5,
            areaColor: {
              type: 'linear-gradient',
              x: 0,
              y: 1000,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#17afac', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#0D59C1', // 100% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
          },
          emphasis: {
            label: {
              show: true,
              color: '#fff',
            },
            borderWidth: 3,
            borderColor: 'rgba(255, 230, 175,0.8)',
            shadowColor: 'rgba(255, 230, 175,0.5)',
            shadowBlur: 30,
            textStyle: {
              color: '#fff',
              fontSize: 12,
              backgroundColor: 'transparent',
            },
            areaColor: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#1cfbfe',
                },
                {
                  offset: 1,
                  color: '#3348e7',
                },
              ],
              false,
            ),
          },
        },
      },
      {
        map: 'map',
        zlevel: -1,
        zoom: 0.52,
        silent: true,
        layoutCenter: ['50%', '45%'],
        layoutSize: '100%',
        roam: false,
        itemStyle: {
          normal: {
            borderColor: 'rgba(192,245,249,.8)',
            borderWidth: 3,
            shadowColor: '#6FFDFF',
            shadowOffsetY: 0,
            shadowBlur: 10,
          // areaColor: 'rgba(29,85,139,.6)',
          },
        },
        label: {
          normal: {
          // 静态的时候展示样式
            show: false, // 是否显示地图省份得名称
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Arial',
            },
          },
          emphasis: {
          // 动态展示的样式
            show: false,
            color: '#fff',
          },
        },
      },
      {
        type: 'map',
        map: 'map',
        zlevel: -2,
        zoom: 0.52,
        layoutCenter: ['50%', '46.4%'],
        layoutSize: '100%',
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderColor: 'rgba(35, 161, 184,0.5)',
            shadowColor: 'rgba(35, 161, 184,0.8)',
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: '#257AB2',
          },
        },
      },
      {
        type: 'map',
        map: 'map',
        zlevel: -3,
        zoom: 0.52,
        layoutCenter: ['50%', '47.4%'],
        layoutSize: '100%',
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderColor: 'rgba(7, 65, 117,0.5)',
            shadowColor: 'rgba(7, 65, 117,0.8)',
            shadowOffsetY: 15,
            shadowBlur: 8,
            areaColor: '#0A2763',
          },
        },
      },
    ],
    series: [
      {
        name: '城市',
        type: 'effectScatter',
        data: dataList.value,
        coordinateSystem: 'geo',
        symbolSize: 10,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          extraCssText: 'z-index:999999;color:#fff;',
          confine: true,
          formatter: (params, ticket, callback) => {
            let res = ''
            const count = params.value ? params.value : 0
            res = `<div class="qwe" style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;border-radius: 4px; border: 1px solid #04b9ff;background: linear-gradient(to bottom, #51bfd4 0%, rgba(35, 90, 178, 0.8) 100%);">
                    <div style='font-size: 14px;max-width:250px;  overflow: hidden;-o-text-overflow: ellipsis;text-overflow: ellipsis;white-space: nowrap;'>${params.data.name}</div>
                    <div style="display: flex; align-items: center;padding-top: 6px;"></div>
                    <div style='max-width:250px;  overflow: hidden;-o-text-overflow: ellipsis;text-overflow: ellipsis;white-space: nowrap;'>地点：${params.data.address ? params.data.address : ''}</div>
                </div>`
            return res
          },
        },
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
        },
        itemStyle: {
          normal: {
            color: 'rgb(29,233,182)',
            shadowBlur: 10,
            shadowColor: 'rgb(58,115,192)',
          },
        },
        layoutCenter: ['50%', '50%'],
        layoutSize: 430,
      },
      {
        name: '最新预警',
        silent: false, // 暂不支持鼠标交互
        data: nowDataList.value,
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // zlevel: 3,
        rippleEffect: {
        // 涟漪特效
          period: 5, // 动画时间，值越小速度越快
          // brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 11, // 波纹圆环最大限制，值越大波纹越大
        },
        symbol: 'circle',
        itemStyle: {
          show: true,
          normal: {
            color: '#f4e925', // 地图点的颜色
            shadowBlur: 10,
            shadowColor: 'rgb(58,115,192)',
          },
        // color: '#F41C19'
        },
        symbolSize: 15,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          extraCssText: 'z-index:9999999;color:#fff;',
          confine: true,
          formatter: (params, ticket, callback) => {
            let res = ''
            const count = params.value ? params.value : 0
            res = `<div class="qwe" style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;border-radius: 4px; border: 1px solid #04b9ff;background: linear-gradient(to bottom, #51bfd4 0%, rgba(35, 90, 178, 0.8) 100%);">
                    <div style='font-size: 14px;max-width:250px;  overflow: hidden;-o-text-overflow: ellipsis;text-overflow: ellipsis;white-space: nowrap;'>${params.data.name}</div>
                    <div style="display: flex; align-items: center;padding-top: 6px;"></div>
                    <div style='max-width:250px;  overflow: hidden;-o-text-overflow: ellipsis;text-overflow: ellipsis;white-space: nowrap;'>地点：${params.data.address ? params.data.address : ''}</div>
                </div>`
            return res
          },
        },
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        showEffectOn: 'render',
        layoutCenter: ['50%', '50%'],
        layoutSize: 430,
      },
    ],
  }
})

onMounted(()=>{
  selectLocalFn(locationList.value[0])
})

</script>

<style lang="scss" scoped>
.locationItem{
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 4px;
  background: #0b1b34;
  box-shadow: 0 0 10px #3BD9D9;
  cursor: pointer;
  &:hover{
    background: #258686;
    color: #fff;
  }
}
</style>