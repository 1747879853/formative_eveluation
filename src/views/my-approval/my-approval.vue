
<template>    
    
    <Tabs value="name1">
        <TabPane label="发起审批" name="name1">
            <Row id="approval-list" v-if="showOrNot">
                <p>审批分组名称</p>
                <Row type="flex" justify="start" class="code-row-bg">
                    <Col v-for="(item,index) in approvalList" :key="index"  :data-index="index" span="4">
                    <Button type="primary" @click="AppFormShow(item)" icon="android-cart">{{item.name}}</Button></Col>                    
                </Row>
            </Row>


            <Row v-if="showOrNot == false">
                <Button type="primary" @click="returnBack" icon="ios-arrow-thin-left">返回</Button>
                <Button type="primary" @click="submitAllForm">提交</Button>
                <div style="border-bottom: 1px solid #ccc;margin-top:5px;"> </div>
                
                <AutoForm v-if="hasMainTable" v-bind:formDynamic="formDynamicMain" v-bind:arrIndex="-1" ></AutoForm>
                
                <div v-if="hasDetailTable">
                    <AutoForm  v-for="(item,index) in formDynamicDetail_arr" :key="index" v-bind:formDynamic="item" v-bind:arrIndex="index" v-on:delitem="delDetailItem"></AutoForm>
                    
                    <p>如需采购多种产品，请点击“增加明细”</p>
                    <Button type="primary" @click="addDetailData" icon="plus">增加明细</Button>
                </div>
                
            </Row>
        </TabPane>
        <TabPane label="待我审批的" name="name2">标签二的内容</TabPane>
        <TabPane label="我已审批的" name="name3">标签三的内容</TabPane>
        <TabPane label="我发起的" name="name4">标签一的内容</TabPane>
    </Tabs>
      
</template>

<script>
import Vue from 'vue';
import AutoForm from "./auto-form.vue"
export default {
    name: 'my-approval',
    data () {
        return {
            formDynamicMain: {
                    flag: "main",
                    title: "",
                    items: [
                        
                    ]
            },
            formDynamicDetail: {
                    flag: "detail",
                    title: "",
                    items: [
                        
                    ]
            },
            formDynamicDetail_arr:[
            ],
            detail_arr_index: 0,
            hasMainTable: false,
            hasDetailTable: false,
            showOrNot: true,
            main_fields: [],
            detail_fields: [],
            approvalList: [],
            approval_data: {},
            approval_name: ''
            
        };
    },
    mounted() {
        this.$axios
        .get("/approval_list")
        .then(res => {
            this.approvalList = res.data;
        })
        .catch(error => {
            this.approvalList =[];
            console.log(error);
        });

    },
    components:{
        AutoForm
    },
    created(){
    },
    methods: {
        returnBack(){
            this.showOrNot = true
            this.formDynamicMain.items = [];
        },
     
        AppFormShow(item){
            this.$axios
            .get("/approval_field_list?approval_id=" + item.id)
            .then(res => {
                this.approval_data = res.data.approval_data;
                this.approval_name = this.approval_data.name;
                if(res.data.approval_field_data.length > 0){
                    this.hasMainTable = true;
                    this.main_fields = res.data.approval_field_data;

                    for(let i=0;i<this.main_fields.length;i++){
                        let cur = this.main_fields[i];
                        this.main_fields[i]["selectoptions_arr"] = [];
                        if(cur.control == "单选框" || cur.control == "多选框"){
                            this.main_fields[i]["selectoptions_arr"] = cur.selectoptions.split(',')
                            this.main_fields[i]["rule"] = { required: true, message: '请选择', trigger: 'change' }                        
                        }else if(cur.control == "日期"  && cur.dateformat=='年-月-日'){
                            this.main_fields[i]["rule"] = { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                        }else if(cur.control == "日期"  && cur.dateformat=='年-月-日 时:分'){
                            this.main_fields[i]["rule"] = { required: true, type: 'date', message: '请选择日期时间', trigger: 'change' }
                        }else{
                            this.main_fields[i]["rule"] = { required: true, message: '不能为空', trigger: 'blur' }

                        }
                        this.main_fields[i]["en_name_value"] = ''                    
                    }
                    this.formDynamicMain.items = this.main_fields;
                    this.formDynamicMain.title = this.approval_name+"主表";
                }
                if(res.data.approval_detail_field_data.length > 0){
                    this.hasDetailTable = true;
                    this.detail_fields = res.data.approval_detail_field_data;

                    for(let i=0;i<this.detail_fields.length;i++){
                        let cur = this.detail_fields[i];
                        this.detail_fields[i]["selectoptions_arr"] = [];
                        if(cur.control == "单选框" || cur.control == "多选框"){
                            this.detail_fields[i]["selectoptions_arr"] = cur.selectoptions.split(',')
                            this.detail_fields[i]["rule"] = { required: true, message: '请选择', trigger: 'change' }                        
                        }else if(cur.control == "日期"  && cur.dateformat=='年-月-日'){
                            this.detail_fields[i]["rule"] = { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                        }else if(cur.control == "日期"  && cur.dateformat=='年-月-日 时:分'){
                            this.detail_fields[i]["rule"] = { required: true, type: 'date', message: '请选择日期时间', trigger: 'change' }
                        }else{
                            this.detail_fields[i]["rule"] = { required: true, message: '不能为空', trigger: 'blur' }

                        }
                        this.detail_fields[i]["en_name_value"] = ''                    
                    }
                    this.formDynamicDetail.items = this.detail_fields;
                    this.formDynamicDetail.title = this.approval_name + "明细";
                    this.formDynamicDetail_arr.push(JSON.parse(JSON.stringify(this.formDynamicDetail)));
                    this.formDynamicDetail.title = '';
                }
            })
            .catch(error => {
                this.main_fields =[];
                this.detail_fields = [];
                console.log(error);
            });
            this.showOrNot = false
        },
        addDetailData(){
            this.formDynamicDetail.title = this.approval_name + "明细";
            this.formDynamicDetail_arr.push(JSON.parse(JSON.stringify(this.formDynamicDetail)));
            this.formDynamicDetail.title = '';
        },
        delDetailItem(param){
            if(this.formDynamicDetail_arr.length>1){
                this.formDynamicDetail_arr.splice(param.arrIndex,1)
            }
        },
        submitAllForm(){
            console.log(this.formDynamicMain);
            console.log(this.formDynamicDetail_arr);
        }        
    }
};

</script>

       