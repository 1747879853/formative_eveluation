<style lang="less">
@import "./advanced-router.less";
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        考勤记录
                    </p>
                    <p>
                    开始日期:<DatePicker type="date" placeholder="请选择日期" style="width: 200px"></DatePicker>
                    结束日期:<DatePicker type="date" placeholder="请选择日期" style="width: 200px"></DatePicker>
                     员工：<Select v-model="model1" style="width:200px" @on-change="change">
                     <Option v-for="item in employeeList" :value="item.value" :key="item.value" 
                      >{{ item.value }}</Option>
                     </Select>
                     <Button  @click="showTable()" type="ghost" shape="circle" icon="ios-search">查询</Button>
                    </p>
                    <Row type="flex" justify="center" align="top" class="advanced-router">
                        <Table :columns="employeeColumns" :data="employeeData" style="width: 100%;"></Table>
                         <div style="margin: 10px;overflow: hidden">
                         <div style="float: right;">
                         <Page :total="100" :current="1" @on-change="changePage"show-sizer show-total></Page>
                         </div>
                         </div>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  name: "employee",
  data() {
    return {
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
      employeeList : [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '张三',
                        label: '张三'
                    },
                    {
                        value: '李四', 
                        label: '李四'
                    },
                    {
                        value: '赵武',
                        label: '赵武'
                    },
                    {
                        value: '刘文',
                        label: '刘文'
                    }],
                    modal1:'',
                    value:'',//存放被选中的下拉框的值
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {},
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
           //this.employeeData=res.data;
        }).catch(error =>{
            console.log(error);
        });
        }else{
        this.$axios.get("/attendanceList").then( res =>{
          console.log(res.data);
           this.employeeData=res.data;
        }).catch(error =>{
            console.log(error);
        });
      }
      
    },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.employeeData = this.mockTableData1();
            },
  }
};
</script>

