<style lang="less">
@import "./advanced-router.less";
</style>

<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        教师列表&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加教师</Button>
        <div> 
            <Modal
            v-model="modal1"
            title="添加教师"
            @on-ok="ok"
            @on-cancel="cancel">
            <table>
            <tr><td>职工号</td><td>
            <Input v-model="tno" placeholder="请输入职工号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>姓名</td><td>
            <Input v-model="name" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>用户名</td><td>
            <Input v-model="email" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>入职年份</td><td>
            <Input v-model="year" placeholder="请输入入职年份" clearable style="width: 300px"></Input></td></tr>
            <tr><td>电话</td><td>
            <Input v-model="tel" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改教师信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>
            <tr><td>职工号</td><td>
            <Input v-model="tno" placeholder="请输入职工号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>姓名</td><td>
            <Input v-model="name" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>用户名</td><td>
            <Input v-model="email" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>入职年份</td><td>
            <Input v-model="year" placeholder="请输入入职年份" clearable style="width: 300px"></Input></td></tr>
            <tr><td>电话</td><td>
            <Input v-model="tel" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
        </div>
    </p>                    
    <Table :columns="userColumns" :data="userData" style="width: 100%;"></Table>                    
</Card>
</template>

<script>
export default {
  name: "teacher",
  data() {
    return {
      modal1:false,
      modal2:false,
      id: 0,
      name:'',
      tno:'',
      email:'',
      year:'',
      tel:'',
      status:'',
      userColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "职工号",
          key: "tno",
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "用户名",
          key: "email",
          align: "center"
        },
        {
          title: "入职年份",
          key: "year",
          align: "center"
        },
        {
          title: "手机",
          key: "tel"
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
                            }, '编辑教师'),  
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
                            }, '删除教师')
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
    this.$axios
      .get("/teacherList")
      .then(res => {
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
                this.tno="";
                this.email="";
                this.year="";
                this.tel="";
                this.status="";
    },
    ok () 
    {
                this.$axios.post('/teacherList', {
                            params: {
                                name: this.name,
                                tno: this.tno,
                                email: this.email,
                                year: this.year,
                                tel: this.tel,
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
                this.name=this.userData[index].name;
                this.tno=this.userData[index].tno;
                this.email=this.userData[index].email;
                this.year=this.userData[index].year;
                this.tel=this.userData[index].tel;
    },
    ok2 () 
    {
                this.$axios.patch('/teacherList', {
                            params: {
                                id: this.id,
                                name: this.name,
                                tno: this.tno,
                                email: this.email,
                                year: this.year,
                                tel: this.tel,
                                status: 1,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let id = res.data.id;
                            for(let i = 0; i < this.userData.length; i++){
                              if (this.userData[i].id == id){
                                this.userData[i].name = res.data.name;
                                this.userData[i].tno = res.data.tno;
                                this.userData[i].email = res.data.email;
                                this.userData[i].year = res.data.year;
                                this.userData[i].tel = res.data.tel;
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
                    title: '删除教师',
                    content: '<p>确定要删除此教师吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/teacherList', {
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
