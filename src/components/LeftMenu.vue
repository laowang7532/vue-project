<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="rgb(51, 78, 102)"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-eleme"></i>
        <span slot="title">商品管理</span>
      </template>
      <el-menu-item index="/goods/category">商品分类</el-menu-item>
      <el-menu-item index="/goods/release">发布商品</el-menu-item>
      <el-menu-item index="/goods/list">商品列表</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-files"></i>
        <span slot="title">订单管理</span>
      </template>
      <el-menu-item index="/order/list">订单列表</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">账户设置</span>
      </template>
      <el-menu-item index="/admin/info">账户信息</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="/user/list">用户列表</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-set-up"></i>
        <span slot="title">权限设置</span>
      </template>
      <el-menu-item index="/role/list">用户角色</el-menu-item>
      <el-menu-item index="/role/menu">菜单权限</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  .el-menu-item {
    text-align: center;
  }

  .el-submenu:hover {
    background-color: rgb(41, 62, 82) !important;
    .el-menu-item:hover {
      background-color: rgb(41, 62, 82) !important;
    }
  }
}
</style>