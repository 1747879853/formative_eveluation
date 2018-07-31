<template>
	<div>
    	<Row>
            <label>开始日期</label>
            <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change='change1' :value='value1'></DatePicker>
            <label>结束日期</label>
            <DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change='change2' :value='value1'></DatePicker>
            车牌号：<Select v-model="model2" style="width:200px" @on-change='change' >
                         <Option v-for="item in vidList" :value="item.vid" :key="item.id" >{{ item.vid }}</Option>
                    </Select>
        <Button @click="showTable" shape="circle" icon="ios-search">查询</Button>
    	</Row>
    	<Row v-if="modal1">
    		<Table border :columns="columns" :data="data">
    			<label slot='header'>显示</label>
    			<Select  slot='header' v-model="model" style="width:200px">
        			<Option v-for="item in Arr" :value="item.value" :key="item.value">{{ item.label }}</Option>
    			</Select>
    			<label slot='header'>项结果</label>
    		</Table>
    		<Row>
    			<Col offset="8">
    				<Page :total="pageTotal" :page-size="pageSize" show-sizer @on-change='changePage'></Page>
    			</Col>
    		</Row>
    	</Row>
        <Modal v-model='modal3'>
            <img :src="src1">
        </Modal>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '编号',
                        key: 'id',
                        sortable: true
                    },
                    {
                        title: '车牌号',
                        key: 'vid',//vehicleid
                        sortable: true
                    },
                    {
                        title: '出/入',
                        key: 'cag',//come and go
                        sortable: true
                    },
                    {
                        title: '出/入时间',
                        key: 'cagt',//come and go time
                        sortable: true
                    },
                    {
                        title: '车辆类型',
                        key: 'type',
                        sortable: true
                    },
                    {
                        title: '详情图片',
                        key: 'pic',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, params.row.pic)
                            ]);
                        }
                    },
                ],
                data: [],
                InitData:[],
                vidList:[],//下拉框里的车牌号列表
                modal3:false,//显示对话框，放大图片
                modal2:'',
                modal1:false,//表格是否显示
                modal:'',
                value:'',
                value1:new Date(),
                vid_value:'',
                Arr:[{
                        value: '10',
                        label: '10'
                    },
                    {
                        value: '25',
                        label: '25'
                    },
                    {
                        value: '50',
                        label: '50'
                    },
                    {
                        value: '100',
                        label: '100'
                    },
                    ],
                pageTotal:0,
                pageSize:10,
                time1:'',
                time2:'',
                src1:'',//通过后台拿到的图片的src
                id1:'',//item的id
            }
        },

        mounted(){
            this.$axios.get('/vehicleList').then(res =>{
                console.log(res.data);
                this.vidList = res.data;
                let arr={
                    id:'0',
                    vid:'全部',
                    cag:'',
                    cagt:'',
                    type:'',
                    pic:'',
                };
                this.vidList.unshift(arr);
            }).catch(error =>{
                console.log(error)
            });
        },

        methods:{
        	showTable(){
        		this.modal1=true;
                if(this.vid_value =='全部'){
                  this.$axios.get('/vehicleList'//,{
                //     params:{
                //         time1:this.time1,
                //         time2:this.time2,
                //     }
                // }
                ).then(res =>{
                    console.log(res.data);
                    // 保存取到的所有数据
                    this.InitData=res.data;
                    this.pageTotal=res.data.length;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(res.data.length < this.pageSize){
                        this.employeeData=this.InitData;
                      }else{
                        this.employeeData=this.InitData.slice(0,this.pageSize);
                    }
                        this.data=res.data;
                }).catch(error =>{
                    console.log(error)
                });  
            }else{
                this.$axios.get('/vehicleList',{
                    params:{
                        time1:this.time1,
                        time2:this.time2,
                        vid:this.vid_value,
                    }
                }
                ).then(res =>{
                    console.log(res.data);
                    // 保存取到的所有数据
                    this.InitData=res.data;
                    this.pageTotal=res.data.length;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(res.data.length < this.pageSize){
                        this.employeeData=this.InitData;
                      }else{
                        this.employeeData=this.InitData.slice(0,this.pageSize);
                    }
                        this.data=res.data;
                }).catch(error =>{
                    console.log(error)
                });
            }
        		
        	},
            change(value){
                this.vid_value = value;
            },

            change1(value){
                this.time1=value;
            },

            change2(value){
                this.time2=value;
            },

            changePage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.data = this.InitData.slice(_start,_end);
            },

            show (index) {
                this.id1 = this.data[index].id;
                this.$axios.get('/vehicleList'//,{
                    // params:{
                    //     id:this.id1
                    // }
                //}
                ).then(res =>{
                    console.log(res.data[index].src);
                    this.src1=res.data[index].src;
                }).catch(error =>{
                    console.log(error);
                })
                this.modal3 = true; 
            },
    }
}
</script>

<style>

</style>