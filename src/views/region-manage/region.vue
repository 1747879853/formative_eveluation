<template>
    <RegionTreeGrid
        :items='data' 
        :columns='columns'
    ></RegionTreeGrid>            
</template>

<script>
import Vue from 'vue';
import RegionTreeGrid from './region-tree-grid.vue'
export default {
    name: 'region',
    props: ['locallang'],
    data() {
            return {
                modal2:false,
                columns: [
                {
                    // title: '区块名',
                    title: this.$t('t_region_name'),
                    key: 'title',
                    width: '150',
                }, {
                    // title: '操作',
                    title: this.$t('t_action'),
                    type: 'action',
                    actions: [
                    {
                        type: 'success',
                        text: this.$t('t_modify'),
                        // text: '修改'
                    },{
                        type: 'error',
                        text: this.$t('t_delete'),
                        // text: '删除'
                    }],
                    width: '150',
                }
                ],
                data: [
                ],
                f_authority:"",
                f_name:"",
                f_condition:"",
                f_status:"",
            }
        },
    components: {
        RegionTreeGrid
    },
    watch: {
        locallang(curVal,oldVal){
            if(curVal!=oldVal){
                this.columns= [
                {
                    // title: '区块名',
                    title: this.$t('t_region_name'),
                    key: 'name',
                    width: '150',
                }, {
                    // title: '操作',
                    title: this.$t('t_action'),
                    type: 'action',
                    actions: [
                    {
                        type: 'success',
                        text: this.$t('t_modify'),
                        // text: '修改'
                    },{
                        type: 'error',
                        text: this.$t('t_delete'),
                        // text: '删除'
                    }],
                    width: '150',
                }];
                
            }
        }
    },
    mounted(){
        this.$axios.get("/region_list").then( res =>{
            // debugger
            this.data = res.data;
        }).catch(error =>{
            console.log(error);
        })
    }
};
</script>

<style>

</style>
