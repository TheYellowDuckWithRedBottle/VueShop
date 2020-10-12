<template>
  <div class="home">
    <el-container class="Homecontainer">
      <el-header class="el-header">
          <div class="headTitle">
          <img src="@/assets/logo.png"/>
          <div>
          <span class="">后台管理系统</span>
          </div>
          </div>
          <div>
           <el-button type="info" @click="logout">登出</el-button>
          </div>
      </el-header>
      <el-container>
        <el-aside> 
     <el-menu :unique-opened="true">
      <el-submenu v-for="(item,index) in subMenu"  :index="index+''" :key="index">
        <template slot="title" ><i class="el-icon-message"></i>{{item.authName}}</template>
        <el-menu-item-group>
          <el-menu-item v-for="(children,index1) in item.children" :key="index1" :index="index1+' '">
              {{children.authName}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     </el-menu>
      </el-aside>

        <el-container>
          <el-main>Main</el-main>

        </el-container>
      </el-container>
       <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import {getSubMenu} from '@/network/submenu'
  export default {
    name: 'home',
    data() {
        return {
            subMenu:[]
        }
    },
    methods: {
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login')
        }
    },
    created() {
        getSubMenu().then(res=>{
            console.log(res)
            this.subMenu=res.data
        })
    },
  }

</script>

<style scoped>
.headTitle{
    height: 100%;
    display:flex;
    align-items: center;
}
.home{
   height: 100%;
    width:100%;  
}
.Homecontainer{
    height: 100%;
    width:100%;
}
 .el-header, .el-footer {
    background-color: #aaaacc;
    color: #eebbec;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
  .el-header img{
      display:inline-block;
      width:50px;
      height: 50px;
      margin-right:10px;
  }
   .el-header span{
   vertical-align: middle;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
   
  }
</style>>

