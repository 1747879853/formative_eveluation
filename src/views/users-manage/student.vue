<style lang="less">
@import "./advanced-router.less";
</style>

<template>    
<Card>
    <p slot="title" style="height:30px">
        <Icon type="ios-list"></Icon>
        学生列表&nbsp;&nbsp;&nbsp;
        <Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加学生</Button>
        <input id="upload" style="float:right" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <div> 
            <Modal
            v-model="modal1"
            title="添加学生"
            @on-ok="ok"
            @on-cancel="cancel">
            <table>
            <tr><td>姓名</td><td>
            <Input v-model="name" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>用户名</td><td>
            <Input v-model="user_name" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>电话</td><td>
            <Input v-model="user_tel" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr>
            <tr><td>班级</td><td>
            <Input v-model="classname" placeholder="请输入班级" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
            <Modal
            v-model="modal2"
            title="修改学生信息"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <table>
            <tr><td>姓名</td><td>
            <Input v-model="name" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>用户名</td><td>
            <Input v-model="user_name" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>电话</td><td>
            <Input v-model="user_tel" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr>
            <tr><td>班级</td><td>
            <Input v-model="classname" placeholder="请输入班级" clearable style="width: 300px"></Input></td></tr>
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
      user_name:'',
      user_tel:'',
      classname:'',
      status:'',
      userColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "用户名",
          key: "user_name",
          align: "center"
        },
        {
          title: "手机",
          key: "user_tel"
        },
        {
          title: "班级",
          key: "classname"
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
                            }, '编辑学生'),  
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
                            }, '删除学生')
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
      .get("/studentList")
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
                this.user_name="";
                this.user_tel="";
                this.classname="";
                this.status="";
    },
    ok () 
    {
                this.$axios.post('/studentList', {
                            params: [{
                                name: this.name,
                                user_name: this.user_name,
                                user_tel: this.user_tel,
                                classname: this.classname,
                            }]
                        }).then(function(res) {
                            console.log(res.data);
                            this.userData=this.userData.concat(res.data);
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
                this.user_name=this.userData[index].user_name;
                this.classname=this.userData[index].classname;
                this.user_tel=this.userData[index].user_tel;
    },
    ok2 () 
    {
                this.$axios.patch('/studentList', {
                            params: {
                                id: this.id,
                                name: this.name,
                                user_name: this.user_name,
                                classname: this.classname,
                                user_tel: this.user_tel,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let id = res.data.id;
                            for(let i = 0; i < this.userData.length; i++){
                              if (this.userData[i].id == id){
                                this.userData[i].name = res.data.name;
                                this.userData[i].user_name = res.data.user_name;
                                this.userData[i].classname = res.data.classname;
                                this.userData[i].user_tel = res.data.user_tel;
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
                    title: '删除学生',
                    content: '<p>确定要删除此学生吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/studentList', {
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
    
    importfxx(obj) {
        let _this = this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function(f) {
            var binary = "";
            var rABS = false; //是否将文件读取为二进制字符串
            var pt = this;
            var wb; //读取完成的数据
            var outdata;
            var reader = new FileReader();
            reader.onload = function(e) {
                var bytes = new Uint8Array(reader.result);
                var length = bytes.byteLength;
                for(var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                var XLSX = require('xlsx');
                if(rABS) {
                    wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                    type: 'base64'
                });    
                } else {
                    wb = XLSX.read(binary, {
                        type: 'binary'
                    });
                }
                outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                _this.postexcal(outdata);
            }
            reader.readAsArrayBuffer(f);
        }
        if(rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
        }
    },
    postexcal(data){
        this.$axios.post('/studentList', {
            params: data
        }).then(function(res) {
            console.log(res.data);
            this.userData=this.userData.concat(res.data);
            this.$Message.info('导入excal成功');
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });
    },




  }
};
</script>
