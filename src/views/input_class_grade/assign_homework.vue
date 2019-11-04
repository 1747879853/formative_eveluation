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
        <Card >
            <p v-if="course!=''&&eva!=''" style="font-size:18px">当前已选择课程&nbsp;{{course.name}}&nbsp;的&nbsp;{{eva.name}}:</p> 
            <p v-else="course!=''&&eva!=''" style="font-size:18px">请选择一门课程</p> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <table style="width:50%">
              <tr><td>作业名称:</td><td>
              <Input v-model="homework.name" placeholder="请输入作业名称" clearable style="width: 300px"></Input></td></tr>
              <!-- <tr>&nbsp;</tr>
              <tr><td>作业要求:</td><td>                    
              <Input v-model="homework.demand" placeholder="请输入作业要求" clearable style="width: 300px"></Input></td></tr> -->
              <tr>&nbsp;</tr>
              <tr><td>开始时间:</td><td>
              <DatePicker v-model="homework.start_time" placement="right-end" type="datetime" placeholder="请选择开始时间" style="width: 300px"></DatePicker></td></tr>
              <tr>&nbsp;</tr>
              <tr><td>截止时间:</td><td>
              <DatePicker v-model="homework.end_time" placement="right-end" type="datetime" placeholder="请选择截止时间" style="width: 300px"></DatePicker></td></tr>
              <tr>&nbsp;</tr>
              <tr><td>作业要求:</td><td>                    
                <div id="wangeditor" style="text-align:left"></div>         
              </td></tr>
              <tr>&nbsp;</tr>
              <tr><td><Button v-if="eva.assign==0" @click="save(0)" class="ivu-btn ivu-btn-primary ivu-btn-big">发布作业</Button></td></tr>
              <tr><td><Button v-if="eva.assign==1&&start_time" @click="save(1)" class="ivu-btn ivu-btn-success ivu-btn-big">修改作业</Button></td></tr>              
            </table>
            
            <!-- <Editor id="tinymce" v-model="content" :init="editorInit"></Editor> -->
            <p v-if="eva.assign==1&&!start_time">该作业已到开始时间，无法修改。</p>
        </Card>                        
</Card>
</template>

<script>
// import wangeditor from './wangeditor'
import E from 'wangeditor'
export default {
  name: "assign_homework",
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
      start_time:'',
      ed:'',
    };
  },
  components: {
    // wangeditor
  },
  mounted() {

    var editor = new E('#wangeditor')    //创建富文本实例
     editor.customConfig.onchange = (html) => {
       this.homework.demand = html
     }
     editor.customConfig.uploadImgServer = '/api/v1/save_hw_img'
     // editor.customConfig.uploadFileName = 'file'
     editor.customConfig.uploadImgHeaders = { 'Authorization':this.$store.state.token }
     editor.customConfig.menus = [     //菜单配置
       'head', //标题
       'list', // 列表
       'justify', // 对齐方式
       'bold', //粗体
       'fontSize', // 字号
       'italic', //斜体
       'underline', //下划线
       'image', // 插入图片
       'foreColor', // 文字颜色
       'undo', // 撤销
       'redo', // 重复
      ] 
           //下面是最重要的的方法
     editor.customConfig.uploadImgHooks = {
       before: function (xhr, editor, files) {
         // 图片上传之前触发
         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
         // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
         // return {
         //   prevent: true,
         //   msg: '放弃上传'
         // }
       },
       success: function (xhr, editor, result) {
         // 图片上传并返回结果，图片插入成功之后触发
         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
       this.imgUrl=Object.values(result.data).toString()
       },
       fail: function (xhr, editor, result) {
         // 图片上传并返回结果，但图片插入错误时触发
         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
       },
       error: function (xhr, editor) {
         // 图片上传出错时触发
         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
       },
       timeout: function (xhr, editor) {
         // 图片上传超时时触发
         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
       },
 
       // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
       // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
       customInsert: function (insertImg, result, editor) {
         // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
         // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
 
         // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
         let url = Object.values(result.data)   //result.data就是服务器返回的图片名字和链接
         for(let i =0;i<url.length;i++){
          JSON.stringify(url[i])  //在这里转成JSON格式
          insertImg(url[i])
         }
         // result 必须是一个 JSON 格式字符串！！！否则报错
       }
     }
      
      
     editor.create() 
     this.ed=editor;



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
        this.ed.txt.html(this.homework.demand);
        this.start_time='';
        if (eva.assign==1) {
          this.$axios.post('/tea_homework', {
              params: {
                  courses_id: this.course.id,
                  term: this.option,
                  eval_id: this.eva.id,
                  homework: 'get'
              }
          }).then(function(res) {              
              this.homework=res.data.a;
              this.ed.txt.html(this.homework.demand);
              this.start_time=res.data.b;
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
                  this.homework=res.data.a;
                  this.start_time=res.data.b;
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
                  this.homework=res.data.a;
                  this.start_time=res.data.b;
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
