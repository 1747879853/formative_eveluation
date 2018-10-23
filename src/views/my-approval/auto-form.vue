<style lang="less">
</style>
<template>
      
    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px;" >
        <div>
            <div v-if="formDynamic.flag =='main'">{{formDynamic.title}}</div>
            
            <div v-if="formDynamic.flag =='detail'">{{formDynamic.title}}({{arrIndex+1}})
                <Button style="float:right;" size="small" type="primary" @click="delDetailData" icon="android-close">删除</Button>
            </div>
        </div>
        <FormItem  
            v-for="(item,index) in formDynamic.items"   
            :key="index"      
            :label="item.name"
            :prop="'items.' + index + '.en_name_value'"
            >
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
      
    </Form>
    </div>

</template>

<script>
import Sortable from 'sortablejs';
export default {
    name: 'auto-form',
    props: ['formDynamic','arrIndex'],
    data () {
        return {
                      
        };
    },
    methods:{       

        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let rr = this.formDynamic.items
                    // debugger
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();            
        },
        delDetailData(){
            console.log(this.arrIndex)
            this.$emit('delitem',{arrIndex: this.arrIndex})
        }
  
    }
};
</script>
