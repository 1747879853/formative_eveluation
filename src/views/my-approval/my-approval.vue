
<template>    
    
    <Tabs value="name1" @on-click="changeTab">
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
                
                <span v-if="hasMainTable">

                    <Select v-model="submit_user_id" placeholder="请选择审批人" style="margin-left:50px;width:200px;">
                        <Option v-for="(item,index) in submit_users" :key="item.id" :value="item.id">{{item.username}}</Option>                            
                        
                    </Select>
                    <Button type="primary" @click="submitAllForm">提交</Button>
                    <div style="border-bottom: 1px solid #ccc;margin-top:5px;"> </div>
                
                    <AutoForm  v-bind:formDynamic="formDynamicMain" v-bind:arrIndex="-1" ></AutoForm>
                </span>
                <div v-if="hasDetailTable">
                    <AutoForm  v-for="(item,index) in formDynamicDetail_arr" :key="index" v-bind:formDynamic="item" v-bind:arrIndex="index" v-on:delitem="delDetailItem"></AutoForm>
                    
                    <p>如需采购多种产品，请点击“增加明细”</p>
                    <Button type="primary" @click="addDetailData" icon="plus">增加明细</Button>
                </div>
                
            </Row>
        </TabPane>
        <TabPane :label="label2" name="to_me_label">
            <Row>
                <Table :ref="refs"  highlight-row  @on-row-click="to_me_onRowClick"   :columns="to_me_columns"  :data="to_me_data" border></Table>
            </Row>
        </TabPane>

        <TabPane label="我已审批的" name="to_me_done_label">
            <Row>
                <Table :ref="refs"  highlight-row  @on-row-click="to_me_onRowClick"   :columns="to_me_columns"  :data="to_me_done_data" border></Table>
            </Row>
        </TabPane>
        <TabPane label="我发起的" name="from_me_label">
            <Row>
                <Table :ref="refs"  highlight-row  @on-row-click="to_me_onRowClick"   :columns="to_me_columns"  :data="from_me_data" border></Table>
            </Row>
        </TabPane>
    </Tabs>
      
</template>

<script>
import Vue from 'vue';
import AutoForm from "./auto-form.vue"
import iView from 'iview';
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
            approval_name: '',
            approval_id: 0,
            submit_users: [],
            submit_user_id: 0,
            to_me_num: 0,
            label2: (h) => {
                return h('div', [
                    h('span', '待我审批的'),
                    h('Badge', {
                        props: {
                            count: this.to_me_num
                        }
                    })
                ])
            },
            to_me_data: [],
            to_me_done_data: [],
            from_me_data: [],
            refs: String,
            to_me_columns: [
                {
                  type: "index",
                  title: "序号",
                  width: 60
                },
                {
                  title: "审批名称",
                  key: "title",
                  align: "center"
                },
                {
                  title: "审批摘要",
                  key: "digest",
                  align: "center"
                },
                {
                  title: "发起时间",
                  key: "submit_time",
                  align: "center"
                },
                {
                  title: "完成时间",
                  key: "finish_time",
                  align: "center"
                },
                {
                  title: "状态",
                  key: "status",
                  align: "center"
                }
            ],
            
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
            this.approval_id = item.id;
            this.$axios
            .get("/approval_field_list?approval_id=" + item.id)
            .then(res => {
                if(res.data.code == 1){
                    this.submit_users = res.data.submit_users;
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
                            this.main_fields[i]["en_name_value"] = undefined;                    
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
                            this.detail_fields[i]["en_name_value"] = undefined;                    
                        }
                        this.formDynamicDetail.items = this.detail_fields;
                        this.formDynamicDetail.title = this.approval_name + "明细";
                        this.formDynamicDetail_arr.push(JSON.parse(JSON.stringify(this.formDynamicDetail)));
                        this.formDynamicDetail.title = '';
                    }
                }else{
                    this.$Message.error(res.data.msg);
                    return
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
            if(this.submit_user_id == 0){
                this.$Message.error("请选择审批人！");
                return;
            }
            iView.LoadingBar.start();
            //check if all data filled,then submit
            let allfilled =true;
            let m_hash = {};
            let d_hash_arr = [];
            let t_hash ={};
            for(let i=0;i<this.formDynamicMain.items.length;i++){
                let cur = this.formDynamicMain.items[i];
                m_hash[cur.en_name] = cur.en_name_value;
                if(this.formDynamicMain.items[i].en_name_value==undefined){
                    allfilled = false;
                    break;
                } 
            }
            if(this.hasDetailTable){
                for(let i=0;i<this.formDynamicDetail_arr.length && allfilled;i++){
                    let cur = this.formDynamicDetail_arr[i];
                    for(let j=0;j<cur.items.length;j++){
                        let curcur = cur.items[j];
                        t_hash[curcur.en_name] = curcur.en_name_value;                        
                        if(curcur.en_name_value==undefined){
                            allfilled = false;
                            break;
                        } 
                    }
                    d_hash_arr.push(JSON.parse(JSON.stringify(t_hash)));
                    t_hash = {};
                }
            }
            /*post parameters like this:
            {
                "approvalid":10,
                "mainhash":{"field0":"111","field1":"222","field2":"选项1","field3":"选项2","field4":"2018-07-20T16:00:00.000Z"},
                "detailhasharr":[{"field0":"333","field1":"选项1"},{"field0":"444","field1":"选项2"}],
                "submit_user_id":1
            }
            */
            if(allfilled){
                this.$axios.post('/approval_save', {
                    approvalid: this.approval_id,
                    mainhash: m_hash,
                    detailhasharr: d_hash_arr,
                    submit_user_id: this.submit_user_id,  //审批人
                })
                .then(res => {
                    iView.LoadingBar.finish();
                    // console.log(res);
                    if(res.data.code == 1){
                        this.$Message.success(res.data.msg);
                    }else{
                        this.$Message.error('保存失败，服务器保存数据错误！');
                    }
                    return;
                })
                .catch(error => {
                    iView.LoadingBar.finish();
                    this.$Message.error('保存失败，连接服务器超时！');
                    console.log(error);
                    return;
                });

            }else{
                iView.LoadingBar.finish();
                this.$Message.error("表单数据填写不完整！");
                return;
            }
            console.log(this.formDynamicMain);
            console.log(this.formDynamicDetail_arr);
        },
        to_me_onRowClick (row, index) {
          // this.$emit('on-row-clic', row, index)
          // debugger
          // alert(row);
        },
        changeTab(name){
            if(name=="to_me_label"){
                this.$axios
                .get("/approval_to_me")
                .then(res => {
                    this.to_me_data = res.data.data;
                    this.to_me_num = res.data.rows;
                })
                .catch(error => {
                    this.to_me_data =[];
                    console.log(error);
                });
            }
            else if(name=="to_me_done_label"){

                this.$axios
                .get("/approval_to_me_done")
                .then(res => {
                    this.to_me_done_data = res.data.data;
                })
                .catch(error => {
                    this.to_me_done_data =[];
                    console.log(error);
                });
            }else if(name=="from_me_label"){

                this.$axios
                .get("/approval_from_me")
                .then(res => {
                    this.from_me_data = res.data.data;
                })
                .catch(error => {
                    this.from_me_data =[];
                    console.log(error);
                });
            }

        }    
    }
};

</script>

       