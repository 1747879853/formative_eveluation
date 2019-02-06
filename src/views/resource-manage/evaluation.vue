<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        评价指标列表&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加评价指标</Button>
        <div> 
            <Modal
            v-model="modal1"
            title="添加评价指标"
            @on-ok="ok"
            @on-cancel="cancel">
            <table>
            <tr><td>评价指标号</td><td>
            <Input v-model="eno" placeholder="请输入评价指标号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>评价指标名</td><td>
            <Input v-model="name" placeholder="请输入评价指标名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>评价指标类型</td><td>
            <Input v-model="types" placeholder="请输入评价指标类型" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改评价指标信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>
            <tr><td>评价指标号</td><td>
            <Input v-model="eno" placeholder="请输入评价指标号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>评价指标名</td><td>
            <Input v-model="name" placeholder="请输入评价指标名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>评价指标类型</td><td>
            <Input v-model="types" placeholder="请输入评价指标类型" clearable style="width: 300px"></Input></td></tr>
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
      eno:'',
      types:'',
      status:'',
      userColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "评价指标号",
          key: "eno",
          align: "center"
        },
        {
          title: "评价指标名",
          key: "name",
          align: "center"
        },
        {
          title: "类型",
          key: "types",
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
                            }, '编辑评价指标'),  
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
                            }, '删除评价指标')
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
      .get("/evaluationList")
      .then(res => {
        this.userData = res.data;
        console.log(res.data);
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
                this.eno="";
                this.types="";
                this.status="";
    },
    ok () 
    {
                this.$axios.post('/evaluationList', {
                            params: {
                                name: this.name,
                                eno: this.eno,
                                types: this.types,
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
                this.eno=this.userData[index].eno;
                this.types=this.userData[index].types;
    },
    ok2 () 
    {
                this.$axios.patch('/evaluationList', {
                            params: {
                                id: this.id,
                                name: this.name,
                                eno: this.eno,
                                types: this.types,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let id = res.data.id;
                            for(let i = 0; i < this.userData.length; i++){
                              if (this.userData[i].id == id){
                                this.userData[i].name = res.data.name;
                                this.userData[i].types = res.data.types;
                                this.userData[i].eno = res.data.eno;
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
                    title: '删除评价指标',
                    content: '<p>确定要删除此评价指标吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/evaluationList', {
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
