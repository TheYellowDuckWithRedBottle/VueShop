<template>
  <div class="right">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
        <el-table :data="RightList" stripe style="width: 100%" border>
            <el-table-column prop="authName" label="权限名称"  width="180"> </el-table-column>
            <el-table-column prop="path" label="路径"  width="180"> </el-table-column>
            <el-table-column prop="level" label="权限等级"  width="180"> 
                 <template slot-scope="scope">
                <el-tag v-if="scope.row.level==0">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level==1">二级</el-tag>
                <el-tag type="warning" v-else-if="scope.row.level==2">三级</el-tag>
       </template>
            </el-table-column>
                 
        </el-table>
    </el-card>
  </div>
</template>

<script>
import{getRightList} from '@/network/right'
export default {
    name:'Right',
    data() {
        return {
            requestType:['list','tree'],
            RightList:[]
        }
    },
    methods: {
        getRight(){
            getRightList(this.requestType[0]).then(res=>{
                if(res.meta.status==200)
                this.RightList=res.data
                else this.$message.error("获取权限列表失败")
            })
        }
    },
    created() {
        this.getRight()
    },
}
</script>

<style>
.el-card{
    margin-top:20px;
}
</style>