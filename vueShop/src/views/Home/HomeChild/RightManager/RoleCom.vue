<template>
  <div class="role">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

  <el-card class="box-card">
    <el-row>
       <el-col :span="2"><el-button type="primary" @click="addRole">添加角色</el-button></el-col>
    </el-row>
        <el-table :data="roleList" stripe style="width: 100%" border>
          <el-table-column  type="expand">
              <template slot-scope="scope">
                <pre>{{ scope.row }}</pre>
            </template>  
          
          </el-table-column>
          <el-table-column  type="index"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称"  width="180"> </el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"  width="180"> </el-table-column>
          <el-table-column  label="操作"  width="350"> 
              <el-button type="primary" icon="el-icon-edit" @click="editRole">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteRole">删除</el-button>
              <el-button type="warning" icon="el-icon-setting">配置权限</el-button>
          </el-table-column>       
        </el-table>
    </el-card>
  </div>
</template>

<script>
import {getRolesList} from '@/network/right'
export default {
    name:'role',
    data() {
      return {
        roleList:[]
      }
    },
    methods: {
      getRoleList(){
        getRolesList().then(res=>{
          console.log(res)
          this.roleList=res.data
        })
      },
      addRole(){},
      deleteRole(){},
      editRole(){}
    },
    created() {
      this.getRoleList()
    },
}
</script>

<style>
.el-table{
  margin-top:20px;
}
.el-card{
  margin-top:20px;
}
</style>