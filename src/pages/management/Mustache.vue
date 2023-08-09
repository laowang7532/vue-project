<template>
  <div>第一章节：模板语法————————————————————————————————————————</div>
  <div>{{ msg }}</div>
  <div v-html="textColor"></div>
  <div v-bind:id="id"></div>
  <button :disabled="true">禁用的按钮</button>
  <div v-bind="someAttr">绑定了多个值</div>
  <div :title="getName()">鼠标停靠查看函数绑定的值</div>
  <h3>动态指令</h3>
  <div :[attrName]="attrColor">鼠标停靠显示文字是绿色</div>
  <div>——————————————————————————————————————————————————————</div>
</template>

<script setup lang="ts">
const msg = 'Hello World!'
const textColor = '<span style="color: red">text red</span>'
const id = 'id11111'
const someAttr = {
  id: 'div1',
  style: 'color: red; font-size: 20px;',
}
function getName() {
  return 'Evolve H'
}

const attrName = 'title'
const attrColor = '绿色'

</script>
<style></style>
