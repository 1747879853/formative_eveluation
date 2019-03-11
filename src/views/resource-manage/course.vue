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
            @on-cancel="cancel2">
            <table>
            <tr><td>课程号</td><td>
            <Input v-model="cno" placeholder="请输入课程号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>课程名</td><td>
            <Input v-model="name" placeholder="请输入课程名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>课程简述</td><td>
            <Input v-model="brief" type="textarea" :rows="9" placeholder="请输入课程简述" clearable style="width: 300px"></Input></td></tr>

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
            <tr><td>课程简述</td><td>
            <Input v-model="brief" type="textarea" :rows="9" placeholder="请输入课程简述" clearable style="width: 300px"></Input></td></tr>
            </table>
            </Modal>
        </div>
    </p>                    
    <Table :columns="userColumns" :data="userData" border style="width: 100%;"></Table>                    
</Card>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      uploadList: [],
      modal1:false,
      modal2:false,
      id: 0,
      name:'',
      cno:'',
      brief: '',
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
          title: "课程简述",
          key: "brief",
          align: "center"
        },
        {
          title: "课程大纲",
          key: "outline",
          align: "center",
          width: 250,
          render: (h,params) => {
            return h('div'),[
              h('a',{
                domProps:{
                  href: 'http://47.100.174.14:9999/course_outline/' + params.row.outline_name,
                  download: 'download',
                }
              },params.row.outline_name),
              h('Upload',{
                props:{
                  action: "//127.0.0.1:3000/api/v1/upload_course_outline?id=" + params.row.id,
                  // format: ['doc', 'docx'],
                  // 'on-format-error': this.handleFormatError,
                  // 'on-success': this.handleSuccess,
                  // 'on-error': this.handleError,
                  // headers: this.headers,
                  'before-upload': this.handleBeforeUpload,
                  // 'default-file-list'： [params.outline_name],
                  'show-upload-list': false,
                  // on-remove="handleRemove"
                  name: 'file'

                }
              },[
              h('Button', {
                                props: {
                                    type: 'ghost',
                                    size: 'small',
                                    icon: "ios-cloud-upload-outline"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                               
                            }, '选择文件'), 


              ]),
              h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleUpload(params.row.id);
                                    }
                                }
                               
                            }, '上传'),
            ]
          }
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
      headers: {
                'Authorization' : this.$store.state.token
            },
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
    handleUpload (courseId) {
        if(this.uploadList.length ==0){
            this.$Notice.warning({
                title: '请先选择需要上传的文件'
            });
            return
        }
        let params = new FormData()
        // 将uploadList中的文件添加到FormData中
        this.uploadList.forEach(file => params.append('file', file));
        params.append('Authorization', this.$store.state.token);
        params.append('course_id', courseId);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$axios.post('upload_course_outline', params, config)
            .then(resp => {
                if(resp.data.status){
                  this.$Notice.success({
                      title: '文件上传成功',
                      desc: '文件 ' + resp.data.file_name + ' 上传成功。'
                  });

                  this.uploadList = [];
                  this.$axios.get("/courseList").then(res => {
                    this.userData = res.data;
                    this.userData.splice(0,0);
                  })
                  .catch(error => {
                    console.log(error);
                  });

                }else{
                  // debugger
                  this.$Notice.warning({
                      title: '文件重名',
                      desc: '文件 ' + resp.data.file_name + ' 和其他课程大纲文件重名。'
                  });

                }
            })
            .catch(err => {
                // store.dispatch('onAddERR', '服务器内部错误，请稍后再试')
                this.$Notice.error({
                    title: '文件上传失败',
                    desc: '服务器内部错误，请稍后再试'
                });
            })
    },
    handleSuccess (res, file) {
      if(res.status){
        this.$Notice.success({
            title: '文件上传成功',
            desc: '文件 ' + file.name + ' 上传成功。'
        });
        this.$axios.get("/courseList").then(res => {
          this.userData = res.data;
          this.userData.splice(0,0);
        })
        .catch(error => {
          console.log(error);
        });
      }else{
        // debugger
        this.$Notice.warning({
            title: '文件重名',
            desc: '文件 ' + file.name + ' 和其他课程大纲文件重名。'
        });
      }
    },
    handleError (res, file) {
        this.$Notice.error({
            title: '文件上传失败',
            desc: '文件 ' + file.name + ' 上传失败。'
        });
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请选择word文件。'
        });
    },
    handleBeforeUpload (file) {
        if (!/(doc|docx|xls|xlsx)$/.test(file.name)) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请选择word或excel文件。'
            // desc: `文件 ${file.name} 格式不正确，请选择excel文件`
          })
          return false
        }
        // if (this.uploadList.length > 0) {
        //     this.$Notice.warning({
        //         title: '文件已选择！'
        //     });
        //     return false;
        // }
        // const check = this.defaultList.length <= 0;
        // if (!check) {
        //     this.$Notice.warning({
        //         title: '上传新模板前，请先删除旧模板！'
        //     });
        //     return false;
        // }

        // 创建一个 FileReader 对象
        let reader = new FileReader()
        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
        // 读取文件作为 URL (base64编码)可访问地址
        reader.readAsDataURL(file)
        const _this = this
        reader.onload = function (e) {
            file.url = reader.result
            // 添加到用于手动上传的列表uploadList中并展示（即预览功能实现）
            _this.uploadList.push(file);
            // _this.$refs.upload.fileList.push(file);
            // _this.defaultList.push({name: file.name});
        }
        // 取消自动上传的触发，手动上传
        return false 
    },
    show_modal1()
    {
                this.modal1=true;
                this.name="";
                this.cno="";
                this.brief="";
                this.status="";
    },
    ok () 
    {
                this.$axios.post('/courseList', {
                            params: {
                                name: this.name,
                                cno: this.cno,
                                brief: this.brief,
                                status: 1,
                            }
                        }).then(function(res) {
                            // console.log(res.data);
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
                this.brief=this.userData[index].brief;
    },
    ok2 () 
    {
                this.$axios.patch('/courseList', {
                            params: {
                                id: this.id,
                                cno: this.cno,
                                name: this.name,
                                brief: this.brief,
                            }
                        }).then(function(res) {
                            // console.log(res);
                            let id = res.data.id;
                            for(let i = 0; i < this.userData.length; i++){
                              if (this.userData[i].id == id){
                                this.userData[i].name = res.data.name;
                                this.userData[i].cno = res.data.cno;
                                this.userData[i].brief = res.data.brief
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
                            // console.log(res);
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
