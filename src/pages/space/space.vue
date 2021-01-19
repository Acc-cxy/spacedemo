<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
        <div>
          <el-form>
            <el-form-item label="文案">
              <el-input v-model="title" placeholder="..."></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="choose()">选择图片</el-button>
          <span>{{this.icon}}</span>
          <input type="file" id="img-upload" ref="upload" @change="checkFile" style="display: none">
          <el-button type="success" @click="upload()" class="allbtn">发表动态</el-button>
        </div>
      </el-col>
    </el-row>
  </el-main>

</template>

<script>
import {mapGetters} from 'vuex'
import {throttle} from "@/components/common/specail";

export default {
  name: "space",
  data(){
    return{
      title:'',
      icon:''
    }
  },
  computed:{
    ...mapGetters(["getlogininfo"])
  },
  mounted() {
  },
  methods:{
    upload:throttle("addupload",10000),
    async addupload(){
      const myphoto = await this.$refs.upload.files[0];
      const title = await this.title;
      if(myphoto == '' || title == ''){
          this.$message.warning(`图片或文案为空`)
      }
      let isok = sessionStorage.user;
      const isokarr = isok.split(",");
      // const author = await this.getlogininfo[0].username;
      // const icon = await this.getlogininfo[0].avatar;
      var oMyForm = new FormData();
      await oMyForm.append("name", title);
      await oMyForm.append("userfile", myphoto);
      await oMyForm.append("author",isokarr[0]);
      await oMyForm.append("icon",isokarr[1])
      const res = await this.$api.upload(oMyForm)
      if(res.errCode == 1){
        this.$bus.$emit("ams")
        this.$message.success(`上传成功`)
      }
    },
    choose(){
      this.$refs.upload.dispatchEvent(new MouseEvent('click'));
    },
    checkFile(){
      this.icon = this.$refs.upload.files[0].name
    }
  }
}
</script>

<style scoped>
  .el-main{
    background: #ffffff;
  }
  .allbtn{
    float: right;
  }
</style>
