<template>
  <div>
    <ul style="display:flex;justify-content: space-around" v-for="(item,index) in fruitList">
      <li>{{item}}</li>
      <button type="button" @click="del(index)">删除</button>
    </ul>
    <form>
      <input v-model="fruit"></input>
      <button @click="add">添加</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "test",
  data(){
    return{
      fruitList:[],
      fruit:''
    }
  },
  created() {
    this.get()
  },
  methods:{
    get(){
      axios.get('http://localhost:7001/fruits').then(res=>{
        this.fruitList = res;
        console.log(res)
      })
    },
    add(){
      axios.post('http://localhost:7001/fruits',{fruit:this.fruit}).then(res=>{
        this.$notify({title:'成功',message:res,type:'success'});
        this.get()
      })
    },
    del(id){
      axios.delete(`http://localhost:7001/fruits/${id}`).then(res=>{
        this.$notify({title:'成功',message:res,type:'success'});
        this.get()
      })
    }
  }
}
</script>

<style scoped>

</style>
