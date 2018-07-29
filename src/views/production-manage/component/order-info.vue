<style lang="less">
    @import '../../../styles/common.less';
    @import '../advanced-router.less';
</style>

<template>
    <div>
        <Modal width="700" v-model="dispatchWorkOrder" title="分派工单"  @on-ok="give_workshop" >
           
            分派到下料车间:
            <Select v-model="model1" placeholder="车间主任" style="width:200px" clearable>
                <Option v-for="item in workshop_directors" :value="item.user_id" :key="item.id">{{ item.username }}</Option>
            </Select>
          
            分派到组拼车间:
            <Select v-model="model2" placeholder="车间主任" style="width:200px" clearable >
                <Option v-for="item in workshop_packaging" :value="item.user_id" :key="item.id">{{ item.username }}</Option>
            </Select>


        </Modal>

        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
          <!-- <Button @click="dispatchWorkOrder = true" type="primary">分派工单</Button> -->
        <Modal v-model="isshowaddworkorder" title="添加工单" @on-ok="append">
            <table>
                <tr><td>名称</td><td>
                <Input v-model="title" placeholder="请输入名称" clearable style="width: 300px"></Input></td></tr>
                <tr>&nbsp;</tr>
                <tr><td>设计</td><td>
                <Input v-model="maker" placeholder="请输入设计" clearable style="width: 300px"></Input></td></tr>
                <tr>&nbsp;</tr>
                <tr><td>数量</td><td>
                <Input v-model="number" placeholder="请输入数量" clearable style="width: 300px"></Input></td></tr>
                <tr>&nbsp;</tr>
                <tr><td>模板名称</td><td>
                <Input v-model="template_type" placeholder="请输入模板名称" clearable style="width: 400px"></Input></td></tr>
                <tr>&nbsp;</tr>
            </table>           
        </Modal>
        <div >
            <Row>
                <Card>
                    <p slot="title">
                        <Icon type="compose"></Icon>
                        订单-工单
                        <!-- &nbsp;  
                        <Button @click="show_modal()" class="ivu-btn ivu-btn-primary ivu-btn-small">添加工单</Button> -->
                    </p>
                    <p>
                        <Button @click="add_workorder" class="ivu-btn ivu-btn-primary ivu-btn-small">添加工单</Button>
                    </p>

                    <Table highlight-row ref="currentRowTable" @on-current-change="row_select" :columns="work_order_col" :data="work_order_data_arr"></Table>
                    <br/>
                    
                   <div v-if="work_order_detail[0]">
                    <div  v-for="(mat_data,index) in work_order_detail">
                        <card>
                    <p >
                        <Icon type="compose"></Icon>
                        模板-{{index+1}}#；工单号：{{work_order_id}}
                    </p>
                   
                    <Table :columns="materials_col" v-if="mat_data" :data="mat_data" :mat_data="mat_data" ></Table>
                    <!-- {{mat_data}} -->
                     <p >
                        <Icon type="compose"></Icon>
                        模板-{{index+1}}# 物料清单
                    </p>
                    <Table :columns="boms_col" :data="mat_data[0].children"></Table>
                    
                        </card>
                  
                   </div>
                    </div>
                   
                    <!-- <div v-for="mat_data in work_order_data.children">
                        <Table :columns="materials_col" :data="mat_data"></Table>
                        
                        <div v-for="bom_data in mat_data.children">
                            <Table :columns="boms_col" :data="bom_data"></Table>
                        </div>

                    </div> -->
                </Card>
            </Row>
        </div>
                

       <!--  <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    订单详情
                </p>
                <Table :columns="order_col" :data="order_data"></Table>
                <Modal width="700" v-model="showInfo" title="订单信息">
                    <Table :columns="order_col" :data="order_data"></Table>
                </Modal>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <Row>
                    <p class="advanced-router-tip-p">虽然iview-admin支持打开带参数的页面，但是类似于这种需求，还是建议用iview的Modal或者使用表格直接在表格内展开数据</p>
                    <p><Button @click="showInfo = true" type="primary">点击按钮弹出Modal</Button></p>
                </Row>
                <div class="margin-top-10">
                    <p class="advanced-router-tip-p">iview官方示例<a href="https://www.iviewui.com/components/table">表格</a></p>
                    <Table :columns="columns10" :data="data9"></Table>
                </div>
            </Card>
        </Row> -->
    </div>
</template>

