<template>
  <div>
  
  <Row>

             <Col span="8">
                <Select v-model="checked_teachers" multiple style="width:550px" placeholder="请选择教师(可多选)" :max-tag-count="3">
                    <Option v-for="item in TeacherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="1">
               
            </Col>
            <Col span="8">
                <Select v-model="checked_courses" multiple style="width:550px" lplaceholder="请选择课程(可多选)" :max-tag-count="3">
                    <Option v-for="item in CourseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="1" >
                
            </Col>
           
            <Col span="4">
                <DatePicker   @on-change ="changeTime" type="daterange" split-panels placeholder="Select date" style="width: 200px" split-panels></DatePicker>
            </Col>
            <Col span="2">
            <Button type="primary" @click="get()">确定</Button>
            </Col>
        </Row>
        
  <Row>
    <Col span="24">
      <ve-histogram :data="chartData" :settings="chartSettings" ></ve-histogram>
    </Col>
  </Row>
 
</div>
</template>

<script>
import echarts from 'echarts'
  export default {
    name:"histogram",
    methods:{
     
      get() {
        if(this.checked_teachers.length>0 && this.checked_courses.length>0 && this.date!=null){
          this.$emit('changeflag',1)
        this.chartData.rows =[]
        this.$axios.get("/get_details_histogram",{
          params:{
            checked_courses:this.checked_courses,
            checked_teachers:this.checked_teachers,
            time:this.date
          }
        }).then( res =>{
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
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
      }
      },
      changeTime(daterange) {
        this.date = daterange
      },
      fun() {
        console.log(this.checked_teachers)
      }
    },
    data () {
      this.chartSettings = {
        legendName: {
          'question_times': '提问次数'
        }
      }
      return {
        date:null,
        checked_courses:[],
        checked_teachers:[],
        CourseList:[],
        TeacherList:[],
        chartData: {
          columns: ['name', 'question_times'],
          rows: []
        },
        rows_now:[]
      }
    },
    mounted() {
     
      let data_now=[]
      this.$axios.get("/get_teacher_course_list").then( res =>{
        var a = {
          label:'',
          value:''
        }
        console.log(res.data.a[0])
        for( let i = 0; i< res.data.a.length;i++){
          
         this.TeacherList.push({label: res.data.a[i].name,value: res.data.a[i].name})
       
          
        }
        for(let j = 0;j<res.data.b.length;j++){
          this.CourseList.push({label: res.data.b[j].name,value: res.data.b[j].name})
        }
        console.log(this.CourseList)
        console.log(this.TeacherList)
     
       
            
        }).catch(error =>{
            console.log(error);
        });
     
    }
  }
</script>