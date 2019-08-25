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
                <span style="font-size:13px;font-weight: 600;">批量导入学生信息，请先“下载模板”，填写学生信息，然后选择“上传文件”</span>
                <Row>
                    <a v-if="stu_template_url!='#'" style="font-weight: 600px;" :href="stu_template_url" download>下载模板</a>
                    <span v-if="stu_template_url=='#'" style="color:red;">{{stu_template_url_info}}</span>
                </Row>
                <Row style="padding-top: 10px;">
                    <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
                      <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
                    </Upload>
                </Row>
                <Row><span style="color: red;">{{message}}</span></Row>
                <Row>
                    <transition name="fade">
                      <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
                        <div v-if="progressPercent == 100">
                          <Icon type="ios-checkmark-circle"></Icon>
                          <!-- <span>文件读取成功</span> -->
                        </div>
                      </Progress>
                    </transition>
                </Row>

                <Row style="padding-top: 10px;font-size:13px;font-weight: 600;">添加单个学生请填写下面信息，点击“确定”</Row>
                <table style="padding:5px">
                    <!-- <tr style="padding:5px"><td>批量导入</td><td>
                    <input id="upload" style="float:right;" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </td><td><Button @click="imports()" style="float:right;" class="ivu-btn ivu-btn-primary ivu-btn-middle">导入</Button></td></tr> -->

                    <tr><td>学号:</td><td>
                    <Input v-model="sno" placeholder="请输入学号" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>姓名:</td><td>
                    <Input v-model="sname" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>性别:</td><td>
                    <Select v-model="sex" ref="element1" style="width:200px">
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select></td></tr>
                    <tr><td>出生日期:</td><td>
                    <DatePicker v-model="birthday" type="date" placeholder="请选择日期" style="width: 300px"></DatePicker></td></tr>
                    <tr><td>民族:</td><td>
                    <Select v-model="nation" ref="element1" style="width:200px">
                        <Option value="汉族">汉族</Option>  
                        <Option value="蒙古族">蒙古族</Option>  
                        <Option value="回族">回族</Option>  
                        <Option value="藏族">藏族</Option>  
                        <Option value="维吾尔族">维吾尔族</Option>  
                        <Option value="苗族">苗族</Option>  
                        <Option value="彝族">彝族</Option>  
                        <Option value="壮族">壮族</Option>  
                        <Option value="布依族">布依族</Option>  
                        <Option value="朝鲜族">朝鲜族</Option>  
                        <Option value="满族">满族</Option>  
                        <Option value="侗族">侗族</Option>  
                        <Option value="瑶族">瑶族</Option>  
                        <Option value="白族">白族</Option>  
                        <Option value="土家族">土家族</Option>  
                        <Option value="哈尼族">哈尼族</Option>  
                        <Option value="哈萨克族">哈萨克族</Option>  
                        <Option value="傣族">傣族</Option>  
                        <Option value="黎族">黎族</Option>  
                        <Option value="傈僳族">傈僳族</Option>  
                        <Option value="佤族">佤族</Option>  
                        <Option value="畲族">畲族</Option>  
                        <Option value="高山族">高山族</Option>  
                        <Option value="拉祜族">拉祜族</Option>  
                        <Option value="水族">水族</Option>  
                        <Option value="东乡族">东乡族</Option>  
                        <Option value="纳西族">纳西族</Option>  
                        <Option value="景颇族">景颇族</Option>  
                        <Option value="柯尔克孜族">柯尔克孜族</Option>  
                        <Option value="土族">土族</Option>  
                        <Option value="达斡尔族">达斡尔族</Option>  
                        <Option value="仫佬族">仫佬族</Option>  
                        <Option value="羌族">羌族</Option>  
                        <Option value="布朗族">布朗族</Option>  
                        <Option value="撒拉族">撒拉族</Option>  
                        <Option value="毛南族">毛南族</Option>  
                        <Option value="仡佬族">仡佬族</Option>  
                        <Option value="锡伯族">锡伯族</Option>  
                        <Option value="阿昌族">阿昌族</Option>  
                        <Option value="普米族">普米族</Option>  
                        <Option value="塔吉克族">塔吉克族</Option>  
                        <Option value="怒族">怒族</Option>  
                        <Option value="乌孜别克族">乌孜别克族</Option>  
                        <Option value="俄罗斯族">俄罗斯族</Option>  
                        <Option value="鄂温克族">鄂温克族</Option>  
                        <Option value="德昂族">德昂族</Option>  
                        <Option value="保安族">保安族</Option>  
                        <Option value="裕固族">裕固族</Option>  
                        <Option value="京族">京族</Option>  
                        <Option value="塔塔尔族">塔塔尔族</Option>  
                        <Option value="独龙族">独龙族</Option>  
                        <Option value="鄂伦春族">鄂伦春族</Option>  
                        <Option value="赫哲族">赫哲族</Option>  
                        <Option value="门巴族">门巴族</Option>  
                        <Option value="珞巴族">珞巴族</Option>  
                        <Option value="基诺族">基诺族</Option>
                    </Select></td></tr>
                    <!-- <tr><td>用户名:</td><td>
                    <Input v-model="email" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>入学年份:</td><td>
                    <Input v-model="year" placeholder="请输入入学年份" clearable style="width: 300px"></Input></td></tr>
                    <tr><td>电话:</td><td>
                    <Input v-model="tel" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr> -->
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
            <tr><td>性别:</td><td>
            <Input v-model="sex" placeholder="请输入性别" clearable style="width: 300px"></Input></td></tr>
            <tr><td>出生日期:</td><td>
            <Input v-model="birthday" placeholder="请输入出生日期" clearable style="width: 300px"></Input></td></tr>
            <tr><td>民族:</td><td>
            <Input v-model="nation" placeholder="请输入民族" clearable style="width: 300px"></Input></td></tr>
            <!-- <tr><td>用户名</td><td>
            <Input v-model="email" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
            <tr><td>入学年份</td><td>
            <Input v-model="year" placeholder="请输入入学年份" clearable style="width: 300px"></Input></td></tr>
            <tr><td>电话</td><td>
            <Input v-model="tel" placeholder="请输入电话" clearable style="width: 300px"></Input></td></tr> -->
            </table>
            </Modal>
        </div>
        </p>
        <Table :columns="userColumns" :data="userData" style="width: 100%;"></Table>
    </Card>
