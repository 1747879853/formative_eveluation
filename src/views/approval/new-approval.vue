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
                    审批名称最多50字
                    <Input v-model="approvalName" placeholder="Enter something..." style="width: 300px"></Input>

                    审批说明最多100字
                    <Input v-model="approvalComment" placeholder="Enter something..." style="width: 300px"></Input>
                </div>
            </Card>
        </Row>
        <Row>
            <UserGroup cardtitle="授权分组" v-on:update-selected="getSelectedGroupIds"></UserGroup>
        </Row>
        <Row>    
            <AllUsers  cardtitle="授权用户" v-on:update-selected="getSelectedUserIds"></AllUsers>
                        
        </Row>

        <Row>
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title" style="height: 33px;">
                        <Icon type="android-funnel"></Icon>
                        字段列表
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
            <Col span="10" class="padding-left-10">
                <Card>
                    <p slot="title" style="height: 33px;">
                        <Icon type="android-funnel"></Icon>
                        字段设置
                    </p>
                    <div style="height: 394px;">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <FormItem label="Name" prop="name">
                                
                                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                                    
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
            add_new_field: false,

            approval_field_col: [
                // {
                //     title: '编号',
                //     key: 'id',
                //     align: 'center'
                // },
                {
                    title: '名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '字段',
                    key: 'en_name',
                    align: 'center'
                },
                {
                    title: '控件',
                    key: 'control',
                    align: 'center'
                },
                                {
                    title: '默认值',
                    key: 'default_value',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
                    align: 'center'
                },
            ],
            approval_field_data: [
                {    
                    // 'id': 3,
                    'name': '字段1' ,
                    'en_name': 'field_one',
                    'control': '多选框',
                    'default_value': '',
                    'operation': 'edit,delete'    
                },
                {    
                    // 'id': 3,
                    'name': '字段2' ,
                    'en_name': 'field_two',
                    'control': '单行输入框',
                    'default_value': '111',
                    'operation': 'edit,delete'    
                } 
            ],

            approvalName:'',
            approvalComment: '',
            
            selected_user_group_ids: [],            
            selected_user_ids: [],
            formValidate: {
                name: '',
                field_position: '',
                en_name: '',
                control: '',                
            },
            newFromValidate: {
                name: '名称',
                field_position: '111',
                en_name: '字段英文名称',
                control: '单行输入框',                
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
               
            }
            
        };
    },
    components:{
        UserGroup,AllUsers
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
        }

        
    }
};
</script>
