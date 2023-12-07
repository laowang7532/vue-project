<template>
  <div>
    <div>子组件</div>
    <div ref="subRef" id="subData">{{ subData }}</div>
  </div>
</template>
<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  ref,
  watchEffect,
  watch,
  defineProps,
} from 'vue'

const subData = ref('subData')
const subRef = ref()

const props = defineProps({
  data: {
    type: String,
    default: 'data',
  },
  visible: {
    type: Boolean,
    default: true,
  },
})

// onBeforeMount(() => {
//   console.log('子组件挂载之前')
//   console.log('subData.value', subData.value)
//   subData.value = 'subData1'
//   console.log('subData.value', subData.value)

//   console.log("document.getElementById('subData')", document.getElementById('subData'))
//   console.log('innerHTML', document.getElementById('subData')?.innerHTML)
//   console.log('subRef:', subRef.value)
// })

// onMounted(() => {
//   console.log('子组件挂载之后')
//   console.log('subData.value', subData.value)
//   subData.value = 'subData2'
//   console.log('subData.value', subData.value)

//   console.log("document.getElementById('subData'):", document.getElementById('subData'))
//   console.log('innerHTML', document.getElementById('subData')?.innerHTML)
//   console.log('subRef:', subRef.value)
// })

// onBeforeUpdate(() => {
//   console.log('子页面更新之前')
//   console.log('subData.value',subData.value)
//   // 获取id为data的DOM的值
//   console.log('document.getElementById("subData")',document.getElementById('subData')?.innerHTML)
//   console.log('props.data',props.data)
// })

watchEffect(() => {
  console.log("🚀 ~ file: subCom.vue:66 ~ watchEffect ~ subData.value:", subData.value)
})

// onUpdated(() => {
//   console.log('子页面更新之后')
//   console.log('props.data',props.data)
//   // console.log('document.getElementById("subData")',document.getElementById('subData')?.innerHTML)
// })

onBeforeUnmount(() => {
  console.log('子页面卸载之前')
  subData.value = 'onBeforeUnmount'
  console.log('🚀 ~ file: subCom.vue:69 ~ onBeforeUnmount ~ subData.value :', subData.value)
})
</script>
<style lang="scss" scoped></style>
