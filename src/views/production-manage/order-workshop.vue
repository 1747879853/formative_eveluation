<style lang="less">
    @import './advanced-router.less';
</style>

<template>
    <div>
        <Modal width="700" v-model="dispatchWorkOrder" title="分派到班组">
           
            <Select v-model="model1" placeholder="班组" style="width:200px">
                <Option v-for="item in workteams" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            数量：<InputNumber :max="team_qty" :min="1" v-model="team_qty"></InputNumber>

        </Modal>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        {{workshop_workorders.name}}-工单
                    </p>
                    <Row type="flex" justify="center" align="top" class="advanced-router">
                        <Table :columns="orderColumns" :data="workshop_workorders.workorders" style="width: 100%;"></Table>
                        
                    </Row>
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
            team_qty: 1

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
    }
};
</script>
