<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        课堂成绩录入&nbsp;&nbsp;&nbsp;
    </p>
    <div v-if="course==''">
        <p style="height:25px">请选择课程:</p>
        <div v-for="(item, index) in courseList" :key="index" style="padding:10px">
            <Button @click="selectCourse(item.id)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item.name}}</Button>
        </div>
    </div>
    <div v-if="course!=''&&class1==''">
        <p style="height:25px">请选择班级:</p>
        <div v-for="(item, index) in classList" :key="index" style="padding:10px">
            <Button @click="selectClass(item.id)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item.name}}</Button>
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
      courseList:[],
      classList:[],
      studentList:[],
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
      this.$axios.get("/courseList").then(res => {
        this.courseList = res.data;
        console.log(res.data)
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
      selectCourse(id){
        this.course=id;
        this.$axios.get("/classList").then(res => {
          this.classList = res.data;
          console.log(res.data)
        })
        .catch(error => {
          console.log(error);
        });
      },
      selectClass(id){
        this.class1=id;
        this.$axios.get("/inputclassgrade").then(res => {
          // this.studentList = res.data;
        })
        .catch(error => {
          console.log(error);
        });


        this.studentList =[{id:'13',name:'学生13',evaluation1:'1',evaluation2:'1',evaluation3:'1'},
                   {id:'14',name:'学生14',evaluation1:'2',evaluation2:'2',evaluation3:'2'},
                   {id:'15',name:'学生15',evaluation1:'3',evaluation2:'3',evaluation3:'3'}]
      }     
  }
};
</script>
