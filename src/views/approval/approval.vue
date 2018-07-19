
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
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.stopUse(params.row)
                                    }
                                }
                            }, '停用')
                        ]);
                    }
                }
            ],
            approvalData: []
        };
    },
    mounted() {
        this.$axios
        .get("/approval_list")
        .then(res => {
            this.approvalData = res.data;
        })
        .catch(error => {
            console.log(error);
        });
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        edit (row) {
            let argu = { approval_id: row.id,approval_name: row.name,approval_comment: row.comment };
            this.$router.push({
                name: 'design-approval',
                params: argu
            });
            
        },
        procedure (row) {
            let argu = { approval_id: row.id,approval_name: row.name };
            this.$router.push({
                name: 'approval-procedure',
                params: argu
            });
            
        },
        stopUse(app_id){

        },
        goto_design_approval(){
            let argu = { approval_id: '-1',existed_app: this.approvalData };
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
