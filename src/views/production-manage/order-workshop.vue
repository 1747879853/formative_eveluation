<style lang="less">
    @import './advanced-router.less';
</style>

<template>
    <div>
        <Modal width="700" v-model="dispatchWorkOrder" title="分派到班组">
           
            <Select v-model="model1" placeholder="班组" style="width:200px">
                <Option v-for="item in workteams" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            数量：<InputNumber :max="max_qty" :min=1 v-model="team_qty"></InputNumber>

        </Modal>
        <Row>
           
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        {{workshop_workorders.name}}-工单
                    </p>
                  
                        <Table highlight-row ref="currentRowTable" @on-current-change="row_select"  :columns="orderColumns" :data="workshop_workorders.workorders" style="width: 100%;"></Table>
                     <br/>
                


              
                    <div v-if="workshop_order_detail[0]" >
                    <div  v-for="(mat_data,index) in workshop_order_detail[0].children">
                   
                    <p >
                        <Icon type="compose"></Icon>
                        模板-{{index+1}}#;工单号:{{work_order_id}}
                    </p>
                   
                    <Table :columns="materials_col" v-if="mat_data" :data="mat_data"></Table>
                    <!-- {{mat_data}} -->
                     <p >
                        <Icon type="compose"></Icon>
                        模板-{{index+1}}# 物料清单
                    </p>
                    <Table :columns="boms_col" :data="mat_data[0].children"></Table>
                    
                        
                  
                   </div>
                    </div>
                 
                   
                   </Card>
                
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'mutative-router',
    data () {
        return {
            orderColumns: [
                {
                    type: 'index',
                    title: '序号',
                    width: 60
                },
                {
                    title: '订单号',
                    key: 'work_order_id',
                    align: 'center'
                },
                {
                    title: '客户',
                    key: 'name'
                },
              
                {   
                    title: '模板',
                    key: 'type'

                },
                  {   
                    title: '数量',
                    key: 'number'

                },
                 {
                        title: '分派到班组',
                        key: 'action',
                        width: 150,
                        align: 'center',
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
                                            console.log(params.row);
                                            this.team_qty = params.row.number ;
                                            this.max_qty =  params.row.number;
                                            this.dispatchWorkOrder=true;
                                        }
                                    }
                                }, '分派到班组'),
                             
                            ]);
                        }
                    }
            ],
            orderData: [
                {
                    order_id: '1000001',
                    user_name: 'Aresn'
                },
                {
                    order_id: '1000002',
                    user_name: 'Lison'
                },
                {
                    order_id: '1000003',
                    user_name: 'lili'
                },
                {
                    order_id: '1000004',
                    user_name: 'lala'
                }
            ],
            workshop_workorders: [],
            workteams: [],
            dispatchWorkOrder:false,
            model1: '',
            team_qty: 0,
            max_qty:10,
            workshop_order_detail: [],

              materials_col: [
                {
                    title: '图号',
                    key: 'graph_no',
                    align: 'center'
                },
                {
                    title: '模板名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'number',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'comment',
                    align: 'center'
                },              
            ],
            materials_data: [],
            materials_data_hash: {},
            boms_col: [
                {
                    type: 'index',
                    title: '序号',
                    width: 30
                },
                {
                    title: '名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '材料规格',
                    key: 'spec',
                    align: 'center'
                },
                {
                    title: '长度(mm)',
                    key: 'length',
                    align: 'center'
                },
                {
                    title: '宽度(mm)',
                    key: 'width',
                    align: 'center'
                },
                {
                    title: '数量(件)',
                    key: 'number',
                    align: 'center'
                },
                {
                    title: '总数量/套',
                    key: 'total',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'comment',
                    align: 'center'
                },
            ],
            boms_data_hash: {},
            work_order_id :''


        };
    },
    computed: {
        avatorImage () {
            return localStorage.avatorImgPath;
        }
    },
    mounted(){
        this.$axios.get("/workshop_workorders").then(res => {
                this.workshop_workorders = res.data;
                
        }).catch(error => {
            console.log(error);
        });
        this.$axios.get("/workteams").then(res => {
            this.workteams = res.data.data;
            console.log('111111111111');
             console.log(this.workteams);
        }).catch( error =>{
             console.log(error);
        })
    },
    methods:{
        row_select(currentRow){
            this.$axios.get('/workshop_order_detail').then(res => {
                this.workshop_order_detail = res.data;
                this.work_order_id = currentRow.work_order_id;

            }).catch(error =>{
                console.log(error);
            })
        }
    }
};
</script>
