<template>
  <div id="menu-index">
    <div class="title">
      <div class="img">
        <el-image :src="require('@/assets/logo_2.png')"></el-image>
      </div>
      <div class="theme">
        <p>{{ info.conferenceName }}</p>
        <P>{{ info.introduce }}</P>
        <P>{{ info.timeLimit }}</P>
      </div>
    </div>
    <div class="content">
      <div class="data-time">第一天：{{ info.startingDate }}</div>
      <div
        class="data-time-one"
        v-for="(item, index) in meetingList"
        :key="index"
      >
        <div class="left">
          <p>{{ item.startingTime }}</p>
          <el-button @click="joinChange()">现在加入</el-button>
        </div>
        <div class="right">
          <span>{{ item.title }}</span>
          <span
            >{{ item.content }}{{ item.content }}{{ item.content
            }}{{ item.content }}</span
          >
          <span>{{ item.speaker }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      meetingList: [],
    };
  },
  methods: {
    joinChange() {
      let that = this;
      console.log(this.$router, "打印路由", this, "grtgdrthgr", that);
      that.$router.push("stage");
    },
    async getAgenda() {
      let { data: res } = await this.$api.user.getAgenda({
        meetingId: 1,
      });
      console.log(res, "获取到的议程");
      this.info = res.data.info;
      this.meetingList = res.data.list;
    },
  },
  created() {
    this.getAgenda();
  },
  // destroyed() {
  //   console.log("销毁");
  // },
};
</script>

<style lang="less" scoped>
.data-times {
  font-size: 20px;
  // padding: 19px 50px;
  margin-bottom: 30px;
  border-radius: 5px;
  text-align: justify;
  display: flex;
  color: #fff;
  background: #3673bf;
}
#menu-index {
  // background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
  //   url(~@/assets/con_bg.png);
  height: 100vh;
  .title {
    height: 169px;
    background: #fff;
    display: flex;
    align-items: center;
    .img {
      margin-left: 120px;
      .el-image {
        width: 330px;
        height: 90px;
      }
    }
    .theme {
      p {
        font-size: 24px;
        padding-left: 30px;
        margin: 0;
        color: #16519c;
        text-align: justify;
        font-family: PingFang SC;
        &:nth-child(2) {
          color: rgba(0, 0, 0, 0.5);
          font-size: 16px;
          padding: 0 0 31px 30px;
        }
        &:nth-child(3) {
          color: #000;
          font-weight: 600;
          font-size: 20px;
        }
      }
    }
  }
  .content {
    padding: 66px 131px;
    .data-time {
      font-size: 20px;
      padding: 19px 50px;
      margin-bottom: 30px;
      border-radius: 5px;
      text-align: justify;
      color: #fff;
      background: #3673bf;
    }
    .data-time-one {
      .data-times();
      .left {
        width: 312px;
        height: 116px;
        padding: 16px 0;
        text-align: center;
        p {
          margin: 0;
          padding: 16px;
        }
        .el-button {
          width: 128px;
          height: 34px;
          border-radius: 17px;
          color: #5ab5ab;
          font-weight: 700;
          border: none;
          padding: 0;
          background: #fff;
        }
      }
      .right {
        width: 100%;
        border-radius: 0 5px 5px 0;
        background: #fff;
        color: #000;
        text-align: center;
        span {
          font-size: 16px;
          margin: 0 auto;
          text-align: justify;
          padding: 25px 50px 0 50px;
          display: block;
          &:nth-child(2) {
            padding-top: 20px;
          }
          &:nth-child(3) {
            padding: 20px 50px;
            text-align: end;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>