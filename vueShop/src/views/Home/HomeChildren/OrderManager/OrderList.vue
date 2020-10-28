<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="120">
          <div>
            <el-input placeholder="请输入内容" clearable v-model="queryParams.query" @clear="clearInput">
              <el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-table :data="OrderList" stripe border style="width=700px">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="200px"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay*1">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column label="create_time" width="180px">
          <template slot-scope="scope">{{scope.row.create_time|formatDate}}</template>
        </el-table-column>
        <el-table-column prop="mobile" label="操作" width="190px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editOrderForm(scope.row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-location-outline" size="mini" @click="Local"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[4,5,6]"
        :page-size="queryParams.pagesize"
        layout="total, sizes,prev, pager, next"
        :total="total"
      ></el-pagination>

      <el-dialog title="物流" :visible.sync="showDialog">
          <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in process"
      :key="index"
      :timestamp="activity.time">
      {{activity.location}}
    </el-timeline-item>
  </el-timeline>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getOrder, getLogistics } from "@/network/order";
export default {
  name: "orderList",
  data() {
    return {
      queryParams: {
        query: "",
        pagenum: 1,
        pagesize: 4,
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: ""
      },
      OrderList: [],
      total: 0,
      showDialog: false,
      process: []
    };
  },
  methods: {
    GetOrder() {
      getOrder(this.queryParams).then(res => {
        if (res.meta.status == 200) {
          this.OrderList = res.data.goods;
          this.total = res.data.total;
        }
      });
    },
    Local() {
        this.showDialog = true;
    //   getLogistics(1106975712662).then(res => {
    //        console.log(res.data);
    //     if (res.meta.status == 200) {
         
    //       this.process = res.data;
    //     }
    //   });
      
    },
    searchOrder() {
      this.GetOrder();
    },
    clearInput() {
      this.GetOrder();
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.queryParams.pagsize = pageSize;
      this.GetOrder();
    },
    //监听每页个数改变
    handleCurrentChange(pageNum) {
      this.queryParams.pagenum = pageNum;
      this.GetOrder();
    }
  },
  created() {
    this.GetOrder();
  }
};
</script>
<style scoped>
</style>