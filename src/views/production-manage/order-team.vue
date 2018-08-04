<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
    <div>
        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
         <Modal width="60%" v-model="show_finish" title="添加完成数量" @on-ok="material_finished">
             添加完成数量：<InputNumber v-model="finish_qty"></InputNumber>
          
        </Modal>
         <Modal width="60%" v-model="show_pass" title="添加合格数量" @on-ok="material_passed">
             添加合格数量：<InputNumber v-model="pass_qty"></InputNumber>
          
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
          title: "班组单号",
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
          title: "分配数量",
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
          title: "合格数量",
          align: "center",
          width: 120,
          key: "passed_number"
        },
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
                      let argu = { mid: params.row.mid, name: params.row.name, team_task_id: params.row.id };
                      this.$router.push({
                        name: "material-requisition",
                        params: argu
                      });
                    }
                  }
                },
                "物料"
              ),
             
            ]);
          }
        }
      ],

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
      pass_qty: 0
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
    init(){
       this.$axios
      .get("/work_team_task_list")
      .then(res => {
        this.workteam_materials = res.data.data;
        this.title = res.data.data[0]["team_name"]; 
      })
      .catch(error => {
        console.log(error);
      });
    },
    pic_show(picno) {
      this.graph_no = picno;
      this.showPic = true;
    },
    material_finished() {
      
      if (this.finish_qty != 0) {
        this.$axios
          .post("/team_task_material_finished", {
            finish_number: this.finish_qty,
            team_task_id: this.team_task_id
          })
          .then(res => {
            this.init();
            this.$Message.info(res.data.msg);
          })
          .catch(error => {
            console.log(error);
          });
      }else{
        this.$Message.info("完成数量不能为0");
        return;
      }
    },
    material_passed(){
       if (this.pass_qty != 0) {
        this.$axios
          .post("/team_task_material_passed", {
            pass_number: this.pass_qty,
            team_task_id: this.team_task_id
          })
          .then(res => {
            this.init();
            this.$Message.info(res.data.msg);
          })
          .catch(error => {
            console.log(error);
          });
      }else{
        this.$Message.info("合格数量不能为0");
        return;
      }
    }
    //      row_select(currentRow){
    //          console.log(currentRow);
    //         this.$axios.get("/team_boms").then(res =>{

    //             this.team_boms =  res.data;
    //             this.bom_name =currentRow.name;
    //         }).catch(err =>{
    //             console.log(err);
    //         })
    //    },
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