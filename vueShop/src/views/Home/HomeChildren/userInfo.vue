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
            <el-input placeholder="请输入内容" clearable v-model="queryParams.query">
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="1">
          <div>
            <el-button type="primary" @click="showDialog">添加用户</el-button>
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
                <el-switch v-model="scope.row.mg_state" @change="changeUserStauts(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="操作" width="190px">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip class="item" effect="dark" content="设置用户" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
            
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

  <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="70%"
  >
  <el-form ref="AddUserFormRef" :model="AddUserForm"  :rules="AddUserFormRules">
    <el-form-item label="用户名" prop="username" clearable>
       <el-input v-model="AddUserForm.username" ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" clearable>
       <el-input v-model="AddUserForm.password"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile" clearable>
       <el-input v-model="AddUserForm.mobile"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" clearable>
       <el-input v-model="AddUserForm.email"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="AddUser">确 定</el-button>
  </span>
</el-dialog>
    </el-card>
  </div>
</template>
<script>
  import {getUsers,putUserStatus,addUser} from '@/network/userinfo'
  export default {
    name: 'userInfo',
    data() {
       var validatePhone=(rule,value,cb)=>{
            const RexPhone=/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/
            if(RexPhone.test(value))
            {
              cb();
            }
            cb(new Error('输入的电话错误'));
        };
        var validateEmail=(rule,value,cb)=>{
            const RexEmail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if(RexEmail.test(value))
            {
              cb();
            }
            cb(new Error('输入的邮箱格式错误'));
        };
       
      return {
        queryParams: {
          query:'',
          pagenum: 1,
          pagesize: 2
        },
        userList: [],
        total:0,
        dialogVisible:false,
        AddUserForm:{
            username:"",
            password:"",
            email:"",
            mobile:"",   
        },  
        AddUserFormRules:{
           username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max:15,
              message: '长度为6到15个字符',
              trigger: 'blur'
            }
          ],
          email:[{validator:validateEmail,trigger:'blur'}],
          mobile:[{validator:validatePhone,trigger:'blur'}]
        }
      }
    },
    created() {
      this.getUserList(this.queryParams)
    },
    methods: {
      //获取用户列表
      getUserList(querystring) {
        getUsers(querystring).then(res => {
          console.log(res)
          if (!res.meta.status == "200") {
            this.$message.error('获取用户列表失败');
          }
          if (res.meta.msg == "无效token")
            {
              this.$message.error("token过期，请重新登录")
            }
          this.userList = res.data.users
          this.total=res.data.total
        })
      },
      //监听页码改变
      handleSizeChange(pageSize){
          console.log(pageSize)
          this.queryParams.pagsize=pageSize
          this.getUserList(this.queryParams)
      },
      //监听每页个数改变
      handleCurrentChange(pageNum){
          this.queryParams.pagenum=pageNum
          this.getUserList(this.queryParams)
      },
      changeUserStauts(user){
          const putParams={
            id:user.id,
            status:user.mg_state
          }
          putUserStatus(putParams).then(res=>{
            console.log(res)
            if(res.meta.status==200)
            {
              this.$message({message:"修改用户状态成功",type:'success'})
            }
            else{
              this.$message.error("修改用户状态失败")
            }
            
          })
      },
      searchUser(){
        this.getUserList(this.queryParams)
      },
      showDialog(){
        this.dialogVisible=true
      },
      AddUser(){
        this.$refs.AddUserFormRef.validate(validate=>{
          if(!validate) return;
          else {
            addUser(this.AddUserForm).then(res=>{
            if(res.meta.status==201)
            this.$message({message:"创建成功",type:"success"})
            })
            this.getUserList(this.queryParams)
          }
        })
        
      }
    }
    }

</script>
<style scoped>

</style>
