<template>
      <el-header >
        <el-row  type="flex" justify="center" >
          <el-col :span="15">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item v-for="item in menuList" :key="item.index" :index="item.index">{{item.name}}</el-menu-item>
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
      activeIndex: '1',
      islogo:icon,
      islogin:'未登入',
      isoks:false,
      menuList:[{
        name:"社区",
        index:"1",
        path:"home"
      },{
        name:"日记",
        index:"2",
        path:"diary"
      },{
        name:"我的",
        index:"3",
        path:"bemyself"
      },{
        name:"发表",
        index:"4",
        path:"space"
      }]
    };
  },
  created() {
    this.isok()
    let currentIndex=localStorage.getItem('currentIndex')
    console.log(currentIndex);
    if(currentIndex){
      this.activeIndex=currentIndex;
    }
  },
  mounted() {
    this.$bus.$on("ams",()=>{
      this.isok()
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      localStorage.setItem('currentIndex',key);
      let path=this.menuList[key-1].path;
      this.$router.replace(path);
    },
    loginbtn(){
      if(!this.isoks){
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
