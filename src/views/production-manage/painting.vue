<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>

<Tabs type="card">
        <TabPane label="任务列表">
        
        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
   
         <Modal width="60%" v-model="show_procedure" title="分派到喷漆班组" @on-ok="give_painting_team_task">
           <!-- {{model10}} -->
            <Select v-model="model10"  clearable style="width:200px" placeholder="选择班组">
            <Option v-for="item in workteams" :value="item.id" :key="item.id">{{ item.name }}</Option>
          
            </Select>

           
        </Modal>
        
         <Modal width="60%" v-model="show_boms" :title="graph_no">
             <Table :columns="boms_col" :data="team_boms"></Table>
            </Modal>

     
                <Card> 
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                       {{title}}
                    </p>
                                <can-edit-table 
                                    refs="table4" 
                                   
                                    v-model="workteam_materials" 
                                  
                                    :columns-list="teamOrderColumns"
                                ></can-edit-table>

                                 <br/>
                     
                       
                       
                        
                        
                        <!-- <Col span="2">
                            <Row type="flex" justify="center" align="top" class="edittable-table-get-currentdata-con">
                                <Button type="primary" @click="getCurrentData">生产领料</Button>
                            </Row>
                        </Col> -->
                        
                      
                         
                      
                   
                </Card>
    
   </TabPane>
          <!-- </TabPane>
            <TabPane label="物料请领审批">
            <Modal v-model="show_approval_detail" width="70%" title="领料明细"  @on-ok="auditing_boms">
                  <Table :columns="approval_details_columns"   :data="approval_details"></Table>
                 <br/>
              
            审核结果:<Select v-model="result" style="width:200px" clearable>
                <Option v-for="(item) in approval_arr" :value="item.id" :key="item.id">{{ item.text }}</Option>
           </Select>             意见:<Input v-model="suggestion" placeholder="审批意见..." style="width: 300px"></Input>
          
           </Modal>

           <Card>
                    <p>
                       <Icon type="ios-list"></Icon>   物料申请单   (点击记录查看详情)
                    </p>
                  <Table :columns="boms_approval_columns"  highlight-row @on-row-click="approval_select" :data="boms_approval_list"></Table>
                  </Card>
        </TabPane>
        <TabPane label="已审核单据">
          <Modal v-model="show_approvaled_detail" width="70%" title="领料明细">
                  <Table :columns="approval_details_columns"   :data="approval_details"></Table>
                 <br/>
          </Modal>
          <Card>
                    <p>
                     <Icon type="ios-list"></Icon>   物料申请单   (点击记录查看详情)
                    </p>
                  <Table :columns="boms_approvaled_columns"  highlight-row @on-row-click="approval_select1" :data="boms_approvaled_list"></Table>
                  </Card>
          </Card>
        </TabPane>

          </TabPane> -->
</Tabs>
</template>

<script>
import canEditTable from "../tables/components/canEditTable.vue";
import Cookies from "js-cookie";
// import tableData from '../tables/components/table_data.js';
export default {
  name: "editable-table",
  components: {
    canEditTable
  },
  data() {
    return {
       boms_approvaled_columns: [
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
          title: "审批结果",
          key: "status",
          align: "center"
        },
        {
          title: "意见",
          key: "approval_comment",
          align: "center"
        }
      ],
      boms_approval_list: [],
      teamOrderColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "工单号",
          key: "id",
          width: 100,
          align: "center"
        },
        {
          title: "图号",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                slot: "content"
              },
              [
                h(
                  "ul",
                  params.row.graph_no.split(",").map(item => {
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
          title: "模板",
          align: "center",
          key: "name"
        },
        {
          title: "合格数量",
          align: "center",
          key: "passed_number"
        },
        // {
        //   title: "完成数量",
        //   align: "center",
        //   width: 120,
        //   key: "finished_number"
        // },

        {
          title: "备注",
          key: "comment"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
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
                      this.team_task_id = params.row.id;
                      this.show_procedure = true;

                    }
                  }
                },
                "分派喷漆班组"
              )
            ]);
          }
        }
      ],
      team_task_id: "",
      model10: "",
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
       result: "",
           approval_arr: [
        {
          id: 2,
          text: "通过"
        },
        {
          id: 3,
          text: "否决"
        }
      ],
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

      show_boms:false,
      show_procedure:false,
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
        // {
        //   title: "总数量/套",
        //   key: "qty",
        //   align: "center"
        // },
        {
          title: "备注",
          key: "comment",
          align: "center"
        }
      ],
      workteam_materials: [],
      workteams: [],
      team_boms: [],
      showPic: false,
      graph_no: "",
      title: "",
      bom_name: "",
      show_finish: false,
      show_pass: false,
      team_task_id: "",
      finish_qty: 0,
      pass_qty: 0,
      work_shop_id:"",
      mid:"",
      mnumber: "",
      work_order_id:"",
      work_shop_task_id:"",
       approval_details: [],
      show_approval_detail: false,
      show_approvaled_detail:false,
      approval_id: "",
      suggestion: "",
      boms_approvaled_list: []
     
    };
  },
  methods: {
    // handleNetConnect(state) {
    //   this.breakConnect = state;
    // },
    // handleLowSpeed(state) {
    //   this.lowNetSpeed = state;
    // },
    // getCurrentData() {
    //   this.showCurrentTableData = true;
    // },
    // handleDel(val, index) {
    //   this.$Message.success("删除了第" + (index + 1) + "行数据");
    // },
    // handleCellChange(val, index, key) {
    //   this.$Message.success(
    //     "修改了第 " + (index + 1) + " 行列名为 " + key + " 的数据"
    //   );
    // },
    // handleChange(val, index) {
    //   this.$Message.success("修改了第" + (index + 1) + "行数据");
    // },
    init() {
      this.$axios
        .get("/painting_list")
        .then(res => {
          this.workteam_materials = res.data.data;
          this.title = "喷漆车间";
          this.workteams = res.data.teams;
          this.work_shop_id = res.data.data[0]["work_shop_id"];
        })
        .catch(error => {
          console.log(error);
        });
    },
    pic_show(picno) {
      this.graph_no = picno;
      this.showPic = true;
    },
    give_painting_team_task(){
        this.$axios.post('/give_painting_team_task',{
            task_id: this.team_task_id,
            painting_team: this.model10
        }).then(res=>{
            this.$Message.info("分派成功");
        })
    }





   
  },
  created() {},
  mounted() {

    this.init();
  
    // this.$axios
    //   .get("/workteams")
    //   .then(res => {
    //     this.workteams = res.data.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
}
</script>