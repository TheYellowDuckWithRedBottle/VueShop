<template>
  <div class="goodsParams">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-alert title="只允许为三级分类设置参数" type="warning" center show-icon></el-alert>
      <el-row>
      <el-col :span=10>
      <span>选择商品分类</span>
      <el-cascader v-model="selectItem"  :options="catesList"  
      :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id' }"  @change="handleChange"></el-cascader>
      </el-col>
      </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态属性" name="first">
      <el-col :span=3>
         <el-button type="primary" :disabled="forbid">添加动态属性</el-button>
         </el-col>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="second">
      <el-col :span=3>
         <el-button type="primary" :disabled="forbid">添加静态参数</el-button>
      </el-col>
       <el-table :data="paramsList" stripe style="width: 100%">
           <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag closable v-for="(item,index) in scope.row.attr_vals.split(' ')" :key="index">{{item}}</el-tag>
              </template>
           </el-table-column>
           <el-table-column type="index"></el-table-column>
           <el-table-column prop="attr_name" label="参数名称"></el-table-column>
           <el-table-column label="操作"></el-table-column>
         </el-table>
    </el-tab-pane>
    </el-tabs>
  </el-card>
  </div>
</template>

<script>
import { getCategoriesParams,getCatesList } from "@/network/goods";
export default {
  name: "GoodsParams",
  data() {
    return {
      forbid:true,//控制按钮是否禁用
      queryString:{},//获取分类列表的查询字符串
      Type: ["only", "many"],//获取动态参数还是静态属性
      id: "",//获取参数用的类别id
      catesList:[],//分类数据
      paramsList: [],//参数数据
      selectItem:'',//选中的分类
      activeName:'first'//激活的tabs
    };
  },
  methods: {
    //获取所有分类
    GetCatesList(){
        getCatesList(this.queryString).then((res) => {
        if (res.meta.status == 200) {
          this.catesList = res.data;
        }
      })},
      //根据分类id和type获取动态参数活静态属性
    GetCategoriesParams(type) {
      getCategoriesParams(this.id,type).then((res) => {
        if (res.meta.status == 200) {
          res.data.forEach(item=>{
            console.log(item.attr_vals)
            item=item.attr_vals.split(',')
          })
          this.paramsList = res.data;
          console.log(this.paramsList)
        }
      });
    },
    handleClick(){
      console.log(this.activeName)
      this.GetCategoriesParams(this.Type[0])
    },
    handleChange(value){
      console.log(value)
      if(value.length==3){
        this.forbid=false
        this.id=value[value.length-1]
        console.log(this.id)
        if(this.activeName=="first"){
            this.GetCategoriesParams(this.Type[1])
        }
        else{
            this.GetCategoriesParams(this.Type[0])
        }
      }

    }
  },
  created() {
    this.GetCatesList()
  },
};
</script>

<style>
.el-tag{
  margin-right: 5px;;
}
</style>