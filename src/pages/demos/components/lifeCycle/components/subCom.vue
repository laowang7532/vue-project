<template>
  <div>子组件</div>
  <div ref="subRef" id="subData">{{ subData }}</div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'

const subData = ref('subData')
const subRef = ref()

onBeforeMount(() => {
  console.log('子组件挂载之前')
  console.log('subData.value', subData.value)
  subData.value = 'subData1'
  console.log('subData.value', subData.value)

  console.log("document.getElementById('subData')", document.getElementById('subData'))
  console.log('innerHTML', document.getElementById('subData')?.innerHTML)
  console.log('subRef:', subRef.value)
})

onMounted(() => {
  console.log('子组件挂载之后')
  console.log('subData.value', subData.value)
  subData.value = 'subData2'
  console.log('subData.value', subData.value)

  console.log("document.getElementById('subData'):", document.getElementById('subData'))
  console.log('innerHTML', document.getElementById('subData')?.innerHTML)
  console.log('subRef:', subRef.value)
})
</script>
<style lang="scss" scoped></style>
