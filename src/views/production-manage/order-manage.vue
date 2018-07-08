<style lang="less">
    @import './advanced-router.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        订单列表
                    </p>
                    <Row type="flex" justify="center" align="top" class="advanced-router">
                        <Table :columns="orderColumns" :data="orderData" style="width: 100%;"></Table>
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
                    key: 'order_id',
                    align: 'center'
                },
                 {
                    title: '客户',
                    key: 'customer',
                    align: 'center'
                },
                {
                    title: '时间',
                    key: 'create_time'
                },
                {
                    title: '详情',
                    key: 'show_more',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    let argu = { order_id: params.row.order_id };
                                    this.$router.push({
                                        name: 'order-info',
                                        params: argu
                                    });
                                }
                            }
                        }, '查看详情');
                    }
                }
            ],
            orderData: [
                // {
                //     order_id: '1000001',
                //     user_name: 'Aresn'
                // },
                // {
                //     order_id: '1000002',
                //     user_name: 'Lison'
                // },
                // {
                //     order_id: '1000003',
                //     user_name: 'lili'
                // },
                // {
                //     order_id: '1000004',
                //     user_name: 'lala'
                // }
            ]
        };
    },
    computed: {
        avatorImage () {
            return localStorage.avatorImgPath;
        }
    },
    mounted(){
        this.$axios.get("/orderListData").then( res =>{
            this.orderData = res.data.body;
        }).catch(error =>{
            console.log(error);
        })
    }
};
</script>
