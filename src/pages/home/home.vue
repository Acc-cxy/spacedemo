<template>
  <el-main>
      <el-row  type="flex" justify="center" >
        <el-col :span="15">
            <spacelist
                v-for="item in bloglist"
                :key="item.id"
                :bloglist="item"
            ></spacelist>
        </el-col>
      </el-row>
  </el-main>
</template>

<script>
import spacelist from "@/pages/home/children/spacelist.vue";
// import {getbloglist} from "@/network/home";
import {format} from "@/components/common";

export default {
  name: "home",
  data(){
    return{
      bloglist:[]
    }
  },
  components:{
    spacelist
  },
  created() {
    this.getbloglist()
  },
  methods:{
    // first
    //  getbloglist(){
    //    getbloglist().then(async res=>{
    //     this.bloglist = res.data;
    //     await this.bloglist.forEach(function (item) {
    //       item.createtime = format(item.createtime)
    //     })
    //   })
    // }
    // two
    async getbloglist(){
      this.bloglist = await this.$api.getlist()
      this.bloglist = this.bloglist.data
      await this.bloglist.forEach(function (item) {
        item.createtime = format(item.createtime)
      })
    }

  }
}
</script>

<style scoped>

</style>
