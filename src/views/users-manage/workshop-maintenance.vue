<style lang="less">
@import "./advanced-router.less";
</style>

<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        车间维护&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加车间</Button>
        <div> 
            <Modal
            v-model="modal1"
            title="添加车间"
            @on-ok="ok"
            @on-cancel="cancel">
            <table>
            <tr><td>车间名称</td><td>
            <Input v-model="name" placeholder="请输入车间名称" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
            <tr><td>车间类型</td><td>
            <Input v-model="dept_type" placeholder="请输入车间类型" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
            <tr><td>负责人</td><td>
            <Input v-model="user_id" placeholder="请输入负责人" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改车间信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>
            <tr><td>车间名称</td><td>
            <Input v-model="name" placeholder="请输入车间名称" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
            <tr><td>车间类型</td><td>
            <Input v-model="dept_type" placeholder="请输入车间类型" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
            <tr><td>负责人</td><td>
            <Input v-model="user_id" placeholder="请输入负责人" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
        </div>
    </p>                    
    <Table :columns="shopColumns" :data="shopData" style="width: 100%;"></Table>                    
</Card>
</template>

<script>
export default {
  name: "workshop",
  data() {
    return {
      modal1:false,
      modal2:false,
      id: 0,
      name:'',
      dept_type:'',
      user_id:'',
      shopColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "车间名称",
          key: "name",
          align: "center"
        },
        {
          title: "车间类型",
          key: "dept_type",
          align: "center"
        },
        {
          title: "负责人",
          key: "user_id"
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
                            }, '编辑车间'),  
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
                            }, '删除车间')
                        ]);
                    }
                }
        
     ],
      shopData: []
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios
      .get("/work_shops")
      .then(res => {
        this.shopData = res.data;
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
                this.dept_type="";
                this.user_id="";
    },
    ok () 
    {
                this.$axios.post('/work_shops', {
                            params: {
                                name: this.name,
                                dept_type: this.dept_type,
                                user_id: this.user_id,
                                status: 1,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.shopData.push(res.data);
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
          },
    show_modal2(index)
    {
                this.modal2=true;
                this.id = this.shopData[index].id;
                this.name=this.shopData[index].name;
                this.dept_type=this.shopData[index].dept_type;
                this.user_id=this.shopData[index].user_id;
    },
    ok2 () 
    {
                this.$axios.patch('/work_shops', {
                            params: {
                                id: this.id,
                                name: this.name,
                                dept_type: this.dept_type,
                                user_id: this.user_id,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let id = res.data.id;
                            for(let i = 0; i < this.shopData.length; i++){
                              if (this.shopData[i].id == id){
                                this.shopData[i].name = res.data.name;
                                this.shopData[i].dept_type = res.data.dept_type;
                                this.shopData[i].user_id = res.data.user_id;
                                break;
                              }
                            }
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('修改成功');
    },
    cancel2 () 
    {this.$Message.info('取消');},
    deleteClick(index) 
    {
       this.id = this.shopData[index].id;
       this.$Modal.confirm({
                    title: '删除车间',
                    content: '<p>确定要删除此车间吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/work_shops', {
                            data: {
                                params: {
                                    id: this.id,
                                    status: 0
                                }
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.shopData.splice(index,1);
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('删除成功');
                       },
           onCancel: () => { this.$Message.info('取消'); }});
    },
           
  }
};
</script>
