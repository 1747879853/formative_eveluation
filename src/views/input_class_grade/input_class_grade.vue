<template>  
<div>  
<Card >
    <p slot="title" style="height:32px">
        <Icon type="ios-list"></Icon>
        选择学期：
        <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
            <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>        
    </p>
    <Row>
      <Col span="14">
          <div v-for="(item, index) in classcourseList" :key="index" style="padding:5px;">
              {{item.name}}:
              <div v-for="(course, index1) in item.course" :key="index1" style="padding:5px;width:100px;display:inline">
                  <Button v-if="course.status!=2" @click="selectCourse(item,course)" class="ivu-btn ivu-btn-primary ivu-btn-small">{{course.name}}</Button>
                  <Button v-if="course.status==2" @click="selectCourse(item,course)" class="ivu-btn ivu-btn-success ivu-btn-small">{{course.name}}</Button>
              </div>
          </div>
      </Col>
      <Col span="10">
        <Row>
          <Col span="4"> 图例： </Col>
          <Col span="20">
            <Button shape="circle" class="ivu-btn ivu-btn-primary ivu-btn-small">&nbsp;</Button>&nbsp;&nbsp;&nbsp;未提交成绩的课程
            <br>
            <Button shape="circle" class="ivu-btn ivu-btn-success ivu-btn-small">&nbsp;</Button>&nbsp;&nbsp;&nbsp;已提交成绩的课程
          </Col>
        </Row>
      </Col>
    </Row>

    <hr />
    <Row v-if="studentList.length > 0">
      <Row style="margin-top: 10px;">
          <Col span="10"><Icon type="ios-film-outline"></Icon>
              班级&nbsp;/&nbsp;课程：&nbsp;&nbsp;{{class1}}&nbsp;/&nbsp;{{course}}
          </Col>
          <Col span="14">
              <Button v-if="course!=''&&edit!='uneditable'" @click="save(1)" class="ivu-btn ivu-btn-primary ivu-btn-small ">暂存</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="course!=''&&edit!='uneditable'" @click="save(2)" class="ivu-btn ivu-btn-primary ivu-btn-small">提交</Button></Col>
      </Row>
      <Row>  
          
          <Table  :columns="Columns" :data="studentList" border height="500" style="width: 100%;"></Table>
      </Row>
    </Row>
  </Card> 
    <Modal
      v-model="modal"
      title="查看学生作业"
      >
      <table>            
      <tr><td>作业名称:</td><td>{{homework.title}}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>完成时间:</td><td>{{homework.finish_time.substring(0,10)}}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>学生姓名:</td><td>{{homework.stu_name}}</td></tr>
      </table>
      <!-- <Editor id="tinymce" v-model="content" disabled :init="editorInit"></Editor> -->
      作业内容：
      <div v-html='homework.content' style="background-color:cornsilk;padding:10px"></div>
    </Modal>
    <!-- <Editor id="tinymce" v-model="content" disabled :init="editorInit"></Editor> -->
</div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "user",
  data() {
    return {
      // content:'a11111',
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
          width: 120
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
      modal:false,
      homework:{
        title:'',
        finish_time:'',
        stu_name:'',
        content:'',
      },
      editorInit: {
        height: 300
      }
    };
  },
  components: {
    Editor:Editor
  },
  mounted() {      
      tinymce.init({})
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
  beforeDestroy: function (){
    this.save(3);
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
              title: "姓名",
              key: "name",
              align: "center",
              width: 110,
              fixed: 'left',
              
            }, 
            {
              title: "学号",
              key: "sno",
              width: 110,
              
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
                    if(this.data[i].types=='score'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
                              align: "center",
                              width: 80,
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
                    }else if(this.data[i].types=='grade'){
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
                                width: 120,
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
                    }else if(this.data[i].types=='text-score'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
                              align: "center",
                              width: 150,
                              render: (h, params) => {
                                let _this = this;
                                return h('div', [
                                    h('Input', {
                                        style: {
                                            width: '60%'
                                        },
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
                                        }),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginLeft: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show_modal2(params);
                                            }
                                        }
                                    }, '查看'),
                                ]);
                            }
                      },);
                    }
                }
              }
          }else if(this.edit=='uneditable'){
            for(let i =0;i<this.data.length;i++){
              if(this.data[i].types=='score'){
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
              }else if(this.data[i].types=='grade'){
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
              }else if(this.data[i].types=='text-score'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
                              align: "center",
                              render: (h, params) => {
                                let _this = this;
                                return h('div', [
                                    h('Input', {
                                        style: {
                                            width: '30%'
                                        },
                                        props:{
                                             value:params.row[params.column.key],
                                             autosize: true,
                                             disabled: true,
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
                                        }),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginLeft: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show_modal2(params);
                                            }
                                        }
                                    }, '查看'),
                                ]);
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
        // for (var i = 0; i < this.classcourseList.length; i++) {
        //   if (this.classcourseList[i].id==this.class_id) {
        //     for (var j = 0; j < this.classcourseList[i].length; j++) {
        //       if (this.classcourseList[i][j].id==this.course_id) {
        //         this.classcourseList[i][j].status=2;
        //         break;
        //       }
        //     }
        //     break;
        //   }
        // }
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
                    if(this.data[i].types=='score'){
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
                    }else if(this.data[i].types=='grade'){
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
                    }else if(this.data[i].types=='text-score'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
                              align: "center",
                              render: (h, params) => {
                                let _this = this;
                                return h('div', [
                                    h('Input', {
                                        style: {
                                            width: '30%'
                                        },
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
                                        }),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginLeft: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show_modal2(params);
                                            }
                                        }
                                    }, '查看'),
                                ]);
                            }
                      },);
                    }
                }
              }
          }else if(this.edit=='uneditable'){
            for(let i =0;i<this.data.length;i++){
              if(this.data[i].types=='score'){
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
              }else if(this.data[i].types=='grade'){
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
              }else if(this.data[i].types=='text-score'){
                      this.Columns.push({
                              title: this.data[i].name,
                              key: 'e'+this.data[i].id,
                              align: "center",
                              render: (h, params) => {
                                let _this = this;
                                return h('div', [
                                    h('Input', {
                                        style: {
                                            width: '30%'
                                        },
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
                                        }),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginLeft: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show_modal2(params);
                                            }
                                        }
                                    }, '查看'),
                                ]);
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
      show_modal2(p){
        this.modal=true;
        // console.log(p)
        this.homework.title=p.column.title;        
        this.homework.stu_name=p.row.name;
        this.$axios.get('/stu_homework_by_id', {
            params: {
                courses_id: this.course_id,
                term: this.option,
                eval: p.column.key.substring(1),
                stu_id: p.row.id,
            }
        }).then(function(res) {   
            this.homework.finish_time=res.data.finish_time;
            this.homework.content=res.data.content;           
            console.log(res.data);
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });

      },
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
                  this.$Message.info('暂存成功');
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
              
          }else if(mm=3&&this.edit!='uneditable'){
              this.$axios.patch('/inputclassgrade', {
                  params: {
                      courses_id: this.course_id,
                      class_id: this.class_id,
                      term: this.option,
                      eval: this.m,
                      status: 1
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
                  // this.$Message.info('提交成功');
              }.bind(this))
              .catch(function(error) {
                  console.log(error)
              });
          }
      }      
  }
};
</script>
