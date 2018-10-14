<style lang="less">
    @import 'draggable-list.less';
</style>
<template>
  
    <Row type="flex" justify="center" class="code-row-bg">
        
        <Col span="10">
            <Card>
                <p slot="title" style="height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    字段列表
                    <Button type="primary" @click="addNewField">添加</Button>

                </p>
                <div style="height: 400px;">
        
                    <ul id="editable" class="iview-admin-draggable-list">
                            
                        <li v-for="(item, index) in approval_field_data" :key="index" class="notwrap todolist-item" :data-index="index">
                        {{ item.name }}<Icon type="close" class="js-remove"/></li>
                    </ul>
                    
                </div>
            </Card>
        </Col>
        <Col span="14">
            <Card>
                <p slot="title" style="height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    字段设置
                </p>
                <div style="height: 400px;">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="名称" prop="name">
                            <Input v-model="formValidate.name" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="提示文字" prop="info">
                            <Input v-model="formValidate.info" placeholder="请输入"></Input>
                        </FormItem>
                        <FormItem label="控件" prop="control">
                            <Select v-model="formValidate.control" placeholder="请选择控件">
                                <Option value="单行输入框">单行输入框</Option>
                                <Option value="多行输入框">多行输入框</Option>
                                <Option value="单选框">单选框</Option>
                                <Option value="多选框">多选框</Option>
                                <Option value="日期">日期</Option>
                                
                            </Select>
                        </FormItem>
                        <FormItem v-if="formValidate.control=='单选框'" label="选项">    
                            <div v-for="(sel,index) in this.sel_arr" :key="index" :data-index="index">
                                <Input v-model="sel_arr[index]" placeholder="Enter something..." clearable style="width: 100px;"></Input>
                                <Button @click="removeSel(index)" type="primary" shape="circle" icon="minus" size="small"></Button>
                                <Button @click="addSel(index)" type="primary" shape="circle" icon="plus" size="small"></Button>                                
                            </div>                    
                        </FormItem>
                        <FormItem v-if="formValidate.control=='多选框'" label="选项">    
                            <div v-for="(sel,index) in this.sel_arr" :key="index" :data-index="index">
                                <Input v-model="sel_arr[index]" placeholder="Enter something..." clearable style="width: 100px;"></Input>
                                <Button @click="removeSel(index)" type="primary" shape="circle" icon="minus" size="small"></Button>
                                <Button @click="addSel(index)" type="primary" shape="circle" icon="plus" size="small"></Button>
                            </div>                    
                        </FormItem>
                        <FormItem v-if="formValidate.control=='日期'" label="日期格式">
                            <RadioGroup v-model="formValidate.dateformat">
                                <Radio label="年-月-日 时:分">年-月-日 时:分</Radio>
                                <Radio label="年-月-日">年-月-日</Radio>
                            </RadioGroup>
                        </FormItem>
                      
                    </Form>
                </div>
            </Card>
        </Col>
    </Row>

</template>

<script>
import Sortable from 'sortablejs';
export default {
    name: 'new-approval-tmpl',
    props: ['cardtitle','approval_field_data'],
    data () {
        return {
            editFlag: false,
            editIndex: -1,       
            formValidate: {
                name: '',
                en_name: '',
                control: '',
                info: '',
                sequence: 0,                
                selectoptions: '',
                dateformat:'年-月-日' 
            },
            newFromValidate: {
                name: '名称',
                en_name: '',
                control: '单行输入框',
                info: '',
                sequence: 0,
                selectoptions: '',
                dateformat:'年-月-日'               
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                info: [
                    { required: true, message: '请输入提示信息', trigger: 'blur' }
                    
                ],                
                control: [
                    { required: true, message: '请选择控件', trigger: 'change' }
                ],
               
            },
            sel_arr: ['选项1','选项2','选项3']            
        };
    },
    computed: {
        
    },
    watch:{  
       //here has some bugs:
       //1. sel_arr and  formValidate可能互相watch
       //2. 当控件不是单选框或多选框时，selectoptions字段值也是："选项1,选项2,选项3"
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

    mounted () { 
        let editable = document.getElementById('editable');
        let vm = this;
        var editableList = Sortable.create(editable, {
            filter: '.js-remove',
            onFilter: function (evt) {
                var el = editableList.closest(evt.item); // get dragged item
                // el && el.parentNode.removeChild(el);
                vm.approval_field_data.splice(parseInt(el.getAttribute('data-index')),1)
            },
            onChoose: function (/**Event*/evt) {
                // el and evt.item is equal
                // 用官方的chosenClas这个属性设置样式后，鼠标点击后样式会一闪而过
                //所以用下面的代码自己设置鼠标点击后的样式

                var el = editableList.closest(evt.item);               
                //为选中的条目添加样式
                let list= document.getElementById("editable").getElementsByTagName("li");
                for (let i = 0; i < list.length; i++) {
                    if(list[i] == el){
                        evt.item.setAttribute("style","border-color: #87b4ee;")
                    }else{
                        list[i].removeAttribute("style")
                    }                    
                }
                
                vm.editIndex = parseInt(el.attributes["data-index"].value)
                vm.editFlag = true
                vm.formValidate = vm.approval_field_data[vm.editIndex]
                // console.log("after onChoose")
                // console.log(vm.formValidate) 
            },
            
        });        

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
  
    }
};
</script>
