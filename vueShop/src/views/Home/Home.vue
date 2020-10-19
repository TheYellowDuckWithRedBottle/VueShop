<template>
  <div class="home">
      <el-container>
  <el-header>
      <div class="head">
          <div class="headTitle">
          <img src="@/assets/logo.png"/>
          <div><span>后台管理系统</span></div>
          </div>    
          <el-button type="info" @click="signOut">登出</el-button>
      </div>
  </el-header>
  <el-container>
    <el-aside :width="isCollapse?'64px':'250px'">
        <div class="toggleBar" @click="toggleCollapse">|||</div>
    <el-menu
    background-color="#eeeaaa"
    unique-opened
    active-text-color="#aaaeee"
    :collapse="isCollapse"
    :collapse-transition="false"
    :default-active="activeLink"
    router
    >
      <el-submenu :index="menu.path+''" v-for="(menu,index) in subMenu" :key="index">
        <template slot="title"><i :class="iconStyle[menu.id]"></i><span>{{menu.authName}}</span></template>
        <el-menu-item-group >
          <el-menu-item 
          v-for="(submenu,index1) in menu.children" :key="index1"
          :index="submenu.path+''" @click="saveActiveLink(submenu.id)"><i class="el-icon-menu"></i>{{submenu.authName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import {getSubMenu} from '@/network/submenu'
export default {
    name:'Home',
    data() {
        return {
            subMenu:[],
            iconStyle:{
                125:'el-icon-user',
                103:'el-icon-help',
                101:'el-icon-sell',
                102:'el-icon-tickets',
                145:'el-icon-pie-chart'
            },
            activeLink:'',
            isCollapse:false
        }
    },
    methods: {
        getMenu(){
            getSubMenu().then(res=>{
                this.subMenu=res.data
            })
        },
        signOut(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        },
        saveActiveLink(activeIndex){
            this.activeLink=activeIndex+""

        }
    },
    created() {
        this.getMenu()
    },
}
</script>

<style>
.home{
    height: 100%;
}
.el-container{
    height: 100%;
}
.el-menu-item-group{
    padding-left: 30px;
}
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  /* i{
      padding-right: 20px;
  } */
.head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
}
.headTitle {
    display: flex;
    font-size: 20px;
    color:rosybrown
}
.headTitle img{
    width:50px;
    height: 50px;
    border-radius: 50px;
    background-color: yellow;
    margin-right: 20px;
}
.toggleBar{
    height: 20px;
   align-items: center;
    text-align: center;
}
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  
  }
</style>