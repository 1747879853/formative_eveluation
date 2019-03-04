<template>    
<Card style="min-height: 200px;">
    <p slot="title" style="height:32px">
        <Icon type="ios-list"></Icon>
        课程作业布置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前学期：
            <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
                <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
    </p>
      <div style="width:70%;display:inline-block">
        <p style="font-size:18px">请选择并布置作业:</p>
        <div v-for="(item, index) in data" :key="index" style="padding:10px">
            {{item.name}}:
            <div v-for="(hw, index1) in item.homework" :key="index1" style="padding:10px;width:100px;display:inline">
                <Button v-if="hw.assign==0" @click="selecthomework(item,hw)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{hw.name}}</Button>
                <Button v-if="hw.assign==1" @click="selecthomework(item,hw)" class="ivu-btn ivu-btn-success ivu-btn-big">{{hw.name}}</Button>
            </div>
            <!-- <div v-for="(cla, index) in item.class" :key="index2" style="padding:10px">
                {{cla.name}}:
                <div v-for="(clhw, index1) in cla.homework" :key="index3" style="padding:10px;width:100px;display:inline">
                    <Button @click="selecthomework(cla,item)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{clhw.name}}</Button>
                </div>                
            </div> -->            
        </div>
      </div>
        <Col style="width:28%;float:right;display:inline">
          图例：
          <div><Button shape="circle" class="ivu-btn ivu-btn-primary ivu-btn-big">&nbsp;</Button>&nbsp;&nbsp;&nbsp;未布置的作业</div>&nbsp;
          <div><Button shape="circle" class="ivu-btn ivu-btn-success ivu-btn-big">&nbsp;</Button>&nbsp;&nbsp;&nbsp;已布置的作业</div>
        </Col>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Card v-if="course!=''&&eva!=''">
            <p style="font-size:18px">当前已选择课程&nbsp;{{course.name}}&nbsp;的&nbsp;{{eva.name}}:</p> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <table style="width:50%">
              <tr><td>作业名称:</td><td>
              <Input v-model="homework.name" placeholder="请输入作业名称" clearable style="width: 300px"></Input></td></tr>
              <tr>&nbsp;</tr>
              <tr><td>作业要求:</td><td>                    
              <Input v-model="homework.demand" placeholder="请输入作业要求" clearable style="width: 300px"></Input></td></tr>
              <tr>&nbsp;</tr>
              <tr><td>开始时间:</td><td>
              <DatePicker v-model="homework.start_time" type="date" placeholder="请选择开始时间" style="width: 300px"></DatePicker></td></tr>
              <tr>&nbsp;</tr>
              <tr><td>截止时间:</td><td>
              <DatePicker v-model="homework.end_time" type="date" placeholder="请选择截止时间" style="width: 300px"></DatePicker></td></tr>
              <tr>&nbsp;</tr>
              <tr><td><Button v-if="eva.assign==0" @click="save(0)" class="ivu-btn ivu-btn-primary ivu-btn-big">发布作业</Button></td></tr>
              <tr><td><Button v-if="eva.assign==1" @click="save(1)" class="ivu-btn ivu-btn-success ivu-btn-big">修改作业</Button></td></tr>
            </table>      
        </Card>                        
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
      eva:'',
      course:'',
      homework:{
        name:'',
        demand:'',
        start_time:'',
        end_time:'',
      },
    };
  },
  computed: {
  },
  mounted() {
      this.$axios.get("/termList").then( res =>{
          this.term = res.data.a;
          this.option = res.data.b;
          this.selected();
      }).catch(error =>{
          console.log(error);
      });
  },
  methods:{
      selected() {
        this.homework={
          name:'',
          demand:'',
          start_time:'',
          end_time:'',
        };
        this.eva='';
        this.course='';
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
      selecthomework(course,eva){
        this.eva=eva;
        this.course=course;
        this.homework={
          name:'',
          demand:'',
          start_time:'',
          end_time:'',
        };
        if (eva.assign==1) {
          this.$axios.post('/tea_homework', {
              params: {
                  courses_id: this.course.id,
                  term: this.option,
                  eval_id: this.eva.id,
                  homework: 'get'
              }
          }).then(function(res) {              
              this.homework=res.data[0];
              // console.log(this.homework)
          }.bind(this))
          .catch(function(error) {
              console.log(error)
          });
        }        
      },
      save(mm){
          if(mm==0){
            this.$axios.post('/tea_homework', {
                  params: {
                      courses_id: this.course.id,
                      term: this.option,
                      eval_id: this.eva.id,
                      homework: this.homework
                  }
              }).then(function(res) {              
                  this.homework=res.data;
                  this.$Message.info('发布成功');
                  this.eva.assign=1;
              }.bind(this))
              .catch(function(error) {
                  console.log(error)
              });
          }else if(mm==1){
            this.$axios.patch('/tea_homework', {
                  params: {
                      courses_id: this.course.id,
                      term: this.option,
                      eval_id: this.eva.id,
                      homework: this.homework
                  }
              }).then(function(res) {              
                  this.homework=res.data[0];
                  this.$Message.info('修改成功');
              }.bind(this))
              .catch(function(error) {
                  console.log(error)
              });
          }
      }      
  }
};
</script>
