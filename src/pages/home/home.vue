<template>
  <el-main>
      <el-row  type="flex" justify="center" >
        <el-col :span="15">
          <div v-for="item in bloglist" :key="item.id" class="item">
            <div class="title">
                <img :src="'http://space.linqinggan.top'+item.photo" alt="">
                <div>
                  <p>{{item.author !== null?item.author:"匿名"}}</p>
                  <span v-text="">{{ item.createtime }}</span>
                </div>
            </div>
            <div class="content">
              <span>{{item.content}}</span>
              <img :src="'http://space.linqinggan.top'+item.photo" alt="">
            </div>
          </div>
        </el-col>
      </el-row>
  </el-main>
</template>

<script>
import {getbloglist} from "@/network/home";

export default {
  name: "home",
  data(){
    return{
      bloglist:[]
    }
  },
  created() {
    this.getbloglist()
  },
  methods:{
     getbloglist(){
       getbloglist().then(res=>{
        this.bloglist = res.data
        console.log(this.bloglist)
      })
    }
  }
}
</script>

<style scoped>
  .item{
    display: block;
    margin-bottom: 20px;
  }
  .title{
    display: flex;
  }
  .title img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: 15px;
  }
  .title div{
    flex: 1;
  }
  .title p{
    font-size: 18px;
    line-height: 20px;
  }
  .title span{
    line-height: 30px;
    font-weight: 500;
    color: #777;
  }
  .content{
    margin-left: 65px;
  }
  .content span{
    width: 100%;
    float: left;
    font-size: 16px;
    font-weight: 400;
  }
  .content img{
    width: 100px;
    height: 100px;
  }
</style>
