<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-input placeholder="请输入内容" size="medium" clearable @clear="clearQuery" v-model="queryString.query">
            <el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
             </el-input>
        </el-col>
      </el-row>

      <el-table :data="orderList" stripe style="width: 100%" border>
        <el-table-column prop="order_number" label="订单号"></el-table-column>
        <el-table-column prop="order_price" label="价格"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
              <el-tag v-if="scope.row.order_pay*1">已付款</el-tag>
              <el-tag v-else type="warning">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"> </el-table-column>
        <el-table-column label="创建时间">
           <template slot-scope="scope">
              <span>{{scope.row.create_time|filterDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
           <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="ShowEditOrder(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-location-outline" size="mini" circle @click="logistics(scope.row.id)"></el-button>
         
        </el-table-column>
      </el-table>

         <el-pagination
      @size-change="LisSizeChange"
      @current-change="LisCurrentChange"
      :current-page="queryString.pagenum"
      :page-sizes="[1, 3, 5]"
      :page-size="queryString.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
        </el-pagination>

       
    </el-card>
  </div>
</template>

<script>
import {getOrderList} from "@/network/order";
export default {
  name: "OrderList",
  data() {
      return {
          orderList:[],
          total:0,
          queryString:{
               query:"",
            pagenum:1,
            pagesize:5,
            user_id:"",
            pay_status:"",
            is_send:"",
            order_fapiao_title:"",
            order_fapiao_company:"",
            order_fapiao_content:"",
            consignee_addr:"",

          }
      }
  },
methods: {
    GetOrderList(){
        getOrderList(this.queryString).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                console.log(res.data)
                this.orderList=res.data.goods
                this.total=res.data.total
            }
        })
    },
    LisSizeChange(value){
      this.queryString.pagesize=value
       this.GetOrderList()
    },
    LisCurrentChange(value){
        this.queryString.pagenum=value
        this.GetOrderList()
    },
    clearQuery(){
      this.GetOrderList()
    },
    searchOrder(){
       this.GetOrderList()
    }
},
  created() {
    this.GetOrderList()
  },
};
</script>

<style>
.el-row {
  margin-top: 10px;
}
.box-card {
  margin-top: 20px;
}
.el-table{
  margin-top:20px;
}
.el-pagination{
  margin-top:10px;
}
</style>