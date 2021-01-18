<template>
  <el-main>
    <el-row type="flex" justify="center">
      <!-- gutter 栅格间距 -->
      <el-col :span="10" >
        <!-- span 栅格占的列数，offset是偏移列数 -->
        <el-card shadow="always" >
          <h1>登录页面</h1>
          <el-divider></el-divider>
          <el-form  ref="ValidateForm" :model="ValidateForm" label-width="100px" class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item
                label="用户名"
                prop="user"
                :rules="[{ required: true, messname: '请输入用户名'},]"
            >
              <el-input placeholder="用户名" type="text" v-model="ValidateForm.user" @input="isuser()" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item
                label="密码"
                prop="password"
                :rules="[{ required: true, message: '密码不能为空'},]"
            >
              <el-input placeholder="请输入密码" v-model="ValidateForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ValidateForm')">登录</el-button>
              <el-button >注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import {isLogins} from "@/network/home";
import {mapGetters} from 'vuex'
import {debounce,throttle} from "@/components/common/specail";

export default {
  name: "login",
  data(){
    return{
      ValidateForm:{
        user:'user',
        password:'787878'
      }
    }
  },
  computed:{
    ...mapGetters(["getlogininfo"]),
  },
  created() {
  },
  mounted() {
  },
  methods:{
    isuser:debounce(function (){
      if(this.ValidateForm.user.length<3){
        console.log(val)
        this.$notify({title:'警告',message:'用户名格式错误',type:'warning'});
      }
    },1000),
    async submitForm(formName){
      let that = this ;
      this.$refs[formName].validate((valid)=>{
        if (!window.localStorage) {
          alert(不支持浏览器)
        }else {
          let datas = {username:this.ValidateForm.user,password: this.ValidateForm.password}
          this.isLogin(datas)
        }
      })
    },
    async isLogin(datas){
      const res = await this.$api.islogin(datas)
      console.log(res)
      if(res.errno == 0){
        this.$store.commit('changlog',[res.data]);
        this.$notify({title:'成功',message:'登入成功',type:'success'});
        sessionStorage.setItem("user", [res.data.username,res.data.avatar,res.data.id]);//储存数据
        this.$bus.$emit("ams");
        if (this.$route.query.redirect) { // 判断路由是否带参，带参则去到重定向参数地址，否则就去首页
          this.$router.replace({ path: this.$route.query.redirect}); // 跟main.js相对应，跳转到没有token的那个页面
        } else {
          this.$router.replace({ path:'/home'}); // 防止返回上一层页面
        }
      }else {
        this.$notify.error({title:'错误',message:'登入失败'});
      }
    }
  },
  watch:{

  }
}
</script>

<style scoped>
.grid-content h1{
  line-height: 80px;
  text-align: center;
}
</style>
