<template>
  <div class="layout">
    <el-container style="height: 100vh">
      <el-header>
        <Header />
      </el-header>
      <!-- 侧边栏容器 -->
      <el-container>
        <el-aside width="256px">
          <Aside />
        </el-aside>
        <!-- 内容区域容器 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header";
import Aside from "./Aside";
export default {
  components: {
    Header,
    Aside,
  },
};
</script>

<style lang="less" scoped>
.el-main {
  padding: 16px 16px 28px 16px;
}
.el-container {
  overflow: auto;
}
.el-aside {
  background-color: #f7f7f7;
  // box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.04);
  padding: 0;
}
.el-main {
  padding: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url(~@/assets/con_bg.png);
  // background: #2f3031;
}
.el-header {
  height: 55px !important;
  background: #3673bf;
  padding: 0;
}
</style>