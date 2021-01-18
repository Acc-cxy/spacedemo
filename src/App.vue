<template>
  <div id="app">
    <el-container>
      <head-nav></head-nav>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </el-container>
  </div>
</template>

<script>
import HeadNav from "@/components/common/head";
import "@/assets/css/index.css";
export default {
  name: 'App',
  components:{
    HeadNav
  }
}
</script>


<style>
  .el-container{
    width: 100%;
    flex-wrap: wrap;
  }
</style>
