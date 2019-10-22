<template>
  <div>
     <Row :gutter="32">
        <Col span="24" >
            <Tabs type="card">
                <TabPane label="教师"> 
                  <Row>                  
                    <Col span="24">               
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <Card  >        
                        <div slot="title">
                          <DatePicker   @on-change ="changeTime_all_teacher_histogram" type="daterange" split-panels placeholder="选择时间范围" style="width: 200px" split-panels></DatePicker>
                          
                        </div>           
                        <div style="text-align:center">
                          <div id="myChart" style="width:100%;height:300px;"></div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                    <Card >        
                        <div slot="title">

                          <DatePicker   @on-change ="changeTime_teacherts_charts" type="daterange" split-panels placeholder="选择时间范围" style="width: 200px" split-panels></DatePicker>
                          <Select v-model="checked_teacher" style="width:200px" placeholder="选择教师">
                            <Option v-for="item in teacherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                          <Button type="primary" @click="get_teacher_charts()">确定</Button>
                        </div>  
                        <Row>
                        <Col span="12">       
                          <div style="text-align:center">
                            <div id="piechart_teacher_class" style="height:400px;"></div>
                          </div>
                        </Col>
                        <Col span="12">       
                          <div style="text-align:center">
                            <div id="piechart_teacher_course" style="height:400px;"></div>
                          </div>
                        </Col>
                      </Row>
                      </Card>
                  </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                    <Card >        
                        <div slot="title">
                          
                          <Select v-model="checked_teacher_line"   multiple style="width:260px" placeholder="选择教师">
                            <Option v-for="item in teacherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                          <Select v-model="option"  style="width:200px" placeholder="选择学期">
                            <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
                          </Select> 
                          <Button type="primary" @click="get_teacher_line()">确定</Button>
                        </div>  
                        <Row>
                          <div style="text-align:center">
                          <div id="myChart_teachar_line" style="height:400px;" ref="teacher_line"></div>
                        </div>
                        </Row>
                    </Card>
                  </Col>
                  </Row>
              </TabPane>
                <TabPane label="班级">
                  <Row>                  
                    <Col span="24">               
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <Card  >        
                        <div slot="title">
                          <DatePicker   @on-change ="changeTime_all_class_room_histogram" type="daterange" split-panels placeholder="选择时间范围" style="width: 200px" split-panels></DatePicker>
                          
                        </div>           
                        <div style="text-align:center">
                          <div id="class_room_histogram" style="width:100%;height:300px;"></div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                    <Card >        
                        <div slot="title">

                          <DatePicker   @on-change ="changeTime_class_rooms_charts" type="daterange" split-panels placeholder="选择时间范围" style="width: 200px" split-panels></DatePicker>
                          <Select v-model="classRoomList" style="width:200px" placeholder="选择班级">
                            <Option v-for="item in classRoomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                          <Button type="primary" @click=" get_class_room_charts()">确定</Button>
                        </div>           
                        
                        <Row>
                        <Col span="12">       
                          <div style="text-align:center">
                            <div id="piechart_class_room_teachers" style="height:400px;"></div>
                          </div>
                        </Col>
                        <Col span="12">       
                          <div style="text-align:center">
                            <div id="piechart_class_room_class" style="height:400px;"></div>
                          </div>
                        </Col>
                      </Row>
                      </Card>
                  </Col>
                  </Row>
                   <Row>
                    <Col span="24">
                    <Card >        
                        <div slot="title">
                          
                          <Select v-model="checked_class_room_line"   multiple style="width:260px" placeholder="选择班级">
                            <Option v-for="item in classRoomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                          <Select v-model="option_class_room"  style="width:200px" placeholder="选择学期">
                            <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
                          </Select> 
                          <Button type="primary" @click="get_class_room_line()">确定</Button>
                        </div>  
                        <Row>
                          <div style="text-align:center">
                          <div id="myChart_class_room_line" style="height:400px;" ref="class_room_line"></div>
                        </div>
                        </Row>
                    </Card>
                  </Col>
                  </Row>
                </TabPane>
                
                <TabPane label="课程">
                  <Row>                  
                    <Col span="24">               
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <Card >        
                        <div slot="title">
                          <DatePicker   @on-change ="changeTime_all_course_histogram" type="daterange" split-panels placeholder="选择时间范围" style="width: 200px" split-panels></DatePicker>
                          
                        </div>           
                        <div style="text-align:center">
                          <div id="class_histogram" style="height:300px;"></div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                    <Card >        
                        <div slot="title">

                          <DatePicker   @on-change ="changeTime_course_charts" type="daterange" split-panels placeholder="选择时间范围" style="width: 200px" split-panels></DatePicker>
                          <Select v-model="checked_course" style="width:200px" placeholder="选择课程">
                            <Option v-for="item in courseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                          <Button type="primary" @click="get_course_charts()">确定</Button>
                        </div>  
                        <Row>
                        <Col span="12">         
                          <div style="text-align:center">
                            <div id="piechart_course_class_rooms"style="height:400px;"></div>
                          </div>
                        </Col>
                        <Col span="12">
                          <div style="text-align:center">
                            <div id="piechart_course_teachers" style="height:400px;"></div>
                          </div>
                        </Col>
                      </Row>
                      </Card>
                  </Col>
                  </Row>
                   <Row>
                    <Col span="24">
                    <Card >        
                        <div slot="title">
                          
                          <Select v-model="checked_course_line"   multiple style="width:260px" placeholder="选择课程">
                            <Option v-for="item in courseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                          <Select v-model="option_course"  style="width:200px" placeholder="选择学期">
                            <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
                          </Select> 
                          <Button type="primary" @click="get_course_line()">确定</Button>
                        </div>  
                        <Row>
                          <div style="text-align:center">
                          <div id="myChart_course_line" style="height:400px;" ref="course_line"></div>
                        </div>
                        </Row>
                    </Card>
                  </Col>
                  </Row>
                </TabPane>
               
            </Tabs>
        </Col>
    </Row>
  
  
 
