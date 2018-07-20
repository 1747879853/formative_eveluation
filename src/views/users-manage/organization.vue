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
 <tree-grid id="hl-tree-table"
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
            this.data = res.data[1];
            this.data1  = res.data[0];
        }).catch(error =>{
            console.log(error);
        })
        let editable = document.getElementById('hl-tree-table');
        let vm = this;
        var editableList = Sortable.create(editable, {            
            onChoose: function (evt) {
                var el = editableList.closest(evt.item); 
                vm.select=parseInt(el.getAttribute('data-index'));              
                //为选中的条目添加样式
                let list= document.getElementById("hl-tree-table").getElementsByTagName("tr");
                for (let i = 0; i < list.length; i++) {
                    if(list[i] == el){
                        evt.item.setAttribute("style","background: #87b4ee;");
                        var ch_id = vm.users_data[parseInt(el.getAttribute('data-index'))].checked_id;
                        for(let i=0;i<vm.data1.length;i++){
                            if(ch_id.length!=0){
                                for(let j=0;j<ch_id.length;j++){
                                    if(vm.data1[i].id==ch_id[j]){
                                        vm.data1[i].checked=true;
                                        break;
                                    }
                                    else{vm.data1[i].checked=false;
                                    }
                                }
                            }else{
                                vm.data1[i].checked=false;
                            }
                        } 
                    }else{
                        list[i].removeAttribute("style");
                    }                    
                }
                
            },
            
        });        

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