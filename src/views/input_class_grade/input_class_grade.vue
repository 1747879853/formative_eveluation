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
              <Button v-if="course!=''&&edit!='uneditable'&&u_agent == 'pc'" @click="save(1)" class="ivu-btn ivu-btn-primary ivu-btn-small ">暂存</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button v-if="course!=''&&edit!='uneditable'" @click="save(2)" class="ivu-btn ivu-btn-primary ivu-btn-small">提交</Button>
          </Col>
      </Row>
      <Row style="margin-top: 10px;" v-if="edit=='editable'">
          <Col span="3"><Icon type="ios-film-outline"></Icon>
              一级评价指标：
          </Col>
          <Col>
              <CheckboxGroup v-model="checkAllGroup" @on-change="refreshTable">
                  <Checkbox v-for="(item,index) in data1" :key="index" :label="item.name" v-if="item.parent_id==0"></Checkbox>
              </CheckboxGroup>
          </Col>
        
      </Row>
      <Row v-if="u_agent == 'pc' ">  
          <Table  :columns="Columns" :data="studentList" border style="width: 100%;"></Table>
      </Row>

      <Row v-if="u_agent == 'mobile' ">  
        <Col v-for="(item,index) in studentList" :key="index" :xs="8" :sm="6" :md="6" :lg="3">
          <div  @click="selectstu(item)">
          <Card style="margin:5px 5px;">
            <p slot="title" >
                <Avatar icon="ios-person" size="small" style="color: blue;"/>
                {{item.name}}&nbsp;/&nbsp;{{item.sno}}
            </p>
            
            <p>其他信息1</p>
            <p>其他信息2</p>
          </Card>
          </div>
        </Col>
      </Row>

    </Row>
  </Card> 

    <Modal
      v-model="modal1"
      :title="'学生'+student[0].name"
      width="50%"
      :mask-closable="false"
      >
        <table v-if="edit!='uneditable'" style="padding:10px;font-family:consolas;font-size:20px;width:100%;">
            <tr style="height:35px"><td style="float:left">学号:</td><td style="float:right">{{student[0].sno}}</td></tr>
            <tr style="height:35px"><td style="float:left">姓名:</td><td style="float:right">{{student[0].name}}</td></tr>
            <tr style="height:35px" v-for="(items,indexs) in data"><td style="float:left">{{items.name}}:</td>
            <td style="float:right">
            <Input v-if="items.types=='score'" style="width:100px" v-model="student[0]['e'+items.id]" @on-change="change(items,student[0])"></Input>
            <Select v-if="items.types=='grade'||items.types=='classroom_question'" :placeholder="student[0]['e'+items.id]==''?'请选择':student[0]['e'+items.id]" style="width:100px" v-model="student[0]['e'+items.id]" @on-change="change(items,student[0])">
              <Option v-for="(op,i) in items.description.split('@')" :key="op" :value="op.split('-')[0]"></Option>
            </Select>
            <Input v-if="items.types=='text-score'" style="width:60px" v-model="student[0]['e'+items.id]" @on-change="change(items,student[0])"></Input>
            <Button v-if="items.types=='text-score'" type="primary" size="small" @click="show_modal22(items,student[0])">查看</Button>
            </td></tr>
            <tr>&nbsp;&nbsp;&nbsp;</tr>
            <tr style="height:35px"><td style="float:left">操作:</td><td style="float:right">
            <Button type="primary" size="small" @click="save(1)">暂存</Button>
          </td></tr>
        </table>
        <table v-if="edit=='uneditable'" style="padding:10px;font-family:consolas;font-size:20px;width:100%;">
            <tr style="height:35px"><td style="float:left">学号:</td><td style="float:right">{{student[0].sno}}</td></tr>
            <tr style="height:35px"><td style="float:left">姓名:</td><td style="float:right">{{student[0].name}}</td></tr>
            <tr style="height:35px" v-for="(items,indexs) in data"><td style="float:left">{{items.name}}:</td>
            <td style="float:right">
            <Input v-if="items.types=='score'" disabled style="width:100px" v-model="student[0]['e'+items.id]" @on-change="change(items,student[0])"></Input>
            <Select v-if="items.types=='grade'||items.types=='classroom_question'" disabled :placeholder="student[0]['e'+items.id]==''?'请选择':student[0]['e'+items.id]" style="width:100px" v-model="student[0]['e'+items.id]" @on-change="change(items,student[0])">
              <Option v-for="(op,i) in items.description.split('@')" :key="op" :value="op.split('-')[0]"></Option>
            </Select>
            <Input v-if="items.types=='text-score'" disabled style="width:60px" v-model="student[0]['e'+items.id]" @on-change="change(items,student[0])"></Input>
            <Button v-if="items.types=='text-score'" type="primary" size="small" @click="show_modal22(items,student[0])">查看</Button>
            </td></tr>
        </table>
        <div slot="footer"></div>
    </Modal>

    <Modal
      v-model="modal"
      title="查看学生作业"
      @on-ok="save_tea_comment">
      <table>            
      <tr><td>作业名称:</td><td>{{homework.title}}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>完成时间:</td><td>{{homework.finish_time.substring(0,10)}}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>学生姓名:</td><td>{{homework.stu_name}}</td></tr>
      </table>
      作业内容：
      <div v-html='homework.content' style="background-color:cornsilk;padding:10px"></div>
      
      <Checkbox v-model="homework.excellent">选为优秀作业</Checkbox><br/>
      教师评语：
      
      <Input v-model="homework.tea_comment" clearable type="textarea"></Input>
    </Modal>
