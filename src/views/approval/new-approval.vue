<style lang="less">    
    @import 'draggable-list.less';
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
                <ApprovalFieldsForm v-bind:initIndex="choosedDataIndex" v-bind:initData="choosedData" v-on:form-data-hash="getFieldData"></ApprovalFieldsForm>
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
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-funnel"></Icon>
                        字段列表预览
                    </p>
                    <div style="height: 394px;">
            
                        <ul id="editable" class="iview-admin-draggable-list">
                                
                            <li v-for="(item, index) in approval_field_data" :key="index" class="notwrap todolist-item" :data-index="index">
                            {{ item.name }}<Icon type="close" class="js-remove"/><Icon type="edit" class="js-edit" /></li>
                        </ul>

                        <!-- <button id="addUser">Add</button> -->
                        <Button @click="add_new_field = true" type="primary">添加字段</Button>
                    </div>
                </Card>
            </Col>
        </Row>


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
            choosedDataIndex: '',
            choosedData: '',
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
            
        };
    },
    components:{
        UserGroup,AllUsers,ApprovalFieldsForm
    },
    mounted () {
        let editable = document.getElementById('editable');
        let vm = this;
        var editableList = Sortable.create(editable, {
            filter: '.js-remove, .js-edit',
            onFilter: function (evt) {
                
                if(evt.target.attributes.class.textContent.indexOf('js-remove')>=0){
                    var el = editableList.closest(evt.item); // get dragged item
                    // el && el.parentNode.removeChild(el);  //delete the <li>...</li>
                    // debugger
                    vm.approval_field_data.splice(parseInt(el.attributes["data-index"]),1)
                }
                if(evt.target.attributes.class.textContent.indexOf('js-edit')>=0){
                    var el = editableList.closest(evt.item);
                    vm.choosedDataIndex = el.attributes["data-index"].value;
                    // debugger
                    vm.choosedData = JSON.stringify(vm.approval_field_data[parseInt(el.attributes["data-index"].value)]);
                    vm.add_new_field = true; //open the modal dialog
                }

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
                
            },
            // Changed sorting within list
            // onUpdate: function (/**Event*/evt) {
            //     // same properties as onEnd
            //     var el = editableList.closest(evt.item);
            //     console.log(el)
            //     // console.log(JSON.stringify(vm.approval_field_data[0]));
            //     // console.log(JSON.stringify(vm.approval_field_data[1]));
            //     var t;
            //     t = vm.approval_field_data[evt.oldIndex];
            //     vm.approval_field_data[evt.oldIndex] = vm.approval_field_data[evt.newIndex];
            //     vm.approval_field_data[evt.newIndex] = t;
            //     // console.log(JSON.stringify(vm.approval_field_data[0]));
            //     // console.log(JSON.stringify(vm.approval_field_data[1]));
            //     // evt.oldIndex;  // element's old index within old parent
            //     // evt.newIndex;  // element's new index within new parent

            // },
        });

    },
    methods:{        
        getSelectedGroupIds(msg){
            this.selected_user_group_ids = msg;
        },
        getSelectedUserIds(msg){
            this.selected_user_ids = msg;
        },
        getFieldData(msg){
            if(this.choosedDataIndex){
                this.approval_field_data[parseInt(this.choosedDataIndex)] =msg;
            }else{
                this.approval_field_data.push(msg);
            }
            
        }
        // add_new_field(){

        // },
        
    }
};
</script>
