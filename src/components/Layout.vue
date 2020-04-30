<template>
  <el-container>
    <el-header>
      <Navbar></Navbar>
    </el-header>
    <el-container>
      <el-aside width='15%'>
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//局部注册组件
import LeftMenu from "@/components/LeftMenu.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    LeftMenu,
    Navbar
  }
};
</script>

<style lang="less" scoped>
.el-header {
  color: white;
  padding: 0;
}

.el-aside {
  // position: absolute;
  // left: 0;
  // min-height: 100%;
  height: auto;
  text-align: left;
  background-color: rgb(51, 78, 102);
  color: white;
}

.el-main {
  // position: absolute;
  // left: 15%;
  // width: 85%;
  background-color: white;
  color: #333;
}
</style>