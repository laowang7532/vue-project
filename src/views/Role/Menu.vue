<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>菜单权限</span>
    </div>

    <el-alert class="el-icon-warning" style="font-size:28px;margin-bottom:10px" type="warning">
      <div class="title">Tips</div>
      <div>设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。</div>
    </el-alert>

    <el-tree ref="tree" :load="loadNode" lazy node-key="id" :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" :class="data.icon" :disabled="node.level==1">图标</el-button>
          <el-button
            type="text"
            size="mini"
            class="el-icon-edit-outline"
            :disabled="node.level==1"
            @click.stop="openEditModal(node,data)"
          >编辑</el-button>
          <el-button
            type="text"
            size="mini"
            class="el-icon-plus"
            @click.stop="openInsertModal(node,data)"
          >添加</el-button>
          <el-button
            type="text"
            size="mini"
            class="el-icon-delete"
            :disabled="node.level==1"
            @click.stop="openRemove(node,data)"
          >删除</el-button>
          <el-button type="text" size="mini">
            <span class="sort">显示序号：</span>
            <el-tag class="tag">{{data.order}}</el-tag>
          </el-button>
        </span>
      </span>
    </el-tree>

    <!-- 添加模态框 -->
    <el-dialog title="添加节点" :visible.sync="insertVisible" width="30%">
      <el-form ref="insertForm" :model="insertForm" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="insertForm.name"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="path">
          <el-input v-model="insertForm.path" placeholder="指定此菜单的链接地址,可选填"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="order">
          <el-input v-model="insertForm.order" placeholder="显示顺序按照数字大小,如:2001"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleInsert('insertForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑节点" :visible.sync="editVisible" width="30%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="path">
          <el-input v-model="editForm.path" placeholder="指定此菜单的链接地址,可选填"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="order">
          <el-input v-model="editForm.order" placeholder="显示顺序按照数字大小,如:2001"></el-input>
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
import { Role } from "@/api/index";
export default {
  data() {
    return {
      insertVisible: false,
      editVisible: false,
      defaultProps: {
        children: "children",
        label: "name"
      },
      //---------------------------添加模态框-------------------------------
      insertForm: {
        name: "",
        pId: "",
        path: "",
        order: ""
      },
      //---------------------------修改模态框-------------------------------
      editForm: {
        name: "",
        pId: "",
        path: "",
        order: ""
      },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        order: [{ required: true, message: "请输入菜单顺序", trigger: "blur" }]
      },
      nodeData: {}, //节点数据
      node: {} //节点对象
    };
  },
  methods: {
    // 编辑
    openEditModal(node, data) {
      // 转存节点对象
      this.node = node;
      this.editForm = { ...data };
      this.editVisible = true;
    },
    handleEdit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { status, msg } = await Role.edit({ ...this.editForm }); //扩展运算符
          if (status) {
            this.$message.success(msg);
            // 关闭弹窗
            this.editVisible = false;
            // 更新节点
            this.node.data = this.editForm;
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    // 删除
    openRemove(node, data) {
      this.$confirm("确定要删除此分类吗?", { type: "warning" }).then(
        async () => {
          // 发送ajax
          let id = node.data.id;
          let { status ,msg } = await Role.remove({ id }); //扩展运算符
          if (status) {
            // 界面上的数据删除
            this.$refs.tree.remove(data);
            this.$message.success("删除成功");
          } else {
            this.$message.error(msg);
          }
        }
      );
    },
    // 添加
    openInsertModal(node, data) {
      console.log(data);
      // 转存了父级分类id
      this.insertForm.pId = data.pId + 1;
      // 转存 父类节点
      this.node = node;
      this.insertVisible = true;
    },
    handleInsert(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { status, msg, data } = await Role.insert({ ...this.insertForm }); //扩展运算符
          if (status) {
            // 关闭弹窗
            this.insertVisible = false;
            // 界面添加节点
            this.$refs.tree.append({ ...this.insertForm, ...data }, this.node);
          }
        }
      });
    },
    //获取分类
    async loadNode(node, resolve) {
      // console.log(node);
      //根节点 //子节点,一级分类
      if (node.level == 0) {
        return resolve([{ name: "全部分类", pId: 0 }]);
      }
      //子节点 二级分类
      if (node.level == 1) {
        let { status, data } = await Role.category({ pId: 1 });
        if (status) {
          resolve(data);
        }
      }
      if (node.level > 1) {
        //取出点击节点的id
        let id = node.data.id;
        //发送ajax
        let { status, data } = await Role.category({ pId: id });
        if (status) {
          resolve(data);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: bold;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.sort {
  color: black;
}
.tag {
  width: 40px;
}
</style>