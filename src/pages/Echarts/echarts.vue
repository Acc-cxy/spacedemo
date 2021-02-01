<template>
  <el-main>
    <el-row  type="flex" justify="center" >
      <el-col :span="15">
        <div ref="main" style="width: 700px;height: 700px"></div>
      </el-col>
    </el-row>
  </el-main>

</template>

<script>
import jsonp from 'jsonp'
import 'echarts/map/js/china'
const option = {
  title:{
    text:'Echart实现疫情地图',
    show:true,
    // x轴居中
    x:'center',
    textStyle:{
      color:'#e74c3c'
    }
  },
  tooltip:{
    //   鼠标移入时的提示信息，  一定要知道的是它和series数据是平级的
    tigger:'item',
    formatter:'地区：{b}<br />感染人口: {c}'
  },
  series:[
//   series配置出来了以后才会有地图显示  所以series是关键
    {
      type:'map',
      //   图标类型
      map:'china',
      //   什么图标
      data:[
        { name:'北京', value:'200'},
        { name:'福建', value:'10'}
      ],
      label:{
        //   设置地图每一个角落的名字
        show:true,
        color:'red'
      },
      itemStyle:{
        borderColor:'blue'
      },
      emphasis:{
        label:{
          color:'#fff',
          fontSize:'10px'
        },
        itemStyle:{
          areaColor:'green'
        }
      }
    }
  ],
  visualMap:{
    //   设置类型为分段类型
    type:'piecewise',
    show:true,
    // 设置不用的段位
    pieces: [
      // 不指定 max，表示 max 为无限大（Infinity）。
      {min: 200},
      {min: 101, max:200},
      {min: 51, max: 100},
      {min: 10, max: 50},
      {min: 1, max: 9},
      {value:0}
    ],
    inRange: {
      // 范围所对应的颜色
      color: ['#fff', '#ffaa85', '#660208']
    }
  }
}
export default {
  name: "echarts",
  created() {

  },
  mounted() {
    this.fashion()


    },
  methods:{
    fashion(){
      let myChart = this.$echarts.init(this.$refs.main);//声明自己的chart
      jsonp('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', (err, data)=>{
        const list = data.data.list.map(item=>{
          return {
            name:item.name,
            value:item.jwsrNum
          }
        })
        option.series[0].data = list

        myChart.setOption(option);
      })

    }
  }
}
</script>

<style scoped>

</style>
