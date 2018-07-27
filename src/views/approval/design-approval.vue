<style lang="less">
    @import 'draggable-list.less';
</style>
<template>
    <div>
        <Row>            
            <Card>
                <div style="text-align:center;font-size:24px;color: #2db7f5;">
                    审批设计器
                    <span style="float:right;margin-right:100px;"> <Button type="primary" @click="save_and_use">保存并启用</Button></span>
                </div>                    
            </Card>                      
        </Row>
        <Row>
            <Card>
                <p slot="title" style="font-size:20px;">
                    <Icon type="android-funnel"></Icon>
                    表单设置
                </p>
                <div>
                    <span>审批名称（最多20字）
                    <Input v-model="approvalName" placeholder="请输入..." required style="width: 300px"></Input>
                    </span>
                    <span style="margin-left:20px;">
                    审批说明（最多100字）
                    <Input v-model="approvalComment" placeholder="请输入..." style="width: 300px;"></Input>
                    </span>
                </div>
            </Card>
        </Row>
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="12">
                <Card>
                    <p slot="title" style="height: 33px;font-size:20px;">
                        <Icon type="android-funnel"></Icon>
                        主表设计
                    </p>
                    <div style="height: 494px;">
                        <ApprovalCreateForm cardtitle="主表设计" v-bind:approval_field_data="approval_field_data"></ApprovalCreateForm>
                    </div>
                </Card>
            </Col>
            <Col span="12">
                <Card>
                    <p slot="title" style="height: 33px;font-size:20px;">
                        <Icon type="android-funnel"></Icon>
                        详表设计
                    </p>
                    <div style="height: 494px;">
                        <ApprovalCreateFormNew cardtitle="详表设计" v-bind:approval_field_data="approval_detail_field_data"></ApprovalCreateFormNew>
                    </div>
                </Card>
            </Col>
        </Row>    
    </div>
</template>

<script>
import ApprovalCreateForm from "./approval-create-form.vue"
import ApprovalCreateFormNew from "./approval-create-form-new.vue"
import iView from 'iview';
export default {
    name: 'design-approval-tmpl',
    data () {
        return {
            approval_admin_id: 0,
            existed_app_arr: [],
            approval_field_data: [],
            approval_detail_field_data: [],

            approvalName:'',
            approvalComment: '',
            
            formValidate: {
                name: '',
                en_name: '',
                control: '',
                info: '',
                sequence: 0,                
                selectoptions: '',
                dateformat:'' 
            },
            newFromValidate: {
                name: '名称',
                en_name: '',
                control: '单行输入框',
                info: '',
                sequence: 0,
                selectoptions: '',
                dateformat:''               
            },
            ruleValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                info: [
                    { required: true, message: 'Please select', trigger: 'blur' }
                    
                ],                
                control: [
                    { required: true, message: 'Please select', trigger: 'change' }
                ],
               
            },
            sel_arr: ['选项1','选项2','选项3']            
        };
    },
    computed: {
        
    },
    watch:{
        sel_arr(curVal,oldVal){
            this.formValidate.selectoptions = this.sel_arr.join(',')
　　　　},
        formValidate(curVal,oldVal){
            // debugger
            if (this.formValidate.selectoptions) {
                this.sel_arr = this.formValidate.selectoptions.split(',');
            }else{
                this.sel_arr = ['选项1','选项2','选项3'];
            }
        }
    },
    components:{
        ApprovalCreateForm,ApprovalCreateFormNew
    },
    mounted () {
        this.init();
    },
    activated () {
        this.init();
    },
    
    methods:{  
        init (){            
            this.approval_admin_id = this.$route.params.approval_admin_id;
            this.existed_app_arr = this.$route.params.existed_app;
            if(this.approval_admin_id == 0){
                return;
            }
            else{
                
                this.approvalName = this.$route.params.approval_admin_name;
                this.approvalComment = this.$route.params.approval_admin_comment;

                this.$axios
                .get("/approval_field_edit",{params: {approval_admin_id: this.approval_admin_id}})
                .then(res => {
                    if(res.data.code == 1){
                        this.approval_field_data = res.data.approval_field_data || [];
                        this.approval_detail_field_data = res.data.approval_detail_field_data || [];
                    }
                    if(res.data.code == 0){
                        this.$Message.info(res.data.msg);
                    }

                })
                .catch(error => {
                    this.approval_field_data = [];
                    this.approval_detail_field_data = [];
                    console.log(error);
                    this.$Message.error("获取该审批的表单数据失败，请检查服务器！");
                    // bug: here should close current tag,and go back ?????????
                    // this.$router.go(-1);  //this can go back
                    // this.$store.commit('closePage', this.$route.name);  //not work
                });
            }


        },      

        handleReset (name) {
            this.$refs[name].resetFields();
        },
        addNewField(){
            this.approval_field_data.push(JSON.parse(JSON.stringify(this.newFromValidate)));
        },

        addSel(index) {
            this.sel_arr.splice(index+1, 0, "新选项"); 
        },
        removeSel(index) {
            if(this.sel_arr.length > 1){
                this.sel_arr.splice(index , 1);
            }else{
                this.$Message.error('至少一个选项！');
            }
        },
        save_and_use(){
            let list= document.getElementById("editable").getElementsByTagName("li");
            for (let i = 0; i < list.length; i++) {                
                let se = parseInt(list[i].getAttribute("data-index"));
                this.approval_field_data[i].sequence = se;                                  
            }

            list= document.getElementById("editable-new").getElementsByTagName("li");
            for (let i = 0; i < list.length; i++) {                
                let se = parseInt(list[i].getAttribute("data-index"));
                this.approval_detail_field_data[i].sequence = se;                                  
            }
            if(this.approval_admin_id==0){
                for (let i = 0; i < this.existed_app_arr.length; i++) {
                    if(this.existed_app_arr[i].name == this.approvalName){
                        this.$Message.error("审批名称与已有审批重名!")
                        return
                    }
                }
            }
            

            // if(this.approvalName==""||this.approvalComment==""||this.approval_field_data.length<=0){
            if(this.approvalName==""||this.approvalComment==""){
                this.$Message.error("数据填写不完整!")
                return
            }

            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', 'Loading')
                    ])
                }
            });

            
            //发送数据到服务器，然后建表并保存。
            //here has a bug,always post to server an additional data approval => {}  ???????????
            this.$axios.post('/approval_create', {
                approval_admin_id: this.approval_admin_id,
                approval_admin_name: this.approvalName,
                approval_admin_comment: this.approvalComment,
                approval_field_data: this.approval_field_data,
                approval_detail_field_data: this.approval_detail_field_data
            })
            .then(res => {
                this.$Spin.hide();
                this.$Message.success(res.data.msg);
                this.$store.commit('clearCurrentTag', this);
                this.$router.go(-1);
            })
            .catch(error => {
                this.$Spin.hide();
                this.$Message.error('保存失败，请检查服务器设置！');
                console.log(error);
            });

        },
        sleep (time) {
          return new Promise((resolve) => setTimeout(resolve, time));
        },
        handleSpinCustom () {
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', '创建时间稍长，请耐心等待...')
                    ])
                }                
            });
            setTimeout(() => {
                this.$Spin.hide();
            }, 6000);
        }               
    }
};
</script>
