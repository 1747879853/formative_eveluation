
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
                <autoform :schema="schema" @success="formData"></autoform>
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
                    
                ]
            },
            formValidate: {},
            ruleValidate: {},
            form_html:'',
            showOrNot: true,
            main_fields: [],
            detail_fields: [],
            approvalList: [],
            schema: undefined,
            
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
        autoformReturnData(formdata){
            console.log(formdata);
        },
        
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
                    // this.formValidate[cur.en_name] = "";
                    // this.ruleValidate[cur.en_name] = [{ required: true, message: '不能为空', trigger: 'blur' }]
                }
                this.formDynamic.items = this.main_fields;
                console.log(this.main_fields)
                console.log(this.detail_fields)
                console.log(this.formDynamic)

                this.schema = this.main_fields;
                
                

            })
            .catch(error => {
                this.main_fields =[];
                this.detail_fields = [];
                console.log(error);
            });
            this.showOrNot = false
        },
        formData(stuff){
            alert(JSON.stringify(stuff,null,' '))
        },
        
        handleSubmit (name) {
            var dd = this.$refs[name];
            debugger
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            debugger
            this.$refs[name].resetFields();
        }
    }
};

Vue.component('autoform', {
    props:['schema'],
    data(){
        return {
            formData:{}
        }
    },
  provide(){
    return {formData: this.formData}
  },
    template:`
    <form v-if="schema" @submit.prevent="$emit('success', formData)">        
        <item v-for="(item,index) in schema" v-bind="item" :key="index"></item>
        <button type="submit">Submit</button>
    </form>
    <h2 v-else>Loading</h2>`
});

Vue.component('item', {
    name:'item',
    props:['sequence','name','control','selectoptions_arr'],
    inject:['formData'],
    template:`
    <div class="item">

    <label :for="sequence">{{name}}</label>
    <input v-if="control == '单行输入框'" :id="sequence" v-model="formData[sequence]"></input>
    <textarea v-else-if="control == '多行输入框'" :id="sequence" v-model="formData[sequence]"></textarea>
    <input v-else-if="control == '日期'" type="date" :id="sequence" v-model="formData[sequence]">
    <input v-else-if="control == 'integer'" type="number" :id="sequence" v-model="formData[sequence]">
       


    <select v-else-if="control == '多选框'" v-model="formData[sequence]">
    <option v-for="option in selectoptions_arr" v-bind:value="option">
        {{ option }}
    </option>
    </select>


     <template v-else-if="control == '单选框'" v-for="option in selectoptions_arr">
      <input  type="radio" :id="sequence + option" v-model="formData[sequence]" :value="option">
      <label :for="sequence + option">{{option}}</label>
    </template>

    
    
    <template v-else-if="control == 'group'">
        <item v-for="i in item" v-bind="i" :key="i.sequence"></item>
    </template>
    </div>`
})

</script>

       