</template>

<script>
import excel from '@/libs/excel'
    export default {
        name: 'user',
        data () {
            return {
                stu_template_url: '#',
                stu_template_url_info: '学生信息模板不存在，请联系管理员添加！',
                uploadLoading: false,
                progressPercent: 0,
                showProgress: false,
                showRemoveFile: false,
                file: null,


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
                        title: '性别',
                        key: 'sex',
                        align: 'center'
                    },
                    {
                        title: '出生日期',
                        key: 'birthday',
                        align: 'center'
                    }, 
                    {
                        title: '民族',
                        key: 'nation',
                        align: 'center'
                    },  
                    // {
                    //     title: "邮箱",
                    //     key: "email",
                    //     align: "center"
                    // },                
                    // {
                    //     title: '入学年份',
                    //     key: 'year',
                    //     align: 'center'
                    // },
                    // {
                    //     title: "手机号",
                    //     key: "tel"
                    // },
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
                sex:'',
                birthday:'',
                nation:'',
                email:'',
                year:'',
                tel:'',
                stuid:'',
                outdata:[],
                message:'',
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

            this.$axios.get('get_student_template_url').then(res => {
                if(res.data.code="0000"){
                    this.stu_template_url = res.data.stu_template_url;
                }else{
                    this.stu_template_url = '#'
                    
                }
            })
            .catch(error => {                
                console.log(error);
            });
        },
        methods: {
            // d_templ(){
            //     if(this.stu_template_url=='#'){
            //         this.$Message.info('学生信息模板不存在，请联系管理员添加！');
            //         return false;
            //     }
            //     return true;
            // },
            initUpload () {
              this.file = null
              this.showProgress = false
              this.loadingProgress = 0
              // this.tableData = []
              // this.tableTitle = []
            },
            handleUploadFile () {
              this.initUpload()
            },
            handleBeforeUpload (file) {
              const fileExt = file.name.split('.').pop().toLocaleLowerCase()
              if (fileExt === 'xlsx' || fileExt === 'xls') {
                this.readFile(file)
                this.file = file
              } else {
                this.$Notice.warning({
                  title: '文件类型错误',
                  desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
                })
              }
              return false
            },
            // 读取文件
            readFile (file) {
              const reader = new FileReader()
              reader.readAsArrayBuffer(file)
              reader.onloadstart = e => {
                this.uploadLoading = true
                this.tableLoading = true
                this.showProgress = true
              }
              reader.onprogress = e => {
                this.progressPercent = Math.round(e.loaded / e.total * 100)
              }
              reader.onerror = e => {
                this.$Message.error('文件读取出错')
              }
              reader.onload = e => {
                // this.$Message.info('文件读取成功')
                const data = e.target.result
                const { header, results } = excel.read(data, 'array')
                const tableTitle = header.map(item => { return { title: item, key: item } })
                // this.tableData = results
                // this.tableTitle = tableTitle
                this.uploadLoading = false
                // this.tableLoading = false
                // this.showRemoveFile = true
                //这里将来应该增加判断header和results是否和模板文件中的一致？？？？？？？？？
                this.outdata = results;
                this.postexcal(this.outdata);
              }
            },
            addstu (index) { // 显示增加学生的窗口
                this.message = '';
                this.modal1 = true;
                this.id = this.userData[index].id;
                this.name = this.userData[index].name; // 这应该是获取了班级名称
                this.stuid='';
                this.sname='';
                // this.email='';
                // this.year='';
                this.sno='';
                this.sex='';
                this.birthday='';
                this.nation='';
                // this.tel='';
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
                if (this.sname!=''&&this.sno!=''&&this.sex!=''&&this.birthday!=''&&this.nation!='') {

                      var y = this.birthday.getFullYear();
                      var m = this.birthday.getMonth() + 1;
                      m = m < 10 ? ('0' + m) : m;
                      var d = this.birthday.getDate();
                      d = d < 10 ? ('0' + d) : d;
                      this.birthday =  y + '-' + m + '-' + d;

                    this.$axios.post('/studentList', {
                        params: {
                            name: this.sname,
                            // email: this.email,
                            // year: this.year,
                            // tel: this.tel,
                            sno: this.sno,
                            sex: this.sex,
                            birthday: this.birthday,
                            nation: this.nation,
                            class_room_id: this.id,
                        }
                    }).then(function(res) {
                        this.$Message.info('添加成功');
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error)
                    });
                }else{
                    this.$Message.info('姓名，学号，性别，出生日期，民族不能为空！');
                }
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
                // this.email=this.classstuData[index].email;
                // this.year=this.classstuData[index].year;
                this.sno=this.classstuData[index].sno;
                this.sex=this.classstuData[index].sex;
                this.birthday=this.classstuData[index].birthday;
                this.nation=this.classstuData[index].nation;
                // this.tel=this.classstuData[index].tel;
            },
            ok () {
                this.$axios.patch('/studentList', {
                    params: {
                        id: this.stuid,
                        name: this.sname,
                        // email: this.email,
                        // year: this.year,
                        sno: this.sno,
                        sex: this.sex,
                        birthday: this.birthday,
                        nation: this.nation,
                        // tel: this.tel,
                        class_room_id: this.id,
                    }
                }).then(function(res) {
                    console.log(res);
                    let id = res.data[0].id;
                    for(let i = 0; i < this.classstuData.length; i++){
                      if (this.classstuData[i].id == id){
                        this.classstuData[i].name = res.data[0].name;
                        // this.classstuData[i].email = res.data[0].email;
                        // this.classstuData[i].year = res.data[0].year;
                        this.classstuData[i].sno = res.data[0].sno;
                        this.classstuData[i].birthday = res.data[0].birthday;
                        this.classstuData[i].sex = res.data[0].sex;
                        this.classstuData[i].nation = res.data[0].nation;
                        // this.classstuData[i].tel = res.data[0].tel;
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
                let _this = this;
                this.$axios.post('/manystudent', {
                    params: {
                        data:data,
                        class_room_id: this.id
                    }
                }).then(function(res) {
                    // console.log(res.data);
                    if(res.data.code == "0000"){
                        this.message=res.data.msg;
                        this.outdata=[];
                        this.modal1=false;
                        // this.$Message.info(res.data.msg);
                    }else{
                        this.message=res.data.msg;
                        this.outdata=[];
                        // this.modal1=false;
                        // this.$Message.info(res.data.msg);
                    }

                }.bind(this))
                .catch(function(error) {
                    // debugger
                    // _this.message='服务器错误，文件导入失败,请稍后重试!';
                    // console.log(error)
                    this.$Message.error('服务器错误，文件导入失败,请稍后重试!');
                });
            },
            imports(){
                if(this.outdata.length>0){
                    this.message='正在导入文件,请稍后......';
                    this.postexcal(this.outdata);
                }else{
                    this.$Message.info('请先选择一个excel文件!');
                }        
            },
        }
    };
</script>
