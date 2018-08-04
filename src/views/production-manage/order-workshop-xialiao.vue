<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
    <div>
        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
   
         <Modal width="60%" v-model="show_procedure" title="添加制作工序(  务必按顺序添加  )" @on-ok="give_task_to_team">
           <!-- {{model10}} -->
            <Select v-model="model10" multiple style="width:500px" placeholder="请按顺序添加生产工序">
            <Option v-for="item in workteams" :value="item.id" :key="item.id">{{ item.name }}</Option>
          
            </Select>
          
        </Modal>
        
        <Row class="margin-top-10">
            <Col span="24">
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
                                     <div v-if="team_boms.length!=0">
                        <Icon type="compose"></Icon>模板：{{bom_name}};
                        <Button type="primary" @click="getCurrentData">生产领料</Button>
                         <Row :gutter="10">
                         <Col span="24">
                       
                        <Table :columns="boms_col" :data="team_boms"></Table>
                        
                        </Col>
                        <!-- <Col span="2">
                            <Row type="flex" justify="center" align="top" class="edittable-table-get-currentdata-con">
                                <Button type="primary" @click="getCurrentData">生产领料</Button>
                            </Row>
                        </Col> -->
                        </Row>
                        </div>
                      
                         
                      
                   
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import canEditTable from "../tables/components/canEditTable.vue";
// import tableData from '../tables/components/table_data.js';
export default {
  name: "editable-table",
  components: {
    canEditTable
  },
  data() {
    return {
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
          title: "数量",
          align: "center",
          key: "number"
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
                      let argu = {
                        mid: params.row.mid,
                        name: params.row.name,
                        team_task_id: params.row.id
                      };
                      this.$router.push({
                        name: "material-requisition",
                        params: argu
                      });
                    }
                  }
                },
                "所需物料"
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
                      this.teams();
                      this.mid = params.row.mid;
                      this.mnumber = params.row.number;
                      this.show_procedure = true;

                    }
                  }
                },
                "分派与工序"
              )
            ]);
          }
        }
      ],
      model10: [],
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
      mnumber: ""
     
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
        .get("/xialiao_shoptasks")
        .then(res => {
          this.workteam_materials = res.data.data;
          this.title = res.data.data[0]["shop_name"];
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

    teams() {
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
    },
    give_task_to_team(){
      this.$axios.post('/give_task_to_team',{
        procedure: this.model10.join(","),
        mid: this.mid,
        mnumber: this.mnumber,
        wst_id: this.work_shop_id
      }).then(res=>{
        this.$Message.info(res.data.msg);
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
};
</script>