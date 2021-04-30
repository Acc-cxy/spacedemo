<template>
      <el-header >
        <el-row  type="flex" justify="center" >
          <el-col :span="15">
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
              <el-menu-item v-for="item in menuList" :key="item.index" :index="item.path">{{item.name}}</el-menu-item>
              <el-menu-item>
                <div class="islogin" @click="loginbtn()">
                  <el-avatar :size="36" :src="islogo" class="logo"></el-avatar>
                  <span>{{islogin}}</span>
                </div>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
</template>
<script>
import icon from "@/assets/img/bemyself.jpg"
import {GetUrlRelativePath} from "@/components/common/index";
import {mapGetters} from "vuex"
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
        path:"/home"
      },{
        name:"日记",
        index:"2",
        path:"/diary"
      },{
        name:"我的",
        index:"3",
        path:"/bemyself"
      },{
        name:"G6",
        index:"7",
        path:"/ANTVG6"
      },{
        name:"发表",
        index:"4",
        path:"/space"
      },{
        name: "新闻",
        index:"5",
        path: "/echarts"
      },{
        name:"登入",
        index:"6",
        path:"/login"
      }],
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  created() {
    this.isok();
  },
  computed:{
    ...mapGetters(["getlogininfo"])
  },
  mounted() {
    this.$bus.$on("amsok",()=>{
      this.isok()
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      if(this.getlogininfo && keyPath[0] == "/login"){
        this.$router.replace(key);
      }
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
        const isokarr = isok.split(",")
        this.islogin = isokarr[0];
        this.islogo = "http://space.linqinggan.top" + isokarr[1];
        this.isoks = true;
      }
    }
  },
  watch:{
    // getlogininfo:function (newval,oldval) {
    //   if(newval.username){
    //     this.islogin = newval.username
    //     this.islogo = "http://space.linqinggan.top" + newval.avatar
    //   }
    // }
  }
}
</script>

<style scoped>
.el-header{
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
}
.el-col{
  /*position: relative;*/
}
.el-menu-demo{
  width: 80%;
  border: 0 !important;
  display: inline-block;
}
.islogin{
  /*position: absolute;*/
  /*right: 0;*/
  /*top: 0;*/
  margin:0 30px;
}
.islogin .logo{
  overflow: hidden;
  border-radius: 50%;
  margin-top: 11px;
  float: left;
  margin-right: 5px;
  background: 0;
}
.islogin span{
  line-height: 60px;
}
</style>
