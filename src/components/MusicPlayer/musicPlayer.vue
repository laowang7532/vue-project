<template>
  <div id="musicPlayerBox"></div>
</template>

<script setup lang="ts">
import { onMounted ,shallowRef,onBeforeUnmount, watch} from 'vue';
import { useDocumentVisibility } from '@vueuse/core'

const sound = shallowRef<null|HTMLAudioElement>(null)

// 标签页面是否被激活
const visibility = useDocumentVisibility()
watch(visibility, (val) => {
  if (val === 'hidden') {
    sound.value?.pause()
  } else {
    sound.value?.play()
  }
})

function initMusicPlayer() {
  sound.value = new Audio('timeTravel.mp3')
  sound.value.currentTime = 0
  sound.value.loop = true
  sound.value.play()
}

onMounted(() => {
  document.getElementById('musicPlayerBox')!.addEventListener('click', initMusicPlayer)
  document.getElementById('musicPlayerBox')!.click()
})

onBeforeUnmount(() => {
  if (sound.value) {
    sound.value.pause()
    sound.value = null
  }
  document.getElementById('musicPlayerBox')!.removeEventListener('click', initMusicPlayer)
})
</script>

<style lang="scss" scoped></style>
