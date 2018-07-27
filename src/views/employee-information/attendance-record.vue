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
                    开始日期:<DatePicker type="date" placeholder="请选择日期" style="width: 200px"></DatePicker>
                    结束日期:<DatePicker type="date" placeholder="请选择日期" style="width: 200px"></DatePicker>
                     员工：<Select v-model="model1" style="width:200px" @on-change="change">
                     <Option v-for="item in employeeList" :value="item.employeename" :key="item.employeenum" 
                      >{{ item.employeename }}</Option>
                     </Select>
                     <Button  @click="showTable()" type="ghost" shape="circle" icon="ios-search">查询</Button>
                    </p>
                    <Row type="flex" justify="center" align="top" class="advanced-router">
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
      value:'',//存放被选中的下拉框的值
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
           this.employeeList.push(arr);
        }).catch(error =>{
            console.log(error);
        });
  },
  methods:{
    change(value){
      this.value=value; 
    },
   
    showTable(){
        if(this.value!='全部'){
          this.$axios.get("/attendanceList",{
            params:{
              employeename:this.value,
            }
          }).then( res =>{
            console.log(res);
            this.pageTotal=res.data.length/pageSize;
            this.employeeData=res.data;
        }).catch(error =>{
            console.log(error);
        });
        }else{
        this.$axios.get("/attendanceList").then( res =>{
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
        }).catch(error =>{
            console.log(error);
        });
      }
      
    },

    changePage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.employeeData = this.InitData.slice(_start,_end);
    },
}
}
</script>

