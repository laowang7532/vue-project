<template>
  <div class="content">打开控制器查看数据顺序</div>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue'
const arr = ref([
  { a: 1, b: 2 },
  { c: 3, d: 4 },
  { e: 5, f: 6 },
])
async function dataFn() {

  // 获得arr的原始数据
  const list = toRaw(arr.value)
  console.log("🚀 ~ file: index.vue:16 ~ dataFn ~ list:", list)

  const promise = arr.value.map(async (item: any, index) => {
    // 模拟Promise返回数据
    const res = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          ...item,
          name: 'name' + index,
        })
      }, 1000)
    })

    item.result = res
    console.log('🚀 ~ file: index.vue:25 ~ promise ~ res:', res)

    item.name = 'name' + index

    return {
      ...item,
      name: 'name' + index,
    }
  })
  const newArr = await Promise.all(promise)
  console.log(newArr)
  console.log(arr.value)

  const newArr2 = arr.value.map((item: any, index) => {
    return {
      ...item,
    }
  })
  console.log('🚀 ~ file: index.vue:26 ~ newArr2 ~ newArr2:', newArr2)
}

dataFn()
</script>

<style lang="scss" scoped></style>
