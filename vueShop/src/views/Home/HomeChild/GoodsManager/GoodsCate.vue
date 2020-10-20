<template>
  <div class="goodsCate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
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
    </el-card>
  </div>
</template>

<script>
import { getGoodsList } from "@/network/goods";
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
        type: "",
        pagesize:'',
        pagenum:'',
      },
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
    };
  },
  methods: {
    getGoods() {
      getGoodsList(this.queryString).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.goodsList = res.data;
          console.log(this.goodsList);
        }
      });
    },
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