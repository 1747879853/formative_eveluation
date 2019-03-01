<template>
<div>
  <Row>            
      <Card>
        <div style="text-align:center;font-size:24px;color: #2db7f5;">
            评价指标管理
        </div>            
      </Card>                      
  </Row>
    <tree-grid 
        :items='data' 
        :columns='columns'
    ></tree-grid>
</div>           
</template>

<script>
import Vue from 'vue';

import TreeGrid from './treeGrid'
export default {
    name: 'evaluation-manage',
     data() {
            return {
                columns: [
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
                      title: "状态",
                      key: "status",
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
                option:'',
            }
        },
         components: {
            TreeGrid
        },
    mounted(){
        this.$axios.get("/evaluationList1").then(res => {
              this.data = res.data;
              // console.log(res.data);
            })
            .catch(error => {
              console.log(error);
            });
    },
    methods:{
    }
};
</script>

<style>

</style>
