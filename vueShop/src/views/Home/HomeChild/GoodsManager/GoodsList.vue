<template>
  <div class="goodList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row>
        <el-col :span=8>
      <el-input  placeholder="请输入内容" v-model="queryString.query"  clearable @clear="getGood">
        <el-button slot="append" icon="el-icon-search" @click="getGood"></el-button>
      </el-input>
        </el-col>
      <el-col  :span=4>
        <el-button type="primary" @click="AddGoods"> 添加商品</el-button>
      </el-col>
      </el-row>
      <el-table :data="goodsList" stripe>
         <el-table-column type="index">  </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="650px"> </el-table-column>
        <el-table-column prop="goods_price" label="价格" >  </el-table-column>
        <el-table-column prop="goods_weight" label="重量" > </el-table-column>
        <el-table-column prop="add_time" label="添加时间">
            <template slot-scope="scope"> 
              <span>{{scope.row.add_time|filterDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="editGood(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteGood(scope.row)"></el-button>
          </template>
           </el-table-column>
      </el-table>
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryString.pagenum"
      :page-sizes="[5,8,10]"
      :page-size="queryString.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoods } from "@/network/goods";
export default {
  name: "goodList",
  data() {
    return {
      goodsList: [],
      totalItem:0,
      queryString: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
    };
  },
  methods: {
    getGoodsList() {
      getGoods(this.queryString).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.goodsList = res.data.goods;
          this.totalItem=res.data.total
        }
      });
    },
    getGood(){
        this.getGoodsList()
    },
    editGood(good){
      console.log(good.goods_id)
    },
    deleteGood(good){
      console.log(good.goods_id)
    },
    handleSizeChange(pagesize){
        this.queryString.pagesize=pagesize
        this.getGoodsList()
    },
    handleCurrentChange(pagenum){
        this.queryString.pagenum=pagenum
        this.getGoodsList()
    },
    AddGoods(){
      this.$router.push('/addGoods')
    }
  },
  created() {
    this.getGoodsList()
  },
};
</script>

<style>
.box-card{
  margin-top:20px;
}
</style>