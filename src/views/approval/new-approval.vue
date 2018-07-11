<style lang="less">
    @import 'draggable-list.less';
</style>
<template>
    <div>
        <Row>
            <Col span="20" style="text-align:center;font-size:24px;color: #2db7f5;">
                <span>审批设计器</span>
            </Col>
            <Col span="2">
            <Button type="primary" @click="save_and_use">保存并启用</Button>
            </Col>
        </Row>
        <Row>
            <Card>
                <p slot="title">
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


        <Row>
            <Col span="8">
                <Card>
                    <p slot="title" style="height: 33px;">
                        <Icon type="android-funnel"></Icon>
                        主表字段列表
                        <Button type="primary" @click="addNewField">添加新字段</Button>

                    </p>
                    <div style="height: 394px;">
            
                        <ul id="editable" class="iview-admin-draggable-list">
                                
                            <li v-for="(item, index) in approval_field_data" :key="index" class="notwrap todolist-item" :data-index="index">
                            {{ item.name }}<Icon type="close" class="js-remove"/></li>
                        </ul>
                        
                    </div>
                </Card>
            </Col>
            <Col span="10">
                <Card>
                    <p slot="title" style="height: 33px;">
                        <Icon type="android-funnel"></Icon>
                        字段设置
                    </p>
                    <div style="height: 394px;">
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
                            <div v-if="formValidate.control=='单选框'" label="选项">    
                                <div v-for="(sel,index) in this.sel_arr" :key="index" :data-index="index">
                                    <Input v-model="sel_arr[index]" placeholder="Enter something..." clearable style="width: 100px;"></Input>
                                    <Button @click="removeSel(index)">-</Button>
                                    <Button @click="addSel(index)">+</Button>
                                </div>                    
                            </div>
                            <div v-if="formValidate.control=='多选框'" label="选项">    
                                <div v-for="(sel,index) in this.sel_arr" :key="index" :data-index="index">
                                    <Input v-model="sel_arr[index]" placeholder="Enter something..." clearable style="width: 100px;"></Input>
                                    <Button @click="removeSel(index)">-</Button>
                                    <Button @click="addSel(index)">+</Button>
                                </div>                    
                            </div>
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


    </div>
</template>

<script>
import UserGroup from "../my-components/user-and-group/user-group.vue"
import AllUsers from "../my-components/user-and-group/all-users.vue"
import Sortable from 'sortablejs';
export default {
    name: 'new-approval-tmpl',
    data () {
        return {
            editFlag: false,
            editIndex: -1,

            // approval_field_col: [
            //     {
            //         title: '名称',
            //         key: 'name',
            //         align: 'center'
            //     },
            //     {
            //         title: '字段',
            //         key: 'en_name',
            //         align: 'center'
            //     },
            //     {
            //         title: '控件',
            //         key: 'control',
            //         align: 'center'
            //     },
            //     {
            //         title: '默认值',
            //         key: 'default_value',
            //         align: 'center'
            //     },
            //     {
            //         title: '操作',
            //         key: 'operation',
            //         align: 'center'
            //     },
            // ],
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

            approvalName:'',
            approvalComment: '',
            
            selected_user_group_ids: [],            
            selected_user_ids: [],
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
            debugger
            if (this.formValidate.selectoptions) {
                this.sel_arr = this.formValidate.selectoptions.split(',');
            }else{
                this.sel_arr = ['选项1','选项2','选项3'];
            }
        }
    },
    components:{
        UserGroup,AllUsers
    },
    mounted () {
        // if (this.formValidate.selectoptions) {
        //     this.sel_arr = this.formValidate.selectoptions.split(',');
        // }else{
        //     this.sel_arr = ['选项1','选项2','选项3'];
        // }

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
                // vm.sel_arr = 
                // console.log(vm.formValidate.selectoptions) 
            },
            
        });        

    },
    methods:{        
        getSelectedGroupIds(msg){
            this.selected_user_group_ids = msg;
        },
        getSelectedUserIds(msg){
            this.selected_user_ids = msg;
        },

        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) { 
                    //JSON.parse(JSON.stringify  for deep copy                   
                    this.approval_field_data.push(JSON.parse(JSON.stringify(this.formValidate)));
                    
                    // debugger
                    this.$Message.success('保存成功！');
                } else {
                    this.$Message.error('数据格式不正确！');
                   
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        addNewField(){
            this.approval_field_data.push(JSON.parse(JSON.stringify(this.newFromValidate)));
        },
        save_and_use(){
            console.log(this.approval_field_data)
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
