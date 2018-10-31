
<template>
<div>
    <Row>            
        <Card>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                区块-用户管理
            </div>                    
        </Card>                      
    </Row>
    <Row>
        <Col span="12">
            <Card >
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    区块&nbsp;&nbsp;&nbsp;
                    
                </p>
                <div style="overflow-y:auto;height:500px;">
                <Tree ref="tree" :data="data1" :multiple="multiple" @on-select-change="check111"></Tree>
                </div>
            </Card>
        </Col>
        <Col span="12">
            <Card>

                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    用户&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">保存</Button>                   
                    
                </p>
                <div style="overflow-y:auto;height:500px;">
                    <ul id="editable-new" class="iview-admin-draggable-list">                            
                        <li v-for="(item, index) in groups_data" :key="index" class="notwrap todolist-item" :data-index="index">
                        {{ item.title }}<Icon type="close" class="js-remove"/></li>
                    </ul>
                </div>
            </Card>
        </Col>
        
    </Row>
</div>
</template>
<script>

    export default {
        data () {
            return {
                multiple: false,
                data1: [
                ],
                groups_data: [              
                ],
                name:"",
                modal:false,
                select:null,
                ele:null,
            }
        },
        mounted () { 
        this.$axios.get("/authGroupList").then( res =>{
            this.groups_data = res.data.a;
            this.data1 = res.data.b;
        }).catch(error =>{
            console.log(error);
        });
        
               

    },
    methods:{        
        showmodal(){
            this.modal=true;
            this.name="";
        },
        ok () {
            this.$axios.post('/authGroupList', {
                            params: {
                                title:this.name,
                            }
                        }).then(function(res) {
                            console.log(res);
                            this.groups_data.push(res.data);
                            this.$Message.info('添加成功');
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });                        
        },
        cancel () {
            this.$Message.info('取消');
        },
        save (){
            if(this.select==null){
                this.$Message.info('请选中一个区块');
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
                this.$axios.patch('/authGroupList', {
                                params: {
                                    group_id:this.groups_data[this.select].id,
                                    id:tree_id
                                }
                            }).then(function(res) {
                                console.log(res);
                                this.groups_data[this.select].checked_id = res.data.checked_id;
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
