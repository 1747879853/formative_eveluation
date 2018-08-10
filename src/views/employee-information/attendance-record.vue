<style lang="less">
@import "./advanced-router.less";
</style>

<template>
    <div>
        <Row>
            <table>
            <tr>
            <td>开始日期</td>
            <td><DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change='change1' :value='value1'></DatePicker></td>
            <td>结束日期</td>
            <td><DatePicker type="date" placeholder="请选择日期" style="width: 200px" @on-change='change2' :value='value1'></DatePicker></td>
            <td>员工：</td>
            <td>
            <Select v-model="modal1" filterable clearable placeholder="请选择员工">
                <Option v-for="(item,index) in employeeList1" :value="item" :key="index">{{ item }}</Option>
            </Select>
            </td>
            <td><Button @click="showTable" type="ghost" shape="circle" icon="ios-search">查询</Button></td>
            </tr>
            </table>
        </Row>
        <Row  v-if='modal2'>
            <Table border :columns="employeeColumns" :data="employeeData"></Table>
            <Row>
              <Col offset="8">
                <Page :total="pageTotal" :page-size="pageSize" @on-change="changePage"></Page>
              </Col>
            </Row>             
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
          key: "depart_name",
          align: "center",
          sortable: true

        },
        {
          title: "员工姓名",
          key: "name",
          align: "center",
          sortable: true
        },
        {
          title: "员工编号",
          key: "workno",
          align: "center",
          sortable: true
        },
        {
          title: "签到时间",
          key: "sign_time",
          align: "center",
          sortable: true
         }
     ],
      employeeData:[],
      employeeList:[],
      employeeList1:[],
      modal1:'',
      modal2:false,
      value1:new Date(),//设置DatePicker显示的初始值
      value:'',//存放被选中的下拉框的值
      time1:new Date(),//起始时间
      time2:new Date(),//终止时间
      pageTotal: 0,
      pageSize: 20,
    };
  },
  mounted() {

  },
  methods:{
      change1(value){
        this.time1 = value;
      },

      change2(value){
        this.time2 = value;
      },

      showTable(){
            this.modal2 = true;
            let empdata=[];
            this.$axios.post("/attendanceList",{
              params:{
                s_time:this.time1,
                e_time:this.time2,
                empname:this.modal1,
              }
            }).then( res =>{
              console.log(res);
              this.InitData=res.data;
              this.pageTotal=res.data.length;
              if(res.data.length < this.pageSize){
                empdata = this.InitData;
              }else{
                empdata = this.InitData.slice(0,this.pageSize);
              }
              this.employeeData=empdata;
              this.employeeList=this.CreateemployeeList(res.data);
              this.employeeList1=this.employeeList;
          }).catch(error =>{
              console.log(error);
          });
      },

      changePage(index){
          var _start = ( index - 1 ) * this.pageSize;
          var _end = index * this.pageSize;
          this.employeeData = this.InitData.slice(_start,_end);
      },
      CreateemployeeList(data){
          let arr = data;
          let arr2 = [];
          let result = [];
          for(let i=0;i<arr.length;i++){
              arr2[i]=arr[i].name;
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

