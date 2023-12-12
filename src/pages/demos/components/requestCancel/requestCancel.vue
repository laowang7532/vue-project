<template>
  <div class="w-full text-center">
    <div @click="getFn">请求接口</div>
    <div @click="cancelFn">取消请求</div>
    <div @click="retryFn">重新请求</div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'

let controller = new AbortController()

function getFn() {
  axios
    .get('http://localhost:3000/api', {
      signal: controller.signal,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

function cancelFn() {
  controller.abort()
}

// 取消之后重新发送请求
function retryFn() {
  controller = new AbortController()
  getFn()
}
</script>
<style lang="scss" scoped></style>
