<template>
    <tree-grid 
        :items='data' 
        :columns='columns'
    ></tree-grid>            
</template>

<script>
import Vue from 'vue';

import TreeGrid from './treeGrid'
export default {
    name: 'evaluation-manage',
     data() {
            return {
                columns: [{
                      title: "评价指标号",
                      key: "eno",
                      align: "center"
                    },
                    {
                      title: "评价指标名",
                      key: "name",
                      align: "center"
                    },
                    {
                      title: "类型",
                      key: "types",
                      align: "center",
                    },
                    {
                      title: "描述",
                      key: "description",
                      align: "center",
                    },
                    {
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
            }
        },
         components: {
            TreeGrid
        },
    mounted(){
        // console.log('****************************************');
        this.$axios.get("/evaluationList").then(res => {
            this.data = res.data;
            console.log(res.data);
          })
          .catch(error => {
            console.log(error);
          });
    }
};
</script>

<style>

</style>
