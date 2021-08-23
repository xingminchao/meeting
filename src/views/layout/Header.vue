<template>
  <div id="header">
    <div class="select-name">
      <el-image :src="require('@/assets/logo_3.png')"></el-image>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#header {
  .select-name {
    width: 256px;
    height: 55px;

    // font-size: 20px;
    // color: #fff;
    // line-height: 67px;
    .el-image {
      width: 113px;
      height: 36px;
      margin-top: 10px;
      // margin: 0 auto;
      // display: table-cell;
      // vertical-align: middle;
    }
  }
}
</style>