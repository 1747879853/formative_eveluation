
<template>    
    
  
    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
        <FormItem
                v-for="(item, index) in formDynamic.items"
                :data-index="index"
                :key="index"
                :label="item.name"
                :prop="item.en_name_value"
                :rules="item.rule">
            <Row>
                <Input v-if="item.control == '单行输入框'" v-model="item.en_name_value" :placeholder="item.info"></Input>
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
        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
            <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
     
</template>

<script>
export default {
    name: 'approval-new',
    data () {
        return {
            formDynamic: {
                items: [
                    
                ]
            },
            main_fields: [],
            detail_fields: [],
            approval_id: 0,         
        };
    },
    mounted() {
        this.approval_id = this.$route.params.approval_id ;
        this.main_fields = this.$route.params.m_fields;
        this.detail_fields = this.$route.params.d_fields;
        this.formDynamic.items = this.main_fields;

        
    },

    methods: {
        
        handleSubmit (name) {
            var dd = this.$refs[name];
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
};


</script>

       