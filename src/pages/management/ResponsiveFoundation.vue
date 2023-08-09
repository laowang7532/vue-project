<template>
  <div>第二章节 响应式基础——————————————————————————————————————</div>
  <div>{{ list.join(', ') }}</div>
  <button @click="pushItem">添加随机数</button>

  <div>Dom更新机制</div>
  <div>{{ state.count }}</div>
  <button @click="increment">+1</button>

  <div>鼠标的位置：{{ x }},{{ y }}</div>

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
import { reactive, ref, nextTick } from 'vue'
import { useMouse } from "@/units/useMouse";
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

const state = reactive({ count: 0 })
// Dom 更新时机 Dom更新是异步的 vue会将他们缓存到一个队列里面  以确保你进行了多少次修改 每个组件只会更新一次
function increment(){
  state.count++
  nextTick(() => {
    console.log('DOM 更新了')
  })
}

// ref()
const objectRef = ref({ count: 0 })
// 响应式的替换整个对象
objectRef.value = { count: 1 }
// reactive的局限性ref可以很好的解决 但不是说什么时候
// 组合式函数useMouse
const {x,y}  = useMouse()
</script>
<style></style>
