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
       
        <el-aside :width="isCollapse?'64px':'200px'"> 
           <div class="toggleBar" @click="toggle"  >|||</div>
     <el-menu 
     :unique-opened="true" 
     active-text-color="#ffd04b" 
     background-color="#545c64"
     :collapse="isCollapse"
     :collapse-transition="false"
     router
     :default-active="activePath"
     >
      <el-submenu v-for="(item,index) in subMenu"  :index="item.id+''" :key="index">
        <template slot="title" ><i :class="iconStyle[item.id]"></i>{{item.authName}}</template>
        <el-menu-item-group>
          <el-menu-item 
          v-for="(children,index1) in item.children" :key="index1" :index="'/'+children.path"
          @click="saveNavState('/'+children.path)">
            <i class="el-icon-menu"></i>
              {{children.authName}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     </el-menu>
      </el-aside>

        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>

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
            subMenu:[],
            isCollapse:false,
            iconStyle:
              {125:"el-icon-user",
              103:"el-icon-bangzhu",
              101:"el-icon-s-goods",
              102:"el-icon-tickets",
              145:"el-icon-pie-chart"},
            activePath:''  
        }
    },
    methods: {
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login')},
        toggle(){
            this.isCollapse=!this.isCollapse;},
        saveNavState(data){
            console.log(data)
            this.activePath=data
            window.sessionStorage.setItem('path',data)}
    },
    created() {
        getSubMenu().then(res=>{
            this.subMenu=res.data
        })
        this.activePath=window.sessionStorage.getItem("path")
    },
  
  }

</script>

<style scoped>
.toggleBar{
  background-color: black;
  cursor: pointer;
  font-size: 8px;
  text-align: center;
}
.headTitle{
    height: 100%;
    display:flex;
    align-items: center;
}
i{
  padding-right: 21px;
}
.collapse{
  width:64px;
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

