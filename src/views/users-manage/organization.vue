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
                    <Button type="primary" @click="save()">保存</Button>
                </p>
                <div style="overflow-y:auto;height:500px;">
                  <!--   <Tree ref="tree" :data="data1" show-checkbox @on-select-change="check111"></Tree> -->
                  <div v-for="(item, index) in data1" :key="item.id">
                    <input type="radio" name="leader" :checked="item.checked" :value="item.title" @click="CheckItem(item)">{{item.title}}
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
                f_name: '',
                select :null,
                id2:null,
            }
        },
    components:{
    	TreeGrid
    },
   mounted(){
        this.$axios.get("/organization").then( res =>{
            this.data = res.data.a;
            this.data1 =  res.data.b;
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
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
            },
            cancel () {
                this.$Message.info('取消');
            },
            CheckItem(item){
                for(let i=0;i<data1.length;i++){
                    data1[i].checked=false;
                }
                item.checked=!item.checked;
            },
            depthTraversal2:function(arr,id){
                if (arr!=null){  
                    for(let i=0;i<arr.length;i++){
                      if(arr[i].id==id){
                            let ch_id=arr[i].checked_id;
                            for(let j=0;j<this.data1.length;j++){
                                if(ch_id.length!=0){
                                    for(let k=0;k<ch_id.length;k++){
                                        if(this.data1[j].id==ch_id[k]){
                                        this.data1[j].checked=true;
                                         break;
                                     }else{
                                        this.data1[j].checked=false;
                                     }
                                    }
                                }else{
                                this.data1[j].checked=false;    
                                }
                              } 
                          return i;
                      }
                      let ret = this.depthTraversal2(arr[i].children,id);
                      if (ret>=0) {
                          return i;
                      }
                    }
                }
            },
            selected_index(id){
                this.depthTraversal2(this.data, id);
                this.id2 = id;  
            },
            save(){
                var tree_id;
                for(let i=0;i<this.data1.length;i++){
                    if(this.data1[i].checked==true){
                        tree_id=this.data1[i].id;
                    }
                }
                this.$axios.patch('/orgaLeader',{
                    params:{
                        user_id:this.id2,
                        checked_id:tree_id,
                        checked:true,
                    }
                }).then(function(res){
                    console.log(res);
                    this.data[this.id2].checked_id=res.data[0].checked_id;
                    this.data1[tree_id].checked=res.data[1].checked;
                }.bind(this))
                .catch(function(error){
                    console.log(error);
                });
                this.$Message.info('保存成功');   
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