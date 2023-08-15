<template>
  <div ref="chartRef" class="w-full h-full" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref,watch,onMounted,onBeforeUnmount, getCurrentInstance, } from "vue";

const props = defineProps<{ option: Object; events?: string[]; loading?: Boolean }>()
const chartRef = ref<HTMLDivElement>()
let myChart: any = null

const { proxy } = getCurrentInstance() as any

function addEvents() {
  if (props.events && props.events.length > 0) {
    props.events.map((item) => {
      myChart.on(item, (e: any) => {
        proxy.$emit(`echart${item}`, e)
      })
    })
  }
}

function onResize() {
  myChart.resize()
}

watch(
  props,
  () => {
    if (myChart) {
      // if (props.loading) myChart.hideLoading()
      myChart.setOption(props.option)
    }
  },
  { deep: true, immediate: true, flush: 'post' },
)

onMounted(() => {
  myChart = echarts.init(chartRef.value!)
  // if (props.loading) {
  //   myChart.showLoading({
  //     text: '',
  //     color: '#06DCD5',
  //     textColor: '#06DCD5',
  //     maskColor: 'rgba(13, 187, 174, 0.4)',
  //     lineWidth: 2,
  //     zlevel: 0
  //   })
  // }

  myChart.setOption(props.option)
  addEvents()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (!myChart) return
  myChart.dispose()
  myChart = null
  window.removeEventListener('resize', onResize)
})

defineExpose({ myChart, echarts })
</script>
