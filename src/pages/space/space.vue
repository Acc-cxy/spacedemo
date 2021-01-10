<template>
  <div>
    <input type="file" id="img-upload" ref="upload">
    <input type="text" id="id-upload" v-model="title">
    <button id="submit-button" @click="upload()">开始上传</button>
    <h1 style="border-bottom: 1px solid #ccc; padding-bottom: 10px;">创建QQ空间</h1>
  </div>
</template>

<script>
export default {
  name: "space",
  data(){
    return{
      title:''
    }
  },
  methods:{
    async upload(){
      const myphoto = await this.$refs.upload.files[0];
      const title = this.title
      var oMyForm = new FormData();
      await oMyForm.append("name", title);
      await oMyForm.append("userfile", myphoto);
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