<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        班级列表&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加班级</Button>
        <div> 
            <Modal
            v-model="modal1"
            title="添加班级"
            @on-ok="ok"
            @on-cancel="cancel">
            <table>
            <tr><td>班级名</td><td>
            <Input v-model="name" placeholder="请输入班级名" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改班级信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>
            <tr><td>班级名</td><td>
            <Input v-model="name" placeholder="请输入班级名" clearable style="width: 300px"></Input></td></tr>
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
      status:'',
      userColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "班级号",
          key: "id",
          align: "center"
        },
        {
          title: "班级名",
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
                            }, '编辑班级'),  
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
                            }, '删除班级')
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
      .get("/classList")
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
                this.status="";
    },
    ok () 
    {
                this.$axios.post('/classList', {
                            params: {
                                name: this.name,
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
    },
    ok2 () 
    {
                this.$axios.patch('/classList', {
                            params: {
                                id: this.id,
                                name: this.name,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let id = res.data.id;
                            for(let i = 0; i < this.userData.length; i++){
                              if (this.userData[i].id == id){
                                this.userData[i].name = res.data.name;
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
                    title: '删除班级',
                    content: '<p>确定要删除此班级吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/classList', {
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
  
    userBody(row, column, index) {
            return row[column.key]
        },
        userName(row, index) {
            return row["name"]
        },
        user_Name(row, index) {
            return row["user_name"]
        },
        userTel(row, index) {
            return row["user_tel"]
        },
        userStatus(row, index) {
            return row["status"]
        },
           
  }
};
</script>
