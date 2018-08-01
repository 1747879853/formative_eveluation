<template>
	<div>
		<Row>
			<h1>车辆出入详细数据</h1>
		</Row>
    	<Row>
        <Col span="6">
            <label>开始时间</label>
            <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
        <Col span="6">
            <label>结束时间</label>
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
        <Col>
        <Button @click="showTable">查询</Button>
    	</Col>
    	</Row>
    	<Row v-if="modal1">
    		<Table border :columns="columns" :data="data">
    			<label slot='header'>显示</label>
    			<Select  slot='header' v-model="model" style="width:200px">
        			<Option v-for="item in Arr" :value="item.value" :key="item.value">{{ item.label }}</Option>
    			</Select>
    			<label slot='header'>项结果</label>
    			<label id='la' slot='header'>
    				<label>搜索</label>
    				<Input  slot='header' v-model="value" placeholder="Enter something..." clearable style="width: 200px"></Input>
    			</label>
    		</Table>
    		<Row>
    			<Col offset="8">
    				<Page :total="100" show-sizer></Page>
    			</Col>
    		</Row>
    	</Row>
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
                    },
                ],
                data: [],
                modal1:false,//表格是否显示
                modal:'',
                value:'',
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
                    ]
            }
        },
        methods:{
        	showTable(){
        		this.modal1=true;
        	}
        }
    }
</script>

<style>
#la{
	float:right;
}
</style>