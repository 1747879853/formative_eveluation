<!-- <style lang="less">
@import "./advanced-router.less";
</style> -->


<!-- <template>
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
                     <Select v-model="model1" style="width:200px">
                     <Option v-for="item in employeeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                     <Button  @click="showTable()" type="ghost" shape="circle" icon="ios-search">查询</Button>
                    </p>
                </Card>
         </Col>
      </Row>
         <Row type="flex" justify="center" align="top" class="advanced-router">
         <Table height="" :columns="employeeColumns" :data="employeeData" style="width: 100%;"stripe></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"show-sizer show-total></Page>
                </div>
            </div>
        </Row>
    </div>
</template> -->

//<script>
//     export default {
//         name:'attendance-record',
//         data () {
//             return {
//                  employeeList: [], 
//                 model1: '',
//                 id:0,
//                 dept:'',
//                 employeename:'',
//                 employeenum:'',
//                 time:'',
//                  employeeColumns: [
//                     {
//                         title: '部门',
//                         key: 'dept',
//                         align: "center",
//                         sortable: true
//                     },
//                     {
//                         title: '员工姓名',
//                         key: 'employeename',
//                         align: "center",
//                         sortable: true
//                     },
//                     {
//                         title: '员工编号',
//                         key: 'employeenum',
//                         align: "center",
//                         sortable: true
//                     },
//                     {
//                         title: '签到时间',
//                         key: 'time',
//                         align: "center",
//                         sortable: true
//                     }
//                 ],
//                 employeeData: []
//             };
//          },
//          computed: {
//             avatorImage() {
//             return localStorage.avatorImgPath;
//             }
//          },       
//          mounted() {
//          this.$axios
//          .get("/attendanceList")
//          .then(res => {
//          this.employeeData = res.data;
//          })
//          .catch(error => {
//         console.log(error);
//       });
//          this.$axios
//          .get("/value-List")
//          .then(res => {
//          this.employeeList = res.data;
//          })
//          .catch(error => {
//         console.log(error);
//       });
//   },
//         methods: {
//             showTable(){},
//            formatDate (date) {
//                 const y = date.getFullYear();
//                 let m = date.getMonth() + 1;
//                 m = m < 10 ? '0' + m : m;
//                 let d = date.getDate();
//                 d = d < 10 ? ('0' + d) : d;
//                 return y + '-' + m + '-' + d;
//             },
//             changePage () {
//                 this.employeeData = this.employeeData;
//             }

//         }
        
// };
// </script>


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
                     员工：<Select v-model="model1" style="width:200px">
                     <Option v-for="item in employeeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
      id: 0,
      dept:'',
      employeename:'',
      employeenum:'',
      time:'',
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
      employeeData:this.mockTableData1(),
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
                        value: '张三2',
                        label: '张三2'
                    },
                    {
                        value: '张三3',
                        label: '张三3'
                    },
                    {
                        value: '张三4',
                        label: '张三4'
                    },
                    {
                        value: '张三5',
                        label: '张三5'
                    }],
                    modal1:''
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios
      .get("/attendenceList")
      .then(res => {
        this.employeeData = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        dept: '部门' + Math.floor(Math.random () * 100 + 1),
                        employeename:'张三'+ Math.floor(Math.random () * 3 + 1),
                        employeenum: Math.floor(Math.random () * 3 + 1),
                        time: new Date()
                    })
                }
                return data;
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
            }
  }
};
</script>

