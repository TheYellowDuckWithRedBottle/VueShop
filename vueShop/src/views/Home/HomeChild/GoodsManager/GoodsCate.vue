<template>
  <div class="goodsCate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row>
        <el-col :span="2">
      <el-button type="primary" @click="addCate">添加分类</el-button>
      </el-col>
      </el-row>
      <zk-table
        ref="table"
        sum-text="sum"
        index-text="#"
        :data="goodsList"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
      >
        <template slot="cat_deleted" slot-scope="scope">
          <i class="el-icon-circle-check" :style="{color:'green'}" v-if="!scope.row.cat_deleted"></i>
          <i class="el-icon-circle-close" v-else></i>
        </template>
        <template slot="cat_level" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level == 1" >二级</el-tag>
          <el-tag type="warning" v-else-if="scope.row.cat_level == 2" >三级</el-tag>
        </template>
         <template slot="operate">
             <el-button type="primary" icon="el-icon-edit"  size="mini">编辑</el-button>
             <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </zk-table>

      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryString.pagenum"
      :page-sizes="[3, 4, 5, 6]"
      :page-size="queryString.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

      <el-dialog @close="closedialog"
  title="提示"
  :visible.sync="addCateDiaShow"
  width="30%">
    <el-form ref="addCateformRef" :model="CateInfo" label-width="80px">
  <el-form-item label="分类名称">
    <el-input v-model="CateInfo.name"></el-input>
  </el-form-item>
  <el-form-item label="父级名称">
     <el-cascader clearable
    v-model="selectNode"
    :options="goodsList"
    :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id',checkStrictly: true }"
    @change="handleChange"></el-cascader>
  </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDiaShow = false">取 消</el-button>
    <el-button type="primary" @click="commitCateInfo">确 定</el-button>
  </span>
</el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList,postCateInfo } from "@/network/goods";
export default {
  name: "GoodsCate",
  data() {
    return {
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
      },
      goodsList: [],
      queryString: {
        type:"",
        pagesize:5,
        pagenum:1,
      },
      total:0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "200px",
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          width: "190px",
          type: "template",
          template: "cat_deleted",
        },
        {
          label: "分级",
          prop: "cat_deleted",
          width: "100px",
          type: "template",
          template: "cat_level",
        },
        {
          label: "操作",
      
          minWidth: "50px",
          type: "template",
          template: "operate",
        },
      ],
      addCateDiaShow:false,
      CateInfo:{
        name:'',
        pid:'',
        level:'',
      },
      selectNode:[]
   };
  },
  methods: {
    getGoods() {
      getGoodsList(this.queryString).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.goodsList = res.data.result;
          this.total=res.data.total
          console.log(this.goodsList);
        }
      });
    },
    handleSizeChange(val){
      this.queryString.pagesize=val
      this.getGoods();
    },
    handleCurrentChange(val){
      this.queryString.pagenum=val
      this.getGoods();
    },
    addCate(){
      this.addCateDiaShow=true

    },
    handleChange(value){
        console.log(value)
        if(value.length>0){
          this.CateInfo.level=value.length-1
          this.CateInfo.pid=value.length-1
        }
        else{
          this.CateInfo.pid=0
          this.CateInfo.level=0
        }
    },
    closedialog(){
    this.$refs.addCateformRef.resetFields()
    },
    commitCateInfo(){
      console.log(222)
      console.log(this.CateInfo)
      // postCateInfo(this.CateInfo).then(res=>{
      //   console.log(res)
      //   if(res.meta.status==200){
      //     this.$message({message:'成功',type:'success'})
      //     this.addCateDiaShow=false
      //   }
      // })
    }
  },
  created() {
    this.getGoods();
  },
};
</script>

<style>
.el-card{
  margin-top:20px;  
}
.zk-table{
    margin-top:20px;
}
</style>