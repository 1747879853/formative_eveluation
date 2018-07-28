<style lang="less">
@import "./advanced-router.less";
</style>


<template>
  <div>

    <Modal width="70%"  style="margin-top:1px" v-model="progress_table_show" :title="progress_order_id">
            <Table :columns="progressColumns"  highlight-row @on-row-click="material_process" :data="progressData_list" style="width: 100%;"></Table>
          
           <div v-if="show_team_process">
             <p slot="title">
                <Icon type="ios-list"></Icon>
                生产情况
            </p>
              <Table :data="workteam_materials"  :columns="teamOrderColumns"></Table>
              
               <label  v-if="process_details.length==0 ? false : true"> <Icon type="ios-list"></Icon>生产明细</label>
               <Table :data="process_details"  v-if="process_details.length==0 ? false : true" :columns="processDetailsColumns"></Table>
          </div>
    </Modal>
    
    
 <Col span="24">
       <Card>
            <p slot="title">
                <Icon type="ios-list"></Icon>
                订单列表
            </p>
             <Row type="flex" justify="center" align="top" >
                   <Table :columns="orderColumns"   :data="orderData" style="width: 100%;"></Table>
                  
             </Row>
          </Card>
       </Col>
  
    </div>
</template>

<script>
export default {
  name: "mutative-router",
  data() {
    return {
      orderColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        
        {
          title: "订单号",
          key: "no",
          align: "center"
        },
        {
          title: "客户",
          key: "client_title",
          align: "center"
        },
        {
          title: "时间",
          key: "record_time"
        },
        {
          title: "详情",
          key: "show_more",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let argu = { order_id: params.row.id };
                      this.$router.push({
                        name: "order-info",
                        params: argu
                      });
                    }
                  }
                },
                "查看详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$axios.get("/order_process",{params:{
                        id:params.row.id
                      }}).then(res=>{
                        this.progressData_list = res.data.worklogs;

                       

                      });
                      this.progress_order_id ="订单："+params.row.no;
                      this.progress_table_show = true;
                      this.show_team_process = false;
                    }
                  }
                },
                "查看进度"
              )
            ]);
          }
        }
      ],
      processDetailsColumns:[
         {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "提交人员",
          align: "center",
          key: "user_name"
        },
        {
          title: "提交日期",
          align: "center",
          key: "record_time"
        },
         {
          title: "完成数量",
          align: "center",
          key: "finished_number"
        },
        {
          title: "合格数量",
          align: "center",
          key: "passed_number"
        }
      ],
       teamOrderColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        
        {
          title: "模板",
          align: "center",
          key: "name"
        },
        {
          title: "数量",
          align: "center",
          key: "number"
        },
        {
          title: "已完成数量",
          align: "center",
          width: 120,
          key: "finished_number"
        },
        {
          title: "合格数量",
          align: "center",
          width: 120,
          key: "passed_number"
        },
        {
          title: "备注",
          key: "comment"
        }],
      progressColumns: [
        {
          type: "index",
          title: "序号",
          width: 80
        },
        {
          title: "工单号",
          key: "work_order_id",
          align: "center",
           width: 150
        },
        {
          title: "时间",
          key:"record_time",
          align:"center",
           width: 200
        },
      
        {
          title: "生产过程",
          key: "description",
          align: "left",
          width: 600
        },
    
        ],
      orderData: [],
      progress_order_id: "",
      progress_table_show: false,
      progressData_list:[],
      workteam_materials:[],
      show_team_process:false
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios
      .get("/orders",{
        headers: {
          "Content-Type":'application/json'
        }})
      .then(res => {
        this.orderData = res.data.orders;
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    material_process(row){
      console.log(row.owner_type);
      console.log(row.owner_id);
      if (row.owner_type=="WorkTeamTask")
      this.$axios.get('/team_task_finish',{
        params:{
          id:row.owner_id
        }
      }).then(res =>{
         this.show_team_process = true;
         this.workteam_materials = res.data.data;
         this.process_details =  res.data.wttd;
          
      });
      else{
        this.show_team_process =false;
      }
    }
  }
};
</script>
