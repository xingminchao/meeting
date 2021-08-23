<template>
  <div id="aside">
    <div class="information">
      <el-image :src="require('@/assets/photo.png')"></el-image>
      <p>{{ info.username }}</p>
      <el-button class="btn" @click="quit()">退出</el-button>
    </div>
    <ul class="menu">
      <li class="menu-li" v-for="(item, index) in menuAry" :key="index">
        <div
          :class="[
            'menu-title',
            { 'menu-active': item.activeNum == 1 },
            { 'menu-child-active': item.activeNum == 2 },
          ]"
          @click="goPath(item, index)"
        >
          <img
            v-show="[1, 2].includes(item.activeNum)"
            :src="item.iconActive"
          />
          <img
            v-show="![1, 2].includes(item.activeNum)"
            :src="item.iconDefault"
          />
          <span class="ml10">{{ item.name }}</span>
        </div>
        <el-collapse-transition>
          <ul
            class="menu-child"
            v-if="item.childs && item.childs.length > 0"
            v-show="item.showChild"
          >
            <li
              :class="{ active: obj.routeName == activeMenu }"
              v-for="(obj, i) in item.childs"
              :key="i"
              @click="goPath(obj)"
            >
              <span>{{ obj.name }}</span>
            </li>
          </ul>
        </el-collapse-transition>
        <i
          v-if="item.childs && item.childs.length > 0"
          :class="item.showChild ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import MenuObj from "@/assets/js/menu.js";
export default {
  data() {
    return {
      menuAry: [],
      modules: "",
      activeMenu: "",
      name: "",
      info: "",
    };
  },

  watch: {
    $route(val) {
      try {
        this.getmenu(val.name);
      } catch (error) {}
    },
    activeMenu: {
      immediate: true,
      handler: function (val) {
        // console.log(val, "监听的数据");
      },
      deep: true,
    },
    // this.handleMenu()
    modules: {
      immediate: true,
      handler: function (val) {
        // console.log(val, "监听的modules数据");
      },
      deep: true,
    },
  },

  methods: {
    getmenu(rtName) {
      const { meta, name } = this.$route;
      if (meta.activeMenu) {
        this.activeMenu = rtName;
        this.handleMenu();
      }
      this.name = name;
    },
    moduleName() {
      this.modules = this.$route.path.split("/")[1];
    },
    // 处理显示操作菜单
    handleMenu() {
      this.menuAry.forEach((item) => {
        // console.log(item, "gbrsthbjf", this.activeMenu);
        if (item.routeName == this.activeMenu) {
          item.activeNum = 1;
        } else {
          item.activeNum = 0;
        }
        if (item.childs && item.childs.length > 0) {
          item.childs.forEach((obj) => {
            let isBelong = item.childs.some((v) => {
              return v.routeName == this.activeMenu;
            });
            if (obj.routeName == this.activeMenu || isBelong) {
              // item.showChild = true // 暂时注释 关闭最多显示一组子模块
              item.activeNum = 2;
              obj.activeNum = 1;
            } else {
              // item.showChild = false // 暂时注释 关闭最多显示一组子模块
              item.activeNum = 0;
              obj.activeNum = 0;
            }
          });
        }
      });
    },
    goPath(item, index) {
      // console.log(item, "gbrthjfgyjkhuik", index);
      if (item.childs && item.childs.length > 0 && !item.routeName) {
        this.menuAry[index].showChild = !item.showChild;
      } else {
        this.$router.push({
          name: item.routeName,
        });
        this.getmenu(item.routeName);
      }
    },
    quit() {
      this.$router.replace({ name: "/Login" });
      sessionStorage.removeItem("userInfo");
    },
    getPhone() {
      this.info = JSON.parse(sessionStorage.getItem("userInfo"));
      // this.info = this.$store.state.userInfo;
      console.log(this.info, "phonephonephonephonephone");
    },
  },
  created() {
    const { meta, name } = this.$route;
    this.getmenu(name);
    this.moduleName();
    this.menuAry = MenuObj[this.modules] ? MenuObj[this.modules] : [];
    this.handleMenu();
  },
  mounted() {
    this.getPhone();
  },
};
</script>

<style lang="less" scoped>
#aside {
  .information {
    height: 169px;
    background: #f7f7f7;
    .el-image {
      margin-top: 29px;
      margin-bottom: 14px;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #707070;
    }
    .btn {
      margin-top: 22px;
      font-size: 14px;
      color: #4980c5;
      background: #f7f7f7;
      border: none;
    }
  }
  .menu {
    background: #f7f7f7;
    .menu-li {
      position: relative;
      margin-bottom: 8px;
      .menu-title {
        display: flex;
        align-items: center;
        height: 40px;
        padding-left: 12px;
        position: relative;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.5);
        opacity: 0.8;
        border-left: 2px solid transparent;
        img {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        // 鼠标移动显示
        &:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.3);
          color: #4980c5;
          transition: all 0.3s;
          .el-icon-arrow-down,
          .el-icon-arrow-up {
            color: #4383f4;
          }
        }
      }

      //默认选中的样式
      .menu-active {
        opacity: 1;
        background: rgba(0, 0, 0, 0.3);
        transition: all 0.3s;
        color: #4980c5;
        font-weight: 400;
        &::after {
          content: "";
          width: 4px;
          height: 14px;
          opacity: 1;
          background: #4980c5;
          border-radius: 2px;
          position: absolute;
          right: 8px;
        }
      }

      //没有选中的样式
      .menu-child-active {
        transition: all 0.3s;
        color: rgba(0, 0, 0, 0.5);
        border-left: 2px solid #fff;
      }

      .menu-child {
        li {
          display: flex;
          align-items: center;
          height: 40px;
          padding-left: 45px;
          cursor: pointer;
          color: #fff;
          opacity: 0.8;
          font-size: 13px;
          &:nth-child(1) {
            margin-top: 0;
          }
          img {
            width: 20px;
            height: 20px;
            margin-right: 8px;
          }
          &:hover {
            opacity: 1;
            background: #fff;
            color: #4383f4;
            transition: all 0.3s;
          }
        }

        .active {
          position: relative;
          opacity: 1;
          background: #fff;
          transition: all 0.3s;
          color: #4383f4;
          &::after {
            content: "";
            width: 4px;
            height: 14px;
            opacity: 1;
            background: #4383f4;
            border-radius: 2px;
            position: absolute;
            right: 8px;
          }
        }
      }

      .el-icon-arrow-down,
      .el-icon-arrow-up {
        position: absolute;
        right: 24px;
        top: 13px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>