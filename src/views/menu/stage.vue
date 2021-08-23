<template>
  <div>
    <div class="palette">
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="18"
            ><div class="grid-content bg-purple grid-left">
              <div class="top">
                <div>
                  <p>Aain的会议</p>
                  <p>
                    <el-button>直播中</el-button>
                    <el-button>观看人数： 10人</el-button>
                  </p>
                </div>
                <el-image :src="require('@/assets/logo_4.png')"></el-image>
              </div>
              <div class="wrap">
                <div id="id_test_video" style="width: 100%; height: auto"></div>
              </div></div
          ></el-col>
          <el-col :span="6">
            <!-- <div class="grid-content bg-purple"> -->
            <div style="width: 100%; height: 100%">
              <iframe
                :src="str"
                style="
                  width: 100%;
                  height: 700px;
                  border: 0;
                  padding: 0;
                  margin: 0;
                "
              ></iframe>
            </div>
            <!-- <div class="pigeonhole-iframe"></div> -->
            <!-- </div> -->
          </el-col>
        </el-row>
        <!-- <div class="left">
          <div class="top">
            <div>
              <p>Aain的会议</p>
              <p>
                <el-button>直播中</el-button>
                <el-button>观看人数： 10人</el-button>
              </p>
            </div>
            <el-image :src="require('@/assets/logo_4.png')"></el-image>
          </div>
          <div class="wrap">
            <div id="id_test_video" style="width: 100%; height: auto"></div>
          </div>
        </div> -->
        <!-- <div class="right">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
(function (p, i, g, e, o, n, s) {
  (p[o] =
    p[o] ||
    function () {
      (p[o].q = p[o].q || []).push(arguments);
    }),
    (n = i.createElement(g)),
    (s = i.getElementsByTagName(g)[0]);
  n.async = 1;
  n.src = e;
  s.parentNode.insertBefore(n, s);
})(
  window,
  document,
  "script",
  "https://static.pigeonhole.at/widget/pigeon-widget.js",
  "phl"
);
phl("create", {
  width: "320px",
  height: "568px",
  passcode: "LIBERTY",
  className: "pigeonhole-iframe",
  sessionId: 0, // 0 here indicates that the widget will load the agenda.
  current: true,
  disableBackButton: true,
});
</script>

 
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
        // width: document.body.clientWidth - `750`,
        // height: document.body.clientHeight - `310`,
        width: "100%",
        height: "100%",
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
.palette {
  // width: calc(100vw - 280px);
  background: #e9e9e9;
  // background: red;
  .content {
    // padding: 70px 12px;
    // display: flex;
    // justify-content: space-between;

    // .left {
    // width: 1000px;
    .top {
      background: #fff;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      p {
        // padding: 0 0 13px 30px;
        margin: 0;
        font-size: 15px;
        text-align: justify;
        &:nth-child(2) {
          padding-top: 7px;
          .el-button {
            height: 18px;
            background: #56a8e3;
            border: none;
            padding: 0 10px;
            color: #fff;
            border-radius: 10px;
          }
        }
      }
    }
    // .bottom {
    //   text-align: justify;
    //   padding: 0 0 15px 20px;
    // .el-button {
    //   height: 18px;
    //   background: #56a8e3;
    //   border: none;
    //   padding: 0 10px;
    //   color: #fff;
    //   border-radius: 10px;
    // }
    // }
    .wrap {
      // width: calc(100vw - 800px);
      min-width: 500px;
      // height: calc(100vh - 310px);
    }
  }
  .right {
    .chat {
      // width: 295px;
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
  // }
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
.el-row {
  // margin-bottom: 20px;
  padding: 15px 70px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 325px;
}
.grid-left {
  min-width: 800px;
}
.bg-purple {
  background: #d3dce6;
}
</style>
