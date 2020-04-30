<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
    </div>
    <el-tree ref="tree" :load="loadNode" lazy node-key="id" :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node , data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit-outline"
            @click.stop="openEditModal(node,data)"
            :disabled="node.level==1"
          >编辑</el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-plus"
            @click.stop="openInsertModal(node,data)"
          >添加</el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click.stop="openRemove(node,data)"
            :disabled="node.level==1"
          >删除</el-button>
        </span>
      </span>
    </el-tree>

    <!-- 添加模态框 -->
    <el-dialog title="添加分类" :visible.sync="insertVisible" width="45%">
      <el-form
        ref="insertForm"
        :rules="rules"
        :model="insertForm"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="insertForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            :action="uploadUrl"
            :headers="token"
            list-type="picture-card"
            :on-success="getImg"
            v-model="insertForm.img"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleInsert('insertForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑分类" :visible.sync="editVisible" width="45%">
      <el-form ref="editForm" :rules="editrules" :model="editForm" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload :action="uploadUrl" list-type="picture-card" v-model="editForm.img" :limit="1">
            <img v-if="editForm.img" :src="editForm.img" class="img" />
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleEdit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { Goods } from "@/api/index";
export default {
  data() {
    return {
      uploadUrl: "http://localhost:3003/api/upload/common",
      token: {
        Authorization: `Bearer ${sessionStorage.token}`
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      //添加模态框数据-------------------------------------------------
      insertVisible: false,
      insertForm: {
        name: "",
        pId: "",
        img: ""
      },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      },
      //编辑模态框数据-------------------------------------------------
      editVisible: false,
      editForm: {},
      editrules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      },

      nodeData: {}, //节点数据
      node: {} //节点对象
    };
  },
  methods: {
    //获取分类--------------------------------------------------------
    async loadNode(node, resolve) {
      // console.log(node);
      //根节点 //子节点,一级分类
      if (node.level == 0) {
        return resolve([{ name: "全部分类", pId: 0 }]);
      }
      //子节点 二级分类
      if (node.level == 1) {
        let { status, data } = await Goods.category({ pId: 1 });
        if (status) {
          resolve(data);
        }
      }
      if (node.level > 1) {
        //取出点击节点的id
        let id = node.data.id;
        //发送ajax
        let { status, data } = await Goods.category({ pId: id });
        if (status) {
          resolve(data);
        }
      }
    },

    //编辑-------------------------------------------------------------
    openEditModal(node, data) {
      console.log(data);
      this.editVisible = true;
      this.editForm = { ...data };
      //转存节点数据对象
      this.node = node;
    },

    HandleEdit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          let { status, data, msg } = await Goods.edit({
            ...this.editForm
          });
          if (status) {
            //关闭弹窗
            this.editVisible = false;
            //界面中更新节点data
            this.node.data = this.editForm;
            this.$message.success("编辑成功");
          } else {
            this.$message.success(msg);
          }
        }
      });
    },

    //新建-------------------------------------------------------------
    getImg(response) {
      // console.log(response)
      this.insertForm.img = response.data;
    },
    openInsertModal(node, data) {
      console.log(node);
      // console.log(data);
      //转存父级的id
      this.insertForm.pId = node.id;
      //转存父类的节点 parentNode
      this.node = node;

      this.insertVisible = true;
    },
    HandleInsert(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          let { status, data, msg } = await Goods.add(this.insertForm);
          if (status) {
            //关闭弹窗
            this.insertVisible = false;
            //界面中添加节点
            this.$refs.tree.append({ ...this.insertForm, ...data }, this.node);
            this.$message.success(msg);
          } else {
            //上传错误 或者没有上传图片的情况
            this.$message.error(msg);
          }
        }
      });
    },
    //删除节点----------------------------------------------------
    openRemove(node, data) {
      // console.log(data);
      this.$confirm("确定要删除此管理嘛？", { type: "warning" }).then(
        async () => {
          let { status,msg } = await Goods.remove({ id: data.id });
          // let { status, msg } = await Goods.remove({ id: data.id });
          if (status) {
            this.$refs.tree.remove(node);
            this.$message.success("删除成功！");
          } else {
            this.$message.error(msg);
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.img {
  width: 100%;
}
</style>