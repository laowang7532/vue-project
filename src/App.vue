<template>
  <Header />
  <router-view></router-view>
  <starrySky class="skyBg"></starrySky>
  <musicPlayer />
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { mySymbol } from '@/units/symbolKeys'
import Header from '@/layout/header.vue'
import starrySky from '@/components/background/starrySky.vue'
import musicPlayer from '@/components/MusicPlayer/musicPlayer.vue'

/**
 * 如果不是setup 语法糖的话  要确保在setup同步执行
 */
const msg = ref('Hello World!')
function msgAdd(e: any) {
  msg.value = e
}
/**
 * 可以注入响应式的数据
 * 可以注入函数
 * 所有的更改尽量统一在注入方  方便统一管理  所以传参的时候可以携带更改注入数据的函数方法
 * 如果只能限制注入方更改数据可以用 readonly() 包裹  readonly({msg,msgAdd})
 */
provide('message', { msg, msgAdd })

provide(mySymbol, 'this is a Symbol Provide')
</script>

<style scoped>
.logo {
  display: block;
  margin: 0 auto;
}
.skyBg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
@media (min-width: 1024px) {
}
</style>
