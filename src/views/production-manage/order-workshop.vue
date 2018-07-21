<style lang="less">
@import "./advanced-router.less";
</style>

<template>

 <Tabs type="card">
        <TabPane label="工单列表">

         
        <Modal width="700" v-model="dispatchWorkOrder" title="分派到班组" @on-ok="give_workteam">
           
            <Select v-model="model1" placeholder="班组" style="width:200px" clearable>
                <Option v-for="item in workteams" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            数量：<InputNumber :max="max_qty" :min=1 v-model="team_qty"></InputNumber>
        </Modal>    
        <Row>
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        {{workshop_name}}-工单
                    </p>          
                        <Table highlight-row ref="currentRowTable" :columns="orderColumns" :data="workshop_workorder_workorders" style="width: 100%;"></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                    <!-- <Page :total="100" :current="1" @on-change="changePage"></Page> -->
                        </div>
                    </div>                   
                     <br/>
                   </Card>       
            </Col>
        </Row>
        </TabPane>


        <TabPane label="物料请领审批">
            <Modal v-model="show_approval_detail" width="70%" title="领料明细">
                  <Table :columns="approval_details_columns"   :data="approval_details"></Table>
                  <br>
            审核:<Select v-model="model1" style="width:200px" clearable>
                <Option v-for="(item,index) in approval_arr" :value="index" :key="item">{{ item }}</Option>
           </Select>             意见:<Input v-model="value" placeholder="审批意见..." style="width: 300px"></Input>
           </Modal>

           <Card>
                    <p>
                       <Icon type="ios-list"></Icon>   物料申请单   (点击记录查看详情)
                    </p>
                  <Table :columns="boms_approval_columns"  highlight-row @on-row-click="approval_select" :data="boms_approval_list"></Table>
                  </Card>
        </TabPane>
        
    </Tabs>
  
    
</template>

<script>
import Cookies from "js-cookie";
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
          title: "工单号",
          key: "work_order_id",
          align: "center"
        },

        {
          title: "模板",
          key: "template_type"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "操作",
          key: "action",
          width: 240,
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
                      // console.log(params.row);
                      this.team_qty = params.row.number;
                      this.max_qty = params.row.number;
                      this.$axios
                        .get("/teams", {
                          params: {
                            work_shop_id: this.work_shop_id
                          }
                        })
                        .then(res => {
                          this.workteams = res.data.teams;
                        })
                        .catch(error => {
                          console.log(error);
                        });
                      this.dispatchWorkOrder = true;
                      this.work_order_id = params.row.work_order_id;
                    }
                  }
                },
                "分派到班组"
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
                      // console.log(params.row);
                      let argu = {
                        work_shop_order_id: params.row.work_order_id
                      };
                      this.$router.push({
                        name: "work-shop-order-info",
                        params: argu
                      });
                    }
                  }
                },
                "工单详情"
              )
            ]);
          }
        }
      ],
      value:"",

      boms_approval_columns: [
        {
          type: "index",
          title: "序号",
          width: 30
        },
        {
          title: "单号",
          key: "id",
          align: "center"
        },
        {
          title: "模板",
          key: "apply_comment",
          align: "center"
        },
        {
          title: "申请日期",
          key: "record_time",
          align: "center"
        },
        {
          title: "申请人",
          key: "apply_name",
          align: "center"
        },
        {
          title: "审批人",
          key: "approval_owner",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center"
        }
      ],
      approval_arr: ["审核中", "同意", "否决"],
      boms_approval_list: [],
      workshop_workorders: [],
      workteams: [],
      dispatchWorkOrder: false,
      model1: "",
      team_qty: 0,
      max_qty: 10,
      workshop_order_detail: [],
      show_work_shop_detail: false,
      materials_col: [
        {
          title: "图号",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            console.log(params);
            return h(
              "div",
              {
                slot: "content"
              },
              [
                h(
                  "ul",
                  params.row.graph_no.map(item => {
                    return h(
                      "li",
                      {
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          color: "blue"
                        },
                        on: {
                          click: () => {
                            this.pic_show(item);
                          }
                        }
                      },
                      item
                    );
                  })
                )
              ]
            );
          }
        },
        {
          title: "模板名称",
          key: "name",
          align: "center"
        },
        {
          title: "数量",
          key: "number",
          align: "center"
        },
        {
          title: "备注",
          key: "comment",
          align: "center"
        }
      ],
      materials_data: [],
      materials_data_hash: {},
      boms_col: [
        {
          type: "index",
          title: "序号",
          width: 30
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "材料规格",
          key: "spec",
          align: "center"
        },
        {
          title: "长度(mm)",
          key: "length",
          align: "center"
        },
        {
          title: "宽度(mm)",
          key: "width",
          align: "center"
        },
        {
          title: "数量(件)",
          key: "number",
          align: "center"
        },
        {
          title: "总数量/套",
          key: "total",
          align: "center"
        },
        {
          title: "备注",
          key: "comment",
          align: "center"
        }
      ],
      boms_data_hash: {},
      work_order_id: "",
      graph_no: "",
      showPic: false,
      workshop_workorder_workorders: [],
      workshop_name: "",
      work_shop_id: "",
      user_id: "",
      approval_details_columns: [
        {
          type: "index",
          title: "序号",
          width: 30
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "材料规格",
          key: "spec",
          align: "center"
        },
        {
          title: "长度(mm)",
          key: "length",
          align: "center"
        },
        {
          title: "宽度(mm)",
          key: "width",
          align: "center"
        },

        {
          title: "请领数量",
          key: "req_qty",
          align: "center"
        }
      ],
      approval_details: [],
      show_approval_detail: false
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios
      .get("/work_shop_order_list", { params: { user_id: 6 } })
      .then(res => {
        this.workshop_name = res.data.data[0]["name"];
        this.work_shop_id = res.data.data[0]["work_shop_id"];
        this.user_id = res.data.data[0]["user_id"];

        // console.log(this.work_shop_id);
        this.workshop_workorder_workorders = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    this.boms_approval_list1();
  },
  methods: {
    give_workteam() {
      this.$axios
        .post("/work_team_task", {
          work_team_id: this.model1,
          user_id: this.user_id,
          number: this.team_qty,
          work_order_id: this.work_order_id
        })
        .then(res => {
          alert(res.data.msg);
        });
    },
    boms_approval_list1() {
      this.$axios
        .get("/boms_approvals", {
          params: {
            user_id: Cookies.get("userid"),
            approval: "1"
          }
        })
        .then(res => {
          this.boms_approval_list = res.data.boms_approval_list;
        });
    },
    approval_select(currentRow) {
      this.$axios
        .get("/boms_approval_detail", {
          params: {
            approval_id: currentRow.id
          }
        })
        .then(res => {
          this.show_approval_detail = true;
          this.approval_details = res.data.boms_approval_detail;
        });
    }
    // row_select(currentRow) {
    //   this.$axios
    //     .get("/workshop_order_detail")
    //     .then(res => {
    //       this.workshop_order_detail = res.data;
    //       this.work_order_id = currentRow.work_order_id;
    //       this.show_work_shop_detail = true;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // pic_show(picno) {
    //   this.graph_no = picno;
    //   this.showPic = true;
    // },
    // changePage() {
    //   this.workshop_workorder_workorders = this.workshop_workorder_workorders;
    // }
  }
};
</script>
