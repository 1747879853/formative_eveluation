<template>    
<Card style="min-height: 260px;">
    <p slot="title" style="height:32px">
        <Icon type="ios-list"></Icon>
        我的作业&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-if="classes!=null">当前学期：
            <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
                <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
        </span>
    </p>
    <div style="width:70%;display:inline-block">
      <p style="font-size:20px;padding:10px" v-if="classes!=null">
          {{classes.name}}&nbsp;&nbsp;&nbsp;{{user.name}}你好！&nbsp;&nbsp;&nbsp;你的作业情况如下：
      </p>
      <p style="font-size:20px;padding:10px" v-if="classes==null">
          {{user.name}}&nbsp;老师你好，此处只允许学生查看作业。&nbsp;&nbsp;&nbsp;
      </p>
      <div v-for="(item, index) in data" :key="index" style="padding:10px">
          {{item.name}}:
          <div v-for="(hw, index1) in item.homework" :key="index1" style="padding:10px;width:100px;display:inline">
              <Button v-if="hw.done==0||hw.done==1" @click="selecthomework(item,hw)" class="ivu-btn ivu-btn-primary ivu-btn-big">{{hw.name}}</Button>
              <Button v-if="hw.done==2" @click="selecthomework(item,hw)" class="ivu-btn ivu-btn-success ivu-btn-big">{{hw.name}}</Button>
              <Button v-if="hw.done==3" @click="selecthomework(item,hw)" class="ivu-btn ivu-btn-error ivu-btn-big">{{hw.name}}</Button>
          </div>
          <span v-if="item.homework.length==0">&nbsp;&nbsp;&nbsp;等待老师提交作业</span>            
      </div>
    </div> 
    <Col style="width:28%;float:right;display:inline">
      图例：
      <div><Button shape="circle" class="ivu-btn ivu-btn-primary ivu-btn-big">&nbsp;</Button>&nbsp;&nbsp;&nbsp;可提交的作业</div>&nbsp;
      <div><Button shape="circle" class="ivu-btn ivu-btn-success ivu-btn-big">&nbsp;</Button>&nbsp;&nbsp;&nbsp;已提交的作业</div>&nbsp;
      <div><Button shape="circle" class="ivu-btn ivu-btn-error ivu-btn-big">&nbsp;</Button>&nbsp;&nbsp;&nbsp;已超时的作业</div>
    </Col>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Card v-if="course!=''&&eva!=''">
        <p style="font-size:18px">当前已选择课程&nbsp;{{course.name}}&nbsp;的&nbsp;{{eva.name}}:</p> 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <table style="">
          <tr><td style="width:60px">作业名称:</td><td>{{homework.name}}</td></tr>
          <tr>&nbsp;</tr>
          <!-- <tr></tr>
          <tr>&nbsp;</tr> -->
          <tr><td style="width:60px">开始时间:</td><td>{{homework.start_time.substring(0,10)}}</td><td style="width:60px">截止时间:</td><td>{{homework.end_time.substring(0,10)}}</td></tr>
          <tr>&nbsp;</tr>  
          <tr><td style="width:60px">作业要求:</td><td><div v-html='homework.demand' style="background-color:cornsilk;padding:10px"></div></td></tr>
          <tr>&nbsp;</tr>        
        </table> 
        <wangeditor v-if="eva.done==1||eva.done==2" v-bind:content="content" v-bind:disabled="true" :catchData="catchData"></wangeditor>
        <wangeditor v-if="eva.done==0||eva.done==3" v-bind:content="content" v-bind:disabled="false" :catchData="catchData"></wangeditor>
        <div style="font-size:18px;padding:10px" v-if="eva.done==0"><span>该作业还未到可提交的时间！</span></div>
        <div style="padding:10px" v-if="eva.done==1"><Button @click="save(0)" class="ivu-btn ivu-btn-primary ivu-btn-big">提交作业</Button></div>
        <div style="padding:10px" v-if="eva.done==2"><Button @click="save(1)" class="ivu-btn ivu-btn-success ivu-btn-big">修改作业</Button></div>
        <div style="font-size:18px;padding:10px" v-if="eva.done==3"><span>该作业已经超时，无法提交！</span></div>    
    </Card>                       
</Card>
</template>

<script>
import wangeditor from './wangeditor'
export default {
  name: "user",
  data() {
    return {
      term:[],
      option:'',
      data:[],
      user:{},
      classes:{},
      eva:'',
      course:'',
      homework:'',
      content:'',
    };
  },
  components: {
    wangeditor
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
    catchData(value){
      this.content=value;      //在这里接受子组件传过来的参数，赋值给data里的参数
    },
    selected() {
        this.homework='';
        this.eva='';
        this.course='';
        this.$axios.get("/stu_homework", {
            params: {
                term:this.option,
            }
        }).then(res => {
          this.user = res.data.a;
          this.classes = res.data.b;
          this.data = res.data.c;
          // console.log(this.data)
        })
        .catch(error => {
          console.log(error);
        });
    },
    selecthomework(course,eva){
      this.eva=eva;
      this.course=course;
      this.homework=eva.homework[0];
      this.content="";
      if (eva.done>=2) {
        this.$axios.post('/stu_homework', {
            params: {
                th_id: this.eva.homework[0].id,
                content: 'get'
            }
        }).then(function(res) {   
          if(res.data.length>0){
            this.content=res.data[0].content;
          }else{
            this.content="无法输入作业内容"
          }    
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });
      }else if(eva.done==0){
        this.content="无法输入作业内容"
      }        
    }, 
    save(mm){
        if(mm==0){
          this.$axios.post('/stu_homework', {
                params: {
                    th_id: this.eva.homework[0].id,
                    content: this.content
                }
            }).then(function(res) {              
                this.content=res.data.content;
                this.$Message.info('提交成功');
                this.eva.done=2;
            }.bind(this))
            .catch(function(error) {
                console.log(error)
            });
        }else if(mm==1){
          this.$axios.patch('/stu_homework', {
                params: {
                    th_id: this.eva.homework[0].id,
                    content: this.content
                }
            }).then(function(res) {              
                this.content=res.data[0].content;
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
