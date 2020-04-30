<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户列表</span>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="140"></el-table-column>
      <el-table-column prop="avatar" label="头像" sortable width="120">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar" shape="circle "></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号" sortable width="120"></el-table-column>
      <el-table-column prop="fullname" label="姓名" sortable width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" sortable width="120"></el-table-column>
      <el-table-column prop="tel" label="手机" sortable width="120"></el-table-column>
      <el-table-column prop="role_name" label="角色" sortable width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.role_name === '超级管理员' ? 'danger' : 'primary'"
          >{{scope.row.role_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="login_time" label="上次登录" sortable width="120"></el-table-column>
      <el-table-column prop="login_count" label="登录次数" sortable width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="editHandle(scope.row.id,scope.row.name)"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain
          ></el-button>
          <el-button
            @click="romoveHandle(scope.row.id,scope.$index)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑模态框 -->
    <el-dialog title="修改信息" :visible.sync="editVisible" width="50%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="fullname">
          <el-input v-model="editForm.fullname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="editForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-input v-model="editForm.role"></el-input>
        </el-form-item>
        <el-form-item label="主图">
          <Upload
            v-model="editForm.avatar"
            :src.sync="editForm.avatar"
            action="http://localhost:3001/upload/common/"
            :headers="headers"
            :data="params"
            remove-action="http://localhost:3001/upload/delete"
            defaultAvatar="../images/avatar/default.jpg"
          ></Upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { User } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      editVisible: false,
      editForm: {
        fullname: "",
        sex:"",
        tel:"",
        role:"",
        avatar:"",

      },

    };
  },
  created() {
    //调用获取数据
    this.loadlist();
  },
  methods: {
    // 编辑
    editHandle(id,name) {
      this.editVisible = true;
    },

    // 删除
    romoveHandle(id, index) {
      this.$confirm("确定要删除此账户吗?", { type: "warning" }).then(
        async () => {
          // 发送ajax
          let { status } = await User.remove({ id });
          if (status) {
            // 界面上的数据删除
            this.tableData.splice(index, 1);
            this.$message.success("删除成功");
          }
        }
      );
    },
    //请求获取数据
    async loadlist() {
      let { status, data } = await User.list();
      if (status) {
        this.tableData = data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>