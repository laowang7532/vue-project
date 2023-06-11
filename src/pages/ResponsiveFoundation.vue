<template>
  <div>第二章节 响应式基础——————————————————————————————————————</div>
  <div>{{ list.join(', ') }}</div>
  <button @click="pushItem">添加随机数</button>
  <div>Reactive 局限性</div>
  <div>
    仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型
    无效。
  </div>
  <div>
    因为 Vue
    的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失
  </div>
  <div>
    同时这也意味着当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const list = reactive<Array<any>>([])

function pushItem() {
  // push 随机数
  const random = Math.random() * 10
  list.push(random.toFixed(2))
}

// 平常开发就用setup语法糖  用setup()方法去暴露太繁琐了
// <script setup

const obj = {}
const ProxyObj = reactive(obj)
console.log(ProxyObj === obj) // false
console.log(reactive(obj) === ProxyObj) // true
console.log(reactive(ProxyObj) === obj) // true

// ref()
const objectRef = ref({ count: 0 })
// 响应式的替换整个对象
objectRef.value = { count: 1 }
// reactive的局限性ref可以很好的解决 但不是说什么时候

</script>
<style></style>
