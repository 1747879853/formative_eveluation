<template>
    <Card>
        <p slot="title" style="height:25px">
            <Icon type="ios-list"></Icon>
            班级列表&nbsp;&nbsp;&nbsp;
            <!--<Button @click="show_modal1()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加班级</Button>-->
        <div>

            <Modal
                    v-model="modal1"
                    title="添加学生信息"
                    @on-ok="addclassstu"
                    @on-cancel="cancel2">
                <table>
                    <tr><td>学号</td><td>
                        <Input v-model="stuid" placeholder="请输入学生学号" clearable style="width: 300px"></Input></td></tr>
                </table>
            </Modal>
            <Modal
                    v-model="modal2"
                    width="65%"
                    :mask-closable="false"
                    title="删除该班学生"
                    @on-ok="ok"
                    @on-cancel="cancel">
                <Table :columns="classstuColumns" :data="classstuData" style="width: 100%;"></Table>
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
                id: 0,
                name: '',
                status: '',
                startyear: '',
                userColumns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 60
                    },
                    {
                        title: '班级号',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '班级名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '入学年份',
                        key: 'startyear',
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
                                            this.delstu()(params.index);
                                        }
                                    }
                                }, '删除学生')
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
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '学号',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '入学年份',
                        key: 'startyear',
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delclassstu()(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }

                ],
                classstuData: []
            };
        },
        computed: {
            avatorImage () {
                return localStorage.avatorImgPath;
            }
        },
        mounted () {
            this.$axios
                .get('/classList')
                .then(res => {
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
                alert(this.name);
            },
            delstu (index) { // 显示删除学生的窗口
                this.modal2 = true;
                this.name = '';
                this.status = '';
                // this.id = this.userData[index].id;
                alert(this.id);// 全局获取到班级id，失败了，加上上面的一句就加载不出来
                this.$axios
                    .get('/classStu', {// 根据班级id获取学生列表
                        params: {
                            id: index
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
                this.$axios.post('/AddClassStu', { // 添加学生窗口的确定按钮
                    params: {
                        id: this.id, // 班级的id
                        stuid: this.stuid// 学号，怎么获取这个input的输入？现在是不是已经获取了
                    }
                }).then(function (res) {
                    // console.log(res);
                    // let id = res.data.id;
                    // for (let i = 0; i < this.userData.length; i++) {
                    //     if (this.userData[i].id == id) {
                    //         this.userData[i].name = res.data.name;
                    //         break;
                    //     }
                    // }
                    this.$Message.info('修改成功');
                }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delclassstu (index) { // 删除学生里面的按钮
                this.$Modal.confirm({
                    title: '移除学生',
                    content: '<p>从班级中移除此学生吗?</p>',
                    onOk: () => {
                        this.$axios.post('/DelClassStu', {
                            params: {
                                stuid: this.classstuData[index].id, // 获取这一行的学号
                                classid: this.id // 全局的班级id，刚才没获取成功
                            }
                        }).then(function (res) {
                            console.log(res.data);
                            this.userData.push(res.data);
                            this.$Message.info('移除成功');
                        }.bind(this))
                            .catch(function (error) {
                                console.log(error);
                            });
                    },
                    onCancel: () => { this.$Message.info('取消'); }});
            },

            ok () { this.$Message.info('成功'); },
            cancel2 () { this.$Message.info('取消'); },

            userBody (row, column, index) {
                return row[column.key];
            },
            userName (row, index) {
                return row['name'];
            },
            user_Name (row, index) {
                return row['user_name'];
            },
            userTel (row, index) {
                return row['user_tel'];
            },
            userStatus (row, index) {
                return row['status'];
            }

        }
    };
</script>
