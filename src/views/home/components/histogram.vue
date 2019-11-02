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
        if(res.data.a==0){
          this.$Message.info('当前时间不在学期范围内！')
        }
        else if(res.data.a==1){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
            for(let i = 0; i< res.data.b.length;i++){
              this.optionline.xAxis.data.push(res.data.b[i].name)
              this.optionline.series[0].data.push(res.data.b[i].times)
            }
             myChart.setOption(this.optionline);
          }
       
        console.log(res.data.b)
        }).catch(error =>{
            console.log(error);
        });

    
      
    }
  }
</script>