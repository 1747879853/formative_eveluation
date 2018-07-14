<style lang="less">
    @import 'draggable-list.less';
</style> 
<template>
<div>
    <Row>            
        <Card>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                权限组管理
            </div>                    
        </Card>                      
    </Row>
    <Row>
        <Col span="12">
            <Card>
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    权限组&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="showmodal()">添加</Button>
                    <Modal
                        v-model="modal"
                        title="添加权限组"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <table>
                        <tr><td>权限组名</td><td>
                        <Input v-model="value1" placeholder="请输入权限组名" clearable style="width: 300px"></Input></td></tr>
                        </table>
                    </Modal>
                </p>
                <div style="overflow-y:auto;height:500px;">
                    <ul id="editable-new" class="iview-admin-draggable-list">                            
                        <li v-for="(item, index) in groups_data" :key="index" class="notwrap todolist-item" :data-index="index">
                        {{ item.name }}<Icon type="close" class="js-remove"/></li>
                    </ul>
                </div>
            </Card>
        </Col>
        <Col span="12">
            <Card >
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    可分配权限&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">保存</Button>
                </p>
                <div style="overflow-y:auto;height:500px;">
                <Tree ref="tree" :data="data1" show-checkbox multiple></Tree>
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
                groups_data: [              
                ],
                value1:"",
                modal:false,
                select:null,
            }
        },
        mounted () { 
        this.$axios.get("/authGroupList").then( res =>{
            this.groups_data = res.data[1];
            this.data1 = res.data[0];
        }).catch(error =>{
            console.log(error);
        });
        let editable = document.getElementById('editable-new');
        let vm = this;
        var editableList = Sortable.create(editable, {
            filter: '.js-remove',
            onFilter: function (evt) {
                var el = editableList.closest(evt.item); 
                vm.$Modal.confirm({
                    title: '删除权限组',
                    content: '<p>确定要删除此权限组吗？</p>',
                    onOk: () => {
                        vm.$axios.delete('/authGroupList', {
                            data: {
                                params: {
                                    id: parseInt(el.getAttribute('data-index')),
                                }
                            }
                        }).then(function(res) {
                            console.log(res);
                            vm.groups_data = res.data[1];
                        }.bind(vm))
                        .catch(function(error) {
                            console.log(error)
                        });
                        vm.$Message.info('删除成功');
                        vm.select=null;
                    },
                    onCancel: () => {
                        vm.$Message.info('取消');
                    }
                });
            },
            onChoose: function (evt) {
                var el = editableList.closest(evt.item);   
                vm.select=parseInt(el.getAttribute('data-index'));            
                //为选中的条目添加样式
                let list= document.getElementById("editable-new").getElementsByTagName("li");
                for (let i = 0; i < list.length; i++) {
                    if(list[i] == el){
                        evt.item.setAttribute("style","border-color: #87b4ee;");                        vm.$axios.patch('/authGroupList', {
                            params: {
                                num:parseInt(el.getAttribute('data-index')),
                            }
                        }).then(function(res) {
                            console.log(res);
                            vm.groups_data = res.data[1];
                            vm.data1 = res.data[0];
                        }.bind(vm))
                        .catch(function(error) {
                            console.log(error)
                        });
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
            this.$axios.post('/authGroupList', {
                            params: {
                                v1:this.value1,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.groups_data = res.data[1];
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
        },
        cancel () {
            this.$Message.info('取消');
        },
        save (){
            if(this.select==null){
                this.$Message.info('请选中一个权限组');
            }else{
                this.$axios.put('/authGroupList', {
                                params: {
                                    group_id:this.select,
                                    id:this.$refs.tree.getCheckedNodes(),
                                }
                            }).then(function(res) {
                                console.log(res);
                                this.groups_data = res.data[1];
                            }.bind(this))
                            .catch(function(error) {
                                console.log(error)
                            });
                            this.$Message.info('保存成功');  
            } 
        }
    }
}
</script>
