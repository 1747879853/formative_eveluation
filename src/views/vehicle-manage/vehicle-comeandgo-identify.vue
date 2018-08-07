<template>
	<div>
    	<Row>
            <table>
            <tr>
            <td>开始日期</td>
            <td><DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change='change1' :value='value1'></DatePicker></td>
            <td>结束日期</td>
            <td><DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change='change2' :value='value1'></DatePicker></td>
            <td>车牌号：</td>
            <td><Input v-model="modal2" style="width: 300px;" placeholder="请输入或选择车牌号">
                <Select v-model="modal2" slot="append" style="width: 110px">
                    <Option v-for="(item,index) in vidList1" :value="item" :key="index" >{{ item }}</Option>
                </Select>
            </Input></td>
            <td><Button @click="showTable" shape="circle" icon="ios-search">查询</Button></td>
            </tr>
            </table>
    	</Row>
    	<Row v-if="modal1">
    		<Table border :columns="columns" :data="data">
    		</Table>
    		<Row>
    			<Col offset="8">
    				<Page :total="pageTotal" :page-size="pageSize" @on-change="changePage"></Page>
    			</Col>
    		</Row>
    	</Row>
        <Modal v-model='modal3'>
            <img :src="src1">
        </Modal>
        <Modal v-model='modal4'>
            <p>图片已丢失</p>
        </Modal>
	</div>
</template>
<script>
//节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
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
                        title: '车辆进入时间',
                        key: 'in_time',
                        sortable: true
                    },
                    {
                        title: '车辆离开时间',
                        key: 'out_time',
                        sortable: true
                    },
                    {
                        title: '车辆进入时拍照',
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
                        title: '车辆离开时拍照',
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
            this.modal1=true;
            let cardata=[];
            this.$axios.get('/vehicleList'
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
        watch: {
            //watch modal2 change
            modal2() {
                delay(() => {
                    this.fetchvidList1();
                }, 300);
            },
        },
        methods:{
        	showTable(){
        		this.modal1=true;
                let cardata=[];
                this.$axios.post('/vehicleList',{
                    params:{
                        up_time:this.time1,
                        down_time:this.time2,
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
                    this.src1="/_attachment/"+this.InitData[index].i_picno;
                    this.modal3 = true; 
                }                
            },
            showout(index) {
                if(this.InitData[index].o_picno==-1){
                    this.modal4 = true;
                }else{
                this.src1="/_attachment/"+this.InitData[index].o_picno;
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
            fetchvidList1(){
                if(this.modal2===''){
                    this.vidList1=this.vidList;
                }else{
                    let arr=[];
                    let i;
                    for(i=0;i<this.vidList.length;i++){
                        arr[i]=this.vidList[i];
                    }
                    for(i=0;i<arr.length;i++){
                        if(arr[i]!=null){
                            if(arr[i].indexOf(this.modal2.toUpperCase( ))<0){
                                arr.splice(i,1);
                                i--;
                            }
                        }                        
                    } 
                    this.vidList1=arr;  
                }
                
            },
    }
}
</script>

<style>

</style>