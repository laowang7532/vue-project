<template>
  <div class="flex-b-c headerContent">
    <div class="logo" id="avatar">
      <img class="rounded-full w-50px avatar" src="../assets/avatar.jpg" />
    </div>
    <div class="nav">
      <Nav :nav-list="navList"></Nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Nav from '@/components/Nav.vue'
import { onMounted } from 'vue'
import gitHubIcon from '@/assets/BiGithub.svg'

const router = useRouter()

const navList =[
  {name:'me', path:'/'},
  {name:'demos', path:'/demos'},
  {name:'docs', path:'/docs'},
  {name:'github', path:'https://github.com/laowang7532', icon:gitHubIcon}
]


</script>

<style lang="scss" scoped>
.headerContent{
  width: 100%;
  flex: 1;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 999;
  padding: 10px 0;
  .logo{
    margin-left: 20px;
  }
  .nav{
    margin-right: 20px;
  }
}

.avatar{
  &:hover{
    animation: rotate 1.5s linear infinite;
    transition: all 1.5s linear;
  }
}
@keyframes rotate{
  0%{
    transform: rotate(0deg);
    animation-timing-function: linear;
    transition: all 1.5s linear;
  }
  100%{
    transform: rotate(360deg);
    animation-timing-function: linear;
    transition: all 1.5s linear;
  }
}
</style>
