<template>
  <div class="content">
    <div class="">
      <img class="w-30px" src="@/assets/spaceShip.svg">
      《星际穿越》是2014年美英联合制作的科幻电影，由克里斯托弗·诺兰执导，马修·麦康纳、安妮·海瑟薇领衔主演。
该片在物理学家基普·索恩的黑洞理论之上进行改编，主要讲述了一组宇航员通过穿越虫洞来为人类寻找新家园的冒险故事。
该片于2014年11月5日在美国公映，11月7日在英国公映，11月12日在中国大陆公映。并于2020年8月2日在中国大陆重映。
2015年，该片获得了第87届奥斯卡金像奖的五项提名，并获得最佳视觉效果奖。
      <img class="w-30px" src="@/assets/spaceStation.svg">
    </div>
    <img class="w-full mt-40px cursor-pointer" src="@/assets/interstellar.webp" @click="aboutFn">
  </div>
</template>

<script setup lang="ts">

function aboutFn(){
  window.open('https://baike.baidu.com/item/%E6%98%9F%E9%99%85%E7%A9%BF%E8%B6%8A/7588527?fr=ge_ala')
}
</script>

<style lang="scss" scoped>
.content{
  width: 600px;
  margin: 100px auto;
  line-height: 40px;
}
</style>
