<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="3">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" stripe border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',index==0?'bdtop': '','vcenter']"
              v-for="(item1,index) in scope.row.children"
              :key="index"
            >
              <el-col :span="6">
                <el-tag closable @close="deleteTag(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <el-row
                  :class="[index2==0? '': 'bdtop','vcenter']"
                  v-for="(item2,index2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="10">
                    <el-tag
                      type="success"
                      closable
                      @close="deleteTag(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="14">
                    <el-row
                      :class="[index2==0? '': 'bdtop','vcenter']"
                      v-for="(item3,index3) in item2.children"
                      :key="item3.id"
                    >
                      <el-col>
                        <el-tag
                          type="warning"
                          closable
                          @close="deleteTag(scope.row,item3.id)"
                        >{{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editUserForm(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUserById(scope.row.id)"
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="settingRight(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="分配权限" :visible.sync="settingFormVisiable">
        <el-tree
        ref="treeRef"
          :data="rightList"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultCheck"
          :props="defaultProps"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="settingFormVisiable = false">取 消</el-button>
          <el-button type="primary" @click="commitSettedRights">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getRoles, deleteRoleRight, getRightList,postRightsForUser } from "@/network/power";
export default {
  name: "Role",
  data() {
    return {
      rolesList: [],
      rightList: [],
      settingFormVisiable: false,
      defaultCheck: [],
      roleId:'',
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  methods: {
    getRolesList() {
      getRoles().then(res => {
        if (res.meta.status == 200) {
          this.rolesList = res.data;
        }
      });
    },
    deleteTag(role, rightId) {
      this.$confirm("此操作将删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          if (res == "confirm") {
            deleteRoleRight(role.id, rightId).then(res => {
              if (res.meta.status == 200) {
                role.children = res.data;
                this.$message({ type: "success", message: "删除成功!" });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    settingRight(role) {
      this.defaultCheck = [];
       this.roleId=role.id
      this.getSelectNode(role, this.defaultCheck);
      console.log(this.defaultCheck);
      getRightList("tree").then(res => {
        if (res.meta.status == 200) {
          this.rightList = res.data;
        }
      });
      this.settingFormVisiable = true;
    },
    getSelectNode(node, array) {
      if (!node.children) {
        array.push(node.id);
        return array;
      }
      node.children.forEach(item => {
        this.getSelectNode(item, array);
      });
    },
    commitSettedRights(){
       const checkedNodes= this.$refs.treeRef.getCheckedKeys()
       const checkedHalfNodes= this.$refs.treeRef.getHalfCheckedKeys()
       const AllNodes=[...checkedNodes,...checkedHalfNodes].join(',')
       console.log(AllNodes)
       this.roleId=this.roleId+""
       console.log(this.roleId)
       postRightsForUser(this.roleId,AllNodes).then(res=>{
           console.log(res)
           if(res.meta.status==200)
           {
               this.getRolesList()
               this.settingFormVisiable=false
           }
       })
    }
  },
  created() {
    this.getRolesList();
  }
};
</script>
<style scoped>
.bdbottom {
  margin: 15px 0px;
  border-bottom: 1px solid black;
}
.bdtop {
  margin: 15px 0px;
  /* border-bottom: 1px solid black; */
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>