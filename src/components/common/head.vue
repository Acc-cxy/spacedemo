<template>
      <el-header >
        <el-row  type="flex" justify="center" >
          <el-col :span="15">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="home">社区</el-menu-item>
              <el-menu-item index="diary">日记</el-menu-item>
              <el-menu-item index="bemyself">我的</el-menu-item>
              <el-menu-item index="space">发表</el-menu-item>
              <el-menu-item index="login">登录</el-menu-item>
            </el-menu>
            <div class="islogin" @click="loginbtn()">
              <img v-bind:src="islogo">
              <span>{{islogin}}</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
</template>
<script>
import icon from "@/assets/img/bemyself.jpg"
export default {
  name: "HeadNav",
  data() {
    return {
      activeIndex: 'home',
      islogo:icon,
      islogin:'未登入',
      isoks:false
    };
  },
  created() {
    this.isok()
  },
  mounted() {
    this.$bus.$on("ams",()=>{
      this.isok()
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.replace(key)
    },
    loginbtn(){
      if(!this.isoks){
        console.log(1)
        if(this.$route.path !== '/login'){
          this.$router.replace('/login')
        }
      }
    },
    isok(){
      let isok = sessionStorage.user
      if(isok){
        this.islogin = isok;
        this.isoks = true
      }
    }
  }
}
</script>

<style scoped>
.el-header{
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: 0;
}
.el-col{
  position: relative;
}
.el-menu-demo{
  width: 80%;
  border: 0 !important;
  display: inline-block;
}
.islogin{
  position: absolute;
  right: 0;
  top: 0;
}
.islogin img{
  width: 35px;
  height: 35px;
  overflow: hidden;
  border-radius: 50%;
  margin-top: 11px;
  float: left;
}
.islogin span{
  line-height: 60px;
}
</style>
