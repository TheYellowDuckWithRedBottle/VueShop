<template>
  <div class="login">
    <div class="loginContainer">
      <div class="imgContainer"><img src="@/assets/logo.png" /> </div>
      <div class="loginForm">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <div class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {postUserInfo} from '@/network/userinfo'
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username:"",
          password: ""
        },
        loginRules: {
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
              message: '最小长度为6个字符',
              trigger: 'blur'
            }
          ],
        }
      }
    },
    methods: {
      login() {
        this.$refs.loginFormRef.validate(validate => {
          if(!validate) return;
          else postUserInfo(this.loginForm).then(res=>{
              if(res.meta.status=="200")
              {
                  console.log(res);
                   this.$message({message: '登陆成功',type: 'success'})
                   window.sessionStorage.setItem('token',res.data.token)
                   this.$router.push('/home')
              }
              else if(res.meta.msg=="用户名不存在"){
                   this.$message.error('用户名不存在，登录失败');
              }
              else{
                  this.$message.error('登录失败');
              }
          })
        })
      },
      reset() {
        this.$refs.loginFormRef.resetFields()
      },

    },
  }

</script>

<style>
  .login {
    height: 100%;
    width: 100%;
    background-color: rgb(52, 69, 92)
  }

  .loginContainer {
    position: absolute;
    background-color: #fff;
    width: 450px;
    height: 300px;
    top: 50%;
    left: 50%;
    border-radius: 3px;
    transform: translate(-50%, -50%);
  }

  .loginForm {
    padding: 0 20px;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .imgContainer {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    background-color: #aaaeee;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 3px green;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

</style>
