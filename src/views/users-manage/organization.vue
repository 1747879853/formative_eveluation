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
                <RadioGroup v-model="vertical" vertical>
                    <Radio label="leader1">
                        <span>负责人1</span>
                    </Radio>
                    <Radio label="leader2">
                        <span>负责人2</span>
                    </Radio>
                    <Radio label="leader3">
                        <span>负责人3</span>
                    </Radio>
                </RadioGroup>
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
                vertical:"leader1",
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
                 {
                    title:'user1',
                    expand:true
                },
                {
                    title:'user2',
                    expand:true
                },
                {
                    title:'user3',
                    expand:true
                },{
                    title:'user4',
                    expand:true
                },
                 ]
            }
        },
    components:{
    	TreeGrid
    },
    props:{
        columns1: Array,
        items1: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
   mounted(){
        this.$axios.get("/organization").then( res =>{
            this.data = res.data;
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
            show_modal(){
                this.modal2=true;
                this.value1="";
                this.value2="";
                this.value3="";
                this.value4="";
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