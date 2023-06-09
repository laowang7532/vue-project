<template>
  <div>第二章节 响应式基础——————————————————————————————————————</div>
  <div>{{ list.join(', ') }}</div>
  <button @click="pushItem">添加随机数</button>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const list = reactive<Array<any>>([])

function pushItem() {
  // push 随机数
  const random = Math.random() * 10
  list.push(random.toFixed(2))
}
</script>
<style></style>
