<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<script setup lang="ts">
import TheWelcome from './components/TheWelcome.vue'
import { provide, ref } from 'vue'
import { mySymbol } from '@/units/symbolKeys';
/**
 * 如果不是setup 语法糖的话  要确保在setup同步执行
 */
const msg = ref('Hello World!')
function msgAdd() {
  msg.value = 'Hello Evolve H!'
}
/**
 * 可以注入响应式的数据
 * 可以注入函数
 * 所有的更改尽量统一在注入方  方便统一管理  所以传参的时候可以携带更改注入数据的函数方法
 * 如果只能限制注入方更改数据可以用 readonly() 包裹  readonly({msg,msgAdd})
 */
provide('message', { msg, msgAdd })

provide(mySymbol,'this is a Symbol Provide')
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
