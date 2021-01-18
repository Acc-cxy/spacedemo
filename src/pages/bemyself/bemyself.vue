<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
          <div class="myself">
            <img :src="'http://space.linqinggan.top' + this.myicon"  alt="#">
            <h2>{{this.myname}}</h2>
            <p></p>
            <input type="file" ref="avatar" @change="checkFile"></input>
            <el-button type="primary" @click="goavatar()" class="update">更换头像</el-button>
          </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "bemyself",
  data(){
    return{
      myicon:'',
      myname:''
    }
  },
  created() {
    this.bemyself()
  },
  computed:{
    ...mapGetters(["getlogininfo"])
  },
  methods:{
    async bemyself(){
      const my = sessionStorage.user;
      if(!my){
        await this.islogin();
        return false;
      }
      const myarr = await my.split(",");
      this.myname = myarr[0];
      this.myicon = myarr[1];
      console.log(myarr)
    },
    async goavatar(){
      if(!this.getlogininfo[0]){
       await this.islogin();
        return false;
      }
      this.$refs.avatar.dispatchEvent(new MouseEvent('click'));
    },
    async checkFile(){
      const myphoto = await this.$refs.avatar.files[0];
      const title = this.getlogininfo[0].id;
      let oMYform = new FormData();
      await oMYform.append("name",title);
      await oMYform.append("userfile",myphoto);
      const res =await this.$api.avatar(oMYform);
      if(res.errCode){
        this.$message.success(`上传头像成功`)
      }
    },
    islogin(){
      this.$notify({
        title: '登入过期',
        message: '请重新登入',
        type: 'warning'
      });
    }
  }
}
</script>

<style scoped>
  .myself{
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    padding: 20px;
  }
  .myself img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    float: left;
    margin-right: 20px;
  }
  .myself h2{
    display: inline-block;
    float: left;
  }
  .myself input{
    display: none;
  }
  .myself .update{
    float: right;
    margin-top: 20px;
  }
</style>
