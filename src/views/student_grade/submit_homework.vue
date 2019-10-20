<template>  
<div>  
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
    <Card >
        <p v-if="course!=''&&eva!=''" style="font-size:18px">当前已选择课程&nbsp;{{course.name}}&nbsp;的&nbsp;{{eva.name}}:</p> 
        <p v-else="course!=''&&eva!=''" style="font-size:18px">请选择一份作业</p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <table>
          <tr><td style="width:60px">作业名称:</td><td>{{homework.name}}</td></tr>
          <tr>&nbsp;</tr>
          <!-- <tr></tr>
          <tr>&nbsp;</tr> -->
          <tr><td style="width:60px">开始时间:</td><td v-if="course!=''&&eva!=''">{{homework.start_time}}</td><td style="width:60px">截止时间:</td><td v-if="course!=''&&eva!=''">{{homework.end_time}}</td></tr>
          <tr>&nbsp;</tr>  
          <tr><td style="width:60px">作业要求:</td><td><div v-html='homework.demand' style="background-color:cornsilk;padding:10px"></div></td></tr>
          <tr>&nbsp;</tr>        
          <tr><td style="width:60px">教师评语:</td><td><div  style="background-color:cornsilk;padding:10px">{{tea_comment}}</div></td><td><div v-if="excellent==true"><p style="color:Red" font-family="Helvetica Neue">优秀作业</p></div></td></tr>
        </table> 
        <!-- <wangeditor v-if="eva.done==1||eva.done==2" v-bind:content="content" v-bind:disabled="true" :catchData="catchData"></wangeditor>
        <wangeditor v-if="eva.done==0||eva.done==3" v-bind:content="content" v-bind:disabled="false" :catchData="catchData"></wangeditor> -->
        <div id="wangeditor" style="text-align:left"></div>
        <div style="font-size:18px;padding:10px" v-if="eva.done==0"><span>该作业还未到可提交的时间！</span></div>
        <div style="padding:10px" v-if="eva.done==1"><Button @click="save(0)" class="ivu-btn ivu-btn-primary ivu-btn-big">暂存作业</Button>&nbsp;&nbsp;&nbsp;<Button @click="save(1)" class="ivu-btn ivu-btn-success ivu-btn-big">提交作业</Button></div>
        <div style="font-size:18px;padding:10px" v-if="eva.done==1">注意，提交作业后将无法修改！</div>
        <div style="font-size:18px;padding:10px" v-if="eva.done==2">作业已经提交，无法修改。</div>
        <div style="font-size:18px;padding:10px" v-if="eva.done==3"><span>该作业已经超时，无法提交！</span></div>
        <div><Button type="primary" icon="ios-search" @click="get_all_excellent_homework()">查看优秀作业</Button> </div>   
    </Card>                       
</Card>
<Modal
v-model="modal1"
      title="查看优秀作业"
      width="50%"
      :mask-closable="false"
>
  <Table border :columns="columns12" :data="data6"></Table>
</Modal>
<Modal
v-model="modal2"
      width="50%"
      :mask-closable="false"
>
 <p style="font-size:20px">{{now_content}}</p>
</Modal>

</div>
</template>

