<template>    
<Card>
    <p slot="title" style="height:32px">
        <Icon type="ios-list"></Icon>
        课堂成绩录入&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前学期：
            <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
                <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button v-if="course!=''&&edit!='uneditable'" @click="save(1)" class="ivu-btn ivu-btn-primary ivu-btn-big">暂存</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button v-if="course!=''&&edit!='uneditable'" @click="save(2)" class="ivu-btn ivu-btn-primary ivu-btn-big">提交</Button>
    </p>
    <div>
        <p style="font-size:18px">请选择课程:</p>
        <div v-for="(item, index) in classcourseList" :key="index" style="padding:10px;">
            {{item.name}}:
            <div v-for="(course, index1) in item.course" :key="index1" style="padding:10px;width:100px;display:inline">
                <Button @click="selectCourse(item,course)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{course.name}}</Button>
            </div>
            <!-- <Button @click="selectCourse(item)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item.name}}</Button> -->
        </div>
    </div>
    <div v-if="course!=''">
        <p style="font-size:18px">当前已选择班级:&nbsp;&nbsp;{{class1}}</p>
        <p style="font-size:18px">当前已选择课程:&nbsp;&nbsp;{{course}}</p>        
        <div style="padding:10px">
          <!-- <Button @click="backcourse()" class="ivu-btn ivu-btn-primary ivu-btn-big">返回选择课程</Button> -->
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
      classcourseList:[],
      classList:[],
      studentList:[],
      course:'',
      course_id:'',
      class_id:'',
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
      edit:'',
    };
  },
  computed: {
  },
  mounted() {
      this.$axios.get("/termList").then( res =>{
            this.term = res.data.a;
            this.option = res.data.b;
            this.selected();
            if(JSON.parse(localStorage.getItem('class'))!=null&&JSON.parse(localStorage.getItem('course'))!=null){
              this.selectCourse(JSON.parse(localStorage.getItem('class')),JSON.parse(localStorage.getItem('course')));
            }
        }).catch(error =>{
            console.log(error);
        });
  },
  destroyed: function (){
    this.save(1);
  },
  methods:{
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
          this.$axios.post("/tclassList", {
              params: {
                  term:this.option,
              }
          }).then(res => {
            this.classcourseList = res.data;
            // this.term = res.data.b;
            console.log(res.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, 
      selectCourse(classes,course){
        this.m=[];
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
        localStorage.setItem('class',JSON.stringify(classes));
        localStorage.setItem('course',JSON.stringify(course));
        this.class1=classes.name;
        this.class_id=classes.id;
        this.course=course.name;
        this.course_id=course.id;
        this.$axios.post("/get_classgrade",{
          params:{
            course_id:course.id,
            class_id:classes.id,
            term:this.option,
          }
        }).then(res => {
          this.data = res.data.a;
          this.studentList = res.data.b;
          this.edit = res.data.c;

          if(this.edit=='editable'){
              for(let i =0;i<this.data.length;i++){
                if(this.data[i].children.length==0){
                    if(this.data[i].types=='input'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
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
                                                  if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                    _this.m[k].grade=e;
                                                    x=1;
                                                  }
                                              }
                                              if(x==0){
                                                _this.m.push({
                                                        id: _this.data[i].id,
                                                        // eno: _this.data[i].eno,
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
                      let array = this.data[i].description.split('@');
                      let arr = [];
                      for(let n=0;n<array.length;n++){
                        let a = array[n].split('-');
                        arr.push(a[0]);
                      }
                        this.Columns.push({
                                title: this.data[i].name,
                                key: 'e'+this.data[i].id,
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
                                                    if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                      _this.m[k].grade=e;
                                                      x=1;
                                                    }
                                                }
                                                if(x==0){
                                                  _this.m.push({
                                                          id: _this.data[i].id,
                                                          // eno: _this.data[i].eno,
                                                          stu:params.row.id,
                                                          grade:e,
                                                        })
                                                }
                                              },
                                            }
                                          },a);
                              }
                        },);
                    }else if(this.data[i].types=='homework'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
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
                                                  if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                    _this.m[k].grade=e;
                                                    x=1;
                                                  }
                                              }
                                              if(x==0){
                                                _this.m.push({
                                                        id: _this.data[i].id,
                                                        // eno: _this.data[i].eno,
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
                    }
                }
              }
          }else if(this.edit=='uneditable'){
            for(let i =0;i<this.data.length;i++){
              if(this.data[i].types=='input'){
                  this.Columns.push({
                          title: this.data[i].name,
                          key: 'e'+this.data[i].id,
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
                                         autosize: true,
                                         disabled: true
                                    },
                                    on:{
                                      input:function(e){
                                          let x = 0;
                                          for(let k=0;k<_this.m.length;k++){
                                              if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                _this.m[k].grade=e;
                                                x=1;
                                              }
                                          }
                                          if(x==0){
                                            _this.m.push({
                                                    id: _this.data[i].id,
                                                    // eno: _this.data[i].eno,
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
                let array = this.data[i].description.split('@');
                let arr = [];
                for(let n=0;n<array.length;n++){
                  let a = array[n].split('-');
                  arr.push(a[0]);
                }
                  this.Columns.push({
                          title: this.data[i].name,
                          key: 'e'+this.data[i].id,
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
                                        placeholder: params.row[params.column.key]==''?'请选择':params.row[params.column.key],
                                        disabled: true
                                      },
                                      on: {
                                        input:(e) => {
                                          let x = 0;
                                          for(let k=0;k<_this.m.length;k++){
                                              if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                _this.m[k].grade=e;
                                                x=1;
                                              }
                                          }
                                          if(x==0){
                                            _this.m.push({
                                                    id: _this.data[i].id,
                                                    // eno: _this.data[i].eno,
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
          }

          
          // this.Columns.push({
          //   title: "操作",
          //   key: "action",
          //   align: "center",
          //   render: (h, params) => {
          //         return h('div', [
          //             h('Button', {
          //                 props: {
          //                     type: 'primary',
          //                     size: 'middle'
          //                 },
          //                 style: {
          //                     marginRight: '5px'
          //                 },
          //                 on: {
          //                     click: () => {
          //                         this.save(params.row.id);
          //                     }
          //                 }
          //             }, '保存')
          //         ]);
          //     }
          // })
        })
        .catch(error => {
          console.log(error);
        });
      },
      refresh(){
        this.m=[];
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
        this.$axios.post("/get_classgrade",{
          params:{
            course_id:this.course_id,
            class_id:this.class_id,
            term:this.option,
          }
        }).then(res => {
          this.data = res.data.a;
          this.studentList = res.data.b;
          this.edit = res.data.c;

          if(this.edit=='editable'){
              for(let i =0;i<this.data.length;i++){
                if(this.data[i].children.length==0){
                    if(this.data[i].types=='input'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
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
                                                  if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                    _this.m[k].grade=e;
                                                    x=1;
                                                  }
                                              }
                                              if(x==0){
                                                _this.m.push({
                                                        id: _this.data[i].id,
                                                        // eno: _this.data[i].eno,
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
                      let array = this.data[i].description.split('@');
                      let arr = [];
                      for(let n=0;n<array.length;n++){
                        let a = array[n].split('-');
                        arr.push(a[0]);
                      }
                        this.Columns.push({
                                title: this.data[i].name,
                                key: 'e'+this.data[i].id,
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
                                                    if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                      _this.m[k].grade=e;
                                                      x=1;
                                                    }
                                                }
                                                if(x==0){
                                                  _this.m.push({
                                                          id: _this.data[i].id,
                                                          // eno: _this.data[i].eno,
                                                          stu:params.row.id,
                                                          grade:e,
                                                        })
                                                }
                                              },
                                            }
                                          },a);
                              }
                        },);
                    }else if(this.data[i].types=='homework'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
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
                                                  if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                    _this.m[k].grade=e;
                                                    x=1;
                                                  }
                                              }
                                              if(x==0){
                                                _this.m.push({
                                                        id: _this.data[i].id,
                                                        // eno: _this.data[i].eno,
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
                    }
                }
              }
          }else if(this.edit=='uneditable'){
            for(let i =0;i<this.data.length;i++){
              if(this.data[i].types=='input'){
                  this.Columns.push({
                          title: this.data[i].name,
                          key: 'e'+this.data[i].id,
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
                                         autosize: true,
                                         disabled: true
                                    },
                                    on:{
                                      input:function(e){
                                          let x = 0;
                                          for(let k=0;k<_this.m.length;k++){
                                              if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                _this.m[k].grade=e;
                                                x=1;
                                              }
                                          }
                                          if(x==0){
                                            _this.m.push({
                                                    id: _this.data[i].id,
                                                    // eno: _this.data[i].eno,
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
                let array = this.data[i].description.split('@');
                let arr = [];
                for(let n=0;n<array.length;n++){
                  let a = array[n].split('-');
                  arr.push(a[0]);
                }
                  this.Columns.push({
                          title: this.data[i].name,
                          key: 'e'+this.data[i].id,
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
                                        placeholder: params.row[params.column.key]==''?'请选择':params.row[params.column.key],
                                        disabled: true
                                      },
                                      on: {
                                        input:(e) => {
                                          let x = 0;
                                          for(let k=0;k<_this.m.length;k++){
                                              if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
                                                _this.m[k].grade=e;
                                                x=1;
                                              }
                                          }
                                          if(x==0){
                                            _this.m.push({
                                                    id: _this.data[i].id,
                                                    // eno: _this.data[i].eno,
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
          }

          
          // this.Columns.push({
          //   title: "操作",
          //   key: "action",
          //   align: "center",
          //   render: (h, params) => {
          //         return h('div', [
          //             h('Button', {
          //                 props: {
          //                     type: 'primary',
          //                     size: 'middle'
          //                 },
          //                 style: {
          //                     marginRight: '5px'
          //                 },
          //                 on: {
          //                     click: () => {
          //                         this.save(params.row.id);
          //                     }
          //                 }
          //             }, '保存')
          //         ]);
          //     }
          // })
        })
        .catch(error => {
          console.log(error);
        });
      },
      // backcourse(){
      //   this.class1='';
      //   this.course='';
      //   this.Columns=[
      //   {
      //     title: "学号",
      //     key: "sno",
      //     width: 110
      //   },
      //   {
      //     title: "姓名",
      //     key: "name",
      //     align: "center"
      //   },                       
      // ];
      // },
      save(mm){
          if(mm==1){
              this.$axios.patch('/inputclassgrade', {
                  params: {
                      courses_id: this.course_id,
                      class_id: this.class_id,
                      term: this.option,
                      eval: this.m,
                      status: mm
                  }
              }).then(function(res) {              
                  for(let i=0;i<res.data.length;i++){
                    for(let j = 0;j<this.studentList.length;j++){
                      if(res.data[i].stu==this.studentList[j].id){
                        this.studentList[j][('e'+res.data[i].id)]=res.data[i].grade;
                        break;
                      }
                    }
                  }
                  console.log(this.studentList);
                  this.$Message.info('提交成功');
              }.bind(this))
              .catch(function(error) {
                  console.log(error)
              });
          }else if(mm==2){
            this.$Modal.confirm({
                    title: '提交成绩',
                    content: '<p>确定要提交此课程此班的成绩吗？提交后将不能再修改！！！</p>',
                    onOk: () => {
                        this.$axios.patch('/inputclassgrade', {
                            params: {
                                courses_id: this.course_id,
                                class_id: this.class_id,
                                term: this.option,
                                eval: this.m,
                                status: mm
                            }
                        }).then(function(res) {              
                            for(let i=0;i<res.data.length;i++){
                              for(let j = 0;j<this.studentList.length;j++){
                                if(res.data[i].stu==this.studentList[j].id){
                                  this.studentList[j][('e'+res.data[i].id)]=res.data[i].grade;
                                  break;
                                }
                              }
                            }
                            console.log(this.studentList);
                            this.$Message.info('提交成功');
                            this.refresh();
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
                       },
                    onCancel: () => { this.$Message.info('取消'); }});
              
          }
      }      
  }
};
</script>