<script>
import expandRow from './expandRow.vue';
export default {
    name: 'order-info',
    components: {
        expandRow
    },
    data () {
        return {
            model1: '',
            model2: '',
            workshop_directors: [],
            workshop_packaging: [],
            work_order_id :'',
            graph_no: '',
            showPic: false,
            isshowaddworkorder: false,
            template_type: '',
            number: '',
            maker: '',
            title: '',
            work_order_col: [
                {
                    type: 'index',
                    title: '序号',
                    width: 30
                },
                {
                    title: '工单号',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '设计',
                    key: 'maker',
                    align: 'center'
                },
                {
                    title: '模版名称',
                    key: 'template_type',
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'number',
                    align: 'center'
                },
                {
                    title: '添加模板',
                    key: 'action_add',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        // debugger
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    // row: params
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.flag = false;
                                        console.log(params.row)
                                        let argu = { work_order_id: params.row.id};
                                        this.$router.push({
                                            name: 'add-template',
                                            params: argu
                                        });
                                    }
                                }
                            }, '添加模板'),
                        ]);
                    }
                },
                {
                    title: '分派工单',
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
                                        this.dispatchWorkOrder=true; 
                                    }
                                }
                            }, '分派工单'),
                         
                        ]);
                    }
                }
            ],
            work_order_data_arr: [],
            materials_col: [
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
                            console.log(params);
                          return  h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul', params.row.graph_no.map(item =>{
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
            // flag:true,
            showInfo: false,
            dispatchWorkOrder: false,
            order_col: [
                {
                    title: '订单号',
                    key: 'order_id',
                    align: 'center'
                },
                {
                    title: '买家',
                    key: 'buyer',
                    align: 'center'
                },
                {
                    title: '地址',
                    key: 'addr',
                    align: 'center'
                },
                {
                    title: '下单时间',
                    key: 'time',
                    align: 'center'
                },
                {
                    title: '交易状态',
                    key: 'state',
                    align: 'center'
                }
            ],
            order_data: [],
            work_order_detail: [],
            columns10: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        });
                    }
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                }
            ],
            data9: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    job: '数据工程师',
                    interest: '羽毛球',
                    birthday: '1991-05-14',
                    book: '乔布斯传',
                    movie: '致命魔术',
                    music: 'I Cry'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    job: '数据科学家',
                    interest: '排球',
                    birthday: '1989-03-18',
                    book: '我的奋斗',
                    movie: '罗马假日',
                    music: 'My Heart Will Go On'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    job: '数据产品经理',
                    interest: '网球',
                    birthday: '1992-01-31',
                    book: '赢',
                    movie: '乔布斯',
                    music: 'Don’t Cry'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    job: '数据分析师',
                    interest: '桌球，跑步',
                    birthday: '1988-7-25',
                    book: '红楼梦',
                    movie: '倩女幽魂',
                    music: '演员'
                }
            ],
        };
    },
    methods: {
        append(){
            var _this = this;
            if(this.title==""&&this.template_type==""){    
               this.$Message.error("内容填写不全");
               }else{
                   this.$axios.post('/work_order_details',{
                       title: this.title,
                       template_type: this.template_type,
                       maker: this.maker,
                       number:this.number,
                       order_id:this.$route.params.order_id
                   }).then(res =>{
                        // debugger
                       _this.work_order_data_arr.push(res.data.work_order)
                   })
               }
        },
        add_workorder(){
            this.isshowaddworkorder = true;
        }, 
        row_select(currentRow){
           console.log(currentRow);
           // debugger
           // if(this.flag){
                this.flag = false;
                this.$axios.get("/work_order_details",{params:{
                 work_order_id: currentRow.id
               }})
               .then(res => {
                   this.work_order_detail = res.data.materials_boms;
                   this.work_order_id = currentRow.id;
                //    console.log(this.work_order_data_arr);
               }).catch(error =>{
                    console.log(error);
               })
           // }else{
           //  this.flag = true;
           //  let argu = { work_order_id: currentRow.id};
           //  this.$router.push({
           //      name: 'add-template',
           //      params: argu
           //  });

           // }
           
        },
         pic_show(picno){
           this.graph_no= picno;
           this.showPic=true;
       },
       give_workshop(){
           if(this.model1==""&&this.model2==""){
              
               this.$Message.info("至少选择一个车间主任分配");
               this.dispatchWorkOrder =true;

           }else{
               this.$axios.post('/work_shop_task',{
                   xialiao: this.model1,
                   zupin: this.model2,
                   work_order_id: this.work_order_id
               }).then(res =>{
                   this.$Message.info(res.data.msg);
               })
           }

            
       }
       
    },
    mounted () {
        var _this = this;
        this.$axios.get("/xialiao").then(res =>{
            _this.workshop_directors = res.data.manager;  
            // debugger
        })
        .catch( error => {
            console.log(error);
        });
        this.$axios.get("/zupin")
        .then(res =>{
            // debugger
            _this.workshop_packaging = res.data.manager;
           
        })
        .catch( error => {
            console.log(error);
        });
        this.$axios.get("/order_details",{params:{
            order_id:  this.$route.params.order_id
        }})
        .then(res =>{
            // debugger
            _this.work_order_data_arr = res.data.work_orders;
        })
        .catch( error => {
            console.log(error);
        })
    },
    activated () {
        
    }
};
</script>
