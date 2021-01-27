<template>
  <el-main>
      <el-row  type="flex" justify="center" >
        <el-col :span="15">
            <spacelist
                v-for="item in bloglist"
                :key="item.id"
                :bloglist="item"
                :dataindex="item.id"
                @click.native="rko"
            ></spacelist>
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :total="this.length">
            </el-pagination>
        </el-col>
        <el-col :span="2">
          <el-badge value="new" class="item" v-if="newicon">
            <el-button  size="small" @click="newreload()">新动态</el-button>
          </el-badge>
          <el-progress :percentage="50"></el-progress>
        </el-col>
      </el-row>
  </el-main>
</template>

<script>
import spacelist from "@/components/common/spacelist.vue";
// import {getbloglist} from "@/network/home";
import {format} from "@/components/common";

export default {
  name: "home",
  data(){
    return{
      bloglist:[],
      value:"halo",
      currentPage:0,
      length:0,
      newicon:false
    }
  },
  inject: ['reload'],
  components:{
    spacelist
  },
  created() {
    this.getspacelist(1)
    this.getpage()
  },
  mounted() {
    this.$bus.$on("ams",()=>{
      this.newicon = true
    })
  },
  methods:{
    async newreload(){
      // location.reload();
      // this.$router.go(0);
      // this.reload()
      if(this.newicon != null){
        this.getspacelist(1)
        this.newicon = false
      }
    },
    async getpage(){
      this.length = (await this.$api.getlistlength()).data[0]["COUNT(id)"];
      this.length = this.length * 2;
    },
    handleCurrentChange(val){
      this.getspacelist(val)
    },
    handleSizeChange(val){
      this.getspacelist(val)
    },
    async getspacelist(val){
      const id = await (val-1) * 5;
      this.bloglist = (await this.$api.getlimit(id)).data;
      // await this.bloglist.forEach(function (item) {
      //   item.createtime = format(item.createtime)
      // })
    },
    rko(e){
      // console.log(e.target.getAttribute("key"))
    }
  }
}
</script>

<style scoped>
  .el-badge{
    padding-left: 20px;
    margin-bottom: 20px;
  }
</style>
