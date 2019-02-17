<template>    
<Card>
    <p slot="title" style="height:32px">
        <Icon type="ios-list"></Icon>
        课堂成绩录入&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前学期：
            <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
                <Option v-for="(item, index) in term" :key="index" :value="item">{{item}}</Option>
            </Select>
    </p>
    <div v-if="course==''">
        <p style="font-size:18px">请选择课程:</p>
        <div v-for="(item, index) in courseList" :key="index" style="padding:10px">
            <Button @click="selectCourse(item)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item.name}}</Button>
        </div>
    </div>
    <div v-if="course!=''&&class1==''">
        <p style="font-size:18px">当前已选择课程:&nbsp;&nbsp;{{course}}</p>
        <p style="font-size:18px">请选择班级:</p>
        <div v-for="(item, index) in classList" :key="index" style="padding:10px">
            <Button @click="selectClass(item)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item.name}}</Button>
        </div>
        <div style="padding:10px">
        <Button @click="backcourse()" class="ivu-btn ivu-btn-primary ivu-btn-big">返回选择课程</Button>
        </div>
    </div>
    <div v-if="course!=''&&class1!=''">
        <p style="font-size:18px">当前已选择课程:&nbsp;&nbsp;{{course}}</p>
        <p style="font-size:18px">当前已选择班级:&nbsp;&nbsp;{{class1}}</p>
        <div style="padding:10px">
          <Button @click="backclass()" class="ivu-btn ivu-btn-primary ivu-btn-big">返回选择班级</Button>
        </div>
        <Table :columns="Columns" :data="studentList" style="width: 100%;"></Table>
    </div>                           
</Card>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      courseList:[],
      classList:[],
      studentList:[],
      course:'',
      course_id:'',
      class1:'',
      student:'',
      Columns: [
        {
          title: "学号",
          key: "sno",
          width: 110
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },                       
      ],
      option:'',
      term:[],
      m:[],
      data:[],
    };
  },
  computed: {
  },
  mounted() {
      this.$axios.get("/termList").then( res =>{
            this.term = res.data;
            this.termList();
        }).catch(error =>{
            console.log(error);
        });
  },
  methods:{
      termList(){
          let last = new Date();
          last = parseInt(last.getFullYear())+1;
          let termlast = parseInt(this.term[this.term.length-1].substring(0,4));
          // console.log(first)
          let m = last - termlast;
          for(let i = 1;i<=m;i++){
              if(this.term[this.term.length-1].indexOf('春季学期')!=-1){
                  this.term.push(termlast+"秋季学期");                    
              }
              this.term.push(termlast+1+"春季学期");
              this.term.push(termlast+1+"秋季学期");
          }
          let month = new Date();
          month = parseInt(month.getMonth()+1);
          if(month>8){
              this.option=last-1+"秋季学期";
          }else{
              this.option=last-1+"春季学期";
          } 

          this.$axios.post("/tcourseList", {
              params: {
                  term:this.option,
              }
          }).then(res => {
            this.courseList = res.data;
            // this.term = res.data.b;
            // console.log(res.data)
          })
          .catch(error => {
            console.log(error);
          });
      },
      selected() {
          this.Columns=[
            {
              title: "学号",
              key: "sno",
              width: 110
            },
            {
              title: "姓名",
              key: "name",
              align: "center"
            },                       
          ];
          this.course_id='';
          this.classList=[];
          this.data = [];
          this.studentList = [];
          this.course='';
          this.class1='';
          this.$axios.post("/tcourseList", {
              params: {
                  term:this.option,
              }
          }).then(res => {
            this.courseList = res.data;
            // this.term = res.data.b;
            // console.log(res.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, 
      selectCourse(item){
        this.course=item.name;
        this.course_id=item.id;
        this.$axios.post("/tclassList",{
          params:{
            id: this.course_id,
            term:this.option,
          }
        }).then(res => {
          this.classList = res.data;
          // console.log(res.data)
        })
        .catch(error => {
          console.log(error);
        });
      },

      selectClass(item){
        this.m=[];
        this.class1=item.name;
        this.$axios.post("/get_classgrade",{
          params:{
            course_id:this.course_id,
            class_id:item.id,
            term:this.option,
          }
        }).then(res => {
          this.data = res.data.a;
          this.studentList = res.data.b;

          for(let i =0;i<this.data.length;i++){
            if(this.data[i].types=='input'){
                this.Columns.push({
                        title: this.data[i].name,
                        key: this.data[i].eno,
                        align: "center",
                        render: (h, params) => {
                          let _this = this;
                          return h('div', [
                              h('Input', {
                                  // style: {
                                  //     width: '200px'
                                  // },
                                  props:{
                                       value:params.row[params.column.key],
                                       autosize: true
                                  },
                                  on:{
                                    input:function(e){
                                        let x = 0;
                                        for(let k=0;k<_this.m.length;k++){
                                            if(_this.m[k].eno==params.column.key&&_this.m[k].stu==params.row.id){
                                              _this.m[k].grade=e;
                                              x=1;
                                            }
                                        }
                                        if(x==0){
                                          _this.m.push({
                                                  id: _this.data[i].id,
                                                  eno: _this.data[i].eno,
                                                  stu:params.row.id,
                                                  grade:e,
                                                })
                                        }
                                    },                                  
                                  }
                                  })
                          ]);
                      }
                },);
            }else if(this.data[i].types=='option'){
              let arr = this.data[i].description.split('@');
                this.Columns.push({
                        title: this.data[i].name,
                        key: this.data[i].eno,
                        align: "center",
                        // width: 140,
                        render: (h, params) => {
                          let _this = this;
                          let a=[];
                          for(let j = 0;j<arr.length;j++){
                              a.push(h('Option', {
                                  props: {
                                      value:arr[j],
                                  },
                                  }))
                          }
                          return h('Select', {
                                    props: {
                                      value: '',
                                      placeholder: params.row[params.column.key]==''?'请选择':params.row[params.column.key]
                                    },
                                    on: {
                                      input:(e) => {
                                        let x = 0;
                                        for(let k=0;k<_this.m.length;k++){
                                            if(_this.m[k].eno==params.column.key&&_this.m[k].stu==params.row.id){
                                              _this.m[k].grade=e;
                                              x=1;
                                            }
                                        }
                                        if(x==0){
                                          _this.m.push({
                                                  id: _this.data[i].id,
                                                  eno: _this.data[i].eno,
                                                  stu:params.row.id,
                                                  grade:e,
                                                })
                                        }
                                      },
                                    }
                                  },a);
                      }
                },);
            }
          }
          this.Columns.push({
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'middle'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              click: () => {
                                  this.save(params.row.id);
                              }
                          }
                      }, '保存')
                  ]);
              }
          })
        })
        .catch(error => {
          console.log(error);
        });
      },

      backcourse(){
        this.course='';
      },
      backclass(){
        this.class1='';
        this.Columns=[
        {
          title: "学号",
          key: "sno",
          width: 110
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },                       
      ];
      },
      save(id){
          this.$axios.patch('/inputclassgrade', {
              params: {
                  students_id: id,
                  courses_id: this.course_id,
                  eval: this.m,
              }
          }).then(function(res) {              
              for(let i=0;i<res.data.length;i++){
                for(let j = 0;j<this.studentList.length;j++){
                  if(res.data[i].stu==this.studentList[j].id){
                    this.studentList[j][res.data[i].eno]=res.data[i].grade;
                    break;
                  }
                }
              }
              console.log(this.studentList);
              this.$Message.info('保存成功');
          }.bind(this))
          .catch(function(error) {
              console.log(error)
          });
      }      
  }
};
</script>
