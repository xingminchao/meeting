<template>
  <div id="login">
    <div class="container">
      <div class="introduce">
        <el-image :src="require('@/assets/logo_1.png')"></el-image>
        <span class="text">2021跨 境 电 商 前 沿 专 题 线 上 论 坛</span>
        <div class="theme">
          <p>主办单位</p>
          <p>中国跨境电商50人论坛</p>
          <p>中国服务贸易协会</p>
          <p>全球(郑州)跨境电商研究院</p>
        </div>
      </div>
      <div class="form">
        <!-- 用户名登录 -->
        <!-- <div v-if="showLogin"> -->
        <div v-if="['login'].includes(type)">
          <p class="head register">用户名登录</p>
          <div class="content">
            <div class="input-box">
              <el-input
                type="text"
                v-model="userObj.name"
                @blur="checkForm('name')"
                @focus="userObj.showHint = false"
                placeholder="请输入用户名"
              ></el-input>
              <div class="line"></div>
              <div class="mes" v-show="userObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ userObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <el-input
                placeholder="请输入密码"
                v-model="passwordObj.recode"
                show-password
                @input="checkNumber($event, 2)"
                @blur="checkForm('email')"
                @focus="passwordObj.showHint = false"
                @keyup.enter.native="onSubmit"
              ></el-input>

              <div class="line"></div>
              <div class="mes" v-show="passwordObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ passwordObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <el-button class="login_btn" @click="login()">登录</el-button>
            <div class="footer">
              <span @click="forgotPassword">忘记密码</span>
              <span @click="register">立即注册</span>
            </div>
          </div>
        </div>
        <!-- 找回密码 -->
        <!-- <div v-if="showPassword"> -->
        <div v-if="['password'].includes(type)">
          <p class="head register">找回密码</p>
          <div class="content">
            <div class="input-box">
              <el-input
                type="text"
                v-model="mobileObj.mobile"
                @blur="checkForm('mobile')"
                @focus="mobileObj.showHint = false"
                placeholder="请输入手机号"
              ></el-input>
              <div class="line"></div>
              <div class="mes" v-show="mobileObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ mobileObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <div style="display: flex">
                <el-input
                  type="number"
                  placeholder="请输入验证码"
                  v-model="authObj.code"
                  @input="checkNumber($event, 3)"
                  @blur="checkForm('code')"
                  @focus="authObj.showHint = false"
                ></el-input>
                <el-button
                  class="code"
                  :loading="authObj.loading"
                  @click="getAuth"
                  >{{ authObj.msg }}</el-button
                >
              </div>
              <div class="line"></div>
              <div class="mes" v-show="authObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ authObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <el-input
                placeholder="请输入新密码"
                v-model="passwordObj.recode"
                show-password
                @input="checkNumber($event, 2)"
                @blur="checkForm('email')"
                @focus="passwordObj.showHint = false"
                @keyup.enter.native="onSubmit"
              ></el-input>

              <div class="line"></div>
              <div class="mes" v-show="passwordObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ passwordObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <el-button class="login_btn" @click="signIn">登录</el-button>
            <div class="footer right-fot">
              <span @click="goBack">返回账号登录</span>
            </div>
          </div>
        </div>
        <!-- 注册 -->
        <!-- <div v-if="showRegister"> -->
        <div v-if="['register'].includes(type)">
          <p class="head">欢迎注册</p>
          <div class="content" v-show="this.showFrom">
            <div class="input-box">
              <el-input
                type="text"
                v-model="userObj.name"
                @blur="checkForm('name')"
                @focus="userObj.showHint = false"
                placeholder="请输入用户名"
              ></el-input>
              <div class="line"></div>
              <div class="mes" v-show="userObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ userObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <el-input
                type="number"
                v-model="mobileObj.mobile"
                @input="checkNumber($event, 1)"
                @blur="checkForm('mobile')"
                @focus="mobileObj.showHint = false"
                placeholder="请输入手机号"
              ></el-input>
              <div class="line"></div>
              <div class="mes" v-show="mobileObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ mobileObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <el-input
                placeholder="请输入密码"
                v-model="passwordObj.recode"
                show-password
                @input="checkNumber($event, 2)"
                @blur="checkForm('email')"
                @focus="passwordObj.showHint = false"
              ></el-input>

              <div class="line"></div>
              <div class="mes" v-show="passwordObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ passwordObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <div style="display: flex">
                <el-input
                  type="number"
                  placeholder="请输入验证码"
                  v-model="authObj.code"
                  @input="checkNumber($event, 3)"
                  @blur="checkForm('code')"
                  @focus="authObj.showHint = false"
                ></el-input>
                <el-button
                  class="code"
                  @click="getAuth"
                  :loading="authObj.loading"
                  >{{ authObj.msg }}</el-button
                >
              </div>
              <div class="line"></div>
              <div class="mes" v-show="authObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ authObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <el-input
                placeholder="公司名称"
                v-model="firmObj.frimName"
                @input="checkNumber($event, 4)"
                @blur="checkForm('frimName')"
                @focus="firmObj.showHint = false"
              ></el-input>
              <div class="line"></div>
              <div class="mes" v-show="firmObj.showHint">
                <transition name="el-fade-in-linear">
                  <p class="hint">
                    {{ firmObj.hint }}
                  </p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <el-input
                placeholder="职位"
                v-model="position"
                @input="checkNumber($event, 5)"
              ></el-input>
              <div class="line"></div>
            </div>
            <el-button class="login_btn register_btn" @click="confirm()"
              >确认</el-button
            >
            <div class="footer right-bottom">
              <span @click="goBack">返回账号登录</span>
            </div>
          </div>
          <register v-show="this.showFroms" @showChange="changeaaa"></register>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import register from "./Register";

