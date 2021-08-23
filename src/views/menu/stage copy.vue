<template>
  <!-- 测试-->
  <div>
    <div class="title">
      <div class="img">
        <el-image :src="require('@/assets/logo_2.png')"></el-image>
      </div>
      <div class="theme">
        <p>2021年亚太地区领导人会议超所有限制</p>
        <P>超越所有限制：适应变换，恢复与成长</P>
        <P>2021年8月5日至10日</P>
      </div>
    </div>
    <div class="palette">
      <div class="content">
        <div class="left">
          <div class="top">
            <p>Aain的会议</p>
          </div>
          <div class="bottom">
            <el-button>直播中</el-button>
            <el-button>观看人数： 10人</el-button>
          </div>
          <div class="wrap">
            <div id="id_test_video" style="width: 100%; height: auto"></div>
            <!-- <video
              id="player-container-id"
              preload="auto"
              playsinline
              webkit-playsinline
            ></video> -->
          </div>
        </div>
        <div class="right">
          <!-- <div class="chat"> -->
          <!-- <div class="tags">
              <el-button>简介</el-button>
              <el-button>讨论</el-button>
            </div> -->
          <div style="height: 60px"></div>
          <div style="width: 100%; height: 88%">
            <iframe
              :src="str"
              style="
                width: 100%;
                height: 120%;
                border: 0;
                padding: 0;
                margin: 0;
              "
            ></iframe>
          </div>
          <!-- <div style="background: #fff; display: flex">
              <div style="width: 50%">
                <hr
                  color="#0c894b"
                  style="float: center; margin: 0 auto"
                  width="40%"
                />
              </div>
              <div style="width: 50%">
                <hr
                  color="#0c894b"
                  style="float: center; margin: 0 auto"
                  width="40%"
                />
              </div>
            </div>
            <div class="panel">
              <div class="textbox">
                <el-tages>加入了会议</el-tages>
              </div>
              <div class="bottom">
                <div style="padding: 10px">
                  <el-input class="a" placeholder="请输入你的意见"></el-input>
                </div>
                <el-button>发送</el-button>
              </div>
            </div>-->
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- <video
      id="player-container-id"
      preload="auto"
      playsinline
      webkit-playsinline
    ></video> -->
  </div>
</template>
 
<script>
import { TcPlayer } from "@/assets/js/TcPlayer-2.4.1.js";
export default {
  data() {
    return {
      // player: null,
      onswitch: false,
      activeName: "second", //tabs默认选中
      info: "",
      str: "",
      liveUrlFlv: "",
      liveUrlM3u8: "",
    };
  },

  methods: {
    playVideo() {
      let player = new TcPlayer("id_test_video", {
        m3u8: this.liveUrlM3u8,
        flv: this.liveUrlFlv,
        autoplay: true,
        width: document.body.clientWidth - `750`,
        height: document.body.clientHeight - `310`,
        // width: "100%",
        // height: "100%",
        wording: {
          2032: "请求视频失败，请检查网络",
          2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
        },
      });
      window.tcplayer = player;
    },
    getPhone() {
      this.info = JSON.parse(sessionStorage.getItem("userInfo"));
      let url = "https://jolokia.com/chatiframe.html?fullname=";
      this.str = url + this.info.username + "&chatroomid=11111";
      console.log(this.str, "ghrdghtrdg");
    },
    async getUrl() {
      let { data: res } = await this.$api.user.getUrl({
        meetingId: 1,
      });
      // console.log(res, "获取的url");
      this.liveUrlFlv = res.data.liveUrlFlv;
      this.liveUrlM3u8 = res.data.liveUrlM3u8;
      // this.playVideo();
      if (res.code == 0) {
        this.playVideo();
      } else {
        return;
      }
    },
  },
  mounted() {
    this.getPhone();
    this.getUrl();
  },
};
</script>
 
<style lang='less' scoped>
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
.palette {
  width: calc(100vw - 280px);
  background: #2f3031;
  .content {
    padding: 50px;
    display: flex;
    justify-content: space-between;
    .left {
      // width: 1000px;
      .top {
        p {
          padding: 0 0 13px 30px;
          margin: 0;
          text-align: justify;
          color: #fff;
        }
      }
      .bottom {
        text-align: justify;
        padding: 0 0 15px 20px;
        .el-button {
          height: 18px;
          background: #555555;
          border: none;
          padding: 0 10px;
          color: #2f3031;
          border-radius: 10px;
        }
      }
      .wrap {
        width: calc(100vw - 800px);
        min-width: 500px;
        height: calc(100vh - 310px);
      }
    }
    .right {
      .chat {
        width: 295px;
        margin-right: 50px;
        background: #212225;
        .tags {
          width: 100%;
          display: flex;
          .el-button {
            margin: 0;
            border: none;
            border-radius: 0;
            color: #fff;
            background: #212225;
            width: 50%;
          }
        }
        .panel {
          .textbox {
            // height: 0;
            // padding-bottom: 100%;
            height: calc(100vh - 500px);
          }
          .bottom {
            width: 100%;
            text-align: end;
            .el-button {
              margin-right: 10px;
              width: 40px;
              height: 20px;
              padding: 0;
              font-size: 10px;
              color: #555555;
              background: #8d8d8d;
              border: none;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
/* 通过 css 设置播放器尺寸 这时<video>中的宽高属性将被覆盖*/
#id_test_video {
  width: 100%;
  max-width: 100%;
  height: 0;
  // padding-top: 56.25%; /* 计算方式：播放器以16：9的比率显示，这里的值为 9/16 * 100 = 56.25  */
}
</style>
<style lang="less">
// .el-input {
//   .el-input__inner {
//     border: #212225;
//     color: #8d8d8d;
//     background-color: #555555;
//   }
// }
</style>
