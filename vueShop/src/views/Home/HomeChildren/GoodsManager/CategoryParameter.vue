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
        <el-tab-pane label="静态属性" name="静态属性">
          <el-button type="primary" :disabled="buttonShow" @click="addParams(activeName)">添加属性</el-button>
        </el-tab-pane>
        <el-tab-pane label="动态参数" name="动态参数">
          <el-button type="primary" :disabled="buttonShow" @click="addParams(activeName)">添加参数</el-button>
        </el-tab-pane>
      </el-tabs>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope"> 
            <el-tag  effect="dark" closable v-for="(item,index) in scope.row.attr_vals.split(' ')"> {{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="attr_name" label="参数名称" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>

      <el-dialog :title="'添加'" :visible.sync="addParamsDia">
        <el-form v-model="ParamsInfo">
          <el-form-item required label="参数名称">
            <el-input  v-model="ParamsInfo.attr_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getGoodsCategory, getCategories, PostParams } from "@/network/goods";
export default {
  name: "CategoryParameter",
  data() {
    return {
      queryString: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      buttonShow: true,
      parentCate: [],
      SelectparentCate: [],
      activeName: "",
      goodsId: "样式",
      attributeType: ["only", "many"], //控制静态参数还是动态参数
      tableData: [],
      ParamsInfo:{
        attr_name:'',
        attr_sel:'',
        attr_vals:'',
      },
      addParamsDia: false
    };
  },
  methods: {
    getGoodsCate() {
      getGoodsCategory(this.queryString).then(res => {
          console.log(res)
        if (res.meta.status == 200) {
          this.parentCate = res.data.result;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab.name);
      if (tab.name == "静态属性") {
        getCategories(this.goodsId, this.attributeType[0]).then(res => {
          console.log(res)
          if (res.meta.status == 200) {
            this.tableData = res.data;
          }
        });
      } else {
        getCategories(this.goodsId, this.attributeType[1]).then(res => {
          if (res.meta.status == 200) {
            this.tableData = res.data;
          }
        });
      }
    },
    handleChange(value) {
      this.goodsId = value[value.length - 1];
      this.buttonShow = false;
    },
    addParams(data) {
      if(data=="动态参数")
      {
        this.ParamsInfo.attr_sel="many"
      }
      else{
        this.ParamsInfo.attr_sel="only"
      }
      this.addParamsDia = true;
    },
    onSubmit(){
        PostParams(this.goodsId,this.ParamsInfo).then(res=>{
          console.log(res)
          if(res.meta.status==201){
            this.$message({message:'添加成功',type:'success'})
            this.getGoodsCate()
            this.addParamsDia=false
          }
        })
    }
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
.el-tag{
  margin-right:3px;
}
</style>