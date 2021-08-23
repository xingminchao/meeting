<template>
  <div>
    <div class="content">
      <div class="input-box">
        <el-input
          type="number"
          v-model="mobileObj.mobile"
          @input="checkNumber($event, 1)"
          @blur="checkForm('mobile')"
          @focus="mobileObj.showHint = false"
          placeholder="请输入注册手机号"
        ></el-input>
        <div class="mes" v-show="mobileObj.showHint">
          <transition name="el-fade-in-linear">
            <p class="hint">
              {{ mobileObj.hint }}
            </p>
          </transition>
        </div>
        <div class="line"></div>
      </div>
      <div class="input-box" style="padding-bottom: 44px">
        <el-input
          placeholder="请输入密码"
          v-model="passwordObj.recode"
          show-password
          @input="checkNumber($event, 1)"
          @blur="checkForm('email')"
          @focus="passwordObj.showHint = false"
        ></el-input>
        <div class="mes" v-show="passwordObj.showHint">
          <transition name="el-fade-in-linear">
            <p class="hint">
              {{ passwordObj.hint }}
            </p>
          </transition>
        </div>
        <div class="line"></div>
      </div>
      <el-button class="login_btn" @click="login()"> 确认并登录</el-button>
      <el-button class="register_btn" @click="account()"
        >已有账号去登陆</el-button
      >
    </div>
  </div>
</template>

<script>
const resMobile = /^1[3|4|5|7|8][0-9]\d{8}$/; //手机号验证
const resEmail = /^[a-zA-Z0-9]{8}$/; //密码验证
export default {
  data() {
    return {
      mobileObj: {
        mobile: "",
        hint: "",
        showHint: false,
      },
      //定义验证码
      passwordObj: {
        recode: "",
        hint: "",
        showHint: false,
      },
      showfrom: false,
    };
  },

  methods: {
    checkNumber(e, type) {
      if (type == 1 && e.length > 11) {
        this.mobileObj.mobile = e.slice(0, 11);
      }
      if (type == 2 && e.length > 8) {
        this.passwordObj.recode = e.slice(0, 8);
      }
    },
    //表单验证
    checkForm(type) {
      console.log(type, "vsrthgfdht", this.mobileObj.mobile);

      if (
        ["all", "mobile"].includes(type) &&
        !resMobile.test(this.mobileObj.mobile)
      ) {
        this.mobileObj.hint = "请输入正确的手机号";
        this.mobileObj.showHint = true;
        return false;
      }
      if (
        ["all", "email"].includes(type) &&
        !resEmail.test(this.passwordObj.recode)
      ) {
        this.passwordObj.hint = "密码由8位字母数字组成，不区分大小写";
        this.passwordObj.showHint = true;
        return false;
      }
    },
    login(type) {
      if (
        !resMobile.test(this.mobileObj.mobile) &&
        !resEmail.test(this.passwordObj.recode)
      ) {
        console.log("有错");
        this.$message.error("请输入正确信息");
      } else {
        console.log("成功");
        sessionStorage.setItem("phone", JSON.stringify(this.mobileObj.mobile));
        this.$router.push({
          path: "/menu/index",
        });
      }
    },
    register() {
      this.showFrom = false;
      this.showFroms = true;
    },
    account() {
      this.$emit("showChange", this.showfrom);
    },
  },
};
</script>

<style lang="less" scoped>
.btns {
  width: 100%;
  width: 416px;
  height: 60px;
  border-radius: 30px;
  border: none;
}
.el-button + .el-button {
  margin-left: 0;
}
.content {
  padding-left: 53px;
  padding-right: 39px;
  .input-box {
    height: 74px;
    // display: flex;
    // flex-direction: column-reverse; /* 按照列(反方向)排列*/
    // align-items: flex-end;
    .mes {
      height: 20px;
      width: 100%;
      border: true;
      .hint {
        font-size: 12px;
        color: red;
        text-align: justify;
        padding-left: 20px;
        transition: all 0.3s;
      }
    }
  }

  .line {
    border: 1px dashed #ddd;
  }
  .login_btn {
    .btns();
    background: #0c894b;
    color: #fff;
    font-size: 22px;
  }
  .register_btn {
    .btns();
    background: #fff;
    color: #0c894b;
    font-size: 19px;
  }
}
</style>