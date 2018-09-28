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
     					<DatePicker format="yyyy-MM-dd" @on-change="time1" type="date" placeholder="选择日期" style="width: 300px"></DatePicker>
     				</td>
                </tr>
                <tr>
		        	<td>工作地点</td>
		        	<td>
		        		<Input v-model="address" placeholder="请输入工作地点" clearable style="width: 300px"></Input>
		        	</td>
		        </tr>
		        <tr>&nbsp;</tr>
		          
                <tr>
                    <td>工作项和工作内容</td>
                    <td>
                        <span v-for="(item, indexi) in itemArr" :key="indexi" >
                            <Checkbox v-model="item.chk">{{item.item_title}}</Checkbox>
                            <span v-for="(cnt, indexj) in item.cntArr" :key="indexj" >
                                <Checkbox v-model="cnt.chk">{{cnt.cnt_title}}</Checkbox>
                                <Input v-model="cnt.num" size="small" style="margin-right:20px; width:40px;"></Input>
                            </span>
                            <br>
                        </span>
                        <span>填写说明：请先选择工作项后再选择相关工作内容并填写该工作的度量值（整数），否则无效</span>
                    </td>
                </tr>                      
                <tr>&nbsp;</tr>
                <tr>
					<td>交通工具</td>
					<td>
						<Input v-model="transport" placeholder="请输入交通工具" clearable style="width: 300px"></Input>
					</td>
		        </tr>
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
                    <span style="font-size:24px;float:right;margin-right:100px;"> <Button type="primary" @click="addCost">添加花费</Button>
                    </span>
                    <Select v-model="option1" clearable  size="small" style="width:100px;" @on-change="selected1(option1)" ref="element1">
                    <Option  v-for="(item,index) in costdata" :key="item.id" :value="index">{{ item.title }}</Option>
                    </Select>
                    <Select v-model="option2" clearable size="small" style="width:100px;" @on-change="selected2(option2)" ref="element2">
                        <Option  v-for="(item,index) in costdata2" :key="item.id" :value="index">{{ item.title }}</Option>
                    </Select>
                    <Select v-model="option3" clearable size="small" style="width:100px;" @on-change="selected3(option3)" ref="element3">
                        <Option  v-for="(item,index) in costdata3" :key="item.id" :value="index">{{ item.title }}</Option>
                    </Select>
                    </div>
                    <div style="margin-left:100px;margin-top:10px;">
                	事由：
                    <Input v-model="thing" placeholder="请输入具体事由" clearable style="width: 300px"></Input>
                    <!-- <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> -->
                    </div>
                    <div style="margin-left:100px;margin-top:10px;">
                    金额：
                    <input v-model="money" type="number" placeholder="请输入金额" style="width: 300px"/>	
                
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
            itemArr: [],
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
                key: "names",
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
            // debugger
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
                this.name3 = "";
            }
        },
        selected3() {
            if (this.costdata3[this.option3] != undefined) {
                this.costid3 = this.costdata3[this.option3].id;
                this.name3 = this.costdata3[this.option3].title;
            }

        },
		addCost(){
            //如果没选或者填，提出警告
            if(( this.option1 == undefined )||(this.money == "")){
                this.$Message.error("首选项和金额不能为空！");
            }else{
                let names = "";
                if(this.name1 != "")  names += this.name1;
                if(this.name2 != "")  names += '-'+this.name2 ;
                if(this.name3 != "")  names += '-'+this.name3 ;

                let costids = "";
                if(this.costid1 != 0) costids += this.costid1;
                if(this.costid2 != 0) costids += '-'+this.costid2;
                if(this.costid3 != 0) costids += '-'+this.costid3;
                
                this.costData.push({
                    // cost的id
                    costids: costids,
                    names:  names,
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
            var _this = this;
            if (this.date == '') {
                this.$Message.error("有内容为空！");
            }else{
                // debugger
                let workcnt = '';
                if (this.itemArr.length!=0){
                    this.itemArr.forEach((item,index)=>{ 
                        if(item.chk){
                            workcnt += item.item_id;
                            workcnt += ';'
                            item.cntArr.forEach((cnt,jj)=>{
                                if(cnt.chk){
                                    workcnt += cnt.cnt_title;
                                    workcnt += ':';
                                    workcnt += cnt.num;
                                    workcnt += ',';
                                }
                            });
                            
                            workcnt += '|';
                        }
                    });                        
                }


                this.$axios.post('/saveSummary', {
                params: {
                    date: this.date,
                    address: this.address,
                    workcontent: workcnt,
                    transport: this.transport,
                    explain: this.explain,
                    costdata: this.costData,
                }
                }).then(function(res) {
                    // console.log(res);
                    this.$Message.success('添加成功');
                }.bind(this))
                .catch(function(error) {
                    _this.$Message.error('服务器错误，添加失败！');
                    console.log(error);
                });

                let argu = { 
                        flag:1,
                        date: this.date,
                        address: this.address,
                        workcontent: workcnt,
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
        checkItemChange(){


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

            let tt = res.data.jics;
            let tmpItemArr = [];
            if (tt.length!=0){
                tt.forEach((item,index)=>{ 
                    let hh = {};
                    hh.item_id = item.id;
                    hh.item_title = item.item_title ;
                    hh.chk = false;
                    hh.cntArr = [];              
                    item.item_cnts.split(';').forEach((cnt,jj) =>{
                        let hi = {};
                        hi.cnt_title = cnt;
                        hi.chk = false;
                        hi.num = null;
                        hh.cntArr.push(hi);
                    });
                    tmpItemArr.push(hh);
                });
            }
            _this.itemArr = tmpItemArr;

        }).catch(error =>{
            _this.$Message.info('服务器错误，无法获取当前用户的工作项！');
            console.log(error);
        });
        
    },
}


</script>

