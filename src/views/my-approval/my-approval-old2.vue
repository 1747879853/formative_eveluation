
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

                <autoform :formDynamic="formDynamic" @success="formData"></autoform>
            </Row>
        </TabPane>
        <TabPane label="待我审批的" name="name2">标签二的内容</TabPane>
        <TabPane label="我已审批的" name="name3">标签三的内容</TabPane>
        <TabPane label="我发起的" name="name4">标签一的内容</TabPane>
    </Tabs>
      
</template>

<script>
import Cookies from 'js-cookie';
import Vue from 'vue';
export default {
    name: 'my-approval',
    data () {
        return {
            formDynamic: {
                    items: [
                        {
                            sequence: 0,
                            dateformat: '',
                            info: '',
                            name: '',
                            en_name: '',
                            en_name_value: '',
                            control: '',
                            selectoptions_ar: [],
                            rule: {}
                        }
                    ]
                },
            showOrNot: true,
            main_fields: [],
            detail_fields: [],
            approvalList: [],
            
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
    created(){
    },
    methods: {
     
        AppFormShow(item){
            this.$axios
            .get("/approval_field_list?approval_id=" + item.id)
            .then(res => {
                this.main_fields = res.data.approval_field_data;
                this.detail_fields = res.data.approval_detail_field_data;

                for(let i=0;i<this.main_fields.length;i++){
                    let cur = this.main_fields[i];
                    this.main_fields[i]["selectoptions_arr"] = [];
                    if(cur.control == "单选框" || cur.control == "多选框"){
                        this.main_fields[i]["selectoptions_arr"] = cur.selectoptions.split(',')
                        this.main_fields[i]["rule"] = { required: true, message: '请选择', trigger: 'change' }                        
                    }else if(cur.control == "日期"){
                        this.main_fields[i]["rule"] = { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    }else{
                        this.main_fields[i]["rule"] = { required: true, message: '不能为空', trigger: 'blur' }

                    }
                    this.main_fields[i]["en_name_value"] = ''
                }
                this.formDynamic.items = this.main_fields;
                console.log(this.main_fields)
                console.log(this.detail_fields)
                console.log(this.formDynamic)

                
                

            })
            .catch(error => {
                this.main_fields =[];
                this.detail_fields = [];
                console.log(error);
            });
            this.showOrNot = false
        },
        formData(stuff){
            alert(JSON.stringify(stuff,null,' '));
            console.log(stuff);
        },
        
    }
};

Vue.component('autoform', {
    props:['formDynamic'],
    data(){
        return {
            // formData:{},            
        }
    },
  provide(){
    // return {formData: this.formDynamic}
  },
  methods:{

        handleSubmit (name) {
            this.$emit('success', this.formDynamic);
            // var dd = this.$refs[name];
            
            // this.$refs[name].validate((valid) => {
            //     if (valid) {
            //         this.$Message.success('Success!');
            //     } else {
            //         this.$Message.error('Fail!');
            //     }
            // })
        },
        handleReset (name) {
            
            this.$refs[name].resetFields();
        }
  },
    template:`
    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px" >
      
        <fitem v-for="(item,index) in formDynamic.items" :item="item" :key="index"></fitem>      
        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
            <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
    `
});

Vue.component('fitem', {
    props:['item'],    
    template:`
    <FormItem           
            :label="item.name"
            :prop="item.en_name_value"
            :rules="item.rule">
        <Row>
            <Input v-if="item.control == '单行输入框'" v-model="item.en_name_value" clearable :placeholder="item.info"></Input>
            <Input v-else-if="item.control == '多行输入框'" v-model="item.en_name_value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="item.info"></Input>

            <Select v-else-if="item.control == '多选框'" v-model="item.en_name_value" :placeholder="item.info">
                <Option v-for="(opt,index1) in item.selectoptions_arr" :key="index1" :value="opt">{{opt}}</Option>
            </Select>

            <Select v-else-if="item.control == '单选框'" v-model="item.en_name_value" :placeholder="item.info">
                <Option v-for="(opt,index2) in item.selectoptions_arr" :key="index2" :value="opt">{{opt}}</Option>
            </Select>

            <DatePicker v-else-if="item.control == '日期' && item.dateformat=='年-月-日'" type="date" :placeholder="item.info" v-model="item.en_name_value"></DatePicker>

            <DatePicker v-else-if="item.control == '日期' && item.dateformat=='年-月-日 时:分'" type="datetime" :placeholder="item.info" v-model="item.en_name_value"></DatePicker>

        </Row>
    </FormItem>
    `
})

</script>

       