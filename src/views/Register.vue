<template>
  <div class="bg">
    <div class="register">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">注册</span>
        </div>

        <el-form :model="Form" :rules="rules" ref="ruleForm" label-width="70px" class="formcontent">
          <el-form-item class="txt" label="账户" prop="username">
            <el-input
              v-model="Form.username"
              placeholder="账户名称在3-15个字符！"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>

          <el-form-item class="txt" label="密码" prop="password">
            <el-input
              v-model="Form.password"
              placeholder="密码至少3位数字"
              type="password"
              prefix-icon="el-icon-key"
            ></el-input>
          </el-form-item>

          <el-form-item class="txt" label="姓名" prop="fullname">
            <el-input v-model="Form.fullname" placeholder="请填写真实姓名" prefix-icon="el-icon-postcard"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="Form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="txt" label="手机" prop="tel">
            <el-input v-model="Form.tel" placeholder="请输入您的手机号码" prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox label="同意本站的用户协议" name="type"></el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="registerbtn" @click="submitForm('form')">注册</el-button>
          </el-form-item>
        </el-form>

        <div class="footer">
          <router-link to="login" class="loginnow">立即登录</router-link>
          <div class="forget">忘记密码</div>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>
import {Admin} from "@/api/index"
export default {
  data() {
    return {
      Form: {
        username: "",
        password: "",
        fullname: "",
        sex: "",
        tel: "",
        isagree: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        fullname: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          {
            type: "string",
            pattern: /^([\u4e00-\u9fa5]){2,4}$/,
            message: "长度在 2 到 4 个字符",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        tel: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          {
            type: "string",
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "填写正确规格的手机号码格式",
            trigger: "blur"
          }
        ]
      }
    };
  },methods: {
    submitForm(formName) {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          let {status,msg} = await Admin.register({...this.Form });
          if(status){
            //注册成功
            this.$message.success(msg);
            setTimeout(()=>{
              this.$router.push('/login');
            })
          }else{
            //注册失败
            this.$message.error(msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.bg {
  margin: 0;
  background: url("../assets/img/login-bg.jpg") no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  position: relative;
  .register {
    position: absolute;
    right: 5%;
    top: 20%;
    border-radius: 4px;
    padding: 15px 10px;
    .box-card {
      .title {
        font-size: 14px;
      }
      .formcontent {
        padding-right: 20px;
        .registerbtn {
          padding: 10px 20px;
          font-size: 13px;
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        .loginnow {
          color: black;
          text-decoration: none;
        }
      }
    }
  }
}
</style>