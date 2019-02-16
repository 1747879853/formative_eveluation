<style lang="less">
    @import 'draggable-list.less';
</style> 
<template>
<div>
    <Row>            
        <Card>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                课程评价指标分配
            </div>                    
        </Card>                      
    </Row>
    <Row>
        <Col span="12">
            <Card>
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    课程&nbsp;&nbsp;&nbsp;
                </p>
                <div style="overflow-y:auto;height:500px;">
                    <ul id="editable-new" class="iview-admin-draggable-list">                            
                        <li v-for="(item, index) in users_data" :key="index" class="notwrap todolist-item" :data-index="index"> 
                        {{ item.name }}</li>
                    </ul>
                </div>
            </Card>
        </Col>
        <Col span="12">
            <Card >
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    可分配评价指标&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">保存</Button>
                </p>
                <div style="overflow-y:auto;height:500px;">
                <Tree ref="tree" :data="data1" show-checkbox @on-select-change="check111"></Tree>
                </div>
            </Card>
        </Col>
    </Row>
</div>
</template>
<script>
import Sortable from 'sortablejs';
    export default {
        data () {
            return {
                data1: [
                ],
                users_data: [
                ],
                modal:false,
                select:null,
            }
        },
        mounted () { 
        this.$axios.get("/courseevalList").then( res =>{
        this.users_data = res.data.a;
        this.data1 = res.data.b;
        }).catch(error =>{
            console.log(error);
        });
        let editable = document.getElementById('editable-new');
        let vm = this;
        var editableList = Sortable.create(editable, {            
            onChoose: function (evt) {
                var el = editableList.closest(evt.item); 
                vm.select=parseInt(el.getAttribute('data-index'));              
                //为选中的条目添加样式
                let list= document.getElementById("editable-new").getElementsByTagName("li");
                for (let i = 0; i < list.length; i++) {
                    if(list[i] == el){
                        evt.item.setAttribute("style","border-color: #87b4ee;"); 
                        let ch_id = vm.users_data[parseInt(el.getAttribute('data-index'))].checked_id;
                        function edit(arr){  
                          depthTraversal1(arr); 
                          return arr; 
                        }   
                        function depthTraversal1(arr){  
                            if (arr!=null){  
                                for(let i=0;i<arr.length;i++){
                                    if(ch_id.length!=0){
                                    for(let j=0;j<ch_id.length;j++){
                                        if(arr[i].id==ch_id[j]){
                                            arr[i].checked=true;
                                            break;
                                        }
                                        else{arr[i].checked=false;}
                                    }
                                    }else{
                                        arr[i].checked=false;
                                    }
                                  depthTraversal1(arr[i].children);
                                }
                            }         
                        }
                        vm.data1=edit(vm.data1);
                    }else{
                        list[i].removeAttribute("style");
                    }                    
                }
                
            },
            
        });        

    },
    methods:{        
        showmodal(){
            this.modal=true;
            this.u_name="";
        },
        save (){
            if(this.select==null){
                this.$Message.info('请选中一个课程');
            }else{
                let checked_tree = this.$refs.tree.getCheckedNodes();
                for(var i=0;i<checked_tree.length;i++){
                    if(checked_tree[i].children.length!=0){
                        checked_tree.splice(i,1);
                    }
                }
                let tree_id = [];
                for(let i=0;i<checked_tree.length;i++){
                    tree_id[i]=checked_tree[i].id;
                }
                this.$axios.patch('/courseevalList', {
                            params: {
                                id:this.users_data[this.select].id,
                                checked_id:tree_id,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.users_data[this.select].checked_id = res.data.checked_id;
                            this.$Message.info('保存成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        
            }   
        },
        check111(selectedList){
            if(selectedList[selectedList.length-1].checked==true){
                selectedList[selectedList.length-1].checked=false;
            }
            else{
                selectedList[selectedList.length-1].checked=true;
            }            
        }   
    }
}
</script>
