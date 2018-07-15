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
        <Input v-model="value1" placeholder="请输入权限名" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr>
        <tr><td>权限</td><td>
        <Input v-model="value2" placeholder="请输入权限" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr><tr><td>是否激活</td><td>
        <Input v-model="value3" placeholder="是否激活" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr><tr><td>条件</td><td>
        <Input v-model="value4" placeholder="条件" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr></table>
    </Modal>
    </div>
        <tree-grid 
        :items='data' 
        :columns='columns'
        @on-add-child='addChild'
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
                ],
                value1:"",
                value2:"",
                value3:"",
                value4:"",
            }
        },
         components: {
            TreeGrid
        },
    methods: {
            ok () {
                this.$axios.post('/authRuleList', {
                            params: {
                                id: 0,
                                v1:this.value1,
                                v2:this.value2,
                                v3:this.value3,
                                v4:this.value4,
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
            depthTraversal:function(arr,id,newarr){
                if (arr!=null){  
                    for(let i=0;i<arr.length;i++){
                      if(arr[i].id==id){
                          arr[i].children.push(newarr);
                          return i;
                      }
                      let ret = this.depthTraversal(arr[i].children,id,newarr);
                      if (ret>0) {
                          return i;
                      }
                    }
                }
            },
            addChild ( id ) {
                this.$axios.post('/authRuleList', {
                            params: {
                                id:id,
                                v1:'this.value1',
                                v2:'this.value2',
                                v3:'this.value3',
                                v4:'this.value4',
                            }
                        }).then(function(res) {
                            console.log(res);
                            let ret = this.depthTraversal(this.data, id, res.data);
                            alert(ret);
                            Vue.set(this.data, ret, this.data[ret]);
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
                this.value1="";
                this.value2="";
                this.value3="";
                this.value4="";
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
