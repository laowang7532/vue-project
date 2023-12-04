<template>
  <div class="content flex justify-center items-center">
    <!-- <div>home</div> -->
    <Vue3DraggableResizable
      :initW="w"
      :initH="h"
      v-model:x="x"
      v-model:y="y"
      v-model:w="w"
      v-model:h="h"
      v-model:active="active"
      :draggable="true"
      :resizable="true"
      :lockAspectRatio="true"
      @activated="print('activated')"
      @deactivated="print('deactivated')"
      @drag-start="print('drag-start')"
      @resize-start="print('resize-start')"
      @dragging="print('dragging')"
      @resizing="print('resizing')"
      @drag-end="dragEndFn"
      @resize-end="reSizeEndFn"
      :handles="['tl', 'tr', 'bl', 'br']"
    >
      <div class="bg-light-50" :style="{ width: `${w}px`, height: `${h}px` }"></div>
    </Vue3DraggableResizable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const x = ref(0)
const y = ref(0)
const w = ref(500)
const h = ref(300)
const active = ref(false)

function print(val: any) {
  console.log(val)
}

function dragEndFn(params: any) {
  console.log('drag-end')
  console.log('🚀 ~ file: index.vue:44 ~ dragEndFn ~ params:', params)
  // 如果拖拽结束 超出屏幕范围 则重置位置
  if (params.x < 0 - w.value / 2 || params.y < 0 - h.value / 2) {
    x.value = window.innerWidth - w.value
    y.value = window.innerHeight - h.value
  } else if (params.x > window.innerWidth - w.value / 2 || params.y > window.innerHeight - h.value / 2) {
    x.value = window.innerWidth - w.value
    y.value = window.innerHeight - h.value
  }
}

function reSizeEndFn() {
  console.log('resize-end')
  console.log('x.value', x.value)
  console.log('y.value', y.value)
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>
