<template>
	<div>
    	<Row>
            <table>
            <tr>
            <td>开始时间</td>
            <td><DatePicker type="datetime" placeholder="请选择时间" style="width: 200px" @on-change='change1' :value='value1'></DatePicker></td>
            <td>结束时间</td>
            <td><DatePicker type="datetime" placeholder="请选择时间" style="width: 200px" @on-change='change2' :value='value1'></DatePicker></td>
            <td>车牌号：</td>
            <td>
            <Select v-model="modal2" filterable clearable placeholder="请选择车牌号">
                <Option v-for="(item,index) in vidList1" :value="item" :key="index">{{ item }}</Option>
            </Select>
            </td>
            <td><Button @click="showTable" type="ghost" shape="circle" icon="ios-search">查询</Button></td>
            </tr>
            </table>
    	</Row>
    	<Row v-if="modal1">
    		<Table border :columns="columns" :data="data"></Table>
    		<Row>
    			<Col offset="8">
    				<Page :total="pageTotal" :page-size="pageSize" @on-change="changePage"></Page>
    			</Col>
    		</Row>
    	</Row>
        <Modal v-model='modal3' width="1020">
            <img :src="src1">
        </Modal>
        <Modal v-model='modal4'>
            <p>图片已丢失</p>
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
                        title: '姓名',
                        key: 'cname',
                    },
                    {
                        title: '车牌号',
                        key: 'carno',
                    },
                    {
                        title: '进入时间',
                        key: 'in_time',
                        sortable: true
                    },
                    {
                        title: '离开时间',
                        key: 'out_time',
                        sortable: true
                    },
                    {
                        title: '进入照片',
                        key: 'i_picno',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.showin(params.index)
                                        }
                                    }
                                }, params.row.pic)
                            ]);
                        }
                    },
                    {
                        title: '离开照片',
                        key: 'o_picno',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.showout(params.index)
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
                vidList1:[],
                modal4:false,
                modal3:false,//显示对话框，放大图片
                modal2:'',
                modal1:false,//表格是否显示
                value:'',
                value1:new Date(),
                pageTotal:0,
                pageSize:20,
                time1:new Date(),
                time2:new Date(),
                src1:'',//通过后台拿到的图片的src
                id1:'',//item的id
            }
        },
        mounted(){

        },
        methods:{
        	showTable(){
        		this.modal1=true;
                let cardata=[];
                this.$axios.post('/vehicleList',{
                    params:{
                        s_time:this.time1,
                        e_time:this.time2,
                        carno:this.modal2,
                    }
                }
                ).then(res =>{
                    console.log(res.data);
                    // 保存取到的所有数据
                    this.InitData=res.data;
                    this.pageTotal=res.data.length;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(res.data.length < this.pageSize){
                        cardata=this.InitData;
                      }else{
                        cardata=this.InitData.slice(0,this.pageSize);
                    }
                    this.data=cardata;
                    this.vidList=this.CreatevidList(res.data);
                    this.vidList1=this.vidList;
                }).catch(error =>{
                    console.log(error)
                });        		
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

            showin(index) {
                if(this.InitData[index].i_picno==-1){
                    this.modal4 = true;
                }else{
                    this.src1="http://114.118.17.4:8080/_attachment/"+this.InitData[index].i_picno;
                    this.modal3 = true; 
                }                
            },
            showout(index) {
                if(this.InitData[index].o_picno==-1){
                    this.modal4 = true;
                }else{
                this.src1="http://114.118.17.4:8080/_attachment/"+this.InitData[index].o_picno;
                this.modal3 = true;
                } 
            },
            CreatevidList(data){
                let arr = data;
                let arr2 = [];
                let result = [];
                for(let i=0;i<arr.length;i++){
                    arr2[i]=arr[i].carno;
                }                             
                for(let k = 0; k < arr2.length; k++){
                    for(let j = k + 1; j < arr2.length; j++){
                        if(arr2[k] === arr2[j]){
                            j = ++k;
                        }
                    }
                    result.push(arr2[k]);
                }
                return result;
            },
    }
}
</script>

<style>

</style>