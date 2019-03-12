<template>
    <Card>
        <p slot="title" style="height:25px">
            <Icon type="ios-list"></Icon>
            班级列表&nbsp;&nbsp;&nbsp;
            <!--<Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加班级</Button>-->
        <div>

            <Modal
                    v-model="modal1"
                    :title="'添加'+name+'学生'"
                    :mask-closable="false"
                    @on-ok="addclassstu"
                    @on-cancel="cancel2">
                <span style="font-size: 25px;">{{message}}</span>
                <table style="padding:5px">
                    <tr style="padding:5px"><td>批量导入</td><td>
                    <input id="upload" style="float:right;" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </td><td><Button @click="imports()" style="float:right;" class="ivu-btn ivu-btn-primary ivu-btn-middle">导入</Button></td></tr>
                    <tr><td>学号:</td><td>
                    <Input v-model="sno" placeholder="请输入学号" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>姓名:</td><td>
                    <Input v-model="sname" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>用户名:</td><td>
                    <Input v-model="email" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>入学年份:</td><td>
                    <Input v-model="year" placeholder="请输入入学年份" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>电话:</td><td>
                    <Input v-model="tel" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr>
                </table>
            </Modal>
            <Modal
                    v-model="modal2"
                    width="65%"
                    :mask-closable="false"
                    :title="'查看'+name+'学生'">
                <Table :columns="classstuColumns" :data="classstuData" style="width: 100%;"></Table>
            </Modal>
            <Modal
            v-model="modal3"
            title="修改学生信息"
            @on-ok="ok"
            @on-cancel="cancel2">
            <table>
            <tr><td>学号</td><td>
            <Input v-model="sno" placeholder="请输入学号" clearable style="width: 300px"></Input></td></tr>
            <tr><td>姓名</td><td>
            <Input v-model="sname" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>用户名</td><td>
            <Input v-model="email" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>入学年份</td><td>
            <Input v-model="year" placeholder="请输入入学年份" clearable style="width: 300px"></Input></td></tr>
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
        name: 'user',
        data () {
            return {
                modal1: false,
                modal2: false,
                modal3:false,
                id: 0,
                name: '',
                status: '',
                userColumns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 60
                    },
                    {
                        title: '班级号',
                        key: 'clno',
                        align: 'center'
                    },
                    {
                        title: '班级名',
                        key: 'name',
                        align: 'center'
                    },                    
                    {
                        title: '入学年份',
                        key: 'year',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
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
                                            this.addstu(params.index);
                                        }
                                    }
                                }, '添加学生'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delstu(params.index);
                                        }
                                    }
                                }, '查看学生')
                            ]);
                        }
                    }

                ],
                userData: [],
                classstuColumns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 60
                    },
                    {
                        title: '学号',
                        key: 'sno',
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },    
                    {
                        title: "用户名",
                        key: "email",
                        align: "center"
                    },                
                    {
                        title: '入学年份',
                        key: 'year',
                        align: 'center'
                    },
                    {
                        title: "手机号",
                        key: "tel"
                    },
                    {
                      title: "状态",
                      key: "status",
                      align: "center",
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
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
                                            this.patchclassstu(params.index);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delclassstu(params.index);
                                        }
                                    }
                                }, '删除'),

                            ]);
                        }
                    }

                ],
                classstuData: [],
                sno: '',
                sname:'',
                email:'',
                year:'',
                tel:'',
                stuid:'',
                outdata:[],
                message:'若添加单个学生,请输入信息后点确定按钮',
            };
        },
        computed: {
            avatorImage () {
                return localStorage.avatorImgPath;
            }
        },
        mounted () {
            this.$axios.get('/classroomList').then(res => {
                    this.userData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            addstu (index) { // 显示增加学生的窗口
                this.modal1 = true;
                this.id = this.userData[index].id;
                this.name = this.userData[index].name; // 这应该是获取了班级名称
                this.stuid='';
                this.sname='';
                this.email='';
                this.year='';
                this.sno='';
                this.tel='';
                //alert(this.name);
            },
            delstu (index) { // 显示删除学生的窗口
                this.classstuData = [];
                this.modal2 = true;
                this.name = this.userData[index].name;
                this.status = '';
                this.id = this.userData[index].id;
                // alert(this.id);// 全局获取到班级可以了
                this.$axios.post('/classStu', {// 根据班级id获取学生列表
                        params: {
                            id: this.id// 没写mock，带参数获取不到东西
                        }
                    })
                    .then(res => {
                        this.classstuData = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            addclassstu () {
                this.$axios.post('/studentList', {
                    params: {
                        name: this.sname,
                        email: this.email,
                        year: this.year,
                        tel: this.tel,
                        sno: this.sno,
                        class_room_id: this.id,
                    }
                }).then(function(res) {
                    this.$Message.info('添加成功');
                }.bind(this))
                .catch(function(error) {
                    console.log(error)
                });
            },
            delclassstu (index) { // 删除学生里面的按钮
                this.$Modal.confirm({
                    title: '删除学生',
                    content: '<p>确定要删除此学生吗?</p>',
                    onOk: () => {
                        this.$axios.delete('/classStu', {
                            data: {
                                params: {
                                    stuid: this.classstuData[index].id, 
                                    id: this.id ,
                                    status: 0
                                }
                            }
                        }).then(function (res) {
                            this.classstuData = res.data;
                            this.$Message.info('删除成功');
                        }.bind(this))
                            .catch(function (error) {
                                console.log(error);
                            });
                    },
                    onCancel: () => { this.$Message.info('取消'); }});
            },
            patchclassstu(index){
                this.modal3=true;
                this.stuid=this.classstuData[index].id;
                this.sname=this.classstuData[index].name;
                this.email=this.classstuData[index].email;
                this.year=this.classstuData[index].year;
                this.sno=this.classstuData[index].sno;
                this.tel=this.classstuData[index].tel;
            },
            ok () {
                this.$axios.patch('/studentList', {
                    params: {
                        id: this.stuid,
                        name: this.sname,
                        email: this.email,
                        year: this.year,
                        sno: this.sno,
                        tel: this.tel,
                        class_room_id: this.id,
                    }
                }).then(function(res) {
                    console.log(res);
                    let id = res.data[0].id;
                    for(let i = 0; i < this.classstuData.length; i++){
                      if (this.classstuData[i].id == id){
                        this.classstuData[i].name = res.data[0].name;
                        this.classstuData[i].email = res.data[0].email;
                        this.classstuData[i].year = res.data[0].year;
                        this.classstuData[i].sno = res.data[0].sno;
                        this.classstuData[i].tel = res.data[0].tel;
                        this.classstuData[i].class_room_id = res.data[0].class_room_id;
                        this.classstuData[i].classname = res.data[0].classname;
                        break;
                      }
                    }
                    this.$Message.info('修改成功');
                }.bind(this))
                .catch(function(error) {
                    console.log(error)
                });
            },
            cancel2 () { 
                this.$Message.info('取消');
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
                        _this.outdata=outdata;
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
                this.$axios.post('/manystudent', {
                    params: {
                        data:data,
                        class_room_id: this.id
                    }
                }).then(function(res) {
                    // console.log(res.data);
                    this.message='';
                    this.outdata=[];
                    this.modal1=false;
                    this.$Message.info('导入excal成功');
                }.bind(this))
                .catch(function(error) {
                    this.message='文件导入失败,请重试!';
                    console.log(error)
                });
            },
            imports(){
                if(this.outdata.length>0){
                    this.message='正在导入文件,请稍后......';
                    this.postexcal(this.outdata);
                }else{
                    this.$Message.info('请先选择一个excal文件!');
                }        
            },
        }
    };
</script>
