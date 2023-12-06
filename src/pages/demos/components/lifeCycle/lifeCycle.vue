<template>
  <div class="content">
    <div>vue3生命周期</div>
    <subCom />
    <div ref="el"></div>
    <div id="data" class="text-light-50">{{ data1 }}</div>
  </div>
</template>
<script setup lang="ts">
// 引入所有生命周期函数
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
} from 'vue'
import subCom from "./components/subCom.vue";

const el = ref()
const data1 = ref(1)

// 页面的生命周期
onBeforeMount(() => {
  console.log('页面挂载之前')
  console.log('el.value', el.value)
  console.log('data1.value', data1.value)
  data1.value = 2
  console.log('data1.value', data1.value)
})
onMounted(() => {
  console.log('页面挂载之后')
  console.log('el.value', el.value)
  console.log('data1.value', data1.value)
  data1.value = 3
  console.log('data1.value', data1.value)
})
// onBeforeUpdate(() => {
//   console.log('页面更新之前')
//   console.log('data1.value',data1.value)
//   // 获取id为data的DOM的值
//   console.log('document.getElementById("data")',document.getElementById('data').innerHTML)
  
// })
// onUpdated(() => {
//   console.log('页面更新之后')
//   console.log('data1.value',data1.value)
//   console.log('document.getElementById("data")',document.getElementById('data').innerHTML)

// })
// onBeforeUnmount(() => {
//   console.log('页面卸载之前')
// })
// onUnmounted(() => {
//   console.log('页面卸载之后')
// })
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 20px 150px;
}
</style>
