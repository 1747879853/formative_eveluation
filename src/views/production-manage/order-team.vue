<style lang="less">
    @import './advanced-router.less';
</style>

<template>
    <div>
        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
        <Row>
            
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        {{workteam_materials.name}}
                    </p>
                    
                        <Table  highlight-row ref="currentRowTable" @on-current-change="row_select" :columns="orderColumns" :data="workteam_materials.materials" style="width: 100%;"></Table>
                        <br>
                        <div v-if="team_boms.length!=0">
                        <Icon type="compose"></Icon>模板：{{bom_name}}
                        <Table :columns="boms_col" :data="team_boms"></Table>
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
                // {
                //     title: '图号',
                //     key: 'graph_no',
                //     align: 'center'
                // },
                {
                       title: '图号',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {

                          return  h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul',  this.workteam_materials.materials[params.index].graph_no.map(item =>{
                                        return h('li', {
                                            style: {
                                                textAlign: 'center',
                                                padding: '4px',
                                                color:'blue'
                                            },
                                        on: {
                                        click: () => {
                                            this.pic_show(item)
                                        }
                                    }
                                        }, item)
                                    }))
                                ])
                           
                                
                        }
                },
               
                {
                    title: '模板',
                    key: 'name'
                },
                
              
                {   
                    title: '数量',
                    key: 'number'

                },
                 {   
                    title: '完成数量',
                    key: 'number_finished'

                },
                  {   
                    title: '备注',
                    key: 'comment'

                },
               
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
            workteam_materials: [],
            workteams: [],
            dispatchWorkOrder:false,
            model1: '',
            team_qty: 1,
            team_boms: [],
            bom_name:'',
            graph_no: '',
            showPic:false,
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
           

        };
    },
    computed: {
        avatorImage () {
            return localStorage.avatorImgPath;
        }
    },
    mounted(){
        this.$axios.get("/workteam_materials").then(res => {
                this.workteam_materials = res.data;
                
        }).catch(error => {
            console.log(error);
        });
        this.$axios.get("/workteams").then(res => {
            this.workteams = res.data.data;
           
            console.log(this.workteams);
        }).catch( error =>{
             console.log(error);
        })
    },
    methods:{
        row_select(currentRow){
            this.$axios.get("/team_boms").then(res =>{
               
                this.team_boms =  res.data;
                this.bom_name =currentRow.name;
            }).catch(err =>{
                console.log(err);
            })
       },
       pic_show(picno){
           this.graph_no= picno;
           this.showPic=true;
       }
    }
};
</script>
