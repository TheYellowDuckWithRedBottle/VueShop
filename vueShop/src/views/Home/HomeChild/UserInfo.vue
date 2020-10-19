<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-input placeholder="请输入内容" size="medium" clearable @clear="clearQuery" v-model="queryString.query">
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
             </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddUser">添加用户</el-button></el-col
        >
      </el-row>

      <el-table :data="users" stripe style="width: 100%" border>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeStatus(scope.row.id,scope.row.mg_state)">{{
              scope.row.mg_state
            }}</el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
           <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="ShowEditUser(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="DeleteUser(scope.row.id)"></el-button>
          <el-button type="warning" icon="el-icon-setting" size="mini" circle  @click="SetUser(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

         <el-pagination
      @size-change="LisSizeChange"
      @current-change="LisCurrentChange"
      :current-page="queryString.pagenum"
      :page-sizes="[1, 3, 5]"
      :page-size="queryString.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalUsers">
        </el-pagination>


        <el-dialog
      title="添加用户"
      :visible.sync="AduUserShow">
      <el-form ref="AddUserFormRef" :rules="AddUserFormRule" :model="AddUserForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
        <el-input v-model="AddUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input v-model="AddUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
        <el-input v-model="AddUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
        <el-input v-model="AddUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="AduUserShow = false">取 消</el-button>
      <el-button type="primary" @click="CommitAddUser">确 定</el-button>
      </span>
        </el-dialog>

    <el-dialog
        title="为用户配置角色"
        :visible.sync="AllowRoleUserShow">
        <p>用户名:{{currentUser.username}}</p>
          <el-select v-model="selectRoleId" placeholder="请选择">
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
      <span slot="footer" class="dialog-footer">
      <el-button @click="EditUserShow = false">取 消</el-button>
      <el-button type="primary" @click="allowRole">提交</el-button>
      </span>
    </el-dialog>



         <el-dialog
      title="修改用户信息"
      :visible.sync="EditUserShow">
      <el-form ref="EditUserFormRef" :rules="AddUserFormRule" :model="AddUserForm" label-width="80px">
        <el-form-item label="用户名">
        <el-input v-model="AddUserForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
        <el-input v-model="AddUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
        <el-input v-model="AddUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="EditUserShow = false">取 消</el-button>
      <el-button type="primary" @click="CommitEditUser">提交</el-button>
      </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getUsers, postUser,putUserStaus,putUser,deleteUser,addRoleForUser} from "@/network/userinfo";
import {getRolesList} from '@/network/right'
export default {
  name: "UserInfo",
  data() {
    var valideEmail = (rule, value, callback) => {
      const RegEmail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!RegEmail.test(value)) {
          return callback(new Error('邮箱格式错误'));
        }
        else{
          callback()
        }
        
      };
    var validePhone=(rule,value,callback)=>{
      const RegMobile=/^1[34578]\d{9}$/;
      if(!RegMobile.test(value)){
          return callback(new Error('电话格式错误'))
      }
      else{
         callback()
      }
     
    };
    return {
      queryString: {
        query: "",
        pagenum: 1,
        pagesize: 3,
      },
      users: [],//获取到的用户列数据
      totalUsers: 0,//获取到的用户总个数
      AddUserForm:{
        username:"",
        password:"",
        email:"",
        mobile:""
      },
      AddUserFormRule:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'change' },
             { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
        email:[
          {validator: valideEmail, trigger: 'blur'}
          ],
        mobile:[
          {validator: validePhone, trigger: 'blur'}
        ]
      },
      AduUserShow:false,
      EditUserShow:false,
      AllowRoleUserShow:false,
      currentUser:{
        id:0,
        email:"",
        mobile:""
      },
      selectRoleId:0,
      roleList:[]
    };
  },
  methods: {
    //监听每页个数改变
    LisSizeChange(size){
      console.log(size)
      this.queryString.pagesize=size
      this.GetUsers();
    },
    //监听页码改变
    LisCurrentChange(page){
      console.log(page)
      this.queryString.pagenum=page
      this.GetUsers();
    },
    //获取用户
    GetUsers() {
      getUsers(this.queryString).then((res) => {
        if (res.meta.status == 200) {
          this.users = res.data.users;
          this.totalUsers = res.data.total;
        }
        if (res.meta.msg == "无效token") {
          this.$message({ message: "token失效，请重新获取", type: "success" });
        }
      });
    },
    //搜索用户
    searchUser(){
      this.GetUsers()
    },
    //对于清除搜索的监听的方法
    clearQuery(){
      this.GetUsers()
    },
    showAddUser(){
      this.AduUserShow=true
    },
    //改变用户状态
    changeStatus(userid,status){
      const userstate={
        id:userid,
        status:status
      }
  
      putUserStaus(userstate).then(res=>{
        console.log(res)
      }
      )

    },
    //添加用户
    CommitAddUser(){
      this.$refs.AddUserFormRef.validate((valid) => {
          if (!valid) {
            this.$message.error("校验错误")
          }
          else {      
            postUser(this.AddUserForm).then(res=>{
              if(res.meta.status==201)
               this.AduUserShow=false
              this.$message({message:"添加成功",type:"success"})
              this.GetUsers()
            })
            
          }
        });
    },
   
    //编辑用户
    ShowEditUser(user){
        this.EditUserShow=true
        let{id,email,mobile,username}=user
        this.AddUserForm={id,email,mobile,username}
    },
    CommitEditUser(){
      this.$refs.EditUserFormRef.validate((validate)=>{
        if(!validate) return
        else putUser(this.AddUserForm).then(res=>{
          if(res.meta.status==200){
            this.EditUserShow=false
            this.$message({message:"更新成功",type:'success'})
            this.GetUsers();
          }
        })
      })
    },
     //删除用户
  DeleteUser(id){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if(res=="confirm") deleteUser(id).then(res=>{
            if(res.meta.status==200){
                this.$message({type: 'success',message: '删除成功!'});
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  },
  SetUser(user){
    console.log(user)
    this.currentUser.id=user.id
    this.currentUser.username=user.username
    this.AllowRoleUserShow=true
  },
  allowRole(){
    console.log(this.currentUser.id,this.selectRoleId)
    addRoleForUser(this.currentUser.id,this.selectRoleId).then(res=>{
      console.log(res)
      if(res.meta.status==200){
        this.$message({message:'分配角色成功',type:'success'})
        this.AllowRoleUserShow=false
        this.GetUsers()
      }
    })
  }
  },
 

  created() {
    this.GetUsers();
    getRolesList().then(res=>{
      console.log(res)
      this.roleList=res.data
    })
  },
};
</script>

<style>
.el-row {
  margin-top: 10px;
}
.box-card {
  margin-top: 20px;
}
.el-table{
  margin-top:20px;
}
.el-pagination{
  margin-top:10px;
}
</style>