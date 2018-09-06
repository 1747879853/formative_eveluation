<style lang="less">
@import "./advanced-router.less";
</style>

<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        班组维护&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加班组</Button>
        <div> 
            <Modal
            v-model="modal1"
            title="添加班组"
            @on-ok="ok"
            @on-cancel="cancel">
            <table>
            <tr><td>班组名称</td><td>
            <Input v-model="name" placeholder="请输入班组名称" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
            <tr><td>车间名称</td><td>
            <Select v-model="option1" size="middle" style="width:300px;" @on-change="selected1(option1)" ref="element1">
            <Option  v-for="(item,index) in shopData" :key="item.id" :value="index">{{ item.name }}</Option>
            </Select>
            </td></tr><tr>&nbsp;</tr>
            <tr><td>负责人</td><td>
            <Select v-model="option2" size="middle" style="width:300px;" @on-change="selected2(option2)" ref="element1">
            <Option  v-for="(item,index) in userData" :key="item.id" :value="index">{{ item.username }}</Option>
            </Select>
            </td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改用户信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>
            <tr><td>班组名称</td><td>
            <Input v-model="name" placeholder="请输入班组名称" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
            <tr><td>车间名称</td><td>
            <Select v-model="option1" size="middle" style="width:300px;" @on-change="selected1(option1)" ref="element1">
            <Option  v-for="(item,index) in shopData" :key="item.id" :value="index">{{ item.name }}</Option>
            </Select>
            </td></tr><tr>&nbsp;</tr>
            <tr><td>负责人</td><td>
            <Select v-model="option2" size="middle" style="width:300px;" @on-change="selected2(option2)" ref="element1">
            <Option  v-for="(item,index) in userData" :key="item.id" :value="index">{{ item.username }}</Option>
            </Select>
            </td></tr>
            </table>
            </Modal>
        </div>
    </p>                    
    <Table :columns="teamColumns" :data="teamData" style="width: 100%;"></Table>                    
</Card>
</template>

<script>
export default {
  name: "workteam",
  data() {
    return {
      modal1:false,
      modal2:false,
      id: 0,
      name:'',
      option1:'',
      option2:'',
      work_shop_id:'',
      user_id:'',
      teamColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "班组名称",
          key: "name",
          align: "center"
        },
        {
          title: "车间名称",
          key: "work_shop_name",
          align: "center"
        },
        {
          title: "负责人",
          key: "username"
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
                      }, '编辑班组'),  
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
                      }, '删除班组')
                  ]);
              }
          }
        
     ],
      teamData: [],
      shopData:[],
      userData:[]
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios
      .get("/work_teams")
      .then(res => {
        this.teamData = res.data.a;
        this.shopData = res.data.b;
        this.userData = res.data.c;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    selected1() {
        if (!(this.shopData[this.option1] == undefined)) {
            this.work_shop_id = this.shopData[this.option1].id;
        }
    },
    selected2() {
        if (!(this.userData[this.option2] == undefined)) {
            this.user_id = this.userData[this.option2].id;
        }
    },
    show_modal1()
    {
                this.modal1=true;
                this.option1="";
                this.option2="";
                this.name="";
                this.work_shop_id="";
                this.user_id="";
    },
    ok () 
    {
                this.$axios.post('/work_teams', {
                            params: {
                                name: this.name,
                                work_shop_id: this.work_shop_id,
                                user_id: this.user_id,
                                status: 1,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.teamData.push(res.data[0]);
                            this.$Message.info('添加成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
          },
    show_modal2(index)
    {
                this.modal2=true;
                this.id = this.teamData[index].id;
                this.name=this.teamData[index].name;
                this.work_shop_id=this.teamData[index].work_shop_id;
                this.user_id=this.teamData[index].user_id;
                for(let i=0;i<this.shopData.length;i++){
                  if(this.shopData[i].id==this.work_shop_id){
                    this.option1=i;
                    break;
                  }
                }
                for(let j=0;j<this.userData.length;j++){
                  if(this.userData[j].id==this.user_id){
                    this.option2=j;
                    break;
                  }
                }
    },
    ok2 () 
    {
                this.$axios.patch('/work_teams', {
                            params: {
                                id: this.id,
                                name: this.name,
                                work_shop_id: this.work_shop_id,
                                user_id: this.user_id,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let id = res.data[0].id;
                            for(let i = 0; i < this.teamData.length; i++){
                              if (this.teamData[i].id == id){
                                this.teamData[i].name = res.data[0].name;
                                this.teamData[i].work_shop_id = res.data[0].work_shop_id;
                                this.teamData[i].user_id = res.data[0].user_id;
                                this.teamData[i].username = res.data[0].username;
                                this.teamData[i].work_shop_name = res.data[0].work_shop_name;
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
       this.id = this.teamData[index].id;
       this.$Modal.confirm({
                    title: '删除班组',
                    content: '<p>确定要删除此班组吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/work_teams', {
                            data: {
                                params: {
                                    id: this.id,
                                    status: 0
                                }
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.teamData.splice(index,1);
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
