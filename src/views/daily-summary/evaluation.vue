<template>
    <div>
        <Card>            
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                        工作日报评价                  
            </div>
            <br>
            <Row  type="flex" justify="center">
            <Col span="7">人员:
                    <Select v-model="userid" clearable placeholder="请选择人员" style="width:200px;">
                        <Option v-for="item in subUserList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col span="7">时间范围:
                    <DatePicker type="daterange" placement="bottom-end" placeholder="请选择时间范围" format="yyyy-MM-dd" @on-change="timeselect" style="width:200px"></DatePicker>
                </Col>
                
                <Col span="3">
                    <Button type="primary" @click="summaryquery" icon="ios-search">查询</Button>
                </Col>
            </Row>
            <br>                         
        </Card>
        <Card v-if= "isSummaryShow">
            <!-- <Input v-model="summarySearch" icon="ios-search" placeholder="搜索..." style="width: 200px" /> -->
            <Row>
                <Col span="12">&nbsp;</Col>
                <Col span="12"><Page @on-change= 'on_change' @on-page-size-change='on_page_size_change' :total="total" show-sizer style="float: right"/></Col>
            </Row>
            <Table :columns="summaryColumns" :data="summaries" style="width: 100%"></Table>
            
        </Card>
        <Card v-if = "isCostShow">
            <!-- <Input v-model="costSearch" icon="ios-search" placeholder="搜索..." style="width: 200px" /> -->
            <Row>
                <Col span="12"><Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon>导出数据</Button></Col>
                <Col span="12"><Page @on-change= 'on_change_cost' @on-page-size-change='on_page_size_change_cost' :total="total" show-sizer style="float: right;"/></Col>
            </Row>
            <Table :columns="costColumns" :data="costData" style="width: 100%" ref="table"></Table>
            
        </Card>
        
        <Modal v-model="showCostModal" title="花费明细"  @on-ok="costModalOk"  @on-cancel="cancel">
            <Card>
                <Table :columns="costColumn" :data="costs" style="width: 100%;"></Table>
            </Card>
        </Modal>
        <Modal v-model="showEvaluationModal" title="工作日报评价"  @on-ok="showEvaluationModalOk"  @on-cancel="cancel">
            <Card>
                <!-- <Table :columns="costColumn" :data="costs" style="width: 100%;"></Table> -->
                <p>{{evaluation_jic}}</p>
                <p>{{user_name}}</p>
                <p>{{role_name}}</p>
            </Card>
        </Modal>
        <Modal v-model="goEvaluationModal" title="工作日报评价"  @on-ok="saveEvaluation"  @on-cancel="cancel">
            <Card>
                <!-- <Table :columns="costColumn" :data="costs" style="width: 100%;"></Table> -->
                <!-- <p>{{evaluation_jic}}</p>
                <p>{{user_name}}</p>
                <p>{{role_name}}</p> -->
                <table>
                    <tr v-for="(item,index) in evaluation_jic" :key="index" :data-index="index">
                        <td >{{item.item_title}}</td>
                        <td >{{item.item_weight}}</td>
                        <td>
                        <span v-for="(itemitem,index) in item.item_stds_arr">
                            {{itemitem.title}}(占比：{{itemitem.proportion}})
                            <Input v-model="itemitem.score" clearable style="width:100px;"></Input>
                            </br>
                        </span>
                        </td>

                    </tr>
                </table>

            </Card>
        </Modal>
    </div>
</template>

<script>

