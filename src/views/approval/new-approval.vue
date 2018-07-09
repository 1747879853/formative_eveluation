<style lang="less">
   
</style>

<template>
    <div>
        <Row>
            表单设置<br>
            审批名称最多50字
            <Input v-model="approvalName" placeholder="Enter something..." style="width: 300px"></Input>

            审批说明最多100字
            <Input v-model="approvalComment" placeholder="Enter something..." style="width: 300px"></Input>

            <br>
            <UserGroup cardtitle="授权分组" v-on:update-selected="getSelectedGroupIds"></UserGroup>
            
            <AllUsers  cardtitle="授权用户" v-on:update-selected="getSelectedUserIds"></AllUsers>
                        
        </Row>
        <Row>
            <Modal width="700" v-model="add_new_field" title="添加字段">
                <ApprovalFieldsForm v-on:form-data-hash="getFieldData"></ApprovalFieldsForm>
                <div slot="footer"></div>
            </Modal>
            <Card>
                <div slot="title">
                    <Icon type="compose"></Icon>
                    字段列表
                    <Button @click="add_new_field = true" type="primary">添加字段</Button>
                </div>               

                <Table :columns="approval_field_col" :data="approval_field_data"></Table>
            
            </Card>
        </Row>
        <Row>
            
            <ul id="editable">
                    <li>Оля<i class="js-remove">✖</i></li>
                    <li>Владимир<i class="js-remove">✖</i></li>
                    <li>Алина<i class="js-remove">✖</i></li>
            </ul>

            <button id="addUser">Add</button>
        </Row>


        <Row><button @click="show_data"></button></Row>
    </div>
</template>

<script>
import UserGroup from "../my-components/user-and-group/user-group.vue"
import AllUsers from "../my-components/user-and-group/all-users.vue"
import ApprovalFieldsForm from "./approval-fields-form.vue"
import Sortable from 'sortablejs';
export default {
    name: 'new-approval-tmpl',
    data () {
        return {
            
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
                    'control': '选择框',
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
            
        };
    },
    components:{
        UserGroup,AllUsers,ApprovalFieldsForm
    },
    mounted () {
        var editableList = Sortable.create(editable, {
          filter: '.js-remove',
          onFilter: function (evt) {
            var el = editableList.closest(evt.item); // get dragged item
            el && el.parentNode.removeChild(el);
          }
        });

    },
    methods:{        
        getSelectedGroupIds(msg){
            this.selected_user_group_ids = msg;
        },
        getSelectedUserIds(msg){
            this.selected_user_ids = msg;
        },
        show_data(){
            alert(this.selected_user_ids)
        },
        getFieldData(msg){
            this.approval_field_data.push(msg);
        }
        // add_new_field(){

        // },
        
    }
};
</script>
