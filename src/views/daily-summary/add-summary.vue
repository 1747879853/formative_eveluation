<template>
	<div>
        <Row>            
            <Card>
                <div style="text-align:center;font-size:24px;color: #2db7f5;">
                    今日工作总结
                    <span style="float:right;margin-right:100px;"> <Button type="primary" @click="save_and_use">保存并启用</Button></span>
                </div>
                <table style="margin:auto;">
                <tr>&nbsp;</tr>
		        <tr>
		        	<td>日期</td>
		        	<td>
     					<DatePicker format="yyyy-MM-dd" @on-change="time1" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
     				</td>&nbsp;
		        	<td>工作地点</td>
		        	<td>
		        		<Input v-model="address" placeholder="请输入工作地点" clearable style="width: 300px"></Input>
		        	</td>
		        </tr>
		        <tr>&nbsp;</tr>
		        <tr>
		        	<td>工作内容</td>
		        	<td>
		        		<Input v-model="workcontent" placeholder="请输入工作内容" clearable style="width: 300px"></Input>
		        	</td>&nbsp;
					<td>交通工具</td>
					<td>
						<Input v-model="transport" placeholder="请输入交通工具" clearable style="width: 300px"></Input>
					</td>
		        </tr>
		        <tr>&nbsp;</tr>
		        <tr>
		        	<td>工作说明</td>
		        	<td>
		        		<Input v-model="explain" placeholder="请输入工作说明" clearable style="width: 300px"></Input>
		        	</td>
		        </tr>
		        <tr>&nbsp;</tr>
		        </table>                    
            </Card>
            <Card>
                <Table :columns="costColumns" :data="costData" style="width: 100%;"></Table>
            </Card>
            <Card>
                <span style="float:center;margin-left:100px;font-size:20px;color: #2db7f5;"> 花费明细</span>
            	<div style="text-align: left;font-size:15px;">
                <div style="margin-left:100px;">
                    <Select v-model="option1" size="small" style="width:100px;" @on-change="selected1(option1)">
                    <Option  v-for="(item,index) in costdata" :key="item.id" :value="index">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="option2" size="small" style="width:100px;" @on-change="selected2(option2)">
                        <Option  v-for="(item,index) in costdata2" :key="item.id" :value="index">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="option3" size="small" style="width:100px;" @on-change="selected3(option3)">
                        <Option  v-for="(item,index) in costdata3" :key="item.id" :value="index">{{ item.name }}</Option>
                    </Select>
                </div>		
                <table style="float:center;margin-left:100px;font-size:14px;">
                <tr>
                    <td>具体事由</td>
                    <td>
                        <Input v-model="thing" placeholder="请输入具体事由" clearable style="width: 250px"></Input>
                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>金额</td>
                    <td>
                        <Input v-model="money" placeholder="请输入金额" clearable style="width: 250px"></Input>
                    </td>
                </tr>
                <tr>&nbsp;</tr>
                </table>            
                <span style="font-size:24px;float:right;margin-right:100px;"> <Button type="primary" @click="add">添加花费</Button></span>
            	</div>
            </Card>
        </Row>
    </div>
</template>

<script>
export default{
	name:"addSummary",
	data(){
		return{
			date:'',
			address:'',
			workcontent:'',
			transport:'',
			explain:'',
            costdata:[],
            option1:'',
            option2:'',
            option3:'',
            costdata2:[],
            costdata3:[],
            costData:[],
            thing:'',
            money:'',
            costid:'',
            name:'',
            costColumns:[
            {
                type: "index",
                title: "序号",
                width: 60
            },
            {
                title:'花费科目',
                key: "name",
                align: "center"
            },
            {
                title:'具体事由',
                key: "thing",
                align: "center"
            },
            {
                title:'费用',
                key: "money",
                align: "center"

            },
            {
                title: "操作",
                key: "action",
                align: "center",
                render: (h, params) => {
                    return h('div', [ 
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.deleteClick(params.index);
                                  }
                            }
                        }, '删除')
                    ]);
                }
            }
            ]    
		}

	},
	methods:{
        time1(e){
            this.date = e;
            // console.log(e);
        },
        //选择器被选中
        selected1() {
            this.costdata2 = this.costdata[this.option1].children;
            this.costid = this.costdata[this.option1].id;
            this.name = this.costdata[this.option1].name;
            // console.log(this.option1)
        },
        selected2() {
            this.costdata3 = this.costdata2[this.option2].children;
            this.costid = this.costdata[this.option2].id;
            this.name = this.costdata[this.option2].name;
            // console.log(this.option2);
        },
        selected3() {
            this.costid = this.costdata[this.option3].id;
            this.name = this.costdata[this.option3].name;
            // console.log(this.option3);
        },
		add(){
            //如果没选或者填，提出警告
            if((this.option1 === '')||(this.money === '')){
                this.$Message.error("首选项和金额不能为空！");
            }else{
                this.costData.push({
                    // cost的id
                    costid:this.costid,
                    name:this.name,
                    thing:this.thing,
                    money:this.money,
                })
            }
            console.log(this.costData);
            // 添加后清空
            this.costid='';
            this.name='';
            this.thing='';
            this.money='';
	    },
        deleteClick(index) 
        {
           this.$Modal.confirm({
                title: '删除',
                content: '<p>确定要删除此项花费吗？</p>',
                onOk: () => {
                    // console.log(this.costData.length);
                    // console.log(index);
                    this.costData.pop(index);
                    // console.log(this.costData.length);
                    // console.log(index);
                    this.$Message.info('删除成功');
            },
               onCancel: () => { this.$Message.info('取消'); }});
        },
        save_and_use(){
            // console.log(this.costData);
            // 这里children为空？
            if (this.date == '') {
                this.$Message.error("有内容为空！");
            }else{
                // debugger
                this.$axios.post('/workList', {
                params: {
                    date: this.date,
                    address: this.address,
                    workcontent: this.workcontent,
                    transport: this.transport,
                    explain: this.explain,
                    children: this.costData,
                }
                }).then(function(res) {
                    // console.log(res);
                    this.$Message.info('添加成功');
                }.bind(this))
                .catch(function(error) {
                    console.log(error)
                });
                let argu = { 
                        flag:1,
                        date: this.date,
                        address: this.address,
                        workcontent: this.workcontent,
                        transport: this.transport,
                        explain: this.explain,
                        costData: this.costData, };
                this.$router.push({
                    name: 'daily-work',
                    //保存成功后转到工作总结目录
                    params: argu
                });
            }
            

        },
    },
    //获取cost三级目录
    mounted(){
        this.$axios.get("/costList").then( res =>{
            this.costdata = res.data;
        }).catch(error =>{
            console.log(error);
        })
    },
}
</script>
<style></style>