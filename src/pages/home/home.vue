<template>
  <el-main>
      <el-row  type="flex" justify="center" >
        <el-col :span="15">
            <spacelist
                v-for="item in bloglist"
                :key="item.id"
                :bloglist="item"
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
          <el-badge value="new" class="item" @click="this.new">
            <el-button size="small">新动态</el-button>
          </el-badge>
          <el-progress :percentage="50"></el-progress>
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
      bloglist:[],
      value:"halo",
      currentPage:0,
      length:0
    }
  },
  inject:['reload'],
  components:{
    spacelist
  },
  created() {
    this.getspacelist(1)
    this.getpage()
  },
  methods:{
    async getpage(){
      this.length = (await this.$api.getlistlength()).data[0]["COUNT(id)"];
      this.length = this.length*2;
    },
    handleCurrentChange(val){
      this.getspacelist(val)
    },
    handleSizeChange(val){
      this.getspacelist(val)
    },
    async getspacelist(val){
      const id = val * 5;
      this.bloglist = await this.$api.getlist(id);
      this.bloglist = this.bloglist.data;
      await this.bloglist.forEach(function (item) {
        item.createtime = format(item.createtime)
      })
    },
    new(){
      this.reload()
    }
  }
}
</script>

<style scoped>
  .el-progress{
    margin-top: 30px;
  }
</style>
