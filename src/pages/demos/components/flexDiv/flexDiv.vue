<template>
  <div class="content">
    <div>
      <div>示例：行内元素flex布局</div>
      <span class="inline-flex w-full items-center justify-evenly">
        <a>我是a标签</a>
        <span>我是span签</span>
        <img alt="我是img标签" />
        <button>我是button标签</button>
        <input type="text" placeholder="我是input标签" />
      </span>
    </div>

    <div>
      <div>示例：如果多个元素超过主轴空间</div>
      <div class="flex flex-wrap">
        <div class="box">1 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
        <div class="box">2 flex-1</div>
      </div>
    </div>

    <div>
      <div>示例：justify-content属性</div>
      <div class="flex justify-evenly">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
        <div class="box">4</div>
        <div class="box">5</div>
      </div>
    </div>
    <div>
      <div>示例：align-content属性</div>
      <div class="flex flex-wrap alignContentBox">
        <div class="wBox">1</div>
        <div class="wBox">2</div>
        <div class="wBox">3</div>
        <div class="wBox">4</div>
        <div class="wBox">5</div>
        <div class="wBox">6</div>
        <div class="wBox">7</div>
        <div class="wBox">8</div>
      </div>
    </div>

    <div>
      <div>示例：order属性</div>
      <div class="flex flex-wrap">
        <div class="wBox order-1">1</div>
        <div class="wBox -order-1">-1</div>
        <div class="wBox order-2">2</div>
        <div class="wBox -order-2">-2</div>
        <div class="wBox order-3">3</div>
        <div class="wBox order-4">4</div>
        <div class="wBox order-5">5</div>
        <div class="wBox order-6">6</div>
      </div>
    </div>

    <div>
      <div>示例：flex-grow属性</div>
      <div class="flex">
        <!-- <div class="wBox grow-0">grow-0</div> -->
        <div class="wBox grow-1">grow-1</div>
        <div class="wBox grow-1">grow-1</div>
        <div class="wBox grow-1">grow-1</div>
        <div class="wBox grow-1">grow-1</div>
        <div class="wBox grow-1">grow-1</div>
        <!-- <div class="wBox grow-2">grow-2</div>
        <div class="wBox grow-1">grow-1</div> -->
      </div>
    </div>

    <div>
      <div>示例：flex-shrink属性</div>
      <div class="flex">
        <!-- <div class="wBox grow-0">grow-0</div> -->
        <div class="wBox shrink-1">shrink--1</div>
        <div class="wBox shrink-1">shrink--1</div>
        <div class="wBox shrink-2">shrink--2</div>
        <div class="wBox shrink-0">shrink--0</div>
        <div class="wBox shrink-1">shrink--1</div>
        <div class="wBox shrink-1">shrink--1</div>
        <div class="wBox shrink-1">shrink--1</div>
        <!-- <div class="wBox grow-2">grow-2</div>
        <div class="wBox grow-1">grow-1</div> -->
      </div>
    </div>

    <div>
      <div>示例：项目flex属性</div>
      <div class="flex">
        <div class="wBox flexClass">flexxxxxxx-none</div>
        <div class="wBox flexClass">flex弹性盒</div>
        <div class="wBox flexClass">flex-none</div>
        <div class="wBox flexClass">flex-none</div>
      </div>
    </div>
    <div>
      <div>示例：项目align-self属性</div>
      <div class="flex h-400px justify-start items-start">
        <div class="wBox">flex弹性盒</div>
        <div class="wBox">flex弹性盒</div>
        <div class="wBox alignSelfClass">特例</div>
        <div class="wBox">flex弹性盒</div>
      </div>
    </div>

    <div>
      <div>示例：多个元素，其中前者占整行的30%，后者占剩余部分</div>
      <div class="flex">
        <div class="box flex-1 flex-grow-3">1 flex-grow:3</div>
        <div class="box flex-1 flex-grow-7">2 flex-grow:7</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.content {
  width: 60vw;
  margin: 0 auto;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  padding: 20px;
}

.box {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 1px solid #000;
  padding: 50px 20px;
}

.alignContentBox{
  height: 500px;
  border: 1px dashed #fff;
  align-content: flex-start;
}
.wBox {
  width: 300px;
  height: 100px;
  text-align: center;
  background-color: #fff;
  color: #000;
  margin: 10px;
}
.flexClass{
  flex: auto;
}
.alignSelfClass{
  align-self: flex-end;
}
</style>
