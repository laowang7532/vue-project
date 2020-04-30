<template>
  <div class="content">
    <div class="leftbox">
      <el-card style="width:100%">
        <div slot="header" class="clearfix">
          <span>角色列表</span>
          <el-button
            style="float: right; padding: 10px 15px"
            @click="add"
            size="mini"
            type="primary"
            icon="el-icon-circle-plus-outline"
            plain
          >添加角色</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="#" width="150"></el-table-column>
          <el-table-column label="分类" width="150">
            <template slot-scope="scope">
              <el-tag :type="scope.row.name === '超级管理员' ? 'danger' : 'primary'">{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row.id,scope.row.name)"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                plain
              ></el-button>
              <el-button
                @click="remove(scope.row.id,scope.$index)"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                plain
              ></el-button>
              <el-button
                @click="openSetting(scope.row.id)"
                size="mini"
                type="primary"
                icon="el-icon-setting"
                plain
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 隐藏框 -->
    <div class="rightbox" v-show="isShow">
      <el-card class="box-card right_card" v-for="(item, index) in menuList" :key="item.id">
        <div slot="header" class="clearfix size">
          <div>
            <i class="el-icon-collection-tag"></i>
            <span>{{item.name}}</span>
          </div>
          <el-switch v-model="item.checked" @change="checkAll(item)"></el-switch>
        </div>
        <div class="content" v-for="(subitem, index) in item.children">
          <div class="left">
            <span class="text">{{subitem.name}}</span>
          </div>
          <div class="right">
            <el-switch v-model="subitem.checked" @change="oncheck(subitem,item)"></el-switch>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 编辑 -->
    <el-dialog title="编辑角色" :visible.sync="editModal">
      <el-form :model="editform" :rules="rules" ref="editform">
        <el-form-item label="角色名称" prop="name" label-width="80px">
          <el-input v-model="editform.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editModal = false">取 消</el-button>
        <el-button type="primary" @click="editsave('editform')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Role } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },

      editModal: false,
      editform: {
        id: "",
        name: ""
      },

      //------------------按钮数据-------------------------
      menuList: [],
      addData: [],
      removeData: [],
      isShow: false,
      openId: ""
    };
  },
  created() {
    //调用获取数据
    this.loadlist();
  },
  methods: {
    // 设置按钮
    async openSetting(id) {
      // 转存id
      this.openId = id;
      this.isShow = true;
      let { status, data } = await Role.menu({ id });
      if (status) {
        this.menuList = data;
      }
    },
    // 一级开关添加
    async checkAll(data) {
      if (data.checked == true) {
        data.children.forEach(async item => {
          item.checked = data.checked;
          await Role.addmenu({ role_id: this.openId, menu_id: item.id });
        });
        await Role.addmenu({ role_id: this.openId, menu_id: data.id });
      } else {
        data.children.forEach(async item => {
          item.checked = data.checked;
          await Role.removemenu(this.openId, item.id);
        });
        await Role.removemenu(this.openId, data.id);
      }
    },
    // 单独选择添加
    async oncheck(subdata, data) {
      if (subdata.checked == true) {
        data.checked = subdata.checked;
        await Role.addmenu({ role_id: this.openId, menu_id: subdata.id });
        await Role.addmenu({ role_id: this.openId, menu_id: data.id });
      } else {
        data.checked = subdata.checked;
        await Role.removemenu(this.openId, subdata.id);
        await Role.removemenu(this.openId, data.id);
      }
    },
    //编辑
    edit(id, name) {
      (this.editModal = true),
        //存储数据
        (this.editform.id = id);
      this.editform.name = name;
    },
    editsave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          // this.insertVisible = false;
          let { status, data, msg } = await Role.updata({
            ...this.editform
          });
          if (status) {
            //关闭弹窗
            this.editModal = false;
            this.$message.success("修改成功");
            //界面中更改数据
            this.loadlist();
          }
        }
      });
    },

    //请求获取数据
    async loadlist() {
      let { status, data } = await Role.list();
      if (status) {
        this.tableData = data;
      }
    },
    //删除角色
    remove(id, index) {
      this.$confirm("确定要删除此管理嘛？", { type: "warning" }).then(
        async () => {
          let { status, msg } = await Role.del({ id });
          if (status) {
            this.tableData.splice(index, 1);
            this.$message.success("删除成功！");
          } else {
            this.$message.error(msg);
          }
        }
      );
    },
    //添加角色
    add() {
      this.$prompt("名称", "添加角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          let { status, data } = await Role.add(value);
          if (status) {
            this.tableData.push({ id: data.id, name: value });
            this.$message({
              type: "success",
              message: "添加成功"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //按钮

    btnopen() {
      this.isShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
}
.leftbox {
  width: 43%;
}
.rightbox {
  width: 56%;
  .rightitem {
    margin: 0 0 10px 0;
  }
}
.title {
  font-size: 14px;
  color: #409eff;
}
.list {
  font-size: 12px;
  color: #909399;
  margin: 10px 0;
}
.clearfixs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right_card {
  margin-bottom: 10px;

  .size {
    font-size: 14px;
    color: #409eff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .text {
      font-size: 12px;
      color: #909399;
    }
  }
}
</style>