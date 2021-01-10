<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
          <input type="file" ref="avatar"></input>
          <button type="button" @click="goavatar()">上传头像</button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "bemyself",
  data(){
    return{

    }
  },
  methods:{
    async goavatar(){
      const myphoto = await this.$refs.avatar.files[0];
      const title = 7;
      let oMYform = new FormData();
      await oMYform.append("name",title);
      await oMYform.append("userfile",myphoto);
      const res =await this.$api.avatar(oMYform);
      if(res.errCode){
        this.$message.success(`上传头像成功`)
      }
    }
  }
}
</script>

<style scoped>

</style>
