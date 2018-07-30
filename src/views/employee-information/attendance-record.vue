<style lang="less">
@import "./advanced-router.less";
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        考勤记录
                    </p>
                    <p>
                    开始日期:<DatePicker type="date" placeholder="请选择日期" style="width: 200px" :value="value1" @on-change='change1'></DatePicker>
                    结束日期:<DatePicker type="date" placeholder="请选择日期" style="width: 200px" :value="value1" @on-change='change2'></DatePicker>

                     员工：<Select v-model="model1" style="width:200px" @on-change="change">
                     <Option v-for="item in employeeList" :value="item.employeename" :key="item.employeenum" 
                      >{{ item.employeename }}</Option>
                     </Select>
                     <Button  @click="showTable()" type="ghost" shape="circle" icon="ios-search">查询</Button>
                    </p>
                    <Row type="flex" justify="center" align="top" class="advanced-router" v-if='modal2'>
                        <Table :columns="employeeColumns" :data="employeeData" style="width: 100%;"></Table>
                         <Page :total="pageTotal" :page-size="pageSize" show-total @on-change="changePage">
                         </Page>
                    </Row>              
            </Col>
        </Row>
     </div>
</template>

<script>
export default {
  name: "employee",
  data() {
    return {
      InitData:[],//暂存数据，如果数据的总数超过每页的条数，用它来传递数据
      employeeColumns: [
        {
          title: "部门",
          key: "dept",
          align: "center",
          sortable: true

        },
        {
          title: "员工姓名",
          key: "employeename",
          align: "center",
          sortable: true
        },
        {
          title: "员工编号",
          key: "employeenum",
          align: "center",
          sortable: true
        },
        {
          title: "签到时间",
          key: "time",
          align: "center",
          sortable: true
         }
     ],
      employeeData:[],
      employeeList :[],
      modal1:'',
      modal2:false,
      value1:new Date(),//设置DatePicker显示的初始值
      value:'',//存放被选中的下拉框的值
      time1:'',//起始时间
      time2:'',//终止时间
      pageTotal: 0,
      pageSize: 10,
    };
  },
  mounted() {
    this.$axios.get("/attendanceList").then( res =>{
          console.log(res.data);
           this.employeeList=res.data;
           let arr={
            'id': 0,
            'dept': '',
            'employeename': '全部',
            'employeenum': '0', 
            'time': ''
           }
           this.employeeList.unshift(arr);
        }).catch(error =>{
            console.log(error);
        });
  },
  methods:{
    change(value){
      this.value = value; 
    },
   
    change1(value){
      this.time1 = value;
    },

    change2(value){
      this.time2 = value;
    },

    showTable(){
      this.modal2 = true;
        if(this.value!='全部'){
          this.$axios.get("/attendanceList",{
            params:{
              time1:this.time1,
              time2:this.time2,
              employeename:this.value,
            }
          }).then( res =>{
            console.log(res);
            this.InitData=res.data;
            this.pageTotal=res.data.length;
            if(res.data.length < this.pageSize){
              this.employeeData = this.InitData;
            }else{
              this.employeeData = this.InitData.slice(0,pageSize);
            }
        }).catch(error =>{
            console.log(error);
        });
        }else{
        this.$axios.get("/attendanceList", {
           params: {
            time1:this.time1,
            time2:this.time2,
          }
        }).then(function(res){
          console.log(res);
          // 保存取到的所有数据
            this.InitData=res.data;
            this.pageTotal=res.data.length;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if(res.data.length < this.pageSize){
                this.employeeData=this.InitData;
              }else{
                this.employeeData=this.InitData.slice(0,this.pageSize);
            }

        }).catch(error =>{
            console.log(error);
        });
      }
      // this.$axios.get('/attendanceList').then(res => {
      //   console.log(res.data[0].time);
      //   console.log(this.time1,this.time2);
      //   console.log(this.time1>res.data[0].time);
      // }).catch(error =>{
      //   console.log(error)
      // });
      
    },

    changePage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.employeeData = this.InitData.slice(_start,_end);
    },
}
}
</script>