</div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: "input_student_grade",
  data() {
    return {
      // content:'a11111',
      
      
      now_stu_id:'',
      now_courses_id:'',
      now_term:'',
      now_eva:'',
      tea_comment: '',
      u_agent: 'pc',
      classcourseList:[],
      classList:[],
      studentList:[],
      course:'',
      course_id:'',
      class_id:'',
      class1:'',
      student:[{name:''}],
      Columns: [
        {
              title: "姓名",
              key: "name",
              fixed:'left',
              align: "center",
              width: 110,             
            }, 
            {
              title: "学号",
              key: "sno",
              fixed: 'left',
              width: 110,              
            },                      
      ],
      option:'',
      term:[],
      m:[],
      data:[],
      data1:[],
      edit:'',
      modal:false,
      modal1: false,
      homework:{
        title:'',
        finish_time:'',
        stu_name:'',
        content:'',
        tea_comment: '',
        excellent:false
      },
      checkAllGroup:[],
      table:[],
    };
  },
  components: {
  },
  mounted() { 
      this.u_agent = Cookies.get('user_agent');   
      this.$axios.get("/termList").then( res =>{
            this.term = res.data.a;  //所有学期选项
            this.option = res.data.b;  //当前学期是哪个
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
      refreshTable(data){
        this.Columns=[
            {
              title: "姓名",
              key: "name",
              fixed:'left',
              align: "center",
              width: 110,
            }, 
            {
              title: "学号",
              key: "sno",
              fixed: 'left',
              width: 110,              
            },                       
        ];
        this.table=[];
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < this.data.length; j++) {
            if (this.data[j].name.indexOf(data[i]) != -1) {
              this.table.push(this.data[j])
            }
          }
        }
        // console.log(table);
        if(this.edit=='editable'){
              for(let i =0;i<this.table.length;i++){
                if(this.table[i].children.length==0){
                    if(this.table[i].types=='score'){
                      this.Columns.push({
                              title: this.table[i].name,
                              key: 'e'+this.table[i].id,
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
                                                        id: _this.table[i].id,
                                                        // eno: _this.table[i].eno,
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
                    }else if(this.table[i].types=='grade'){
                      let array = this.table[i].description.split('@');
                      let arr = [];
                      for(let n=0;n<array.length;n++){
                        let a = array[n].split('-');
                        arr.push(a[0]);
                      }
                        this.Columns.push({
                                title: this.table[i].name,
                                key: 'e'+this.table[i].id,
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
                                                          id: _this.table[i].id,
                                                          // eno: _this.table[i].eno,
                                                          stu:params.row.id,
                                                          grade:e,
                                                        })
                                                }
                                              },
                                            }
                                          },a);
                              }
                        },);
                    }else if(this.table[i].types=='classroom_question'){
                      let array = this.table[i].description.split('@');
                      let arr = [];
                      for(let n=0;n<array.length;n++){
                        let a = array[n].split('-');
                        arr.push(a[0]);
                      }
                        this.Columns.push({
                                title: this.table[i].name,
                                key: 'e'+this.table[i].id,
                                align: "center",
                                width: 180,
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
                                  return h('div', [
                                  h('Select', {
                                            style: {
                                                width: '60%'
                                            },
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
                                                          id: _this.table[i].id,
                                                          // eno: _this.table[i].eno,
                                                          stu:params.row.id,
                                                          grade:e,
                                                        })
                                                }
                                              },
                                            }
                                          },a),
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
                                                this.clean(params);
                                            }
                                        }
                                    }, '清空'),
                                  ])
                              }
                        },);
                    }else if(this.table[i].types=='text-score'){
                      this.Columns.push({
                              title: this.table[i].name,
                              key: 'e'+this.table[i].id,
                              align: "center",
                              width: 150,
                              render: (h, params) => {
                                let _this = this;
                                if (params.row[params.column.key+'status']==0) {
                                    return h('div', [
                                        h('Input', {
                                            style: {
                                                width: '60%'
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
                                                            id: _this.table[i].id,
                                                            // eno: _this.table[i].eno,
                                                            stu:params.row.id,
                                                            grade:e,
                                                          })
                                                  }
                                              },                                  
                                            }
                                            }),
                                        h('Button', {
                                            props: {
                                                // type: 'error',
                                                size: 'small'
                                            },
                                            style: {
                                                marginLeft: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    // this.show_modal2(params);
                                                    this.$Message.info('作业未提交！');
                                                }
                                            }
                                        }, '查看'),
                                    ]);
                                } else {
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
                                                            id: _this.table[i].id,
                                                            // eno: _this.table[i].eno,
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
                                
                              }
                      },);
                    }
                }
              }
          }else if(this.edit=='uneditable'){
            for(let i =0;i<this.table.length;i++){
              if(this.table[i].types=='score'){
                  this.Columns.push({
                          title: this.table[i].name,
                          key: 'e'+this.table[i].id,
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
                                                    id: _this.table[i].id,
                                                    // eno: _this.table[i].eno,
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
              }else if(this.table[i].types=='grade'){
                let array = this.table[i].description.split('@');
                let arr = [];
                for(let n=0;n<array.length;n++){
                  let a = array[n].split('-');
                  arr.push(a[0]);
                }
                  this.Columns.push({
                          title: this.table[i].name,
                          key: 'e'+this.table[i].id,
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
                                                    id: _this.table[i].id,
                                                    // eno: _this.table[i].eno,
                                                    stu:params.row.id,
                                                    grade:e,
                                                  })
                                          }
                                        },
                                      }
                                    },a);
                        }
                  },);
              }else if(this.table[i].types=='classroom_question'){
                let array = this.table[i].description.split('@');
                let arr = [];
                for(let n=0;n<array.length;n++){
                  let a = array[n].split('-');
                  arr.push(a[0]);
                }
                  this.Columns.push({
                          title: this.table[i].name,
                          key: 'e'+this.table[i].id,
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
                                                    id: _this.table[i].id,
                                                    // eno: _this.table[i].eno,
                                                    stu:params.row.id,
                                                    grade:e,
                                                  })
                                          }
                                        },
                                      }
                                    },a);
                        }
                  },);
              }else if(this.table[i].types=='text-score'){
                this.Columns.push({
                        title: this.table[i].name,
                        key: 'e'+this.table[i].id,
                        align: "center",
                        render: (h, params) => {
                          let _this = this;
                          if (params.row[params.column.key+'status']==0) {
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
                                                  id: _this.table[i].id,
                                                  // eno: _this.table[i].eno,
                                                  stu:params.row.id,
                                                  grade:e,
                                                })
                                        }
                                    },                                  
                                  }
                                  }),
                              h('Button', {
                                  props: {
                                      // type: 'error',
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
                          }else{
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
                                                  id: _this.table[i].id,
                                                  // eno: _this.table[i].eno,
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
                          
                      }
                },);
              }
            }
          }
      },
      selected() {
          this.Columns=[
            {
              title: "学号",
              key: "sno",
              fixed: 'left',
              width: 110
            },
            {
              title: "姓名",
              key: "name",
              fixed:'left',
              align: "center",
              width: 110
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
                  term:this.option, //选择的学期
              }
          }).then(res => {
            this.classcourseList = res.data;  //返回数据：该学期，当前用户（教师），所教的班级，和 课程
            // this.term = res.data.b;
            console.log(res.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, 
      selectCourse(classes,course){  //选择了 班级classes和课程course
        this.checkAllGroup=[];
        this.data1=[];
        this.table=[];
        this.m=[];
        this.Columns=[
            {
              title: "姓名",
              key: "name",
              fixed:'left',
              align: "center",
              width: 110,
            }, 
            {
              title: "学号",
              key: "sno",
              fixed: 'left',
              width: 110,              
            },                      
          ];
        localStorage.setItem('class',JSON.stringify(classes));
        localStorage.setItem('course',JSON.stringify(course));
        this.class1=classes.name;
        this.class_id=classes.id;
        this.course=course.name;
        this.course_id=course.id;
        this.$axios.post("/get_classgrade",{ //根据学期、班级、课程查成绩
          params:{
            course_id:course.id,
            class_id:classes.id,
            term:this.option,
          }
        }).then(res => {
          this.data1 = JSON.parse(JSON.stringify(res.data.a));
          console.log(this.data1)
          this.data = res.data.a;
          for (var i = 0; i < this.data.length; i++) {
            if(this.data[i].children.length){
              this.data.splice(i,1);
              i--;
            }
          }
          this.studentList = res.data.b;
          this.edit = res.data.c;

          if(this.edit=='uneditable'){
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
              }else if(this.data[i].types=='classroom_question'){
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
                          if (params.row[params.column.key+'status']==0) {
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
                                      // type: 'error',
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
                          }else{
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
                          
                      }
                },);
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
      refresh(){
        this.table=[];
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
              title: "姓名",
              key: "name",
              fixed:'left',
              align: "center",
              width: 110,
            }, 
            {
              title: "学号",
              key: "sno",
              fixed: 'left',
              width: 110,              
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

          // if(this.edit=='editable'){
          //     for(let i =0;i<this.data.length;i++){
          //       if(this.data[i].children.length==0){
          //           if(this.data[i].types=='score'){
          //             this.Columns.push({
          //                     title: this.data[i].name,
          //                     key: 'e'+this.data[i].id,
          //                     align: "center",
          //                     render: (h, params) => {
          //                       let _this = this;
          //                       return h('div', [
          //                           h('Input', {
          //                               // style: {
          //                               //     width: '200px'
          //                               // },
          //                               props:{
          //                                    value:params.row[params.column.key],
          //                                    autosize: true
          //                               },
          //                               on:{
          //                                 input:function(e){
          //                                     let x = 0;
          //                                     for(let k=0;k<_this.m.length;k++){
          //                                         if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                           _this.m[k].grade=e;
          //                                           x=1;
          //                                         }
          //                                     }
          //                                     if(x==0){
          //                                       _this.m.push({
          //                                               id: _this.data[i].id,
          //                                               // eno: _this.data[i].eno,
          //                                               stu:params.row.id,
          //                                               grade:e,
          //                                             })
          //                                     }
          //                                 },                                  
          //                               }
          //                               })
          //                       ]);
          //                   }
          //             },);
          //           }else if(this.data[i].types=='grade'){
          //             let array = this.data[i].description.split('@');
          //             let arr = [];
          //             for(let n=0;n<array.length;n++){
          //               let a = array[n].split('-');
          //               arr.push(a[0]);
          //             }
          //               this.Columns.push({
          //                       title: this.data[i].name,
          //                       key: 'e'+this.data[i].id,
          //                       align: "center",
          //                       // width: 140,
          //                       render: (h, params) => {
          //                         let _this = this;
          //                         let a=[];
          //                         for(let j = 0;j<arr.length;j++){
          //                             a.push(h('Option', {
          //                                 props: {
          //                                     value:arr[j],
          //                                 },
          //                                 }))
          //                         }
          //                         return h('Select', {
          //                                   props: {
          //                                     value: '',
          //                                     placeholder: params.row[params.column.key]==''?'请选择':params.row[params.column.key]
          //                                   },
          //                                   on: {
          //                                     input:(e) => {
          //                                       let x = 0;
          //                                       for(let k=0;k<_this.m.length;k++){
          //                                           if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                             _this.m[k].grade=e;
          //                                             x=1;
          //                                           }
          //                                       }
          //                                       if(x==0){
          //                                         _this.m.push({
          //                                                 id: _this.data[i].id,
          //                                                 // eno: _this.data[i].eno,
          //                                                 stu:params.row.id,
          //                                                 grade:e,
          //                                               })
          //                                       }
          //                                     },
          //                                   }
          //                                 },a);
          //                     }
          //               },);
          //           }else if(this.data[i].types=='classroom_question'){
          //             let array = this.data[i].description.split('@');
          //             let arr = [];
          //             for(let n=0;n<array.length;n++){
          //               let a = array[n].split('-');
          //               arr.push(a[0]);
          //             }
          //               this.Columns.push({
          //                       title: this.data[i].name,
          //                       key: 'e'+this.data[i].id,
          //                       align: "center",
          //                       // width: 140,
          //                       render: (h, params) => {
          //                         let _this = this;
          //                         let a=[];
          //                         for(let j = 0;j<arr.length;j++){
          //                             a.push(h('Option', {
          //                                 props: {
          //                                     value:arr[j],
          //                                 },
          //                                 }))
          //                         }
          //                         return h('Select', {
          //                                   props: {
          //                                     value: '',
          //                                     placeholder: params.row[params.column.key]==''?'请选择':params.row[params.column.key]
          //                                   },
          //                                   on: {
          //                                     input:(e) => {
          //                                       let x = 0;
          //                                       for(let k=0;k<_this.m.length;k++){
          //                                           if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                             _this.m[k].grade=e;
          //                                             x=1;
          //                                           }
          //                                       }
          //                                       if(x==0){
          //                                         _this.m.push({
          //                                                 id: _this.data[i].id,
          //                                                 // eno: _this.data[i].eno,
          //                                                 stu:params.row.id,
          //                                                 grade:e,
          //                                               })
          //                                       }
          //                                     },
          //                                   }
          //                                 },a);
          //                     }
          //               },);
          //           }else if(this.data[i].types=='text-score'){
          //             this.Columns.push({
          //                     title: this.data[i].name,
          //                     key: 'e'+this.data[i].id,
          //                     align: "center",
          //                     render: (h, params) => {
          //                       let _this = this;
          //                       return h('div', [
          //                           h('Input', {
          //                               style: {
          //                                   width: '30%'
          //                               },
          //                               props:{
          //                                    value:params.row[params.column.key],
          //                                    autosize: true
          //                               },
          //                               on:{
          //                                 input:function(e){
          //                                     let x = 0;
          //                                     for(let k=0;k<_this.m.length;k++){
          //                                         if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                           _this.m[k].grade=e;
          //                                           x=1;
          //                                         }
          //                                     }
          //                                     if(x==0){
          //                                       _this.m.push({
          //                                               id: _this.data[i].id,
          //                                               // eno: _this.data[i].eno,
          //                                               stu:params.row.id,
          //                                               grade:e,
          //                                             })
          //                                     }
          //                                 },                                  
          //                               }
          //                               }),
          //                           h('Button', {
          //                               props: {
          //                                   type: 'primary',
          //                                   size: 'small'
          //                               },
          //                               style: {
          //                                   marginLeft: '5px'
          //                               },
          //                               on: {
          //                                   click: () => {
          //                                       this.show_modal2(params);
          //                                   }
          //                               }
          //                           }, '查看'),
          //                       ]);
          //                   }
          //             },);
          //           }
          //       }
          //     }
          // }else if(this.edit=='uneditable'){
          //   for(let i =0;i<this.data.length;i++){
          //     if(this.data[i].types=='score'){
          //         this.Columns.push({
          //                 title: this.data[i].name,
          //                 key: 'e'+this.data[i].id,
          //                 align: "center",
          //                 render: (h, params) => {
          //                   let _this = this;
          //                   return h('div', [
          //                       h('Input', {
          //                           // style: {
          //                           //     width: '200px'
          //                           // },
          //                           props:{
          //                                value:params.row[params.column.key],
          //                                autosize: true,
          //                                disabled: true
          //                           },
          //                           on:{
          //                             input:function(e){
          //                                 let x = 0;
          //                                 for(let k=0;k<_this.m.length;k++){
          //                                     if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                       _this.m[k].grade=e;
          //                                       x=1;
          //                                     }
          //                                 }
          //                                 if(x==0){
          //                                   _this.m.push({
          //                                           id: _this.data[i].id,
          //                                           // eno: _this.data[i].eno,
          //                                           stu:params.row.id,
          //                                           grade:e,
          //                                         })
          //                                 }
          //                             },                                  
          //                           }
          //                           })
          //                   ]);
          //               }
          //         },);
          //     }else if(this.data[i].types=='grade'){
          //       let array = this.data[i].description.split('@');
          //       let arr = [];
          //       for(let n=0;n<array.length;n++){
          //         let a = array[n].split('-');
          //         arr.push(a[0]);
          //       }
          //         this.Columns.push({
          //                 title: this.data[i].name,
          //                 key: 'e'+this.data[i].id,
          //                 align: "center",
          //                 // width: 140,
          //                 render: (h, params) => {
          //                   let _this = this;
          //                   let a=[];
          //                   for(let j = 0;j<arr.length;j++){
          //                       a.push(h('Option', {
          //                           props: {
          //                               value:arr[j],
          //                           },
          //                           }))
          //                   }
          //                   return h('Select', {
          //                             props: {
          //                               value: '',
          //                               placeholder: params.row[params.column.key]==''?'请选择':params.row[params.column.key],
          //                               disabled: true
          //                             },
          //                             on: {
          //                               input:(e) => {
          //                                 let x = 0;
          //                                 for(let k=0;k<_this.m.length;k++){
          //                                     if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                       _this.m[k].grade=e;
          //                                       x=1;
          //                                     }
          //                                 }
          //                                 if(x==0){
          //                                   _this.m.push({
          //                                           id: _this.data[i].id,
          //                                           // eno: _this.data[i].eno,
          //                                           stu:params.row.id,
          //                                           grade:e,
          //                                         })
          //                                 }
          //                               },
          //                             }
          //                           },a);
          //               }
          //         },);
          //     }else if(this.data[i].types=='classroom_question'){
          //       let array = this.data[i].description.split('@');
          //       let arr = [];
          //       for(let n=0;n<array.length;n++){
          //         let a = array[n].split('-');
          //         arr.push(a[0]);
          //       }
          //         this.Columns.push({
          //                 title: this.data[i].name,
          //                 key: 'e'+this.data[i].id,
          //                 align: "center",
          //                 // width: 140,
          //                 render: (h, params) => {
          //                   let _this = this;
          //                   let a=[];
          //                   for(let j = 0;j<arr.length;j++){
          //                       a.push(h('Option', {
          //                           props: {
          //                               value:arr[j],
          //                           },
          //                           }))
          //                   }
          //                   return h('Select', {
          //                             props: {
          //                               value: '',
          //                               placeholder: params.row[params.column.key]==''?'请选择':params.row[params.column.key],
          //                               disabled: true
          //                             },
          //                             on: {
          //                               input:(e) => {
          //                                 let x = 0;
          //                                 for(let k=0;k<_this.m.length;k++){
          //                                     if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                       _this.m[k].grade=e;
          //                                       x=1;
          //                                     }
          //                                 }
          //                                 if(x==0){
          //                                   _this.m.push({
          //                                           id: _this.data[i].id,
          //                                           // eno: _this.data[i].eno,
          //                                           stu:params.row.id,
          //                                           grade:e,
          //                                         })
          //                                 }
          //                               },
          //                             }
          //                           },a);
          //               }
          //         },);
          //     }else if(this.data[i].types=='text-score'){
          //             this.Columns.push({
          //                     title: this.data[i].name,
          //                     key: 'e'+this.data[i].id,
          //                     align: "center",
          //                     render: (h, params) => {
          //                       let _this = this;
          //                       return h('div', [
          //                           h('Input', {
          //                               style: {
          //                                   width: '30%'
          //                               },
          //                               props:{
          //                                    value:params.row[params.column.key],
          //                                    autosize: true,
          //                                    disabled: true
          //                               },
          //                               on:{
          //                                 input:function(e){
          //                                     let x = 0;
          //                                     for(let k=0;k<_this.m.length;k++){
          //                                         if(('e'+_this.m[k].id)==params.column.key&&_this.m[k].stu==params.row.id){
          //                                           _this.m[k].grade=e;
          //                                           x=1;
          //                                         }
          //                                     }
          //                                     if(x==0){
          //                                       _this.m.push({
          //                                               id: _this.data[i].id,
          //                                               // eno: _this.data[i].eno,
          //                                               stu:params.row.id,
          //                                               grade:e,
          //                                             })
          //                                     }
          //                                 },                                  
          //                               }
          //                               }),
          //                           h('Button', {
          //                               props: {
          //                                   type: 'primary',
          //                                   size: 'small'
          //                               },
          //                               style: {
          //                                   marginLeft: '5px'
          //                               },
          //                               on: {
          //                                   click: () => {
          //                                       this.show_modal2(params);
          //                                   }
          //                               }
          //                           }, '查看'),
          //                       ]);
          //                   }
          //             },);
          //           }
          //   }
          // }

          
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
      selectstu(item){
        this.modal1=true;
        var list = [];
        list.push(item);
        this.student=list;
        console.log(this.student)
      },
     
      show_modal2(p){
        this.modal=true;
        // console.log(p)
        this.homework.tea_comment = '';
        this.homework.title=p.column.title;        
        this.homework.stu_name=p.row.name;
        this.homework.excellent = false;
        this.now_stu_id = p.row.id;
        this.now_courses_id = this.course_id;
        this.now_term = this.option;
        this.now_eva=p.column.key.substring(1);

        this.$axios.get('/stu_homework_by_id', {
            params: {
                courses_id: this.course_id,
                term: this.option,
                eval: p.column.key.substring(1),
                stu_id: p.row.id,
            }
        }).then(function(res) {   
            console.log(res.data)
            this.homework.finish_time=res.data.finish_time;
            this.homework.content=res.data.content;  
            this.homework.tea_comment = res.data.tea_comment;
            this.homework.excellent = res.data.excellent;         
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });

      },
      
      clean(p){
        // console.log(p)
        this.$Modal.confirm({
                    title: '清空成绩',
                    content: '<p>确定要清空该项成绩吗？</p>',
                    onOk: () => {
                        this.$axios.patch('/inputclassgrade', {
                            params: {
                                courses_id: this.course_id,
                                class_id: this.class_id,
                                term: this.option,
                                eval: [{
                                        id: p.column.key.substring(1),
                                        stu: p.row.id,
                                        grade: '',
                                      }],
                                status: 1
                            }
                        }).then(function(res) {              
                            for(let i=0;i<res.data.a.length;i++){
                              for(let j = 0;j<this.studentList.length;j++){
                                if(res.data.a[i].stu==this.studentList[j].id){
                                  this.studentList[j][('e'+res.data.a[i].id)]=res.data.a[i].grade;
                                  break;
                                }
                              }
                            }
                            console.log(this.studentList);
                            this.modal1=false;
                            this.$Message.info('清空成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
                    },
                    onCancel: () => { this.$Message.info('取消'); }});
      },
      show_modal22(eva,stu){
        this.modal=true;
        // console.log(p)
        this.homework.title=eva.title;        
        this.homework.stu_name=stu.name;
        
        this.$axios.get('/stu_homework_by_id', {
            params: {
                courses_id: this.course_id,
                term: this.option,
                eval: eva.id,
                stu_id: stu.id,
            }
        }).then(function(res) {   
            this.homework.finish_time=res.data.finish_time;
            this.homework.content=res.data.content;           
            // console.log(res.data);
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
                  for(let i=0;i<res.data.a.length;i++){
                    for(let j = 0;j<this.studentList.length;j++){
                      if(res.data.a[i].stu==this.studentList[j].id){
                        this.studentList[j][('e'+res.data.a[i].id)]=res.data.a[i].grade;
                        break;
                      }
                    }
                  }
                  console.log(this.studentList);
                  this.modal1=false;
                  this.$Message.info('暂存成功');
                  this.m=[];
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
                            for(let i=0;i<res.data.a.length;i++){
                              for(let j = 0;j<this.studentList.length;j++){
                                if(res.data.a[i].stu==this.studentList[j].id){
                                  this.studentList[j][('e'+res.data.a[i].id)]=res.data.a[i].grade;
                                  break;
                                }
                              }
                            }
                            console.log(this.studentList);
                            this.$Message.info('提交成功');
                            this.m=[];
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
                  for(let i=0;i<res.data.a.length;i++){
                    for(let j = 0;j<this.studentList.length;j++){
                      if(res.data.a[i].stu==this.studentList[j].id){
                        this.studentList[j][('e'+res.data.a[i].id)]=res.data.a[i].grade;
                        break;
                      }
                    }
                  }
                  console.log(this.studentList);
                  this.m=[];
                  // this.$Message.info('提交成功');
              }.bind(this))
              .catch(function(error) {
                  console.log(error)
              });
          }
      },
      change(eva,stu){
          let x = 0;
          for(let k=0;k<this.m.length;k++){
              if(this.m[k].id==eva.id&&this.m[k].stu==stu.id){
                this.m[k].grade=stu['e'+eva.id];
                x=1;
              }
          }
          if(x==0){
            this.m.push({
              id: eva.id,
              // eno: eva.eno,
              stu: stu.id,
              grade:stu['e'+eva.id],
            })
          }
          // console.log(this.m);
      },
      save_tea_comment(){
        if(this.homework.excellent==null){
          this.homework.excellent = false
        }
        this.$axios.post('/tea_comment', {
                params: {
                    stu_id: this.now_stu_id,
                    tea_comment: this.homework.tea_comment,
                    courses_id: this.now_courses_id,
                    term: this.now_term,
                    eval: this.now_eva,
                    excellent: this.homework.excellent
                }
            }).then(function(res) { 
              if(res){  
                this.excellent = false
                console.log(res)
                this.$Message.info('评价成功');
              }else{
                 this.$Message.info('该作业未提交');
              }
            }.bind(this))
            .catch(function(error) {
                console.log(error)
                this.excellent = false
            });
      }     
       
  }
};
</script>
