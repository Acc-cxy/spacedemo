<template>
  <div id="app">
    <el-container>
      <head-nav></head-nav>
      <router-view></router-view>
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
    flex-wrap: wrap;
  }
</style>
