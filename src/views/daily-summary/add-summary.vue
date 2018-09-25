<template>
	<div>
        <Row>            
            <Card>
                <div style="text-align:center;font-size:24px;color: #2db7f5;">
                    今日工作总结
                    <span style="float:right;margin-right:100px;"> <Button type="primary" @click="save_and_use">保存</Button></span>
                </div>
                <table style="margin:auto;">
                <tr>&nbsp;</tr>
		        <tr>
		        	<td>日期</td>
		        	<td>
     					<DatePicker format="yyyy-MM-dd" @on-change="time1" type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
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
		        	</td>



                </tr>
                <tr>&nbsp;</tr>
                <tr>
					<td>交通工具</td>
					<td>
						<Input v-model="transport" placeholder="请输入交通工具" clearable style="width: 300px"></Input>
					</td>
		        
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
                    <span style="font-size:24px;float:right;margin-right:100px;"> <Button type="primary" @click="add">添加花费</Button></span>
                    <Select v-model="option1" clearable  size="small" style="width:100px;" @on-change="selected1(option1)" ref="element1">
                    <Option  v-for="(item,index) in costdata" :key="item.id" :value="index">{{ item.title }}</Option>
                    </Select>
                    <Select v-model="option2" clearable size="small" style="width:100px;" @on-change="selected2(option2)" ref="element2">
                        <Option  v-for="(item,index) in costdata2" :key="item.id" :value="index">{{ item.title }}</Option>
                    </Select>
                    <Select v-model="option3" clearable size="small" style="width:100px;" @on-change="selected3(option3)" ref="element3">
                        <Option  v-for="(item,index) in costdata3" :key="item.id" :value="index">{{ item.title }}</Option>
                    </Select>
                    &nbsp;&nbsp;&nbsp;
                	具体事由：
                    <Input v-model="thing" placeholder="请输入具体事由" clearable style="width: 250px"></Input>
                    <!-- <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> -->
                    &nbsp;&nbsp;&nbsp;
                    金额：
                    <Input v-model="money" placeholder="请输入金额" clearable style="width: 250px"></Input>	
                
                </div>           
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
            jics: [],
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
            costid1: 0,
            costid2: 0,
            costid3: 0,
            // name:'',
            name1: '',
            name2: '',
            name3: '',
            isselect:true,
            costColumns:[
            {
                type: "index",
                title: "序号",
                width: 60
            },
            {
                title:'花费明细',
                key: "name",
                align: "center"
            },
            {
                title:'具体事由',
                key: "thing",
                align: "center"
            },
            {
                title:'金额',
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
            // console.log(this.costdata[this.option1]);
            if(this.option1 == undefined){
                this.$refs.element2.clearSingleSelect();
                this.$refs.element3.clearSingleSelect();
                this.costdata2 = [];
                this.costdata3 = [];
                this.costid1 = 0;
                this.name1 = "";
                this.name2 = "";
                this.name3 = "";
            }
            else if (this.costdata[this.option1] != undefined) {

                this.$refs.element2.clearSingleSelect();
                this.$refs.element3.clearSingleSelect();
                this.costdata2 = this.costdata[this.option1].children;
                this.costdata3 = [];
                this.costid1 = this.costdata[this.option1].id;
                this.name1 = this.costdata[this.option1].title;
                // console.log(this.option1)
            }
        },
        selected2(){
            if(this.option2 == undefined){
                this.$refs.element3.clearSingleSelect();
                this.costdata3 = [];
                this.costid2 = 0;
                this.name2 = "";
                this.name3 = "";
            }
            else if (this.costdata2[this.option2] != undefined) {

                this.$refs.element3.clearSingleSelect();
                this.costdata3 = this.costdata2[this.option2].children;
                this.costid2 = this.costdata2[this.option2].id;
                this.name2 = this.costdata2[this.option2].title;
                // console.log(this.option2);
                // console.log(this.name);
            }
        },
        selected3() {
            if (this.costdata3[this.option3] != undefined) {
                this.costid3 = this.costdata3[this.option3].id;
                this.name3 = this.costdata3[this.option3].title;
                // console.log(this.name);
            }

        },
		add(){
            //如果没选或者填，提出警告
            if(( this.option1 == undefined )||(this.money == "")){
                this.$Message.error("首选项和金额不能为空！");
            }else{
                let names = this.name1;
                if(this.name2 != "")  names += '-'+this.name2 ;
                if(this.name3 != "")  names += '-'+this.name3 ;

                let last_costid = 0;
                if(this.costid1 != 0) last_costid = this.costid1;
                if(this.costid2 != 0) last_costid = this.costid2;
                if(this.costid3 != 0) last_costid = this.costid3;
                
                this.costData.push({
                    // cost的id
                    costid: last_costid,
                    name:  names,
                    thing: this.thing,
                    money: this.money,
                })
            }
            // this.isselect=false;
            // this.$refs.element1.clearSingleSelect();
            // if(this.costdata2.length > 0){
            //     this.$refs.element3.clearSingleSelect();
            // }
            // if (this.costdata2) {
            //     this.$refs.element3.clearSingleSelect();
            // }
            
            
            // 如果需要添加后清空,可以使用下面的代码
            // this.option1='';
            // this.option2='';
            // this.option3='';
            // this.name='';
            // this.thing='';
            // this.money='';
	    },
        deleteClick(index) 
        {
           this.$Modal.confirm({
                title: '删除',
                content: '<p>确定要删除此项花费吗？</p>',
                onOk: () => {
                    // console.log(this.costData.length);
                    // console.log(index);
                    this.costData.splice(index,1);
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
                    costdata: this.costData,
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
        var _this = this;
        this.$axios.get("/costList").then( res =>{
            _this.costdata = res.data.costs;
            // debugger
            // console.log(res.data);
        }).catch(error =>{
            _this.$Message.info('服务器错误，无法获取花费选项！');
            console.log(error);
        });

        this.$axios.get("/get_current_user_jic").then( res =>{
            _this.jics = res.data.jics;
            // debugger
            // console.log(res.data);
        }).catch(error =>{
            _this.$Message.info('服务器错误，无法获取当前用户的工作项！');
            console.log(error);
        });
        
    },
}
</script>
<style></style>