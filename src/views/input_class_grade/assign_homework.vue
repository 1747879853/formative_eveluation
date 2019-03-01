<template>    
<Card>
    <p slot="title" style="height:32px">
        <Icon type="ios-list"></Icon>
        课堂成绩录入&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前学期：
            <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
                <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
    </p>
    <div>
        <p style="font-size:18px">请选择并布置作业:</p>
        <!-- <div v-for="(item, index) in classcourseList" :key="index" style="padding:10px">
            {{item.name}}:
            <div v-for="(course, index1) in item.course" :key="index1" style="padding:10px">
                <Button @click="selectCourse(item,course)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{course.name}}</Button>
            </div>
            <!-- <Button @click="selectCourse(item)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{item.name}}</Button> -->
        </div> -->
    </div>                         
</Card>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      term:[],
      option:'',
      data:[],
    };
  },
  computed: {
  },
  mounted() {
      this.$axios.get("/termList").then( res =>{
            this.term = res.data;
        }).catch(error =>{
            console.log(error);
        });
  },
  methods:{
      selected() {
          this.$axios.get("/tea_homework", {
              params: {
                  term:this.option,
              }
          }).then(res => {
            this.data = res.data;
            // console.log(res.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, 
      // selectCourse(classes,course){
      //   this.m=[];
      //   this.class1=classes.name;
      //   this.class_id=classes.id;
      //   this.course=course.name;
      //   this.course_id=course.id;
      //   this.$axios.post("/get_classgrade",{
      //     params:{
      //       course_id:course.id,
      //       class_id:classes.id,
      //       term:this.option,
      //     }
      //   }).then(res => {
      //     this.data = res.data.a;
      //     this.studentList = res.data.b;
      //     this.edit = res.data.c;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // },
      // save(mm){
      //         this.$axios.patch('/inputclassgrade', {
      //             params: {
      //                 courses_id: this.course_id,
      //                 class_id: this.class_id,
      //                 term: this.option,
      //                 eval: this.m,
      //                 status: mm
      //             }
      //         }).then(function(res) {              
      //             for(let i=0;i<res.data.length;i++){
      //               for(let j = 0;j<this.studentList.length;j++){
      //                 if(res.data[i].stu==this.studentList[j].id){
      //                   this.studentList[j][('e'+res.data[i].id)]=res.data[i].grade;
      //                   break;
      //                 }
      //               }
      //             }
      //             console.log(this.studentList);
      //             this.$Message.info('提交成功');
      //         }.bind(this))
      //         .catch(function(error) {
      //             console.log(error)
      //         });
      // }      
  }
};
</script>
