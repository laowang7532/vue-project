<template>
  <div class="nav-bar">
    <div class="left">
      <img src="../assets/img/logo.png" class="logo" />
      <el-button class="icon-toggle" type="text" icon="el-icon-s-fold"></el-button>
    </div>
    <div class="right">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#31404e"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template  slot="title"><el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>admin</template>
          <el-menu-item index="1-1">消息</el-menu-item>
          <el-menu-item index="1-2">设置</el-menu-item>
          <el-menu-item index="1-3">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #31404e;
  padding: 0px 20px;
  .left {
    display: flex;
    align-items: center;

    .logo {
      width: 180px;
    }
    .icon-toggle {
      font-size: 16px;
      margin-left: 12px;
      color: white;
    }
  }
  .right {
      .avatar{
          width: 32px;
          height: 32px;
          margin-right: 10px;
      }
  }
}
.el-header {
  padding: 0;
}
</style>