const resMobile = /^1[3|4|5|7|8][0-9]\d{8}$/; //手机号验证
// const resEmail = /^[a-zA-Z0-9]{8}$/; //密码验证
const resEmail = /^\d{6,8}$/; //密码验证

export default {
  components: {
    register,
  },
  data() {
    return {
      // 用户名
      userObj: {
        name: "",
        hint: "",
        showHint: false,
      },
      // 电话
      mobileObj: {
        mobile: "",
        hint: "",
        showHint: false,
      },
      //定义密码
      passwordObj: {
        recode: "",
        hint: "",
        showHint: false,
      },
      // 验证码
      authObj: {
        code: "",
        hint: "",
        showHint: false,
        loading: false,
        msg: "获取验证码",
      },
      //公司名称
      firmObj: {
        frimName: "",
        hint: "",
        showHint: false,
      },
      position: "", //职位
      showLogin: true, //显示登录form
      showPassword: false, //显示找回密码form
      showRegister: false, //显示注册form
      showFrom: true,
      showFroms: false,
      type: "",
    };
  },
  watch: {
    mobile: function (a) {
      console.log(a);
    },
    type: {
      immediate: true,
      handler: function (e) {
        this.type = this.$route.query.type;
        console.log(this.type, "htrduyhtyjfy");
      },
    },
  },
  updated() {
    this.handelType();
    console.log(this.type, "路由的值");
  },
  methods: {
    handelType() {
      !["login", "register", "password"].includes(this.type) &&
        this.replaceRouter(this.$route, { type: "login" });
      // console.log(this.$route, "gewrtgsdtr", this.type);
    },

    checkNumber(e, type) {
      console.log(type, "传入的类型");
      if (type == 1 && e.length > 11) {
        this.mobileObj.mobile = e.slice(0, 11);
      }
      if (type == 2 && e.length > 8) {
        this.passwordObj.recode = e.slice(0, 8);
      }
    },
    //表单验证
    checkForm(type) {
      console.log(type, "失去焦点传入的类型", ["all", "name"].includes(type));
      if (["all", "name"].includes(type) && this.userObj.name == "") {
        this.userObj.hint = "请输入用户名";
        this.userObj.showHint = true;
        return false;
      }
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
        this.passwordObj.hint = "6-8位数字组成";
        this.passwordObj.showHint = true;
        return false;
      }
      if (["all", "code"].includes(type) && this.authObj.code == "") {
        this.authObj.hint = "请输入验证码";
        this.authObj.showHint = true;
        return false;
      }
      if (["all", "frimName"].includes(type) && this.firmObj.frimName == "") {
        this.firmObj.hint = "请输入公司名称";
        this.firmObj.showHint = true;
        return false;
      }
    },
    // 登录
    async login() {
      if (
        !resMobile.test(this.mobileObj.mobile) &&
        !resEmail.test(this.passwordObj.recode)
      ) {
        this.$message.error("请输入正确信息");
      } else {
        let { data: res } = await this.$api.user.login({
          username: this.userObj.name,
          password: this.passwordObj.recode,
        });
        console.log(res, "登录成功返回数据");
        if (res.code == 0) {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          // this.$store.commit("setInfo", res.data);
          this.$router.push({
            path: "/menu/index",
          });
        } else {
          this.$message.error("用户名或密码错误");
        }
      }
    },

    // 找回密码
    async signIn() {
      if (
        !resMobile.test(this.mobileObj.mobile) &&
        !resEmail.test(this.passwordObj.recode)
      ) {
        this.$message.error("请输入正确信息");
      } else {
        let { data: res } = await this.$api.user.changePassword({
          phone: this.mobileObj.mobile,
          code: this.authObj.code,
          password: this.passwordObj.recode,
        });
        console.log(res, "登录成功返回数据");
        if (res.code == 0) {
          sessionStorage.setItem("username", JSON.stringify(res.data.username));
          this.$router.push({
            path: "/menu/index",
          });
        } else {
          this.$message.error(res.message);
        }
      }
    },

    // 注册
    async confirm() {
      if (
        !resMobile.test(this.mobileObj.mobile) &&
        !resEmail.test(this.passwordObj.recode) &&
        this.userObj.name == "" &&
        this.authObj.code == "" &&
        this.firmObj.frimName == "" &&
        this.position == ""
      ) {
        console.log("有错");
        this.$message.error("请输入正确信息");
      } else {
        console.log("成功");
        // console.log("vsrthgfdht", this.mobileObj.mobile);
        // sessionStorage.setItem("phone", JSON.stringify(this.mobileObj.mobile));
        // this.$router.push({
        //   path: "/menu/index",
        // });
        let { data: res } = await this.$api.user.register({
          username: this.userObj.name,
          phone: this.mobileObj.mobile,
          password: this.passwordObj.recode,
          code: this.authObj.code,
          office: this.position,
          company: this.firmObj.frimName,
        });
        console.log(res, "注册成功返回");
        if (res.code == 0) {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$router.push({
            path: "/menu/index",
          });
        } else {
          this.$message.error(res.message);
        }
      }
    },

    // 获取验证码
    async getAuth() {
      // console.log(this.mobileObj.mobile, "获取到的电话");
      this.authObj.loading = true;
      let { data: res } = await this.$api.user.getAuthCode({
        phone: this.mobileObj.mobile,
      });
      // console.log(res, "请求会来的数据");
      if (res.code == 0) {
        let time = 60;
        this.authObj.msg = `${time}秒`;
        let t = setInterval(() => {
          time--;
          this.authObj.msg = `${time}秒`;
          if (time == 0) {
            clearInterval(t);
            this.authObj.msg = "重新获取";
            this.authObj.loading = false;
          }
        }, 1000);
      } else {
        this.authObj.loading = false;
        this.$message.error(res.message);
      }
    },

    // 切换显示
    forgotPassword() {
      this.type = "password";
      this.replaceRouter(this.$route, { type: "password" });
      console.log(this.type, "忘记密码显示");
    },
    register() {
      this.type = "register";
      this.replaceRouter(this.$route, { type: "register" });
      console.log(this.type, "注册显示");
    },
    goBack() {
      this.type = "login";
      this.replaceRouter(this.$route, { type: "login" });
    },

    // 登录回车事件 @keyup.enter.navtive
    onSubmit() {
      this.login();
    },
  },
  created() {
    this.handelType();
  },
};
</script>

