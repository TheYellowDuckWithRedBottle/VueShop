<template>
  <div class="goodlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

<el-card>
    <el-row :gutter="20">
        <el-col :span="120">
          <div>
            <el-input placeholder="请输入内容" clearable v-model="queryParams.query" @clear="clearInput">
              <el-button slot="append" icon="el-icon-search" @click="searchGoodsList"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="1">
          <div>
            <el-button type="primary" @click="AddGoods">添加商品</el-button>
          </div>
        </el-col>
      </el-row>

       <el-table :data="goodsList" stripe border >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="580px" > </el-table-column>
        <el-table-column prop="goods_price" label="商品价格"  width="50px"> </el-table-column>
        <el-table-column prop="goods_number" label="商品数量" width="50px"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="50px"> </el-table-column>
        <el-table-column prop="add_time" label="添加时间" > 
            <template slot-scope="scope">
               {{scope.row.add_time|formatDate}}
            </template>
        </el-table-column>
        <el-table-column label="操作"> 
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editGoodsForm(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoodsById(scope.row.id)"></el-button>
            </template>
        </el-table-column>
       </el-table>

        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.pagenum"
      :page-sizes="[ 3,4,5,6 ]"
      :page-size="queryParams.pagesize"
      layout="total, sizes,prev, pager, next"
      :total="totalItem">
    </el-pagination>
</el-card>
  </div>
</template>
<script>
import {GetGoodsList} from '@/network/goods'
export default {
  name: "GoodsList",
  data(){
      return{
            queryParams:{
                query:'',
                pagenum:1,
                pagesize:5
      },
      goodsList:[],
      totalItem:0
      }
    
  },
  methods:{
      searchGoods(){
          GetGoodsList(this.queryParams).then(res=>{
              if(res.meta.status==200){
                this.goodsList=res.data.goods
                this.totalItem=res.data.total
              }
              
              console.log(res)
          })
      },
      AddGoods(){
          this.$router.push('addGoods')
      },
      clearInput(){ this.searchGoods()},
      searchGoodsList(){
          this.searchGoods()
      },
      handleSizeChange(pagesize){
            this.queryParams.pagesize=pagesize
            this.searchGoods()
      },
      handleCurrentChange(pagenum){
           this.queryParams.pagenum=pagenum
           this.searchGoods()
      },
      editGoodsForm(value){
          console.log(value)
      },
      deleteGoodsById(value){
          console.log(value)
      }
  },
  created(){
      this.searchGoods()
  },
};
</script>
<style scoped>
</style>