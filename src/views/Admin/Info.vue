<template>
  <el-card>
    <div slot="header">
      <span>账户信息</span>
    </div>

    <el-form class="content" ref="form" :model="form" label-width="80px" label-position="left">
      <el-form-item class="txt" label="账户" prop="username">
        <el-input class="inputsize" v-model="form.username" placeholder="账户名称在3-15个字符！" disabled></el-input>
      </el-form-item>

      <el-form-item class="txt" label="姓名" prop="fullname">
        <el-input class="inputsize" v-model="form.fullname" placeholder="请填写真实姓名"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="txt" label="手机" prop="tel">
        <el-input class="inputsize" v-model="form.tel" placeholder="请输入您的手机号码"></el-input>
      </el-form-item>

      <el-form-item label="权限">
        <el-select v-model="form.role_name" placeholder="请选择角色种类">
          <el-option v-for="item in rolelists" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="头像">
        <div class="uploadbox">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="token"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item>
        <router-link to>
          <el-button type="primary" @click="handleEdit('form')">修改</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { Admin } from "@/api/index";
export default {
  data() {
    return {
      uploadUrl: "http://localhost:3003/api/upload/common",
      token: {
        Authorization: `Bearer ${sessionStorage.token}`
      },
      form: {
        username: "",
        fullname: "",
        sex: "",
        tel: "",
        role_name: "",
        email: "",
        avatar: ""
      },
      rolelists: []
    };
  },
  created() {
    this.loadlist();
    this.rolelist();
  },
  methods: {
    //--------------------编辑角色信息----------------------
    handleEdit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { status, data, msg } = await Admin.edit({ ...this.form });
          if (status) {
            this.$message.success("修改成功");
          }
        }
      });
    },

    //--------------------获取权限角色----------------------
    async rolelist() {
      let { status, data, msg } = await Admin.role();
      if (status) {
        // console.log(data);
        this.rolelists = data;
      }
    },

    //--------------------获取角色信息----------------------
    async loadlist() {
      let uid = sessionStorage.uid;
      let { status, data, total } = await Admin.detail({ id: uid });
      if (status) {
        this.form = data;
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.content {
  width: 900px;
  margin: 0 auto;
}
.inputsize {
  width: 800px;
}
.uploadbox {
  width: 178px;
  height: 178px;
  border-radius: 6px;
  border: 1px dashed #d9d9d9;
}
.uploadbox:hover {
  width: 178px;
  height: 178px;
  border: 1px dashed #409eff;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>