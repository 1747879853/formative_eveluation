<template>    
<Card style="height:auto">
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        课程列表&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加课程</Button>
        <div> 
            <Modal
            v-model="modal1"
            title="添加课程"
            @on-ok="ok"
            @on-cancel="cancel">
            <table>
            <tr><td>课程号</td><td>
            <Input v-model="cno" placeholder="请输入课程号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>课程名</td><td>
            <Input v-model="name" placeholder="请输入课程名" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改课程信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>
            <tr><td>课程号</td><td>
            <Input v-model="cno" placeholder="请输入课程号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>课程名</td><td>
            <Input v-model="name" placeholder="请输入课程名" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
        </div>
    </p>                    
    <Table :columns="userColumns" :data="userData" style="width: 100%;"></Table>                    
</Card>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      modal1:false,
      modal2:false,
      id: 0,
      name:'',
      cno:'',
      status:'',
      userColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "课程号",
          key: "cno",
          align: "center"
        },
        {
          title: "课程名",
          key: "name",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
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
                            }, '编辑课程'),  
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteClick(params.index);
                                      }
                                }
                            }, '删除课程')
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
    this.$axios.get("/courseList").then(res => {
        this.userData = res.data;
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
                this.cno="";
                this.status="";
    },
    ok () 
    {
                this.$axios.post('/courseList', {
                            params: {
                                name: this.name,
                                cno: this.cno,
                                status: 1,
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
                this.cno = this.userData[index].cno;
                this.name=this.userData[index].name;
    },
    ok2 () 
    {
                this.$axios.patch('/courseList', {
                            params: {
                                id: this.id,
                                cno: this.cno,
                                name: this.name,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let id = res.data.id;
                            for(let i = 0; i < this.userData.length; i++){
                              if (this.userData[i].id == id){
                                this.userData[i].name = res.data.name;
                                this.userData[i].cno = res.data.cno;
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
    deleteClick(index) 
    {
       this.id = this.userData[index].id;
       this.$Modal.confirm({
                    title: '删除课程',
                    content: '<p>确定要删除此课程吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/courseList', {
                            data: {
                                params: {
                                    id: this.id,
                                    status: 0
                                }
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.userData.splice(index,1);
                            this.$Message.info('删除成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
                       },
           onCancel: () => { this.$Message.info('取消'); }});
    },           
  }
};
</script>
