<template>
  <div class="bg">
    <div class="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">欢迎登录</span>
        </div>

        <el-form :model="form" :rules="rules" ref="form" label-width="60px" class="formcontent">
          <el-form-item class="txt" label="账户" prop="username">
            <el-input v-model="form.username" placeholder="请输入您的账户" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <el-form-item class="txt" label="密码" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入您的密码"
              type="password"
              prefix-icon="el-icon-key"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="loginbtn" @click="submitForm('form')">登录</el-button>
          </el-form-item>
        </el-form>

        <div class="footer">
          <router-link to="register" class="registernow">立即注册</router-link>
          <div class="forget">忘记密码?</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { Admin } from "@/api/index";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          {
            type: "string",
            required: true,
            message: "请输入您的密码",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^\d{3,20}$/,
            message: "长度在 3 到 20 个数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          //表单验证通过
          let { status, msg, data } = await Admin.login({ ...this.form });
          if (status) {
            //登录成功
            this.$message.success(msg);
            
            //存取token uid , role
            sessionStorage.token = data.token;
            sessionStorage.uid = data.id; //存的返回过来的是id  不要写错
            sessionStorage.role = data.role;

            //跳转页面
            let { redirect } = this.$route.query;

            if (redirect) {
              this.$router.replace(redirect);
            } else {
              this.$router.replace("/goods/list");
            }
          } else {
            //登录失败
            this.$message.error(msg);
          }
        } else {
          //校验不通过
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// -------------------------------主页样式-----------------------------------
.bg {
  margin: 0;
  background: url("../assets/img/login-bg.jpg") no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  position: relative;
  .login {
    position: absolute;
    right: 5%;
    top: 30%;
    border-radius: 4px;
    padding: 15px 10px;
    .box-card {
      .title {
        font-size: 14px;
      }
      .formcontent {
        padding-right: 20px;
        .loginbtn {
          padding: 10px 20px;
          font-size: 13px;
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        .registernow {
          color: black;
          text-decoration: none;
        }
      }
    }
  }
}
</style>