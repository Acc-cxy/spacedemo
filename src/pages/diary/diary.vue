<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
              v-for="(item,index) in daylist" :key="item.id"
              :title="item.title"
              :name="index"
              class="list-a">
            <p>{{item.content}}</p>
            <span>{{item.createtime}}</span>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import {getdaylist} from "@/network/home";
import {format} from "@/components/common";

export default {
  name: "diary",
  data(){
    return{
      daylist:'',
      times:[],
      activeNames: [1,2]
    }
  },
  created() {
    this.getdaylist()
  },
  computed: {

  },
  methods:{
    handleChange(val) {
      // console.log(val);
    },
    getdaylist(){
      getdaylist().then(async res =>{
        this.daylist = await res.data;
        await this.daylist.forEach(function (item){
          item.createtime = format(item.createtime)
        })
      })
    }
  }
}
</script>

<style scoped>
  .el-main{
    background: #ffffff;
  }
  /*.item{*/
  /*  width: 100%;*/
  /*  padding: 15px 0;*/
  /*  border-bottom: 1px solid #ccc;*/
  /*  display: inline-block;*/
  /*}*/
  /*.item h2{*/
  /*  margin-bottom: 8px;*/
  /*}*/
  /*.item .author{*/
  /*  font-size: 14px;*/
  /*  color: #999;*/
  /*  margin-right: 6px;*/
  /*}*/
  .el-collapse-item__header{
    font-size: 18px!important;
  }
  .list-a p,
  .list-a span{
    padding-left: 20px;
  }
  .list-a .el-collapse-item__header{
    font-weight: 600;
    font-size: 20px!important;
  }

  .list-a .el-collapse-item__content p{
    font-size: 16px;
  }
</style>