export default {
    name: 'query',
    data() {
            return {
                evaluation_jic: [],
                paramrow_clicked: '',
                user_name: '',
                role_name: '',
                userid:'',
                date_search:'',
                subUserList: [],
                isSummaryShow: false,
                isCostShow: false,
                summaries: [],
                costs: [],
                total: -1,
                limit: 10,
                offset: 0,
                costSearch: '',
                showCostModal: false,
                showEvaluationModal: false,
                goEvaluationModal: false,
                summarySearch: '',
                date:'',
                summary_date_s: 0,
                cost_date_s: 0,
                address:'',
                workcontent:'',
                transport:'',
                explain:'',
                costData: [],
                flag: true,
                iscost: false,
                summaryColumns: [
                {
                    type: "index",
                    title: "序号",
                    sortable: true,
                    width: 60
                },
                {
                    title:'姓名',
                    key: "name",
                    sortable: true,
                    align: "center"
                },
                {
                    title:'日期',
                    key: "date",
                    sortable: true,
                    align: "center"
                },
                {
                    title:'工作内容',
                    key: "workcontent",
                    sortable: true,
                    align: "left",
                    minWidth: 200,
                    render: (h,params) => {
                        return h("span",
                        {
                            domProps:{
                                innerHTML: params.row.workcontentformat
                            }

                        })
                    }

                },
                {
                    title:'花费',
                    key: "money",
                    sortable: true,
                    align: "center"

                },
                {
                    title:'操作',
                    key: "set",
                    align: "center",
                    render: (h, params) => {
                        if(params.row.evaluated == true){
                            return h('div', [ 
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show_cost_modal_data(params.row.id);
                                          }
                                    }
                                }, '花费详情'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show_evaluation_modal(params.row);
                                          }
                                    }
                                }, '查看评价')
                            ]);                        
                        }else{
                            return h('div', [ 
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show_cost_modal_data(params.row.id);
                                          }
                                    }
                                }, '花费详情'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.go_evaluation_modal(params.row);
                                          }
                                    }
                                }, '去评价')
                            ]);
                        }
                    }
                }],
                costColumn:[
                    {
                        type: "index",
                        title: "序号",
                        sortable: true,
                        width: 60
                    },
                    {
                        title:'花费科目',
                        key: "names",
                        sortable: true,
                        align: "center"
                    },
                    {
                        title:'具体事由',
                        key: "thing",
                        sortable: true,
                        align: "center"
                    },
                    {
                        title:'费用',
                        key: "money",
                        sortable: true,
                        align: "center"

                    },],
                costColumns:[
                    {
                        type: "index",
                        title: "序号",
                        key: "index",
                        sortable: true,
                        width: 60
                    },
                    {
                        title:'日期',
                        key: "date",
                        sortable: true,
                        align: "center"
                    },
                    {
                        title:'姓名',
                        key: "username",
                        sortable: true,
                        align: "center"
                    },
                    {
                        title:'花费科目',
                        key: "names",
                        sortable: true,
                        align: "center"
                    },
                    {
                        title:'具体事由',
                        key: "thing",
                        sortable: true,
                        align: "center"
                    },
                    {
                        title:'费用',
                        key: "money",
                        sortable: true,
                        align: "center"

                    },],
            }
    },
    mounted(){
        var _this = this;
        this.subUserList.push({value: "0",label: "全体"});
        this.$axios.get("/sub_user_list").then( res =>{
            res.data.forEach((item,index)=>{                
                _this.subUserList.push({value: item.id,label: item.username});
            })
        }).catch(error =>{
            console.log(error);
        });   
    },

    methods: {
        on_change(e){
            // console.log((e-1)*this.limit);
            // debugger
            this.offset = (e-1)*this.limit;
            // console.log("offset:"+this.offset);
            if(this.flag == false){    
                this.summaryquery_q(this.summary_date_s);
            }else{
                this.summaryquery();
            }
            // this.summaryquery()
        },
        on_page_size_change(e){
            // console.log(e);
            this.limit = e;
            this.offset = 0;
            if(this.flag == false){    
                this.summaryquery_q(this.summary_date_s);
            }else{
                this.summaryquery();
            }
        }, 
        timeselect(e){
            this.date_search = e;
            this.offset = 0;
        },
        summaryquery(){
            // console.log(this.date_search.length);
            if ((this.date_search instanceof Object)&&(this.date_search.length == 2)) {
                if(this.iscost == true){
                    this.iscost = false;
                    this.offset = 0;
                }
                if(this.flag == false){
                    this.flag = true;
                    this.offset = 0;
                }
                var _this = this;
                if(this.userid != ''){
                    // console.log(this.userid);
                    // console.log(this.date_search instanceof Object );
                    this.$axios.get("/get_summaries_scores",{  //params参数必写 , 如果没有参数传{}也可以
                        params: {  
                           userid: _this.userid,
                           date: _this.date_search,
                           limit: _this.limit,
                           offset: _this.offset, 
                        }
                    }).then( res =>{
                        // debugger
                        _this.total = res.data.total
                        // debugger
                        _this.summaries = res.data.summaries;    
                    }).catch(error =>{
                        console.log(error);
                    })
                    this.isSummaryShow = true;
                    this.isCostShow = false;
                }else{
                    this.$Message.error('请选择用户！');
                }
            }else{
                this.$Message.error('请选择查询时间范围！');
            }
        },
        summaryquery_q(date_s){
            
            
            if(this.iscost == true){
                this.iscost = false;
                this.offset = 0;
            }
            if(this.flag == true){
                this.flag = false;
                this.offset = 0;
            }
            if(this.summary_date_s != date_s){
                this.summary_date_s = date_s;
                this.offset = 0;
            }
            // console.log(typeof(this.date_search));
            if(this.userid != ''){
                var _this = this;
                // console.log(this.userid);
                // console.log(date_search);
                this.$axios.get("/get_summaries_s",{  //params参数必写 , 如果没有参数传{}也可以
                    params: {  
                       userid: _this.userid,
                       date: this.summary_date_s,
                       limit: _this.limit,
                       offset: _this.offset, 
                    }
                }).then( res =>{
                    _this.total = res.data.total
                    _this.summaries = res.data.summaries;    
                }).catch(error =>{
                    console.log(error);
                })
                this.isSummaryShow = true;
                this.isCostShow = false;
            }else{
                this.$Message.error('请选择用户！');
            }
        },
        on_change_cost(e){
            // console.log((e-1)*this.limit);
            // debugger
            this.offset = (e-1)*this.limit;
            // console.log(this.offset);
            if(this.flag == false){    
                this.costquery_q(this.cost_date_s);
            }else{
                this.costquery();
            }
        },
        on_page_size_change_cost(e){
            // console.log(e);
            this.limit = e;
            this.offset = 0;
            if(this.flag == false){    
                this.costquery_q(this.cost_date_s);
            }else{
                this.costquery();
            }
        },
        costquery(){
            if((this.date_search instanceof Object)&&(this.date_search.length == 2)){
                if(this.iscost == false){
                    this.iscost = true;
                    this.offset = 0;
                }
                if(this.flag == false){
                    this.flag = true;
                    this.offset = 0;
                }
                var _this = this;
                if(this.userid != ''){
                    // console.log(this.userid);
                    // console.log(this.date_search);
                    this.$axios.get("/costdata_query",{  //params参数必写 , 如果没有参数传{}也可以
                        params: {  
                           userid: _this.userid,
                           date: _this.date_search,
                           limit: _this.limit,
                           offset: _this.offset, 
                        }
                    }).then( res =>{
                        _this.total = res.data.total
                        // debugger
                        _this.costData = res.data.costdatas;    
                    }).catch(error =>{
                        console.log(error);
                    })
                }else{
                    this.$Message.error('请选择用户！');
                }            
                this.isSummaryShow = false;
                this.isCostShow = true;                
            }else{
                this.$Message.error('请选择查询时间范围！');
            }
            
        },
        costquery_q(date_s){
            if(this.iscost == false){
                this.iscost = true;
                this.offset = 0;
            }
            if(this.flag == true){
                this.flag = false;
                this.offset = 0;
            }
            if(this.cost_date_s != date_s){
                this.cost_date_s = date_s;
                this.offset = 0;
            }
            if(this.userid != ''){
                var _this = this;
                this.$axios.get("/costdata_query_s",{  //params参数必写 , 如果没有参数传{}也可以
                    params: {  
                       userid: _this.userid,
                       date: _this.cost_date_s,
                       limit: _this.limit,
                       offset: _this.offset, 
                    }
                }).then( res =>{
                    _this.total = res.data.total
                    _this.costData = res.data.costdatas;    
                }).catch(error =>{
                    console.log(error);
                })
                this.isSummaryShow = false;
                this.isCostShow = true;
            }else{
                this.$Message.error('请选择用户！');
            } 
        },
        show_evaluation_modal(paramrow){
            var _this = this;
            this.paramrow_clicked = paramrow;
            this.$axios.get("/get_evaluation_jics",{
                params: {  
                    workcnt: paramrow.workcontent,
                    userid: _this.userid,
                    summaryid: paramrow.id
                }
            }).then( res =>{
                _this.evaluation_jic = res.data.jic_arr; 
                _this.user_name = res.data.user_name;
                _this.role_name = res.data.role_name; 
                _this.showEvaluationModal = true;
            }).catch(error =>{
                console.log(error);
            });
            
        },
        go_evaluation_modal(paramrow){
            var _this = this;
            this.paramrow_clicked = paramrow;
            this.$axios.get("/get_evaluation_jics",{
                params: {  
                    workcnt: paramrow.workcontent,
                    userid: _this.userid,
                    summaryid: paramrow.id
                }
            }).then( res =>{

                let tmp_jic = res.data.jic_arr; 
                tmp_jic.forEach((item,index)=>{
                    item.item_stds_arr = [];
                    item.item_stds.split(';').forEach((title_pro,jj) =>{
                        let hi = {};
                        let tp = title_pro.split(',');
                        hi.title = tp[0];
                        hi.proportion = tp[1];
                        hi.score = 0 ;
                        item.item_stds_arr.push(hi);                        
                    });
                });
                _this.evaluation_jic = tmp_jic;
                _this.user_name = res.data.user_name;
                _this.role_name = res.data.role_name; 
                _this.goEvaluationModal = true;
            }).catch(error =>{
                console.log(error);
            });
            
        },
        show_cost_modal_data(id){
            // console.log(id);
            var _this = this;
            this.$axios.get("/cost_detail",{
                params: {  
                    id: id
                }
            }).then( res =>{
                // debugger
                // _this.address = res.data.summary.address;
                // _this.date = res.data.summary.date;
                // _this.explain = res.data.summary.explain;
                // _this.transport = res.data.summary.transport;
                // _this.workcontent = res.data.summary.workcontent;
                _this.costs = res.data.costdata;  
            }).catch(error =>{
                console.log(error);
            });
            this.showCostModal = true;
        },
        costModalOk(){
            this.showCostModal = false;
            // this.address = '';
            // this.date = '';
            // this.explain = '';
            // this.transport = '';
            // this.workcontent = '';
            this.costData = [];
        },
        showEvaluationModalOk(){
            this.showEvaluationModal = false;            
        },
        saveEvaluation(){
            var _this = this;            
            this.$axios.get("/save_evaluation",{
                params: {  
                    summaryscore: _this.evaluation_jic,
                    summaryid: _this.paramrow_clicked.id,
                }
            }).then( res =>{
                _this.paramrow_clicked.evaluated = true ;
                // this.summaries.splice(0,0);  //this code maybe not used????????
                _this.goEvaluationModal = false;
                _this.$Message.success('保存成功！');
            }).catch(error =>{
                console.log(error);
                _this.$Message.error('保存失败，请检查服务器！');
            });

        },
        cancel(){
            this.$Message.info('取消');
        },
        exportData(){
            var exData = JSON.parse(JSON.stringify(this.costData))
            exData.forEach((item,index)=>{
                item.index = index + 1;
            });
            this.$refs.table.exportCsv({
                filename: 'The original data',
                // noHeader: true,
                // columns: this.costColumns,
                // data: exData,
                columns: this.costColumns, //.filter( (col, index) =>  true ),
                data: exData //.filter(function(data, index) {  console.log(data);console.log(index); return index; })
            });
        }
        
    },
}
</script>

<style>
    
</style>