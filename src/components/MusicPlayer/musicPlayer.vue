<template>
  <div id="musicPlayerBox"></div>
</template>

<script setup lang="ts">
import { onMounted ,shallowRef,onBeforeUnmount} from 'vue';

const sound = shallowRef<null|HTMLAudioElement>(null)

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
