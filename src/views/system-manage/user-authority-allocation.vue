<style lang="less">
    @import 'draggable-list.less';
</style> 
<template>
<div>
    <Row>            
        <Card>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                用户权限分配
            </div>                    
        </Card>                      
    </Row>
    <Row>
        <Col span="12">
            <Card>
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    用户
                    <Button type="primary" @click="showmodal()">添加</Button>
                    <Modal
                        v-model="modal"
                        title="添加新用户"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <table>
                        <tr><td>用户名</td><td>
                        <Input v-model="value1" placeholder="请输入用户名" clearable style="width: 300px"></Input></td></tr>
                        </table>
                    </Modal>
                </p>
                <div style="overflow-y:auto;height:500px;">
                    <ul id="editable-new" class="iview-admin-draggable-list">                            
                        <li v-for="(item, index) in users_data" :key="index" class="notwrap todolist-item" :data-index="index">
                        {{ item.name }}<Icon type="close" class="js-remove"/></li>
                    </ul>
                </div>
            </Card>
        </Col>
        <Col span="12">
            <Card >
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    可分配权限组
                </p>
                <div style="overflow-y:auto;height:500px;">
                <Tree :data="data1" show-checkbox multiple ></Tree>
                </div>
            </Card>
        </Col>
    </Row>
</div>
</template>
<script>
import Sortable from 'sortablejs';
    export default {
        data () {
            return {
                data1: [
                ],
                users_data: [
               {    
                    'id': 1,
                    'name':'用户1',
                    data:[
                        {
                            title: '权限组1',
                        },
                        {
                            title: '权限组2',
                        },
                        {
                            title: '权限组3',
                        },
                        {
                            title: '权限组4',
                        }
                    ]
                },
                {    
                    'id': 2,
                    'name': '用户2',
                    data:[
                        {
                            title: '权限组1',
                        },
                        {
                            title: '权限组2',
                        },
                        {
                            title: '权限组3',
                        },
                        {
                            title: '权限组4',
                        }
                    ]
                }
                ],
                value1:"",
                newFromValidate: {
                name: "",  
                data:[
                        {
                            title: '权限组1',
                        },
                        {
                            title: '权限组2',
                        },
                        {
                            title: '权限组3',
                        },
                        {
                            title: '权限组4',
                        }
                    ]            
                },
                modal:false,
            }
        },
        mounted () { 
        let editable = document.getElementById('editable-new');
        let vm = this;
        var editableList = Sortable.create(editable, {
            filter: '.js-remove',
            onFilter: function (evt) {
                var el = editableList.closest(evt.item); 
                vm.users_data.splice(parseInt(el.getAttribute('data-index')),1);
            },
            onChoose: function (evt) {
                var el = editableList.closest(evt.item);               
                //为选中的条目添加样式
                let list= document.getElementById("editable-new").getElementsByTagName("li");
                for (let i = 0; i < list.length; i++) {
                    if(list[i] == el){
                        evt.item.setAttribute("style","border-color: #87b4ee;");
                        vm.data1=vm.users_data[parseInt(el.getAttribute('data-index'))].data;
                    }else{
                        list[i].removeAttribute("style");
                    }                    
                }
                
            },
            
        });        

    },
    methods:{        
        showmodal(){
            this.modal=true;
            this.value1="";
        },
        ok () {
            this.newFromValidate.name=this.value1;
            this.users_data.push(JSON.parse(JSON.stringify(this.newFromValidate)));
            this.$Message.info('添加成功');
        },
        cancel () {
            this.$Message.info('取消');
        },
           
    }
}
</script>
