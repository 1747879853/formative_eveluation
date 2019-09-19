<template>
  <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
</template>

<script>
import echarts from 'echarts'
  export default {
    name:"histogram",
    data () {
      this.chartSettings = {
        legendName: {
          'question_times': '提问次数'
        }
      }
      return {
        chartData: {
          columns: ['name', 'question_times'],
          rows: [ ]
        },
        rows_now:[]
      }
    },
    mounted() {
     
      let data_now=[]
      this.$axios.get("/classroom_question_chart").then( res =>{
          var data_ = {
            'name':'',
            'question_times':-1
          }
          for(let i = 0; i< res.data.length;i++){
            data_.name = res.data[i].name
            data_.question_times = res.data[i].times
            this.chartData.rows.push(data_)
            data_ = {
               'name':'',
              'question_times':-1
            }
          }
            
        }).catch(error =>{
            console.log(error);
        });

    
      //console.log(data_now)
    }
  }
</script>