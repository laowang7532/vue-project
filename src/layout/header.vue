<template>
  <div class="p-20px flex-b-c">
    <div class="logo" id="avatar">
      <img class="w-50px rounded-full" src="../assets/avatar.jpg" />
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

<style lang="scss" scoped></style>