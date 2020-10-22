<template>
  <div class="category">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="只允许为第三级分类提供相关参数" type="warning" show-icon></el-alert>
      <span>选择商品分类</span>
      <el-cascader
        ref="cascaderRef"
        v-model="SelectparentCate"
        :options="parentCate"
        clearable
        :show-all-levels="false"
        :props="{expandTrigger:'hover',label:'cat_name',value:'cat_id'}"
        @change="handleChange"
      ></el-cascader>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
            <el-button type="primary" :disabled="buttonShow">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
            <el-button type="primary" :disabled="buttonShow">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>

       <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column type="expand"></el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="attr_name"  label="参数名称"  width="180"></el-table-column>
      <el-table-column  label="操作"  width="180">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
      </el-table-column>
       </el-table>

       <el-form>
       </el-form>
    </el-card>
  </div>
</template>
<script>
import { getGoodsCategory,getCategories } from "@/network/goods";
export default {
  name: "CategoryParameter",
  data() {
    return {
      queryString: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      buttonShow:true,
      parentCate: [],
      SelectparentCate: [],
      activeName:'',
      goodsId:'',
      attributeType:['only','many'],
      tableData:[]
    };
  },
  methods: {
    getGoodsCate() {
      getGoodsCategory(this.queryString).then(res => {
        if (res.meta.status == 200) {
          this.parentCate = res.data.result;
        }
      });
    },
    handleClick(tab,event){
        console.log(tab.name)
        if(tab.name=="first")
       {
           getCategories(this.goodsId,this.attributeType[0]).then(res=>{
               if(res.meta.status==200)
               {
                   this.tableData=res.data
                   console.log(this.tableData)
               }
           
        })
       } 
        else {
             getCategories(this.goodsId,this.attributeType[1]).then(res=>{
              if(res.meta.status==200)
               {
                   this.tableData=res.data
                      console.log(this.tableData)
               }
            })
        }
        },
    handleChange(value) {     
        this.goodsId=value[value.length-1]
        this.buttonShow=false
        },
  },
  created() {
    this.getGoodsCate();
  }
};
</script>
<style scoped>
.el-alert {
  margin-bottom: 5px;
}
</style>