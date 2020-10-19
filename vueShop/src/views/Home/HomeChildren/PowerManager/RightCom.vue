<template>
  <div class="Right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="RoleList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="权限路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
          <el-tag v-if="scope.row.level=='0'">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.level=='1'">二级</el-tag>
          <el-tag type="warning" v-else-if="scope.row.level=='2'">三级</el-tag>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getRights } from "@/network/power";
export default {
  name: "Right",
  data() {
    return {
      RoleList: [],
      requestType: ["tree", "list"]
    };
  },
  methods: {
    getRolesList() {
      getRights(this.requestType[1]).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.RoleList = res.data;
        }
      });
    }
  },
  created() {
    this.getRolesList();
  }
};
</script>
<style scoped>
.el-card {
  margin-top: 20px;
}
</style>