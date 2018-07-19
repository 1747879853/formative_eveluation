<template>
    <Card>
    <div>
    <Button @click="show_modal()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加权限</Button>
    <Modal
        v-model="modal2"
        title="添加权限"
        @on-ok="ok"
        @on-cancel="cancel">
        <table>
        <tr><td>权限名</td><td>
        <Input v-model="f_name" placeholder="请输入权限名" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr>
        <tr><td>权限</td><td>
        <Input v-model="f_authority" placeholder="请输入权限" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr><tr><td>是否激活</td><td>
        <Input v-model="f_status" placeholder="是否激活" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr><tr><td>条件</td><td>
        <Input v-model="f_condition" placeholder="条件" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr></table>
    </Modal>
    </div>
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
    methods: {
            ok () {
                if(this.f_status=='激活'){
                    this.f_status=1;
                }
                this.$axios.post('/authRuleList', {
                            params: {
                                title: this.f_name,
                                name: this.f_authority,
                                status: this.f_status,
                                condition: this.f_condition,
                                parent_id: 0
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data.push(res.data);
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
            },
            cancel () {
                this.$Message.info('取消');
            },
            show_modal(){
                this.modal2=true;
                this.f_name="";
                this.f_authority="";
                this.f_status="";
                this.f_condition="";
            },
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
