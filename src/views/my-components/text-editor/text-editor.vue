<style lang="less">
    @import '../../../styles/loading.less';
</style>

<template>
    
        <tree-grid 
        :items='data' 
        :columns='columns'
        @on-row-click='rowClick'
        @on-selection-change='selectionClick'
        @on-sort-change='sortClick'
      ></tree-grid>
    
</template>

<script>
import TreeGrid from './treeGrid'
export default {
    name: 'text-editor',
     data() {
            return {
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
                        text: '添加子权限'
                    }, {
                        type: 'success',
                        text: '修改'
                    },{
                        type: 'error',
                        text: '删除'
                    }],
                    width: '150',
                }],
                data: [{
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
                }]
                }]
            }
        },
         components: {
            TreeGrid
        },
    methods: {
            rowClick(data, index, event) {
                console.log('当前行数据:' + data)
                console.log('点击行号:' + index)
                console.log('点击事件:' + event)
            },
            selectionClick(arr) {
                console.log('选中数据id数组:' + arr)
            },
            sortClick(key, type) {
                console.log('排序字段:' + key)
                console.log('排序规则:' + type)
            }
        }
};
</script>

<style>

</style>
