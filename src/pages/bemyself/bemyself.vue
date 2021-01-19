<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
          <div class="myself">
            <img :src="'http://space.linqinggan.top' + this.myicon"  alt="#">
            <div class="auto">
              <h2>{{this.myname}}</h2>
              <br/>
              <p>{{this.autograph}}</p>
            </div>
            <input type="file" ref="avatar" @change="checkFile"></input>
            <el-button class="update" type="primary" @click="goavatar()">更换头像</el-button>
            <el-button class="update" @click="editinfo()">编辑资料</el-button>
            <el-dialog
                title="编辑资料"
                :visible.sync="dialogVisible"
                width="36%"
                :before-close="handleClose">
              <el-form>
<!--                <el-form-item :model="edit" label="用户名">-->
<!--                  <el-input v-model="edit.user" placeholder="s"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="个性签名">
                  <el-input v-model="edit.graph" placeholder="Halo！"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editbtn()">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <h1>
            我的博客
          </h1>
          <spacelist
            v-for="item in bloglist"
            :key="item.id"
            :bloglist="item"
          >
          </spacelist>
          <el-backtop :visibility-height="30"></el-backtop>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import {mapGetters} from "vuex"
import Spacelist from "@/components/common/spacelist";
import {format} from "@/components/common";
import {backtops} from "@/components/common/mixin";

export default {
  name: "bemyself",
  data(){
    return{
      myicon:'',
      myname:'',
      bloglist:[],
      autograph:'',
      dialogVisible: false,
      edit:{
        user:'',
        graph:''
      },
      myid:''
    }
  },
  components:{
    Spacelist
  },
  mixin:[backtops],
  created() {
    this.bemyself();
    this.mylist(this.$route.query.id)
  },
  computed:{
    ...mapGetters(["getlogininfo"])
  },
  methods:{
    async editinfo(){
      if(!this.getlogininfo[0]){
        await this.islogin();
        return false;
      }
      this.dialogVisible = true;
    },
    async editbtn(){
      let datas = {autograph:this.edit.graph}
      const res = await this.$api.edit(this.myid,datas)
      if(res.data == true){
        this.autograph = await datas.autograph;
        this.dialogVisible = false;
      }
    },
    async bemyself(){
      const my = sessionStorage.user;
      if(!my){
        await this.islogin();
        return false;
      }
      const myarr = await my.split(",");
      this.myname = myarr[0];
      this.myicon = myarr[1];
      this.myid = myarr[2];
      this.autograph = myarr[3];
      this.edit.user = this.myname;
      this.edit.graph = this.autograph;
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
      const title = this.myid;
      let oMYform = new FormData();
      await oMYform.append("name",title);
      await oMYform.append("userfile",myphoto);
      const res =await this.$api.avatar(oMYform);
      if(res.errCode){
        this.$message.success(`上传头像成功`)
        this.$bus.$emit("age")
      }
    },
    islogin(){
      this.$notify({
        title: '登入过期',
        message: '请重新登入',
        type: 'warning'
      });
    },
    async mylist(author){
      const res = (await this.$api.getlist(author)).data;
      this.bloglist = res;
      await this.bloglist.forEach(function (item) {
        item.createtime = format(item.createtime)
      })
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      done();
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
    margin-bottom: 20px;
  }
  .myself>img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    float: left;
    margin-right: 20px;
  }
  .el-form img.icon{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    float: left;
    margin-right: 20px;
  }
  .el-form .el-button{
      float: right;
    margin-top: 15px;
    margin-left: 15px;
  }
  .el-divider{
    margin: 50px 0 20px;
    float: left;
  }
  .myself .auto{
    width: 200px;
    float: left;
  }
  .myself h2{
    margin-right: 20px;
  }
  .myself input{
    display: none;
  }
  .myself .update{
    float: right;
    margin-top: 10px;
  }
</style>
