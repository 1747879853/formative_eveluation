<template>
    <Card>
    <div>
    <Button @click="show_modal()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加花费科目</Button>
    <Modal
        v-model="modal2"
        title="添加花费科目"
        @on-ok="ok"
        @on-cancel="cancel">
        <table>
        <tr><td>花费科目名</td><td>
        <Input v-model="f_name" placeholder="请输入花费科目名" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr>
        </table>
    </Modal>
    </div>
        <tree-grid 
        :items='data' 
        :columns='columns'
      ></tree-grid>          
    </Card>   
</template>

<script>
import TreeGrid from './treeGrid'
export default {
    name: 'cost',
     data() {
            return {
                modal2:false,
                columns: [{
                    title: '花费科目名',
                    key: 'name',
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
                f_name:"",
            }
        },
    components: {
        TreeGrid
        },
    methods: {
            ok () {
                this.$axios.post('/costList', {
                            //parent_id = 0,表明是一级表
                            params: {
                                name: this.f_name,
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
            },
        },
    mounted(){
        this.$axios.get("/costList").then( res =>{
            this.data = res.data;
        }).catch(error =>{
            console.log(error);
        })
    }
};
</script>

<style>

</style>
