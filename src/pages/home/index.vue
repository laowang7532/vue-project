<template>
  <div class="content">
    <div @click="show = !show">显示隐藏</div>
    <Transition name="bounce">
      <component v-if="show" :is="son" />
    </Transition>
    <son text="123123"></son>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import son from './son.vue'

const show = ref(false)

onMounted(() => {})
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.8s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
