<style lang="less">
@import "./advanced-router.less";
</style>

<template>
    <div>
      <div>
       <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加用户</Button>
       <Modal
        v-model="modal1"
        title="添加用户"
        @on-ok="ok"
        @on-cancel="cancel">
        <table>
        <tr><td>用户名</td><td>
        <Input v-model="value1" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
        <tr><td>姓名</td><td>
        <Input v-model="value2" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
        <tr><td>电话</td><td>
        <Input v-model="value3" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr>
        <tr><td>状态</td><td>
        <Input v-model="value4" placeholder="请输入状态" clearable style="width: 300px"></Input></td></tr>
        </table>
        </Modal>
         <Modal
                                v-model="modal2"
                                title="修改用户信息"
                                @on-ok="ok2"
                                @on-cancel="cancel2">
                                <table>
                                <tr><td>用户名</td><td>
                                <Input v-model="value5" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
                                <tr><td>姓名</td><td>
                                <Input v-model="val电话ue6" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
                                <tr><td>电话</td><td>
                                <Input v-model="value7" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr>
                                <tr><td>状态</td><td>
                                <Input v-model="value8" placeholder="请输入状态" clearable style="width: 300px"></Input></td></tr>
                                </table>
                            </Modal>
    </div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        用户列表
                    </p>
                    <Row type="flex" justify="center" align="top" class="advanced-router">
                        <Table :columns="userColumns" :data="userData" style="width: 100%;"></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      modal1:false,
      modal2:false,
      userColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "用户名",
          key: "name",
          align: "center"
        },
        {
          title: "姓名",
          key: "user_name",
          align: "center"
        },
        {
          title: "手机",
          key: "user_tel"
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
                                        this.show_moda2()
                                    }
                                }
                            }, '编辑用户'),  
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteClick() 
                                    }
                                }
                            }, '删除用户')
                        ]);
                    }
                }
        
],
      userData: []
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios
      .get("/userList")
      .then(res => {
        this.userData = res.data.body;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    show_modal1(){
                this.modal1=true;
                this.value1="";
                this.value2="";
                this.value3="";
                this.value4="";
            },
            ok () {
                this.$axios.post('/userList', {
                            params: {
                                id: 0,
                                v1:this.value1,
                                v2:this.value2,
                                v3:this.value3,
                                v4:this.value4,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data = res.data;
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
            },
            show_moda2(){
                this.modal2=true;
                this.value1="";
                this.value2="";
                this.value3="";
                this.value4="";
            },
            ok2 () {
                this.$axios.patch('/userList', {
                            params: {
                                id:this.id1,
                                v1:this.value5,
                                v2:this.value6,
                                v3:this.value7,
                                v4:this.value8,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.items = res.data;
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('修改成功');
            },
            cancel2 () {
                this.$Message.info('取消');
            },
             deleteClick() {
            
            this.$Modal.confirm({
                    title: '删除用户',
                    content: '<p>确定要删除此用户吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/userList', {
                            data: {
                                params: {

                                    id: this.id1,
                                }
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.items = res.data;
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('删除成功');
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
        },
           
  }
};
</script>
