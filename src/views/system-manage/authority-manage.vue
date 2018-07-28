<template>
    <Card>
        <tree-grid 
        :items='data' 
        :columns='columns'
      ></tree-grid>          
    </Card>   
</template>

<script>
import Vue from 'vue';

import TreeGrid from './treeGrid'
export default {
    name: 'authority-manage',
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
                data: [
                ],
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