</div>
</template>

<script>
import echarts from 'echarts'

  export default {
    name:"histogram",
    methods:{ 
      get_teacher_charts() {
        console.log(this.checked_teacher)
        if(this.date.length==''){
           this.$Message.info('请选择时间范围！');
        }else if(this.checked_teacher==''){
          this.$Message.info('请指定教师！');
        }else {
          this.$axios.get("/get_teacher_charts",{
          params:{
            checked_teacher:this.checked_teacher,
            time:this.date
          }
        }).then( res =>{
           let myChart = this.$echarts.init(document.getElementById('piechart_teacher_class'))
           let myChart_teacher_pie = this.$echarts.init(document.getElementById('piechart_teacher_course'))
           this.option_teacher_class_rooms.series[0].data = []
           this.option_teacher_class_rooms.legend.data = []
          for(let i = 0; i< res.data.a.length;i++){
            this.option_teacher_class_rooms.series[0].data.push({value: res.data.a[i].times,name: res.data.a[i].name})
            this.option_teacher_class_rooms.legend.data.push(res.data.a[i].name)
           
          }
          this.option_teacher_courses.legend.data =[]
          this.option_teacher_courses.series[0].data =[]
          for(let i = 0;i<res.data.b.length;i++){
             this.option_teacher_courses.legend.data.push(res.data.b[i].name)
            this.option_teacher_courses.series[0].data.push({value: res.data.b[i].times,name: res.data.b[i].name})
          }
           myChart.setOption(this.option_teacher_class_rooms);
            myChart_teacher_pie.setOption(this.option_teacher_courses)
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
      }
      },
      get_class_room_charts() {
        console.log(this.checked_class_room)
        console.log(this.date_class_room)
        if(this.date_class_room.length==''){
           this.$Message.info('请选择时间范围！');
        }else if(this.checked_class_room==''){
          this.$Message.info('请指定班级！');
        }else {
          this.$axios.get("/get_class_room_charts",{
          params:{
            checked_class_room:this.checked_class_room,
            time:this.date_class_room
          }
        }).then( res =>{
           let myChart = this.$echarts.init(document.getElementById('piechart_class_room_teachers'))
           let myChart_class_room_pie = this.$echarts.init(document.getElementById('piechart_class_room_class'))
           this.option_class_rooms_teachers.series[0].data = []
           this.option_class_rooms_teachers.legend.data =[]
          for(let i = 0; i< res.data.a.length;i++){
            this.option_class_rooms_teachers.series[0].data.push({value: res.data.a[i].times,name: res.data.a[i].name})
            this.option_class_rooms_teachers.legend.data.push(res.data.a[i].name)
           
          }
          this.option_class_room_courses.legend.data =[]
          this.option_class_room_courses.series[0].data =[]
          for(let i = 0;i<res.data.c.length;i++){
             this.option_class_room_courses.legend.data.push(res.data.c[i].name)
            this.option_class_room_courses.series[0].data.push({value: res.data.c[i].times,name: res.data.c[i].name})
          }
           myChart.setOption(this.option_class_rooms_teachers);
            myChart_class_room_pie.setOption(this.option_class_room_courses)
            console.log("ds")
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
      }
      },
      get_course_charts() {
        if(this.date_course.length==''){
           this.$Message.info('请选择时间范围！');
        }else if(this.checked_course==''){
          this.$Message.info('请指定课程！');
        }else {
          this.$axios.get("/get_course_charts",{
          params:{
            checked_course:this.checked_course,
            time:this.date_course
          }
        }).then( res =>{
           let myChart = this.$echarts.init(document.getElementById('piechart_course_class_rooms'))
           let myChart_class_room_pie = this.$echarts.init(document.getElementById('piechart_course_teachers'))
           this.option_course_class_rooms.series[0].data = []
           this.option_course_class_rooms.legend.data =[]
          for(let i = 0; i< res.data.b.length;i++){
            this.option_course_class_rooms.series[0].data.push({value: res.data.b[i].times,name: res.data.b[i].name})
            this.option_course_class_rooms.legend.data.push(res.data.b[i].name)
           
          }
          this.option_course_teacher.legend.data =[]
          this.option_course_teacher.series[0].data =[]
          for(let i = 0;i<res.data.a.length;i++){
             this.option_course_teacher.legend.data.push(res.data.a[i].name)
            this.option_course_teacher.series[0].data.push({value: res.data.a[i].times,name: res.data.a[i].name})
          }
           myChart.setOption(this.option_course_class_rooms);
            myChart_class_room_pie.setOption(this.option_course_teacher)
            console.log("kechcla")
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
      }
      },
      get_teacher_line() {
        //let _teacher_line = this.$refs.teacher_line
        
        console.log(this.checked_teacher_line)
          this.$axios.get("/get_teacher_line",{
          params:{
            checked_teachers:this.checked_teacher_line,
            term_id:this.option
          }
        }).then( res =>{
         //_teacher_line.clear()
         if(res.data.d[0].length==0){
          this.$Message.info("无数据，重新选择学期或教师！")
         }else {
            let myChart = this.$echarts.init(document.getElementById('myChart_teachar_line'))
          
              this.teacher_line_option.series=[]
              this.teacher_line_option.xAxis.data = []
              this.teacher_line_option.legend.data =[]
              for(let k = 0; k < res.data.c.length;k++){
                this.teacher_line_option.xAxis.data.push(res.data.c[k].weeks)
              }
            
             for(let k = 0;k <res.data.d.length;k++){
              this.teacher_line_option.series.push({name:'',type:'line',stack:'总量',data:[]})
              this.teacher_line_option.legend.data.push(res.data.d[k][0].name)
            }
            

            for(let i = 0; i < this.teacher_line_option.series.length;i++){
              this.teacher_line_option.series[i].name = res.data.d[i][0].name
              for(let k = 0;k< res.data.c.length;k++){
                this.teacher_line_option.series[i].data.push(0)
              }
              for(let j = 0;j< res.data.d[i].length;j++){
                this.teacher_line_option.series[i].data[res.data.d[i][j].max-1]= res.data.d[i][j].times
              }
            }
           
            
            console.log(this.teacher_line_option.xAxis.data)
            console.log(this.teacher_line_option.series)
          //myChart.clear()
          myChart.setOption(this.teacher_line_option,true)//设置true作用为不跟之前的option合并
            console.log(res.data)  
            }        
        }).catch(error =>{
            console.log(error);
        });
      
      },
      get_course_line() {
        //let _teacher_line = this.$refs.teacher_line
        
        
          this.$axios.get("/get_course_line",{
          params:{
            checked_course:this.checked_course_line,
            term_id:this.option_course
          }
        }).then( res =>{
         //_teacher_line.clear()
         if(res.data.d[0].length==0){
          this.$Message.info("无数据，重新选择学期或课程！")
         }else {
            let myChart = this.$echarts.init(document.getElementById('myChart_course_line'))
          
              this.course_line_option.series=[]
              this.course_line_option.xAxis.data = []
              this.course_line_option.legend.data =[]
              for(let k = 0; k < res.data.c.length;k++){
                this.course_line_option.xAxis.data.push(res.data.c[k].weeks)
              }
            
             for(let k = 0;k <res.data.d.length;k++){
              this.course_line_option.series.push({name:'',type:'line',stack:'总量',data:[]})
              this.course_line_option.legend.data.push(res.data.d[k][0].name)
            }
            

            for(let i = 0; i < this.course_line_option.series.length;i++){
              this.course_line_option.series[i].name = res.data.d[i][0].name
              for(let k = 0;k< res.data.c.length;k++){
                this.course_line_option.series[i].data.push(0)
              }
              for(let j = 0;j< res.data.d[i].length;j++){
                this.course_line_option.series[i].data[res.data.d[i][j].max-1]= res.data.d[i][j].times
              }
            }
           
            
            console.log(this.course_line_option.xAxis.data)
            console.log(this.course_line_option.series)
          //myChart.clear()
          myChart.setOption(this.course_line_option,true)//设置true作用为不跟之前的option合并
            console.log(res.data)  
            }        
        }).catch(error =>{
            console.log(error);
        });
      
      },
      get_class_room_line() {
        //let _teacher_line = this.$refs.teacher_line
        
        console.log(this.checked_class_room_line)
          this.$axios.get("/get_class_room_line",{
          params:{
            checked_class_room:this.checked_class_room_line,
            term_id:this.option_class_room
          }
        }).then( res =>{
         //_teacher_line.clear()
         if(res.data.d[0].length==0){
          this.$Message.info("无数据，重新选择学期或班级！")
         }else {
            let myChart = this.$echarts.init(document.getElementById('myChart_class_room_line'))
          
              this.class_room_line_option.series=[]
              this.class_room_line_option.xAxis.data = []
              this.class_room_line_option.legend.data =[]
              for(let k = 0; k < res.data.c.length;k++){
                this.class_room_line_option.xAxis.data.push(res.data.c[k].weeks)
              }
            
             for(let k = 0;k <res.data.d.length;k++){
              this.class_room_line_option.series.push({name:'',type:'line',stack:'总量',data:[]})
              this.class_room_line_option.legend.data.push(res.data.d[k][0].name)
            }
            

            for(let i = 0; i < this.class_room_line_option.series.length;i++){
              this.class_room_line_option.series[i].name = res.data.d[i][0].name
              for(let k = 0;k< res.data.c.length;k++){
                this.class_room_line_option.series[i].data.push(0)
              }
              for(let j = 0;j< res.data.d[i].length;j++){
                this.class_room_line_option.series[i].data[res.data.d[i][j].max-1]= res.data.d[i][j].times
              }
            }
           
            
            console.log(this.class_room_line_option.xAxis.data)
            console.log(this.class_room_line_option.series)
          //myChart.clear()
          myChart.setOption(this.class_room_line_option,true)//设置true作用为不跟之前的option合并
            console.log(res.data)  
            }        
        }).catch(error =>{
            console.log(error);
        });
      
      },
      changeTime_all_teacher_histogram(daterange) {
        
        this.$axios.get("/get_detailed_teacher_histogram",{
          params:{
            time:daterange
          }
        }).then( res =>{
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            this.option_histogram.xAxis.data =[]
            this.option_histogram.series[0].data =[]
          for(let i = 0; i< res.data.length;i++){
            this.option_histogram.xAxis.data.push(res.data[i].name)
            this.option_histogram.series[0].data.push(res.data[i].times)
          }
          myChart.setOption(this.option_histogram);
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
      },

      changeTime_teacherts_charts(daterange) {
        this.date = daterange
        console.log(this.date)
      },
      changeTime_all_class_room_histogram(daterange) {
        this.$axios.get("/get_detailed_class_room_histogram",{
          params:{
            time:daterange
          }
        }).then( res =>{
            let myChart = this.$echarts.init(document.getElementById('class_room_histogram'))
          this.option_class_room_histogram.xAxis.data =[]
          this.option_class_room_histogram.series[0].data =[]
          for(let i = 0; i< res.data.length;i++){
            this.option_class_room_histogram.xAxis.data.push(res.data[i].name)
            this.option_class_room_histogram.series[0].data.push(res.data[i].times)
          }
          myChart.setOption(this.option_class_room_histogram);
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
      },
      changeTime_class_rooms_charts(daterange) {
        this.date_class_room = daterange
      },
      changeTime_all_course_histogram(daterange) {
        this.$axios.get("/get_detailed_class__histogram",{
          params:{
            time:daterange
          }
        }).then( res =>{
            let myChart = this.$echarts.init(document.getElementById('class_histogram'))
            this.option_class_histogram.xAxis.data = []
            this.option_class_histogram.series[0].data =[]
          for(let i = 0; i< res.data.length;i++){
            this.option_class_histogram.xAxis.data.push(res.data[i].name)
            this.option_class_histogram.series[0].data.push(res.data[i].times)
          }
          myChart.setOption(this.option_class_histogram);
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
      },
      changeTime_course_charts(daterange) {
        this.date_course = daterange
      }
    },
    data () {
      return {
            option_histogram:{
                title: {
                    text: '全体教师活跃度'
                },
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
                yAxis: {},
                series: [{
                    name: '提问次数',
                    type: 'bar',
                    data:[]
                }]
            },
            option_class_room_histogram:{
                title: {
                    text: '班级提问次数'
                },
                grid: {
                left: '10%',
                bottom:'25%'
              },

                tooltip: {},
                xAxis: {


                    data: [],
                    axisLabel:{
                      rotate:40,
                     interval: 0,  
                     
                    }
                },
                yAxis: {},
                series: [{
                    name: '提问次数',
                    type: 'bar',
                    data:[]
                }]
            },
            option_class_histogram:{
                title: {
                    text: '课程提问次数'
                },
                tooltip: {},
                xAxis: {
                    data: [],
                    axisLabel:{
                     interval: 0, 
                      rotate:40, 
                    grid: {
                      left: '10%',
                      bottom:'25%'
                    },  
                    }
                },
                yAxis: {},
                series: [{
                    name: '提问次数',
                    type: 'bar',
                    data:[]
                }]
            },
            option_teacher_class_rooms: {
              title : {
                text: '提问班级分布',
                subtext: '',
                x:'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  x: 'left',
                  data:[]
              },
              series: [
                  {
                      name:'提问次数',
                      type:'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: false,
                              position: 'center'
                          },
                          emphasis: {
                              show: true,
                              textStyle: {
                                  fontSize: '30',
                                  fontWeight: 'bold'
                              }
                          }
                      },
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:[
                          
                      ]
                  }
              ]
          },
          option_teacher_courses: {
          title : {
              text: '提问课程分布',
              subtext: '',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: []
          },
          series : [
              {
                  name: '提问次数',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[
                      
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      },
        option_class_rooms_teachers: {
                title : {
                  text: '班级-提问教师分布',
                  subtext: '',
                  x:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[]
                },
                series: [
                    {
                        name:'提问次数',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            
                        ]
                    }
                ]
            },
        option_class_room_courses: {
        title : {
            text: '班级-提问课程分布',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        series : [
            {
                name: '提问次数',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    },
          option_course_class_rooms: {
                  title : {
                    text: '课程-提问班级分布',
                    subtext: '',
                    x:'center'
                  },
                  tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      x: 'left',
                      data:[]
                  },
                  series: [

                      {   
                          name:'提问次数',
                          type:'pie',
                          radius: ['50%', '70%'],
                          avoidLabelOverlap: false,
                          label: {
                              normal: {
                                  show: false,
                                  position: 'center'
                              },
                              emphasis: {
                                  show: true,
                                  textStyle: {
                                      fontSize: '30',
                                      fontWeight: 'bold'
                                  }
                              }
                          },
                          labelLine: {
                              normal: {
                                  show: false
                              }
                          },
                          data:[
                              
                          ]
                      }
                  ]
              },
              option_course_teacher: {
              title : {
                  text: '课程-提问教师分布',
                  subtext: '',
                  x:'center'
              },
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: []
              },
              series : [
                  {
                      name: '提问次数',
                      type: 'pie',
                      radius : '55%',
                      center: ['65%', '50%'],
                      data:[
                          
                      ],
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          },
        teacher_line_option: {
            title: {
                text: '活跃度变化趋势-教师'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
               data:[]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                
            ]
        },
        course_line_option: {
            title: {
                text: '活跃度变化趋势-课程'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
               data:[]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                
            ]
        },
        class_room_line_option: {
            title: {
                text: '活跃度变化趋势-班级'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
               data:[]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
              
            ]
        },

        date:[],
        date_class_room:[],
        date_course:[],
        teacherList: [],
        classRoomList:[],
        courseList:[],
        checked_teacher: '',
        checked_class_room:'',
        checked_course:'',
        checked_teacher_line:[],
        checked_course_line:[],
        checked_class_room_line:[],
        option:'',
        option_course:'',
        option_class_room:'',
        term:[]
      }
      
    },
    mounted() {
      this.teacherList =[]
      this.classRoomList=[]
      this.courseList =[]
      this.term = []
      this.$axios.get("/get_teacher_course_list",{
        }).then( res =>{
           for(let i = 0;i< res.data.a.length;i++){
              this.teacherList.push({value:res.data.a[i].name,label:res.data.a[i].name})
           }
           for(let i = 0;i<res.data.c.length;i++){
            this.classRoomList.push({value:res.data.c[i].name,label:res.data.c[i].name})
           }
           for(let i =0;i<res.data.b.length;i++){
              this.courseList.push({value:res.data.b[i].name,label:res.data.b[i].name})
           }
           for(let i =0;i<res.data.d.length;i++){
              this.term.push(res.data.d[i])
           }
                  console.log(res.data)
                  console.log(this.term)
        }).catch(error =>{
            console.log(error);
        });
    }
  }
</script>