<script>
// import wangeditor from './wangeditor'
import E from 'wangeditor'
export default {
  name: "user",
  data() {
    return {
      
      now_content:'',
      excellent_homework:[],
      data6: [],
      data1:{
          name:'',
          stu_num:''
      },
      columns12: [{
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '学号',
                        key: 'sno'
                    },
                     {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                           return  h('div', [
                           h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => { 
                                            
                                            this.now_content=this.data6[params.index].content
                                            this.modal2=true
                                            
                                        }
                                    }
                                }, '查看')
                           ])
                        }
            }],
      modal1:false,
      modal2:false,
      term:[],
      option:'',
      data:[],
      user:{},
      classes:{},
      eva:'',
      course:'',
      homework:'',
      content:'',
      ed:'',
      tea_comment:'',
      excellent:false
    };
  },
  components: {
    // wangeditor
  },
  mounted() {

    var editor = new E('#wangeditor')    //创建富文本实例
     editor.customConfig.onchange = (html) => {
       this.content = html
     }
     editor.customConfig.uploadImgServer = '//47.100.174.14:9999/api/v1/save_hw_img'
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
    show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
    get_all_excellent_homework() {
      if(this.eva.homework==undefined){
        this.$Message.info('请先选择课程');
      }
      let _this = this
      this.$axios.get("/excellent_stu_homework", {
            params: {
               th_id: this.eva.homework[0].id
            }
        }).then(res => {
          _this.data6 = res.data
          _this.modal1 = true
        })
        .catch(error => {
          alert(this.eva.homework[0].id)
          console.log(error);
        });
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
          console.log("sssssss")
           console.log(this.data)
        })
        .catch(error => {
          console.log(error);
        });
    },
    selecthomework(course,eva){
      this.eva=eva;
      this.tea_comment = '';
      this.course=course;
      this.homework=eva.homework[0];
      this.content="";
      this.ed.txt.html(this.content);
      this.excellent = false;
      if (eva.done>=1) {
        this.$axios.post('/stu_homework', {
            params: {
                th_id: this.eva.homework[0].id,
                content: 'get'
            }
        }).then(function(res) {   
          console.log(res.data[0])
          if(res.data.length>0){
            this.content=res.data[0].content;
            this.ed.txt.html(this.content);
            this.tea_comment = res.data[0].tea_comment
            this.excellent= res.data[0].excellent
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
      console.log(this.content)
      if (this.content=='无法输入作业内容'||this.content=='') {
        this.$Message.info('内容不能为空！');
      } else {
        if (mm==1) {        
        this.$Modal.confirm({
        title: '提交作业',
        content: '<p>确定要提交此作业？提交后将不能再修改！</p>',
        onOk: () => {
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', '正在提交···')
                    ])
                }
            });
            this.$axios.post('/stu_homework', {
                params: {
                    th_id: this.eva.homework[0].id,
                    content: this.content,
                    status: 1
                }
            }).then(function(res) {              
                this.content=res.data.content;
                setTimeout(() => {
                    this.$Spin.hide();
                    this.$Message.info('提交成功');
                }, 800);                          
                this.eva.done=2;
            }.bind(this))
            .catch(function(error) {
                console.log(error)
            });            
           },
        onCancel: () => { this.$Message.info('取消'); }});
        } else {
          this.$Spin.show({
              render: (h) => {
                  return h('div', [
                      h('Icon', {
                          'class': 'demo-spin-icon-load',
                          props: {
                              type: 'ios-loading',
                              size: 18
                          }
                      }),
                      h('div', '正在暂存···')
                  ])
              }
          });
          this.$axios.post('/stu_homework', {
                  params: {
                      th_id: this.eva.homework[0].id,
                      content: this.content,
                      status: 0
                  }
              }).then(function(res) {              
                  this.content=res.data.content;
                  setTimeout(() => {
                      this.$Spin.hide();
                      this.$Message.info('暂存成功');
                  }, 800);                            
                  this.eva.done=1;
              }.bind(this))
              .catch(function(error) {
                  console.log(error)
              });          
        }
      }
      
        


        
        // if(mm==0){
        //   this.$axios.post('/stu_homework', {
        //         params: {
        //             th_id: this.eva.homework[0].id,
        //             content: this.content
        //         }
        //     }).then(function(res) {              
        //         this.content=res.data.content;
        //         this.$Message.info('提交成功');
        //         this.eva.done=2;
        //     }.bind(this))
        //     .catch(function(error) {
        //         console.log(error)
        //     });
        // }else if(mm==1){
        //   this.$axios.patch('/stu_homework', {
        //         params: {
        //             th_id: this.eva.homework[0].id,
        //             content: this.content
        //         }
        //     }).then(function(res) {              
        //         this.content=res.data[0].content;
        //         this.$Message.info('修改成功');
        //     }.bind(this))
        //     .catch(function(error) {
        //         console.log(error)
        //     });
        // }
    }
  }
};
</script>

<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
