<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row>
        <el-col :span="2"
          ><el-button type="primary" @click="addRole"
            >添加角色</el-button
          ></el-col
        >
      </el-row>
      <el-table :data="roleList" stripe style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', 'vcenter']"
              v-for="(item, index) in scope.row.children"
              :key="index"
            >
              <el-col :span="6"
                ><el-tag closable @close="closeTag(scope.row.id, item.id)">{{
                  item.authName
                }}</el-tag
                ><i class="el-icon-caret-right"></i
              ></el-col>
              <el-col :span="18">
                <el-row
                  :class="['vcenter']"
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                >
                  <el-col :span="10"
                    ><el-tag
                      closable
                      type="success"
                      @close="closeTag(scope.row.id, item1.id)"
                      >{{ item1.authName }}</el-tag
                    ><i class="el-icon-caret-right"></i
                  ></el-col>
                  <el-col :span="14">
                    <el-row
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                    >
                      <el-tag
                        type="warning"
                        closable
                        @close="closeTag(scope.row.id, item2.id)"
                        >{{ item2.authName }}</el-tag
                      >
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180">
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editRole"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="settingRight(scope.row, scope.row.id)"
              >配置权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加角色" :visible.sync="AddRoleVisible">
      <el-form
        ref="AdRoleFormRef"
        :rules="AddUserFormRule"
        :model="AddRoleForm"
        label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="AddRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="AddRoleForm.roleDesc"></el-input>
        </el-form-item>
          <el-button @click="AddRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="PostRight">确 定</el-button>
      </el-form>
    </el-dialog>
    
    <el-dialog title="分配权限" :visible.sync="SettingRightVisible">
      <el-tree
        :data="rightsList"
        ref="tree"
        :props="rightProps"
        :default-expanded-keys="defaultCheck"
        :default-checked-keys="defaultCheck"
        node-key="id"
        show-checkbox
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SettingRightVisible = false">取 消</el-button>
        <el-button type="primary" @click="CommitRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesList,
  deleteRoleRight,
  getRightList,
  postRoleRight,
  AddRole,DeleteRole
} from "@/network/right";
export default {
  name: "role",
  data() {
    return {
      roleList: [],
      SettingRightVisible: false,
      rightsList: [],
      defaultCheck: [],
      rightProps: {
        children: "children",
        label: "authName",
      },
      RoleId: 0,
      AddRoleForm:{
        roleName:'',
        roleDesc:''
      },
      AddRoleVisible:false,
      AddUserFormRule:{
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc:[{required:true,message:'请输入角色描述',trigger:'blur'}]
      }
    };
  },
  methods: {
    getRoleList() {
      getRolesList().then((res) => {
        console.log(res);
        this.roleList = res.data;
      });
    },
    closeTag(roleId, rightId) {
      console.log(roleId, rightId);
      this.$confirm("此操作将删除该该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          if ((res = "confirm")) {
            deleteRoleRight(roleId, rightId).then((res) => {
              console.log(res);
              if (res.meta.status == 200) {
                this.roleList.children = res.data;
                this.$message({ type: "success", message: "删除成功!" });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addRole() {
      this.AddRoleVisible=true
    },
    PostRight(){
      this.$refs.AdRoleFormRef.validate((valide)=>{
        if(valide==false) return 
         AddRole(this.AddRoleForm).then(res=>{
        if(res.meta.status==201){
          this.$message({message:'添加角色成功',type:'success'})
          this.AddRoleVisible=false
          this.getRoleList()
        }
      })
      })
    },
    editRole() {},
    deleteRole(id) {
      console.log(id)
       this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          console.log(res)
          if(res=="confirm") DeleteRole(id).then(res=>{
            if(res.meta.status==200){
              this.getRoleList()
                this.$message({type: 'success',message: '删除成功!'});
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      DeleteRole
    },
    settingRight(Rights, RoleId) {
      this.defaultCheck = [];
      this.RoleId = RoleId;
      getRightList("tree").then((res) => {
        if (!res.meta.status == 200) return;
        this.rightsList = res.data;
      });
      this.getCheckedNode(Rights, this.defaultCheck);
      const str = this.defaultCheck.join(",");
      this.SettingRightVisible = true;
    },
    CommitRight() {
      const AllKeys = this.$refs.tree.getCheckedKeys();
      const AllHalfKeys = this.$refs.tree.getHalfCheckedKeys();
      const commitKeys = [...AllKeys, ...AllHalfKeys].join(",");
      console.log(commitKeys);
      console.log(this.RoleId);
      postRoleRight(this.RoleId, commitKeys).then((res) => {
        if (res.meta.status == "200") {
          this.SettingRightVisible = false;
          this.$message({ message: "修改成功", type: "success" });
        }
      });
    },
    getCheckedNode(node, defaultCheck) {
      if (!node.children) {
        defaultCheck.push(node.id);
        return defaultCheck;
      }
      node.children.forEach((item) => {
        this.getCheckedNode(item, defaultCheck);
      });
    },
  },

  created() {
    this.getRoleList();
  },
};
</script>

<style>
.el-table {
  margin-top: 20px;
}
.el-card {
  margin-top: 20px;
}
.el-tag {
  margin: 7px;
}
.vcenter {
  display: flex;
  align-items: center;
}
.bdbottom {
  border-bottom: 1px solid gray;
}
</style>