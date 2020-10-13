<template>
  <div class="userInfo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="120">
          <div>
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="1">
          <div>
            <el-button type="primary">添加用户</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="userList" stripe border >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="用户名" > </el-table-column>
        <el-table-column prop="mobile" label="电话" > </el-table-column>
        <el-table-column prop="email" label="邮箱" > </el-table-column>
        <el-table-column prop="role_name" label="角色" > </el-table-column>
        <el-table-column  label="状态" > 
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="操作" width="190px">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
        </el-table-column>
      </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.pagenum"
      :page-sizes="[1, 2, 3,4,5 ]"
      :page-size="queryParams.pagesize"
      layout="total, sizes,prev, pager, next"
      :total="total">
    </el-pagination>
    </el-card>

  </div>
</template>
<script>
  import {getUsers} from '@/network/userinfo'
  export default {
    name: 'userInfo',
    data() {
      return {
        queryParams: {
          pagenum: 1,
          pagesize: 2
        },
        userList: [],
        total:0
      }
    },
    created() {
      this.getUserList(this.queryParams)
    },
    methods: {
      getUserList(querystring) {
        getUsers(querystring).then(res => {
          console.log(res)
          if (!res.meta.status == "200") {
            this.$message.error('获取用户列表失败');
          }
          this.userList = res.data.users
          this.total=res.data.total
        })
      },
      handleSizeChange(pageSize){
          console.log(pageSize)
          this.queryParams.pagsize=pageSize
          this.getUserList(this.queryParams)
      },
      handleCurrentChange(pageNum){
          this.queryParams.pagenum=pageNum
          this.getUserList(this.queryParams)
      }
    }
  }

</script>
<style scoped>

</style>
