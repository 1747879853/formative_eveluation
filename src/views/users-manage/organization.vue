<template>
<Card>
<Row>
<Col span="12">
<Card>
<div>
    <Button @click="show_modal()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加组织机构</Button>
    <Modal
        v-model="modal2"
        title="添加组织机构"
        @on-ok="ok"
        @on-cancel="cancel">
        <table>
        <tr><td>组织机构名</td><td>
        <Input v-model="value1" placeholder="请输入组织机构名" clearable style="width: 300px"></Input></td></tr>
        </table>
    </Modal>
    </div>
 <tree-grid 
        :items='data' 
        :columns='columns'
        v-on:selectedindex="selected_index"
      ></tree-grid>
</Card>
</Col>
    <Col span="12">
        <Card>
            <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    负责人&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">保存</Button>
                </p>
                <div style="overflow-y:auto;height:500px;">
                <Tree ref="tree" :data="data1" show-checkbox @on-select-change="check111"></Tree>
                </div>
        </Card>
    </Col>
</Row>
</Card> 
</template>

<script>
import TreeGrid from './treeGrid'
import Sortable from 'sortablejs'
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
                data1: [
                 ],
                select:null,
            }
        },
    components:{
    	TreeGrid
    },
    props:{
    },
    
   mounted(){
        this.$axios.get("/organization").then( res =>{
            this.data = res.data[1];
            this.data1  = res.data[0];
        }).catch(error =>{
            console.log(error);
        })
    },
    methods: {
            ok () {
                this.$axios.post('/organization', {
                            params: {
                                id: 0,
                                v1:this.value1,
                                v2:this.value2,
                                v3:this.value3,
                                v4:this.value4,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data = res.data;
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
            },
            cancel () {
                this.$Message.info('取消');
            },
            selected_index(index){
            let ch_id=this.data[index].checked_id;
            for(let i=0;i<this.data1.length;i++){
                if(ch_id.length!=0){
                    for(let j=0;j<ch_id.length;j++){
                        if(this.data1[i].id==ch_id[j]){
                        this.data1[i].checked=true;
                         break;
                     }else{
                        this.data1[i].checked=false;
                     }
                    }
                }else{
                this.data1[i].checked=false;    
                }
              }  
            },

            show_modal(){
                this.modal2=true;
                this.value1="";
                this.value2="";
                this.value3="";
                this.value4="";
            },
            save (){
            // if(this.select==null){
            //     this.$Message.info('请选中一个用户');
            // }else{
                let checked_tree = this.$refs.tree.getCheckedNodes();
                let tree_id = [];
                for(let i=0;i<checked_tree.length;i++){
                    tree_id[i]=checked_tree[i].id;
                }
                this.$axios.patch('/organization', {
                            params: {
                                user_id:this.data[this.select].id,
                                id:tree_id,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data[this.select].checked_id = res.data.checked_id;
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('保存成功');
            // }   
        },
            check111(selectedList){
            if(selectedList[selectedList.length-1].checked==true){
                selectedList[selectedList.length-1].checked=false;
            }
            else{
                selectedList[selectedList.length-1].checked=true;
            }            
        }
    },
  }
</script>

<style>
</style>