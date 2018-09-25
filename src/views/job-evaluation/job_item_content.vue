<template>
    <Card>
    <div>
    
    
    <Modal
        v-model="modal_append"
        title="添加工作项"
        @on-ok="append"
        @on-cancel="cancel">
        <table>
            <tr>
                <td><Input v-model="item_title" placeholder="名称" clearable></Input>
                </td>
            </tr>
            <tr>
                <td><Input v-model="item_weight" placeholder="比重（数字）" clearable></Input></td>
            </tr>
            <tr>
                <label>写法示例：“质量,0.5;时间,0.3;数量,0.2”，标点用英文标点，汉字之间不要有空格 </label>
                <Input v-model="item_stds" placeholder="评价指标及百分比" clearable></Input>
            </tr>
            <tr>
                <label>写法示例：“内容1-质量,时间;内容2-质量,数量”，标点用英文标点，汉字之间不要有空格</label>
                <Input v-model="item_cnts" placeholder="工作内容" clearable></Input>
            </tr>
            <tr>&nbsp;</tr>
        </table>
    </Modal>
   
    </div>
        
      <Table :columns="columns1" :data="jic_list"></Table>       
    </Card>   
</template>

<script>
// import TreeGrid from './treeGrid'
export default {
    name: 'cost',
     data() {
            return {
                columns1: [
                    {
                        title: '角色',
                        key: 'title'
                    },
                    {
                        title: '工作项',
                        key: 'item_title'
                    },
                    {
                        title: '工作项比重',
                        key: 'item_weight'
                    },
                    {
                        title: '工作项评价指标',
                        key: 'item_stds'
                    },
                    {
                        title: '工作内容',
                        key: 'item_cnts'
                    },
                    {
                        title: '操作',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {
                                style: {                                    
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
                                            click: () => { 
                                                this.modal_append = true;
                                                this.current_row = params.row; 
                                            }
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
                                            click: () => { this.remove(params.row) }
                                        }
                                    }),
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-cog-outline'
                                            // icon: 'ios-minus-empty'
                                        }),
                                        attrs: {
                                            title: '修改'
                                        },
                                        on: {
                                            click: () => { this.ok2(root, node, data) }
                                        }
                                    }),
                                ]);
                        }
                    }
                ],
                modal_append:false,
                current_row: "",
                item_title: "",
                item_weight: "",
                item_stds: "",
                item_cnts: "",

                jic_list: [],
            }
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
            
            append(){
                
                if(this.item_title == "" || this.item_weight == "" || this.item_stds == "" || this.item_cnts == "" ){
                    this.$Message.error("添加内容不可为空");
                }else{
                    var _this = this;
                    this.$axios.post('/jicList', {
                            params: {
                                auth_group_id: this.current_row.id,
                                item_title: this.item_title,
                                item_weight: this.item_weight,
                                item_stds: this.item_stds,
                                item_cnts: this.item_cnts
                            }
                        }).then(function(res) {
                            debugger
                            this.jic_list.push({
                                id: this.current_row.id,
                                jic_id: res.data.id,
                                title: this.current_row.title,
                                
                                item_title: res.data.item_title,
                                item_weight: res.data.item_weight,
                                item_stds: res.data.item_stds,
                                item_cnts: res.data.item_cnts
                            });
                            // this.jic_list.splice(0,0);
                            console.log(this.jic_list);
                            _this.$Message.success("添加成功！");
                            this.current_row = "";
                            this.item_title = "";
                            this.item_weight = "";
                            this.item_stds = "";
                            this.item_cnts = "";
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error);
                            _this.$Message.error("添加失败！");
                            this.current_row = "";
                            this.item_title = "";
                            this.item_weight = "";
                            this.item_stds = "";
                            this.item_cnts = "";
                        });
                }
                
            },
            remove (row) {
                this.$Modal.confirm({
                    title: '删除工作项',
                    content: '<p>确定要删除此工作项吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/jicList', {
                            data: {
                                params: {
                                    jic_id: row.jic_id,
                                }
                            }

                        }).then(function(res) {
                            let count=0;
                            for(let i=0;i<this.jic_list.length;i++){
                                if(this.jic_list[i].id == row.id){
                                    count = count + 1;
                                }
                            }
                            if(count>1){
                                for(let i=0;i<this.jic_list.length;i++){
                                    if(this.jic_list[i].jic_id == row.jic_id){
                                        this.jic_list.splice(i,1);
                                        break;
                                    }
                                }
                            }else{                                
                                for(let i=0;i<this.jic_list.length;i++){
                                    if(this.jic_list[i].jic_id == row.jic_id){
                                        
                                        this.jic_list[i].jic_id = 0;
                                        this.jic_list[i].item_title = "" ;
                                        this.jic_list[i].item_weight = "" ;
                                        this.jic_list[i].item_stds = "" ;
                                        this.jic_list[i].item_cnts = "" ;
                                        break;
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
        var _this = this;
        this.$axios.get("/jicList").then( res =>{
            _this.jic_list = res.data.jic_list; 
            // debugger
        }).catch(error =>{
            console.log(error);
        })
    },
};
</script>

<style>

</style>
