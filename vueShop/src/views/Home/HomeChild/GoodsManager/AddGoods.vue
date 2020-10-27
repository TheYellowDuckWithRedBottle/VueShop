<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>

      <el-steps finish-status="success" :active="activeIndex" align-center>
        <el-step title="基本信息"> </el-step>
        <el-step title="商品参数"> </el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

<el-form :model="addGoodsForm" :rules="rules">
      <el-tabs :tab-position="'left'" style=""  :before-leave="changeIndex">
        <el-tab-pane label="基本信息"  name="0">
            <el-form-item label="商品名称" prop="goods_name"> 
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格"  prop="goods_price">
              <el-input v-model="addGoodsForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量"  prop="goods_weight">
              <el-input v-model="addGoodsForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量"  prop="goods_number">
              <el-input v-model="addGoodsForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" >
              <el-cascader
                v-model="addGoodsForm.goods_cat"
                :options="CateList"
                :props="{ expandTrigger: 'hover', label:'cat_name',value:'cat_id'}"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>        
         
            </el-tab-pane>
        <el-tab-pane label="商品参数" name="1"> </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
      </el-tabs>
       </el-form>
    </el-card>
  </div>
</template>
<script>
import{getCatesList} from '@/network/goods'
export default {
  name: "AddGoods",
  data() {
    return {
      addGoodsForm: {
        goods_name:"",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
      },
       rules: {
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
             ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' }
          ],
          goods_number: [
            { required: true, message: '请输入商品数量', trigger: 'blur' }
          ],
          },
      queryString: {
        type:"",
        pagesize:"",
        pagenum:"",
      },
      CateList:[],
      activeIndex:0,
    };
  },
  methods: {
      getCates(){
          getCatesList(this.queryString).then(res=>{
              if(res.meta.status==200){
                  this.CateList=res.data
              }
          })
      },
      changeIndex(preValue,nextVllue){
         this.activeIndex=preValue*1
         console.log(preValue,nextVllue)

          if(nextVllue==0&&this.addGoodsForm.goods_cat.length!==3){
               this.$message({message:'请选择商品分类',type:'success'})
                return false
          }
        
      },
      handleChange(value){
          console.log(value)
          console.log(this.addGoodsForm.goods_cat)
      }
  },
  created() {
      this.getCates()
  },
};
</script>
<style scoped>
/* .box-card{ */
/*      */
/* } */
.el-card{
    margin:10px;
}
.el-alert {
  margin: 10px 0px;
}
.el-cascader{
    margin-left:-60%;
}
</style>