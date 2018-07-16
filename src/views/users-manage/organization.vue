<template>
 <tree-grid 
        :items='data' 
        :columns='columns'
      ></tree-grid>   
</template>

<script>
import TreeGrid from './treeGrid'
export default {
    name: 'organization',
     data() {
            return {
                modal2:false,
                columns: [{
                    title: '组织名',
                    key: 'name',
                    width: '150',
                },{
                    title: '操作',
                    type: 'action',
                    actions: [{
                        type: 'primary',
                        text: '添加',

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
                ],
                
            }
        },
    components:{
    	TreeGrid
    },
   mounted(){
        this.$axios.get("/organization").then( res =>{
            this.data = res.data;
        }).catch(error =>{
            console.log(error);
        })
    }
    }
</script>

<style>
</style>