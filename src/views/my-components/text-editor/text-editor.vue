<style lang="less">
    @import '../../../styles/loading.less';
</style>

<template>
    <Card>
    <div>
    <Button @click="modal2=true" class="ivu-btn ivu-btn-primary ivu-btn-small">添加权限</Button>
    <Modal
        v-model="modal2"
        title="添加权限"
        @on-ok="ok"
        @on-cancel="cancel">
        <table>
        <tr><td>权限名</td><td>
        <Input v-model="value1" placeholder="请输入权限名" clearable style="width: 300px"></Input></td></tr>
        <tr><td>权限</td><td>
        <Input v-model="value2" placeholder="请输入权限" clearable style="width: 300px"></Input></td></tr>
        <tr><td>是否激活</td><td>
        <Input v-model="value3" placeholder="是否激活" clearable style="width: 300px"></Input></td></tr>
        <tr><td>条件</td><td>
        <Input v-model="value4" placeholder="条件" clearable style="width: 300px"></Input></td></tr>
        </table>
    </Modal>
    </div>
        <tree-grid 
        :items='data' 
        :columns='columns'
        @on-delete-click='deleteClick'
      ></tree-grid>          
    </Card>   
</template>

<script>
import TreeGrid from './treeGrid'
export default {
    name: 'text-editor',
     data() {
            return {
                modal2:false,
                columns: [{
                    title: '权限名',
                    key: 'name',
                    width: '150',
                }, {
                    title: '权限',
                    key: 'authority',
                    width: '150',
                },  {
                    title: '是否激活',
                    key: 'status',
                    width: '150',
                },  {
                    title: '条件',
                    key: 'condition',
                    width: '150',
                }, {
                    title: '操作',
                    type: 'action',
                    actions: [{
                        type: 'primary',
                        text: '添加子权限',

                    }, {
                        type: 'success',
                        text: '修改'
                    },{
                        type: 'error',
                        text: '删除'
                    }],
                    width: '150',
                }],
                data: [
                /*{
                    id: '1',
                    name: '后台首页',
                    authority: 'Admin/Index/index',
                    status: '激活',
                    condition: '',
                    children: [{
                        id: '01',
                        name: '欢迎界面',
                        authority: 'Admin/Index/welcome',
                        status: '激活',
                        condition: ''
                    }]
                }, {
                    id: '2',
                    name: '系统设置',
                    authority: 'Admin/ShowNav/config',
                    status: '激活',
                    condition: '',
                    children: [{
                        id: '01',
                        name: '菜单管理',
                        authority: 'Admin/ShowNav/nav',
                        status: '激活',
                        condition: '',
                        children: [{
                        id: '001',
                        name: '菜单列表',
                        authority: 'Admin/Nav/index',
                        status: '激活',
                        condition: ''
                    }]
                    }]
                }, {
                    id: '3',
                    name: '权限控制',
                    authority: 'Admin/ShowNav/role',
                    status: '激活',
                    condition: '',
                    children: [{
                        id: '01',
                        name: '权限管理',
                        authority: 'Admin/Role/index',
                        status: '激活',
                        condition: ''
                    }, {
                    id: '02',
                    name: '用户组管理',
                    authority: 'Admin/Role/grroup',
                    status: '激活',
                    condition: ''
                }]}*/
                ],
                
            }
        },
         components: {
            TreeGrid
        },
    methods: {
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            editClick() {
                alert('1  被点击了');
            },
            deleteClick() {
                this.$Modal.confirm({
                    title: '删除权限',
                    content: '<p>确定要删除此权限吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/authRuleList', {
                            data: {
                                params: {
                                    id: 1
                                }
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data = res.data;
                            alert('删除成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            }
        },
    mounted(){
        this.$axios.get("/authRuleList").then( res =>{
            this.data = res.data;
        }).catch(error =>{
            console.log(error);
        })
    }
};
</script>

<style>

</style>
