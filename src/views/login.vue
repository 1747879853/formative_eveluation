<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                            <Button @click="forgetPassword" type="primary" long>忘记密码</Button>
                        </FormItem>
                    </Form>
                    <Modal
                        v-model="modal"
                        title="重置密码"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <table>
                        <tr><td>学(工)号</td><td>
                        <Input v-model="no" placeholder="请输入学(工)号" clearable style="width: 300px"></Input></td></tr>
                        <tr><td>姓名</td><td>
                        <Input v-model="name" placeholder="请输入姓名" clearable style="width: 300px"></Input></td></tr>
                        </table>
                    </Modal>
                    <p class="login-tip"><a style="color: #FF0000">{{failed}}</a></p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import store from '../store';
import { debug } from 'util';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            failed: '',
            pad: false,
            modal:false,
            no:'',
            name:'',
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    // Cookies.set('user', this.form.userName);
                    // Cookies.set('userid', 6);
                    // Cookies.set('password', this.form.password);
                    // this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    // if (this.form.userName === 'iview_admin') {
                    //     Cookies.set('access', 0);
                    // } else {
                    //     Cookies.set('access', 1);
                    // }
                    // this.$router.push({
                    //     name: 'home_index'
                    // });

                    this.$axios.post('/user_token', {
                        auth: {
                            email: this.form.userName,
                            password: this.form.password
                        }
                    }).then(function (res) {
                        this.$store.commit('set_token', res.data.jwt);
                        console.log(res.data);
                        this.$store.commit('set_auth_rules', res.data.auth_rules);
                        if (this.$store.state.token) {
                            Cookies.set('user', this.form.userName);
                            Cookies.set('userid', 6);
                            Cookies.set('password', this.form.password);
                            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            Cookies.set('access', 0);
                            // if (this.pad) {
                            //     this.$router.replace('/input_class_grade/pad_input_class_grade');
                            // } else {
                                this.$router.push({
                                    name: 'home_index'
                                });
                            // }
                        } else {
                            // this.$router.replace('/login');
                        }
                    }.bind(this))
                        .catch(error => {
                            console.log(error);
                            this.failed = '登录失败,请输入正确的用户名和密码！';
                        });



                }
            });
        },
        _isMobile () {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            return flag;
        },
        forgetPassword(){
            this.no='';
            this.name='';
            this.modal=true;
        },
        cancel(){this.$Message.info('取消');},
        ok (){
            this.$axios.post('/resetPassword', {
                params: {
                    name: this.name,
                    email: this.no,
                }
            }).then(function(res) {
                // console.log(res.data);
                this.$Message.info(res.data.msg);
                this.modal=false;
            }.bind(this))
            .catch(function(error) {
                console.log(error)
            });                        
        },
    },
    mounted () {
        this.form.userName = Cookies.get('user');
        this.form.password = Cookies.get('password');
        if (this._isMobile()) {
            this.pad = true;
        } else {
            this.pad = false;
        }


    }
};
</script>

<style>

</style>
