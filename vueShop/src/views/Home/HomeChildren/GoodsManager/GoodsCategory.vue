<template>
  <div class="category">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" @click="addCate">添加分类</el-button>
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
        <template slot="deleted" scope="scope">
          <i
            class="el-icon-circle-check"
            :style="{color: 'lightgreen'}"
            v-if="!scope.row.cat_deleted"
          ></i>
          <i class="el-icon-circle-close" v-else></i>
        </template>

        <template slot="level" scope="scope">
          <el-tag v-if="scope.row.cat_level=='0'">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level=='1'">二级</el-tag>
          <el-tag type="warning" v-else-if="scope.row.cat_level=='2'">三级</el-tag>
        </template>

        <template slot="operation" scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </zk-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[3, 4,5]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    <el-dialog title="分配权限" :visible.sync="AddCateVisiable" @close="closeDialog">
      <el-form ref="AddCateInfoRef" v-model="AddCateInfo" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="AddCateInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
            <el-cascader
                ref="cascader"
                v-model="SelectparentCate"
                :options="parentCate"
                clearable
                :props="{expandTrigger:'hover',label:'cat_name',value:'cat_id',checkStrictly: true}"
                @change="handleChange">
                </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click="AddCateVisiable=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </el-card>
  </div>
</template>
<script>
import ZkSwitch from "vue-table-with-tree-grid";
import { getGoodsCategory, addCategory } from "@/network/goods";
export default {
  name: "GoodsCategoty",
  data() {
    return {
      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "200px"
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          minWidth: "100px",
          type: "template",
          template: "deleted"
        },
        {
          label: "排序",
          prop: "cat_level",
          minWidth: "100px",
          type: "template",
          template: "level"
        },
        {
          label: "操作",
          minWidth: "200px",
          type: "template",
          template: "operation"
        }
      ],
      goodsList: [],
      total: 0,
      queryString: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      AddCateInfo: {
        pid:"",
        name: "",
        level: ""
      },
      AddCateVisiable:false,
      SelectparentCate:[],//选中的父级分类
      parentCate:[]//查询到的所有父级分类
    };
  },
  methods: {
    getGoodsCate() {
      getGoodsCategory(this.queryString).then(res => {
        if (res.meta.data == 200) return;
        this.total = res.data.total;
        this.goodsList = res.data.result;
      });
    },
    handleSizeChange(pageSize) {
      this.queryString.pagesize = pageSize;
      this.getGoodsCate();
    },
    handleCurrentChange(pageNum) {
      this.queryString.pagenum = pageNum;
      this.getGoodsCate();
    },
    handleChange(value) {
        console.log(value);
        if(value.length>0)
        {
          this.AddCateInfo.level=value.length
          this.AddCateInfo.pid=value[value.length-1]
        }
        else{
          this.AddCateInfo.level=0
          this.AddCateInfo.pid=0
        }
        const checked= this.$refs.cascader.getCheckedNodes()
        console.log(checked)
        console.log(this.AddCateInfo)
      },
    addCate() {     
        this.queryString.type=2
        getGoodsCategory(this.queryString).then(res=>{
            if(res.meta.status==200){
                this.parentCate=res.data.result
            }
        })
        this.AddCateVisiable=true
        
    },
    closeDialog(){
      this.$refs.AddCateInfoRef.resetFields()
    },
    onSubmit(){
      console.log(this.AddCateInfo)
        addCategory(this.AddCateInfo).then(res=>{
          console.log(res)
          if(res.meta.data==200)
          {
              this.$message({message:'添加成功',type:'success'})
          }
          this.AddCateVisiable=false
          
        })
    }
  },
  created() {
    this.getGoodsCate();
  }
};
</script>
<style scoped>
.zk-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
</style>