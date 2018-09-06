<template>
    <tree-grid 
        :items='data' 
        :columns='columns'
    ></tree-grid>            
</template>

<script>
import Vue from 'vue';
import {otherRouter, appRouter} from '@/router/router';
import TreeGrid from './treeGrid1'
export default {
    name: 'menu-manage',
     data() {
            return {
                modal2:false,
                columns: [{
                    title: '权限名',
                    key: 'title',
                    width: '150',
                }, {
                    title: '权限',
                    key: 'access',
                    width: '150',
                }, {
                    title: '操作',
                    type: 'action',
                    actions: [
                    {
                        type: 'success',
                        text: '修改'
                    },{
                        type: 'error',
                        text: '删除'
                    }],
                    width: '150',
                }],
                data: JSON.parse(JSON.stringify(appRouter)),
                f_authority:"",
                f_name:"",
                f_condition:"",
                f_status:"",
            }
        },
         components: {
            TreeGrid
        },
    mounted(){
    }
};
</script>

<style>

</style>
