<template>
  <div>
  <div id="myChart" style="width:100%;height:400px;"></div>
 </div>
</template>

<script>
import echarts from 'echarts'
  export default {
    name:"histogram",
    data () {
      return {
       xdata:[],
       ydata:[],
       optionline:{
            title: '',
            tooltip: {},
            xAxis: {
                data: [],
                axisLabel:{
                 interval: 0,  
                 formatter:function(value)  
                 {  
                     return value.split("").join("\n");  
                 }  
                }
            },
            yAxis: {

            },
            series: [{
                name: '提问次数',
                type: 'bar',
                data:[]
            }]
        }
      }
    },
    methods: {
     
    },
    mounted() {
      
      let data_now=[]
      this.$axios.get("/classroom_question_chart").then( res =>{
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
          for(let i = 0; i< res.data.length;i++){
            this.optionline.xAxis.data.push(res.data[i].name)
            this.optionline.series[0].data.push(res.data[i].times)
          }
           myChart.setOption(this.optionline);
          
        console.log(this.xdata)
         console.log(this.ydata)
        // 指定图表的配置项和数据
      
        
        }).catch(error =>{
            console.log(error);
        });

    
      
    }
  }
</script>