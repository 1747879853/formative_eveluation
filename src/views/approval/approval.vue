
<template>           
    <Row>
        <Card>            
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                <Icon type="ios-list"></Icon>
                审批列表
                <span style="float:right;margin-right:100px;"> <Button type="primary" icon="plus-round" @click="goto_design_approval">创建新审批</Button></span>
            </div>
            <div>
                <Table :columns="approvalColumns" :data="approvalData" style="width: 100%;"></Table>
            </div>
        </Card>
    </Row>
      
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'approval-index',
    data () {
        return {
            approvalColumns: [
                {
                  type: "index",
                  title: "序号",
                  width: 60
                },
                {
                  title: "审批名称",
                  key: "name",
                  align: "center"
                },
                {
                  title: "审批说明",
                  key: "comment",
                  align: "center"
                },
                {
                  title: "创建时间",
                  key: "created_time"
                },
                {
                  title: "详情",
                  key: "action",
                  align: "center",
                  render: (h, params) => {
                    if(params.row.status == 1){
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row)
                                    }
                                }
                            }, '编辑表单'),  
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.procedure(params.row)
                                    }
                                }
                            }, '审批流程'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.stopUse(params.row)
                                    }
                                }
                            }, '停用')
                        ]);
                    }else{
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    disabled: 'disabled'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row)
                                    }
                                }
                            }, '编辑表单'),  
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    disabled: 'disabled'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.procedure(params.row)
                                    }
                                }
                            }, '审批流程'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.startUse(params.row)
                                    }
                                }
                            }, '启用')
                        ]);
                    }
                    }
                }
            ],
            approvalData: []
        };
    },
    mounted() {
        this.init();
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        init(){
            this.$axios
            .get("/approval_admin_list")
            .then(res => {
                this.approvalData = res.data.data || [];
                this.approvalData.splice(0,0);
            })
            .catch(error => {
                this.approvalData = [];
                this.$Message.error("获取数据失败！")
                console.log(error);
            });
        },
        edit (row) {
            let argu = { approval_admin_id: row.id,existed_app: this.approvalData, approval_admin_name: row.name,approval_admin_comment: row.comment };
            this.$router.push({
                name: 'design-approval',
                params: argu
            });
            
        },
        procedure (row) {
            let argu = { approval_admin_id: row.id,approval_admin_name: row.name };
            this.$router.push({
                name: 'approval-procedure',
                params: argu
            });
            
        },
        stopUse(row){
            this.$axios.post('/approval_admin_stop', {
                approval_admin_id: row.id
            })
            .then(res => {
                // console.log(res);
                this.init();
                this.$Message.success(res.data.msg);
                // this.$store.commit('clearCurrentTag', this);
                // this.$router.go(-1);
            })
            .catch(error => {
                this.$Message.error('保存失败，请检查服务器设置！');
                console.log(error);
            });

            

        },
        startUse(row){
            this.$axios.post('/approval_admin_start', {
                approval_admin_id: row.id
            })
            .then(res => {
                // console.log(res);
                this.init();
                this.$Message.success(res.data.msg);
                // this.$store.commit('clearCurrentTag', this);
                // this.$router.go(-1);
            })
            .catch(error => {
                this.$Message.error('保存失败，请检查服务器设置！');
                console.log(error);
            });

            

        },
        goto_design_approval(){
            let argu = { approval_admin_id: 0,existed_app: this.approvalData };
            this.$router.push({
                name: 'design-approval',
                params: argu
            });
        }
    }
};
</script>

<style>

</style>
