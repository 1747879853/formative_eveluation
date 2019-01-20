<template>
    <Card>
        <Row>
            <Col span="12">
                <Card>
                    <p slot="title" style="font-size:20px;height: 33px;">
                        <Icon type="android-funnel"></Icon>
                        组织机构&nbsp;&nbsp;&nbsp;
                        <Button @click="show_modal2()" type="primary">添加组织机构</Button>
                    </p>
                    <div>                        
                        <Modal
                            v-model="modal2"
                            title="添加组织机构"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <table>
                            <tr><td>组织机构名</td><td>
                            <Input v-model="f_name" placeholder="请输入组织机构名" clearable style="width: 300px"></Input></td></tr>
                            </table>
                        </Modal>
                    </div>
                    <tree-grid 
                    :items='data' 
                    :columns='columns' 
                    @selectedindex="selected_index"
                    ></tree-grid>
                </Card>
            </Col>
            <Col span="12">
                <Card> 
                    <p slot="title" style="font-size:20px;height: 33px;">
                        <Icon type="android-funnel"></Icon>
                        负责人&nbsp;&nbsp;&nbsp;
                        <Button type="primary" @click="show_modal1()">添加人员</Button>
                    </p>
                    <Modal
                        v-model="modal1"
                        title="添加负责人"
                        @on-ok="ok1"
                        @on-cancel="cancel">
                        <table>
                        <tr><td>姓名</td><td>                        
                        <Select v-model="user" size="middle" style="width:300px;" ref="element1">
                        <Option  v-for="(item,index) in data2" :key="item.id" :value="item.id">{{ item.username }}</Option>
                        </Select></td></tr>
                        </table>
                    </Modal>
                    <div style="overflow-y:auto;height:200px;">
                        <div v-for="(item, index) in data1" :key="item.id">
                        <div v-if="item.organization_id==id2&&item.leader==1">
                        {{item.username}}&nbsp;
                        <button class="ivu-btn ivu-btn-error ivu-btn-small" @click="deleteClick(item.id);">删除</button>&nbsp;</div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <p slot="title" style="font-size:20px;height: 33px;">
                        <Icon type="android-funnel"></Icon>
                        参与人&nbsp;&nbsp;&nbsp;
                        <Button type="primary" @click="show_modal3()">添加人员</Button>
                    </p>
                    <Modal
                        v-model="modal3"
                        title="添加参与人"
                        @on-ok="ok2"
                        @on-cancel="cancel">
                        <table>
                        <tr><td>姓名</td><td>                        
                        <Select v-model="user" size="middle" style="width:300px;" ref="element1">
                        <Option  v-for="(item,index) in data2" :key="item.id" :value="item.id">{{ item.username }}</Option>
                        </Select></td></tr>
                        </table>
                    </Modal>
                    <div style="overflow-y:auto;height:300px;">
                        <div v-for="(item, index) in data1" :key="item.id">
                        <div v-if="item.organization_id==id2&&item.leader==0">
                        {{item.username}}&nbsp;
                        <button class="ivu-btn ivu-btn-error ivu-btn-small" @click="deleteClick(item.id);">删除</button>&nbsp;</div>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    </Card> 
</template>

<script>
import TreeGrid from './treeGrid'
import Sortable from 'sortablejs'
import Vue from 'vue'
export default {
    name: 'organization',
     data() {
            return {
                user:'',
                modal1:false,
                modal2:false,
                modal3:false,
                columns: [{
                    title: '组织名',
                    key: 'name',
                    width: '150',
                },{
                    title: '操作',
                    type: 'action',
                    width: '100',
                }],
                data: [],
                data1: [],
                data2:[],
                f_name: '',
                id2:'',//被选中的组织机构的id
                tree_id:'',
            }
        },
    components:{
    	TreeGrid
    },
   mounted(){
        this.$axios.get("/organization").then( res =>{
            this.data = res.data;
            console.log(res.data)
        }).catch(error =>{
            console.log(error);
        });
        this.$axios.get("/organization_user").then( res =>{
            this.data1 = res.data.a;
            this.data2 = res.data.b;
        }).catch(error =>{
            console.log(error);
        });
    },
    methods: {
            ok () {
                this.$axios.post('/organization', {
                            params: {
                                parent_id: 0,
                                name: this.f_name 
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data.push(res.data);
                            this.$Message.info('添加成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
            },
            ok1() {
                if(this.id2!=''){
                    this.$axios.post('/organization_user', {
                            params: {
                                organization_id: this.id2,
                                user_id: this.user,
                                leader:1,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data1.push(res.data);
                            this.$Message.info('添加成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
                }else{
                    this.$Message.info('请先选择一个组织机构！');
                }                
            },
            ok2() {
                if(this.id2!=''){
                    this.$axios.post('/organization_user', {
                            params: {
                                organization_id: this.id2,
                                user_id: this.user,
                                leader:0,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.data1.push(res.data);
                            this.$Message.info('添加成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
                    }else{
                        this.$Message.info('请先选择一个组织机构！');
                    }                
            },
            deleteClick(id) {
            this.$Modal.confirm({
                    title: '删除人员',
                    content: '<p>确定要删除此人吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/organization_user', {
                            data: {
                                params: {
                                    id: id,
                                }
                            }
                        }).then(function(res) {
                            for(let i=0;i<this.data1.length;i++){
                                if(this.data1[i].id==id){
                                    this.data1.splice(i,1);
                                }
                            }
                            console.log(this.data1);
                            this.$Message.info('删除成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
            },
            cancel () {
                this.$Message.info('取消');
            },
            selected_index(id){
                this.id2=id;
            },
            show_modal2(){
                this.modal2=true;
                this.f_name='';
            },
            show_modal1(){
                this.modal1=true;
                this.user='';
            },
            show_modal3(){
                this.modal3=true;
                this.user='';
            },
    },
  }
</script>

<style>
</style>