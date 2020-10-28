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

      <el-form :model="ShopInfo" :rules="rules" label-width="120px">
        <el-tabs :tab-position="'left'" :before-leave="changeTabs">
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
              <el-cascader
                v-model="value"
                :options="cateList"
                :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id'}"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <span>{{manyAttributes.attr_name}}</span>
            <div v-for="(item,index) in manyAttributes" :key="index">
              <el-form-item :label="item.attr_name">
                <el-checkbox
                  :value="true"
                  :label="item"
                  border
                  v-for="(item,index1) in item.attr_vals"
                ></el-checkbox>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <span>{{onlyAttribute.attr_name}}</span>
            <div v-for="(item,index) in onlyAttribute" :key="index">
              <el-form-item :label="item.attr_name">
                <!-- <el-checkbox :value="true" :label="item" border v-for="(item,index1) in item.attr_vals"></el-checkbox> -->
                <el-input placeholder="请输入内容" :value="item" v-for="(item,index1) in item.attr_vals"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              :on-success="upLoadSuccess"
              :action="upLoadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="token"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
              <quill-editor v-model="ShopInfo.goods_introduce"
                ref="myQuillEditor"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
  </quill-editor>
             <el-button type="primary" @click="addProducts">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <el-dialog title="图片" :visible.sync="picDetails">
        <img :src="picUrl" alt="" class="showImage" />
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getGoodsCategory, getCategories,PostGood } from "@/network/goods";
export default {
  name: "AddGoods",
  data() {
    return {
      activeLink: 0,
      ShopInfo: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: "",
        goods_introduce: "",
        pics: "",
        attrs: []
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "change" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "change" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "change" }
        ],
        goods_cat: [
          { required: true, message: "请输入商品分类", trigger: "change" }
        ]
      },
      cateList: [],
      value: "",
      queryString: {
        type: "",
        pagenum: "",
        pagesize: ""
      },
      cateId: "",
      onlyAttribute: "",
      manyAttributes: "",
      upLoadUrl: "http://127.0.0.1:8888/api/private/v1/Upload",
      token: {},
      picUrl: "",
      picDetails: false
    };
  },
  methods: {
    //获取分类数据
    getCateList() {
      getGoodsCategory(this.queryString).then(res => {
        if (res.meta.status == 200) {
          this.cateList = res.data;
        }
      });
    },
    //根据分类id获取参数数据
    handleChange(value) {
      this.ShopInfo.goods_cat = value;
      this.cateId = value[value.length - 1];
      this.getAttribute("many");
      this.getAttribute("only");
    },
    //tabs标签更改
    changeTabs(nextValue, preValue) {
      if (nextValue == 1 && this.ShopInfo.goods_cat.length != 3) {
        this.$message({ message: "未选择商品分类", type: "warning" });
        return false;
      }
      this.activeLink = nextValue * 1;
    },
    //根据ID和only还是many获取参数
    getAttribute(type) {
      getCategories(this.cateId, type).then(res => {
        if (res.meta.status == 200) {
          res.data.forEach(element => {
            element.attr_vals = element.attr_vals.split(",");
          });
          if (type == "only") this.onlyAttribute = res.data;
          if (type == "many") this.manyAttributes = res.data;
        }
      });
    },
    //预览图片
    handlePreview() {
      this.picDetails = true;
    },
    //移除图片
    handleRemove() {},
    //上传成功
    upLoadSuccess(response) {
      if (response.meta.status == 200) {
        this.ShopInfo.pics = response.data.tmp_path;
        this.picUrl = response.data.url;
      } else {
        this.$message.error(response.meta.msg);
      }
    },
    //富文本框操作
    onEditorBlur(){},
    onEditorFocus(){},
    onEditorReady(){},
    addProducts(){
        console.log(this.onlyAttribute)
        console.log(this.manyAttributes)
        this.ShopInfo.goods_cat=this.ShopInfo.goods_cat.join(',')
        console.log(this.ShopInfo)
        // PostGood(this.ShopInfo).then(res=>{
        //     console.log(res)
        // })
    }
  },
  created() {
    this.getCateList();
    this.token.Authorization = window.sessionStorage.getItem("token");
  }
};
</script>
<style scoped>
.el-alert {
  margin-bottom: 10px;
}
.el-tag {
  margin-right: 10px;
}
.showImage{
    width:100%;
}
</style>