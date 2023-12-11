<template>
  <div class="greetings text-black">
    <h1 class="green" @click="msgAdd('!!!!!')">{{ msg }}{{ message }}</h1>
    <p>这是一个默认值{{ value }}</p>
    <p>这是一个Symbol注入名{{ symbolValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { inject, provide,defineProps } from 'vue'
import { mySymbol } from '@/units/symbolKeys';

const { msg:message, msgAdd } = inject<any>('message')

// 如果一开始没有定义，那么就会抛出警告 给定一个默认值
const value = inject('not-exist', 'default')

// 如果使用了Symbol作为注入名
const symbolValue = inject(mySymbol)

defineProps<{
  msg: string
}>()
</script>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
