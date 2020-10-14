<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-input placeholder="请输入内容"  size="medium" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      <el-button type="primary">添加用户</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style>
.box-card{
  margin-top:20px
}
</style>