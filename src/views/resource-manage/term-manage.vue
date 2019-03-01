<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        学期列表&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加学期</Button>
        <div> 
            <Modal
            v-model="modal1"
            title="添加学期"
            @on-ok="ok"
            @on-cancel="cancel2">
            <table>            
            <tr><td>学期名</td><td>
            <Input v-model="name" placeholder="请输入学期名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>开始时间</td><td>
            <DatePicker v-model="begin_time" type="date" placeholder="请选择开始时间" style="width: 300px"></DatePicker></td></tr>
            <tr><td>结束时间</td><td>
            <DatePicker v-model="end_time" type="date" placeholder="请选择结束时间" style="width: 300px"></DatePicker></td></tr></td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改学期信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>            
            <tr><td>学期名</td><td>
            <Input v-model="name" placeholder="请输入学期名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>开始时间</td><td>
            <DatePicker v-model="begin_time" type="date" placeholder="请选择开始时间" style="width: 300px"></DatePicker></td></tr>
            <tr><td>结束时间</td><td>
            <DatePicker v-model="end_time" type="date" placeholder="请选择结束时间" style="width: 300px"></DatePicker></td></tr></td></tr>
            </table>
            </Modal>
        </div>
    </p>                    
    <Table :columns="userColumns" :data="userData" style="width: 100%;"></Table>                    
</Card>
</template>

<script>
export default {
  name: "class",
  data() {
    return {
      modal1:false,
      modal2:false,
      id: 0,
      name:'',
      begin_time:'',
      end_time:'',
      userColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "学期名",
          key: "name",
          align: "center"
        },
        {
          title: "开始时间",
          key: "begin_time",
          align: "center"
        },
        {
          title: "结束时间",
          key: "end_time",
          align: "center",
        },          
        {
                  title: "操作",
                  key: "action",
                  align: "center",
                  render: (h, params) => {
                        return h('div', [
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
                                        this.show_modal2(params.index);
                                    }
                                }
                            }, '编辑学期'),  
                            // h('Button', {
                            //     props: {
                            //         type: 'error',
                            //         size: 'small'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.deleteClick(params.index);
                            //           }
                            //     }
                            // }, '删除学期')
                        ]);
                    }
                }
        
     ],
      userData: [],
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios.get("/termList")
      .then(res => {
        this.userData = res.data.a;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    show_modal1()
    {
        this.modal1=true;
        this.name="";
        this.begin_time="";
        this.end_time="";
    },
    ok () 
    {
      var y = this.begin_time.getFullYear();
      var m = this.begin_time.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = this.begin_time.getDate();
      d = d < 10 ? ('0' + d) : d;
      this.begin_time =  y + '-' + m + '-' + d;

      var y = this.end_time.getFullYear();
      var m = this.end_time.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = this.end_time.getDate();
      d = d < 10 ? ('0' + d) : d;
      this.end_time =  y + '-' + m + '-' + d;
      this.$axios.post('/termList', {
                  params: {
                      name: this.name,
                      begin_time: this.begin_time,
                      end_time: this.end_time,
                  }
              }).then(function(res) {
                  console.log(res.data);
                  this.userData.push(res.data);
                  this.$Message.info('添加成功');
              }.bind(this))
              .catch(function(error) {
                  console.log(error)
              });
                        
          },
    show_modal2(index)
    {
                this.modal2=true;
                this.id = this.userData[index].id;
                this.name=this.userData[index].name;
                this.begin_time=this.userData[index].begin_time;                
                this.end_time=this.userData[index].end_time;
    },
    ok2 () 
    {

      var y = this.begin_time.getFullYear();
      var m = this.begin_time.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = this.begin_time.getDate();
      d = d < 10 ? ('0' + d) : d;
      this.begin_time =  y + '-' + m + '-' + d;

      var y = this.end_time.getFullYear();
      var m = this.end_time.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = this.end_time.getDate();
      d = d < 10 ? ('0' + d) : d;
      this.end_time =  y + '-' + m + '-' + d;
      
        this.$axios.patch('/termList', {
            params: {
                id: this.id,
                name: this.name,
                begin_time: this.begin_time,
                end_time: this.end_time,
            }
        }).then(function(res) {
            console.log(res);
            let id = res.data.id;
            for(let i = 0; i < this.userData.length; i++){
              if (this.userData[i].id == id){
                this.userData[i].name = res.data.name;
                this.userData[i].begin_time = res.data.begin_time;
                this.userData[i].end_time = res.data.end_time;
                break;
              }
            }
            this.$Message.info('修改成功');
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });
                        
    },
    cancel2 () 
    {this.$Message.info('取消');},
    // deleteClick(index) 
    // {
    //    this.id = this.userData[index].id;
    //    this.$Modal.confirm({
    //                 title: '删除学期',
    //                 content: '<p>确定要删除此学期吗？</p>',
    //                 onOk: () => {
    //                     this.$axios.delete('/termList', {
    //                         data: {
    //                             params: {
    //                                 id: this.id,
    //                             }
    //                         }
    //                     }).then(function(res) {
    //                         console.log(res);
    //                         this.userData.splice(index,1);
    //                         this.$Message.info('删除成功');
    //                     }.bind(this))
    //                     .catch(function(error) {
    //                         console.log(error)
    //                     });
                        
    //                    },
    //        onCancel: () => { this.$Message.info('取消'); }});
    // },           
  }
};
</script>
