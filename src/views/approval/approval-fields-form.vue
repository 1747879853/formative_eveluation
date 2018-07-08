<template>
	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="name">
            <Row>
                <Col span="11">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </Col>
                <Col span="1" style="text-align: center">位于</Col>
                <Col span="11">
                    <Select v-model="formValidate.field_position" placeholder="Select your position">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </Col>
                <Col span="1" style="text-align: center">之后</Col>
            </Row>
        </FormItem>
        <FormItem label="En_name" prop="en_name">
            <Input v-model="formValidate.en_name" placeholder="Enter your en_name"></Input>
        </FormItem>
        <FormItem label="Control" prop="control">
            <Select v-model="formValidate.control" placeholder="Select your control">
                <Option value="单行输入框">单行输入框</Option>
                <Option value="多行输入框">多行输入框</Option>
                <Option value="单选框">单选框</Option>
                <Option value="数字输入框">数字输入框</Option>
                <Option value="多选框">多选框</Option>
                <Option value="日期">日期</Option>
                <Option value="图片">图片</Option>
                <Option value="金额">金额</Option>
                
            </Select>
        </FormItem>
      
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    name: 'approval-fields-form',
    data () {
        return {
            formValidate: {
                name: '',
                field_position: '',
                en_name: '',
                control: '',                
            },
            ruleValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                field_position: [
                    { required: true, message: 'Please select', trigger: 'blur' }
                    
                ],
                en_name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'change' }
                ],
                control: [
                    { required: true, message: 'Please select', trigger: 'change' }
                ],
               
            },
        };
    },
    mounted () {
                
    },
    methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let tt = JSON.parse(JSON.stringify(this.formValidate))
                    this.$emit('form-data-hash',tt)
                    // debugger

                    // this.$Message.success('Success!');
                } else {
                    // this.$Message.error('Fail!');
                    alert("please input the right data");
                    return
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
    	// handle_change(data){//data is an arr
    	// 	this.$emit('update-selected',this.user_ids)
    	// }
    }

};
</script>