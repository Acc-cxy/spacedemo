<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
        <div v-for="item in daylist" :key="item.id" class="item">
            <h2>{{item.title}}</h2>
            <span class="author">{{item.author}}</span>
            <span>{{item.createtime}}</span>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import {getdaylist} from "@/network/home"
export default {
  name: "diary",
  data(){
    return{
      daylist:''
    }
  },
  created() {
    this.getdaylist()
  },
  methods:{
    getdaylist(){
      getdaylist().then(res=>{
        this.daylist = res.data
      })
    }
  }
}
</script>

<style scoped>
  .item{
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    display: inline-block;
  }
  .item h2{
    margin-bottom: 8px;
  }
  .item .author{
    font-size: 14px;
    color: #999;
    margin-right: 6px;
  }
</style>
