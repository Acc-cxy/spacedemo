<template>
  <div id="app">
    <el-container>
      <head-nav></head-nav>
      <transition>
      <keep-alive>
          <router-view v-if="isRouterAlive"></router-view>
      </keep-alive>
      </transition>
    </el-container>
  </div>
</template>

<script>
import HeadNav from "@/components/common/head";
import "@/assets/css/index.css";
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  components:{
    HeadNav
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>


<style>
  .el-container{
    width: 100%;
    flex-wrap: wrap;
  }
  #nprogress .bar {
    background: #29d !important;
  }
  [v-cloak] {
    display: none;
  }
</style>