<style lang="less" scoped>
@font_family:pingfang SC;
.btns {
  width: 100%;
  width: 416px;
  height: 56px;
  border-radius: 5px;
  border: none;
}
.el-button + .el-button {
  margin-left: 0;
}
#login {
  width: 100vw;
  height: 100vh;
  // height: 100vh;
  .container {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(~@/assets/bg.png);
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10%;
    justify-content: space-between;
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-size: 1440px 900px;
    background-size: 100% 100%;
    .introduce {
      text-align: justify;
      .text {
        display: block;
        width: 490px;
        font-size: 55px;
        margin-top: 15px;
        color: #00a1ff;
        font-weight: 500;
        font-family: @font_family;
      }
      .theme {
        font-size: 25px;
        color: #fff;
        padding-top: 110px;
      }
    }
    .form {
      width: 508px;
      height: 569px;
      background-color: #fff;
      border-radius: 20px;
      .head,
      .register {
        padding-top: 37px;
        padding-bottom: 25px;
        text-align: center;
        font-size: 22px;
      }
      .register {
        padding-bottom: 80px;
      }
      .content {
        padding-left: 53px;
        padding-right: 39px;
        .input-box {
          height: 60px;
          // display: flex;
          // flex-direction: column-reverse; /* 按照列(反方向)排列*/
          // align-items: flex-end;
          .code {
            width: 150px;
            height: 28px;
            padding: 0;
            font-size: 12px;
            color: #3673bf;
          }
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
        .login_btn,
        .register_btn {
          .btns();
          background: #3673bf;
          color: #fff;
          font-size: 22px;
          margin-top: 60px;
        }
        .register_btn {
          margin-top: 15px;
        }
      }
      .footer,
      .right-fot {
        padding-top: 60px;
        font-size: 18px;
        color: #3673bf;
        display: flex;
        justify-content: space-between;
      }
      .right-fot {
        // display: flex;
        justify-content: flex-end;
      }
      .right-bottom {
        padding-top: 15px;
        justify-content: flex-end;
      }
    }
  }
}
</style>
<style lang="less">
.el-input__inner {
  border: none;
  height: 40px;
  font-size: 18px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
p {
  margin: 0;
}
</style>