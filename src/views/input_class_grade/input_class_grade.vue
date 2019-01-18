<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        课堂成绩录入&nbsp;&nbsp;&nbsp;
    </p>
    <div v-if="course==''">
        <p style="height:25px">请选择课程:</p>
        <div v-for="(item, index) in courseList" :key="index" style="padding:10px">
            <Button @click="selectCourse(item)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item}}</Button>
        </div>
    </div>
    <div v-if="course!=''&&class1==''">
        <p style="height:25px">请选择班级:</p>
        <div v-for="(item, index) in classList" :key="index" style="padding:10px">
            <Button @click="selectClass(item)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item}}</Button>
        </div>
    </div>
    <div v-if="course!=''&&class1!=''">
        <Table :columns="Columns" :data="studentList" style="width: 100%;"></Table>
    </div>                           
</Card>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      courseList:['英语1','英语2','英语3'],
      classList:['1班','2班','3班'],
      studentList:[{id:'1',name:'学生1',evaluation1:'1',evaluation2:'1',evaluation3:'1'},
                   {id:'2',name:'学生2',evaluation1:'2',evaluation2:'2',evaluation3:'2'},
                   {id:'3',name:'学生3',evaluation1:'3',evaluation2:'3',evaluation3:'3'}],
      course:'',
      class1:'',
      student:'',
      Columns: [
        {
          title: "学号",
          key: "id",
          width: 60
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "评价指标1",
          key: "evaluation1",
          align: "center",
          render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                style: {
                                    width: '100px'
                                },
                                })
                        ]);
                    }
        },
        {
          title: "评价指标2",
          key: "evaluation2",
          align: "center",
          render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                style: {
                                    width: '100px'
                                },
                                })
                        ]);
                    }
        },
        {
          title: "评价指标3",
          key: "evaluation3",
          align: "center",
          width: 140,
          render: (h, params) => {
                        return h('Select', [
                            h('Option', {
                                style: {
                                },
                                props: {
                                    value:'A'
                                },
                                }),
                            h('Option', {
                                style: {
                                },
                                props: {
                                    value:'B'
                                },
                                }),
                            h('Option', {
                                style: {
                                },
                                props: {
                                    value:'C'
                                },
                                }),
                            h('Option', {
                                style: {
                                },
                                props: {
                                    value:'D'
                                },
                                }),
                        ]);
                    }
        },        
      ],
    };
  },
  computed: {
  },
  mounted() {
      this.$axios.get("/courseList",{
        params: {
          teacherid:1,
        }
      }).then(res => {
        this.courseList = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
      selectCourse(item){
        this.course=item;
        this.$axios.get("/classList",{
          params: {
            courseid:this.course,
          }  
        }).then(res => {
          this.classList = res.data;
        })
        .catch(error => {
          console.log(error);
        });
      },
      selectClass(item){
        this.class1=item;
        this.$axios.get("/studentList",{
          params: {
            classid:this.class1,
          }
        }).then(res => {
          this.studentList = res.data;
        })
        .catch(error => {
          console.log(error);
        });
      }     
  }
};
</script>
