<template>
  <div class="addGoods">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
      <el-steps :active="activeLink" finish-status="success">
        <el-step title="基本信息" name="0"></el-step>
        <el-step title="商品参数" name="1"></el-step>
        <el-step title="商品属性" name="2"></el-step>
        <el-step title="商品图片" name="3"></el-step>
        <el-step title="商品内容" name="4"></el-step>
        <el-step title="完成 " name="5"></el-step>
      </el-steps>

      <el-form :model="ShopInfo" :rules="rules" label-width="100px" >
        <el-tabs :tab-position="'left'" :before-leave="changeTabs" >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ShopInfo.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ShopInfo.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ShopInfo.goods_weight"></el-input>
            </el-form-item>
             <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ShopInfo.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader v-model="value" :options="cateList" 
              :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id'}"
               @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {getGoodsCategory} from '@/network/goods'
export default {
  name: "AddGoods",
  data() {
    return {
      activeLink: 0,
      ShopInfo:{
          goods_name:'',
          goods_price:'',
          goods_weight:'',
          goods_number:'',
          goods_cat:'',
      },
      rules: {
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'change' }
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'change' }
          ],
          goods_number: [
            { required: true, message: '请输入商品数量', trigger: 'change' }
          ],
          goods_cat: [
            { required: true, message: '请输入商品分类', trigger: 'change' }
          ],
          },
      cateList:[],
      value:"",
      queryString:{
           type:'',
            pagenum:'',
            pagesize:''
      }
    };
  },
  methods: {
      getCateList(){
          getGoodsCategory(this.queryString).then(res=>{
              if(res.meta.status==200){
                  this.cateList=res.data
                  console.log(this.cateList)
              }
          })
      },
      handleChange(value){
          console.log(value)
          this.ShopInfo.goods_cat=value;
      },
      changeTabs(nextValue,preValue){
          console.log(preValue,nextValue)
          if(nextValue==1&&this.ShopInfo.goods_cat.length!=3)
          return false
         this.activeLink=nextValue*1
          
      }
  },
  created(){
      this.getCateList()
  }
};
</script>
<style scoped>
.el-alert {
  margin-bottom: 10px;
}
</style>