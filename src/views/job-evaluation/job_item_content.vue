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
    <Modal
        v-model="modal3"
        title="添加子花费科目"
        @on-ok="append"
        @on-cancel="cancel">
        <table>
        <tr><td>子花费科目名</td><td>
        <Input v-model="z_name" placeholder="请输入子花费科目名" clearable style="width: 300px"></Input></td></tr>
        <tr>&nbsp;</tr>
        </table>
    </Modal>
    <Modal
        v-model="modal1"
        title="修改子花费科目"
        @on-ok="edit"
        @on-cancel="cancel">
        <table>
        <tr><td>花费科目名</td><td>
        <Input v-model="e_name" placeholder="请输入子花费科目名" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
        </table>
    </Modal>
    </div>
        <!-- <tree-grid 
        :items='data' 
        :columns='columns'
      ></tree-grid>    -->
      <Tree :data="data" :render="renderContent"></Tree>       
    </Card>   
</template>

<script>
// import TreeGrid from './treeGrid'
export default {
    name: 'cost',
     data() {
            return {
                modal2:false,
                modal3:false,
                modal1:false,

                f_name:"",
                z_name:"",
                e_name:"",
                // node.node就是data
                // root指所有数据
                data: [],
                parent_data:[],
                self_data:[],
                root:[],
                node:[],
            }
        },
    components: {
        // TreeGrid
    },
    methods: {
            ok () {
    
                if(this.f_name.length == 0){
                    this.$Message.error("添加内容不可为空")
                }else{
                    this.$axios.post('/costList', {
                            //parent_id = 0,表明是一级表
                            params: {
                                title: this.f_name,
                                parent_id: 0
                            }
                        }).then(function(res) {
                            // console.log(res);
                            this.data.push(res.data);
                
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
                }

            },
            ok1 (root, node, data) {
                this.show_moda3(node,root);
                this.parent_data=data;
                console.log(root);
                console.log(node);
                console.log(data);
                console.log(root[data.nodeKey].node);
            },
            ok2(root, node, data){
                this.show_moda4(data);
                this.self_data=data;
                this.root=root;
                this.node=node;
            },
            cancel () {
                this.$Message.info('取消');
            },
            show_modal(){
                this.modal2=true;
                this.f_name="";
            },
            show_moda3(node,root){
                this.modal3=true;
                this.f_name="";
            },
            show_moda4(data){
                this.modal1=true;
                this.e_name=data.title;
            },
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '102px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            attrs: {
                                title: '添加'
                            },
                            on: {
                                click: () => { this.ok1(root,node,data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            attrs: {
                                title: '删除'
                            },
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-pricetags-outline'
                                // icon: 'ios-minus-empty'
                            }),
                            attrs: {
                                title: '修改'
                            },
                            on: {
                                click: () => { this.ok2(root, node, data) }
                            }
                        }),
                    ])
                ]);
            },
            edit(){
                this.$axios.patch('/costList', {
                        params: {
                            id: this.self_data.id,
                            title: this.e_name,
                        }
                    }).then(function(res) {
            
                        console.log(res);
                        console.log(this.data)
            
                        const parentKey = this.root.find(el => el === this.node).parent;
                        if(!(parentKey == undefined)){
                            const parent = this.root.find(el => el.nodeKey === parentKey).node;
                            const index = parent.children.indexOf(this.self_data);
                            parent.children[index].title = this.e_name;
                        }else{
                            for(let i=0;i<this.data.length;i++){
                                if(this.data[i].id == this.self_data.id){
                                    this.data[i].title = this.e_name;
                                }
                            }
                        }
                        // for()
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error)
                    });
                    this.$Message.info('修改成功');
        
            },
            append(){
                if(this.z_name.length == 0){
                    this.$Message.error("添加内容不可为空")
                }else{
                    this.$axios.post('/costList', {
                            params: {
                                title: this.z_name,
                                parent_id: this.parent_data.id,
                            }
                        }).then(function(res) {
                
                            const children = this.parent_data.children || [];
                            children.push({
                                id:res.data.id,
                                title: res.data.title,
                                expend:true,
                                children:[],
                            });
                
                            this.$set(this.data, 'children', children);
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                    }
                this.z_name="";
            },
            remove (root, node, data) {
                this.$Modal.confirm({
                    title: '删除花费科目',
                    content: '<p>确定要删除此花费科目吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/costList', {
                            data: {
                                params: {
                                    id: data.id,
                                }
                            }

                        }).then(function(res) {
                
                            const parentKey = root.find(el => el === node).parent;
                            if(!(parentKey == undefined)){
                                const parent = root.find(el => el.nodeKey === parentKey).node;
                                const index = parent.children.indexOf(data);
                                parent.children.splice(index, 1);
                            }else{
                                for(let i=0;i<this.data.length;i++){
                                    if(this.data[i].id == data.id){
                                        this.data.splice(i,1);
                                    }
                                }
                            }
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('删除成功');
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
                
            },
        },
    mounted(){
        // debugger
        var _this = this;
        this.$axios.get("/costList").then( res =>{
            _this.data = res.data.costs;  
            // debugger  
        }).catch(error =>{
            console.log(error);
        })
    },
};
</script>

<style>

</style>
