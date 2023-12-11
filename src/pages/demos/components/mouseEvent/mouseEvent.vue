<template>
  <div class="w-full text-center cursor-pointer" @mouseup="controlFn(1)" @mousedown="controlFn(1, true)">
    请点击或者长按鼠标
  </div>

  <div class="w-full mt-20px text-center">{{ state === 1 ? 'mousedown' : 'mouseup' }}</div>

  <div class="w-full mt-20px text-center" v-for="(item, index) in resultList" :key="index">
    {{ item.keep ? '按下接口执行完毕' : '抬起接口执行完毕' }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const state = ref('')
const resultList = ref([])

// 模拟接口
const downApi = (command: number, keep: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ command, keep })
    }, 2000)
  })
}

// 当前指令
const nowCommand = ref<{ command: number; keep: boolean; success: boolean }[]>([])

// 操作函数
async function controlFn(command: number, keep: boolean = false) {
  state.value = command

  if (!keep && !nowCommand.value[command]?.success) {
    // 按下接口未执行完毕，就松开了，就不执行抬起接口，并且把keep置为false 这样通过响应式数据在按下接口执行完时就能判断出来
    nowCommand.value[command].keep = false
    return
  }

  nowCommand.value[command] = { command, keep, success: false }

  await downApi(command, keep).then((res) => {
    if (res.keep) {
      // 按下接口已经执行成功
      nowCommand.value[command].success = true
      // 如果按下还没有执行完成就松开了，就在这里执行抬起接口
      if (!nowCommand.value[command]?.keep) {
        controlFn(command)
      }
    }
    resultList.value.push(res)
  })
}
</script>
<style></style>
