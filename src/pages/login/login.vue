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
              <el-button @click="autopush()">一键注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import {mapGetters} from 'vuex'
import {debounce} from "@/components/common/specail";

export default {
  name: "login",
  data(){
    return{
      ValidateForm:{
        user:'',
        password:''
      }
    }
  },
  computed:{
    ...mapGetters(["getlogininfo"]),
  },
  created() {
  },
  mounted() {
    this.$bus.$on("age",()=>{
      this.submitForm('ValidateForm')
    })
  },
  methods:{
    isuser:debounce(function (a){
      //如果用户名小于三位数
      if(this.ValidateForm.user.length<3){
        this.$notify({title:'警告',message:'用户名格式错误',type:'warning'});
      }
    },1000),
    async submitForm(formName){
      this.$refs[formName].validate(()=>{
        if (!window.localStorage) {
          alert("不支持浏览器")
        }else {
          let datas = {username:this.ValidateForm.user,password: this.ValidateForm.password}
          this.isLogin(datas)
        }
      })
    },
    async isLogin(datas){
      const res = await this.$api.islogin(datas)
      if(res.errno == 0){
        await this.$store.commit('changlog',[res.data]);
        if(this.$route.path == '/login'){
          this.$notify({title:'成功',message:'登入成功',type:'success'});
        }
        sessionStorage.setItem("user", [res.data.username,res.data.avatar,res.data.id,res.data.autograph]);//储存数据
        this.$bus.$emit("amsok");
        if (this.$route.query.redirect) { // 判断路由是否带参，带参则去到重定向参数地址，否则就去首页
          if(this.$route.query.redirect == '/bemyself'){
            this.$router.replace({ path: this.$route.query.redirect + "?id=" +res.data.username});
            return false;
          }
          this.$router.replace({ path: this.$route.query.redirect}); // 跟main.js相对应，跳转到没有token的那个页面
        } else {
          if(this.$route.path == '/login'){
            this.$router.replace({ path:'/home'}); // 防止返回上一层页面
          }else {
            this.$bus.$emit("bemyselfage")
          }
        }
      }else {
        this.$notify.error({title:'错误',message:'登入失败'});
      }
    },
    autopush(){
      this.ValidateForm.user = 'user';
      this.ValidateForm.password = '787878'
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
