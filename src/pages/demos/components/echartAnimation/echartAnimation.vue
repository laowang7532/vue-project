<template>
  <div class="w-full h-full flex-center">
    <div>echarts</div>
    <div id="echarts" class="w-600px h-300px"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, reactive, onMounted } from 'vue'

let myChart = reactive()
const echartsData = [
  { value: 40, name: 'rose 1' },
  { value: 38, name: 'rose 2' },
  { value: 32, name: 'rose 3' },
  { value: 30, name: 'rose 4' },
  { value: 28, name: 'rose 5' },
  { value: 26, name: 'rose 6' },
  { value: 22, name: 'rose 7' },
  { value: 18, name: 'rose 8' },
]
const colorList = [
  '#FF8F8F',
  '#FF9D83',
  '#FFBC80',
  '#FFEC9C',
  '#E5FF9C',
  '#A9FFA9',
  '#8AF9C3',
  '#99FFF3',
  '#82F9F6',
  '#80EDFF',
  '#79D9F7',
  '#7AC2F9',
  '#A4A4FE',
  '#B8B8FF',
  '#CDB3FF',
  '#FFB3F4',
  '#FFA9D4',
  '#FFBOBO',
  '#FFBCA4',
  '#FFD6A9',
  '#FFF3C0',
  '#E9FFC2',
  '#COFFC6',
  '#AAF7D6',
  '#ABFFF9',
  '#A0F5F9',
  '#A1E9FF',
  '#9ADBFC',
  '#9BC8F9',
  '#B3B3FF',
  '#C2C2FF',
  '#E4C5FF',
  '#FFCCF3',
  '#FFC2DB',
  '#FFDCDC',
  '#FFE4DC',
  '#FFEDDC',
  '#FCF7E0',
  '#F6FFE1',
  '#E1FFE3',
  '#D4FCE7',
  '#D2FFFA',
  '#COFFFF',
  '#BDF3FF',
  '#C5ECFF',
  '#BBE2F9',
  '#D2D2FF',
  '#DCDCFF',
  '#E3D2FF',
  '#FFDEFC',
  '#FFD4EE',
]

const option = {
  backgroundColor: '#000',
  color: colorList,
  legend: {
    orient: 'vertical',
    top: 'center',
    icon: 'circle',
    right: 30,
    itemGap: 16,
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      color: '#666',
      fontSize: 12,
    },
    data: echartsData?.map((x) => x.name),
  },
  tooltip: {
    backgroundColor: 'rgba(10,43,49,0.8)', // 背景颜色
    trigger: 'item',
    textStyle: {
      // 文本样式
      color: '#fff', // 文本颜色
      fontSize: 14, // 文本大小
    },
    formatter: (params: any) => {
      return `${params.name}: ( ${params.value} ) <br/> <span style="font-size: 20px;">${params.percent}%</span>`
    },
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['30%', '60%'],
      center: ['40%', '50%'],
      roseType: 'radius',
      label: {
        show: true,
        position: 'outside',
        fontSize: 16,
        formatter: (params) => {
          return `{a|${params.name}}`
        },
        rich: {
          a: {
            align: 'left',
            fontSize: 12,
          },
        },
      },
      labelLine: {
        length: 10,
        length2: 30,
      },
      data: echartsData.map((item, index) => {
        return {
          ...item,
          label: {
            color: colorList[index],
          },
        }
      }),
    },
  ],
}

function handleChartLoop(option, myChart) {
  if (!myChart) {
    return
  }
  let currentIndex = -1 // 当前高亮图形在饼图数据中的下标
  let changePieInterval = setInterval(selectPie, 1500) // 设置自动切换高亮图形的定时器
  // 取消所有高亮并高亮当前图形
  function highlightPie() {
    // 遍历饼图数据，取消所有图形的高亮效果
    for (var idx in option.series[0].data) {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: idx,
      })
    }
    // 高亮当前图形
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex,
    })
    // 展示高亮的tooltip
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex,
    })
  }
  // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
  myChart.on('mouseover', (params) => {
    clearInterval(changePieInterval)
    currentIndex = params.dataIndex
    highlightPie()
  })
  // 用户鼠标移出时，重新开始自动切换
  myChart.on('mouseout', (params) => {
    if (changePieInterval) {
      clearInterval(changePieInterval)
    }
    changePieInterval = setInterval(selectPie, 1500)
  })
  // 高亮效果切换到下一个图形
  function selectPie() {
    var dataLen = option.series[0].data.length
    currentIndex = (currentIndex + 1) % dataLen
    highlightPie()
  }
}

onMounted(() => {
  myChart = echarts.init(document.getElementById('echarts'))
  console.log('🚀 ~ file: echartAnimation.vue:175 ~ onMounted ~ myChart:', myChart)
  myChart.setOption(option)
  handleChartLoop(option, myChart)
})
</script>
<style lang="scss" scoped></style>
