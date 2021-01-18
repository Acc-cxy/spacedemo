<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
        <div>
          <input type="file" id="img-upload" ref="upload">
          <input type="text" id="id-upload" v-model="title">
          <button id="submit-button" @click="upload()">开始上传</button>
          <h1 style="border-bottom: 1px solid #ccc; padding-bottom: 10px;">创建QQ空间</h1>
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
      title:''
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
        this.$message.success(`上传成功`)
      }
    }
  }
}
</script>

<style scoped>

</style>
