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
                    <Input v-model="approvalName" placeholder="请输入..." style="width: 300px"></Input>
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
                    <div style="height: 394px;">
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
                    <div style="height: 394px;">
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
export default {
    name: 'new-approval-tmpl',
    data () {
        return {
            approval_field_data: [
               {    
                    'id': 1,
                    'approval_id': 1,
                    'name': '申请事由',
                    'en_name': 'reason',
                    'control': '单行输入框',
                    'info': '输入申请事由',
                    'sequence': 1,        
                    'selectoptions': '',
                    'dateformat':''
                },
                {    
                    'id': 2,
                    'approval_id': 1,
                    'name': '期望交付日期',
                    'en_name': 'expire',
                    'control': '日期',
                    'info': '输入期望交付日期',
                    'sequence': 2,
                    'selectoptions': '',
                    'dateformat':''
                         
                }
            ],
            approval_detail_field_data: [
               {    
                    'id': 1,
                    'approval_id': 1,
                    'name': '申请事由',
                    'en_name': 'reason',
                    'control': '单行输入框',
                    'info': '输入申请事由',
                    'sequence': 1,        
                    'selectoptions': '',
                    'dateformat':''
                },
                {    
                    'id': 2,
                    'approval_id': 1,
                    'name': '期望交付日期',
                    'en_name': 'expire',
                    'control': '日期',
                    'info': '输入期望交付日期',
                    'sequence': 2,
                    'selectoptions': '',
                    'dateformat':''
                         
                }
            ],

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
              

    },
    methods:{        

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
            this.$Message.success("保存成功！");
            console.log(this.approval_field_data)
            console.log(this.approval_detail_field_data)
            //下一步发送数据到服务器，然后建表并保存。
        }               
    }
};
</script>
