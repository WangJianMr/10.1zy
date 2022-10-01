<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <asid />
      </el-aside>
      <el-container>
        <el-header>
            <had />
        </el-header>
        <el-main>
            <min />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    asid: () => import("./asid"),
    min: () => import("./min"),
    had: () => import("./had"),
  },
};
</script>

<style lang="scss" scoped>
.el-container,
.home {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  padding: 0;
      border-bottom: 1px solid #000;
}

.el-aside {
  background-color: #304155;
  color: #333;
  padding: 0;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}
</style>
