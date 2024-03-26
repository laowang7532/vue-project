<template>
  <div class="content">
    Canvas 绘制图形：
    <canvas ref="canvas"></canvas>

    <img :src="imgSrc" class="h-500px w-500px" /> 
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import avatar from '@/assets/avatar.jpg'


const canvas = ref()

const rectRings= [
  {
    id:1,
    points:'10,20,100,40'
  },
  {
    id:2,
    points:'40,60,100,40'
  }
]
const imgSrc = ref('')

/**
 * 绘制矩形 
 * @param ctx 画布 
 * @param canvas 对象  
 * @param rect 矩形点集合 
 * @param color 绘制颜色 默认红色
 * @param w 匹配目标宽度
 * @param h 匹配目标高度
 * */ 
function drawRectangles(ctx:any, canvas:any, rect:any, color = 'red', w:number, h:number) {
  ctx.strokeStyle = color // 设置矩形的颜色为红色
  // 边框的宽度
  ctx.lineWidth = 4
  // 画布的宽高需要根据图片的宽高进行计算 绘制时比例为1000:565 呈现比例为2688:1520 绘制的图形x,y,width,height需要乘以比例
  const x = rect.points.split(',')[0] * canvas.width / w
  const y = rect.points.split(',')[1] * canvas.height / h
  const width = rect.points.split(',')[2] * canvas.width / w
  const height = rect.points.split(',')[3] * canvas.height / h
  ctx.strokeRect(x, y, width, height)
}

/**
 * 初始化Canvas
 */
function initCanvas(){
  const ctx = canvas.value.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  canvas.value.width = 500 * dpr
  canvas.value.height = 500 * dpr
  ctx.scale(dpr, dpr)
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = avatar
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
    
    rectRings.forEach((rect) => {
      if (rect.id === 1) {
        drawRectangles(ctx,canvas.value, rect, 'yellow', 500, 500)
      }
      else {
        drawRectangles(ctx,canvas.value, rect, 'red', 500, 500)
      }
    })

    // 将画布转化为图片
    imgSrc.value = canvas.value.toDataURL('image/png')
  }
}

onMounted(()=>{
  initCanvas()
})

</script>

<style lang="scss" scoped>
.content {
  width: 1000px;
  margin: 100px auto 0;
}
</style>
