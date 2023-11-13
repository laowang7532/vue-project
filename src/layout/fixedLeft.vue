<template>
  <div class="left-bottom">
    music story ~ <img class="w-30px cursor-pointer time-travel" src="@/assets/spaceShip.svg" @click="Interstellar">
  </div>
</template>

<script setup lang='ts'>
import { router } from '@/router/route';

function Interstellar() {
  router.push('/interstellar')
}
</script>

<style lang="scss" scoped>
.left-bottom{
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 99;

  &:hover{
    animation-play-state: running;
  }

  .time-travel{
    vertical-align: middle;
    animation: rotate 2s linear infinite;
  }
  &:hover .time-travel{
    animation-play-state: paused;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg)
    }
  }
}
</style>