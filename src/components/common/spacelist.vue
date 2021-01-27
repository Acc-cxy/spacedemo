<template>
<div class="item">
  <div class="title">
    <img :src="'http://space.linqinggan.top'+bloglist.icon" alt="#">
    <div>
      <p>{{bloglist.author !== null?bloglist.author:"匿名"}}</p>
      <span v-text="">{{ bloglist.createtime | formattime }}</span>
    </div>
  </div>
  <div class="content">
    <span>{{bloglist.content}}</span>
    <img v-image-preview :src="'http://space.linqinggan.top'+bloglist.photo" alt="">
  </div>
</div>
</template>

<script>
import {format} from "@/components/common/index";

export default {
  name: "spacelist",
  props:{
    bloglist:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.mylist()
  },
  filters:{
    formattime:function (value) {
      return format(value)
    }
  },
  computed:{

  },
  methods:{
    mylist() {
      // Object.keys(this.bloglist).forEach(function (key) {
      //   console.log(key,this.bloglist)
      // })
    }
  }
}
</script>

<style scoped>
.item{
  display: block;
  margin-bottom:15px;
  background: #ffffff;
  padding: 20px;
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
