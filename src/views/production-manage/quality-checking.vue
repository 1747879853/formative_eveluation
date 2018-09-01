<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>

<Tabs type="card">
        
        <TabPane label="下料质检">
           <Table :columns="xialiaoColumns" :data="xialiaoData"> </Table>
        </TabPane>
      <TabPane label="组拼质检">
        
        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
         <Modal width="60%" v-model="show_passed" title="添加合格数量" @on-ok="xialiao_passed">
             添加完成数量：<InputNumber v-model="xialiao_qty" :max="max_xialiao_number"></InputNumber>
          
        </Modal>
         <Modal width="60%" v-model="show_pass" title="添加合格数量" @on-ok="material_passed">
             添加合格数量：<InputNumber v-model="pass_qty"  :max="max_number"></InputNumber>
          
        </Modal>
        
       
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
                       <Page :total="total" show-total  @on-change="handleChange"/>
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
       
    
        </TabPane>
    </Tabs>

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
          key: "wo_id",
        
          align: "center"
        },
         {
          title: "单据来源",
          key: "team_name",
         
          align: "center"
        },
        {
          title: "班组单号",
          key: "id",
        
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
          
        //   key: "finished_number"
        // },
        {
          title: "合格数量",
          align: "center",
         
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
                      this.pass_qty =0;
                      this.show_pass = true;
                      this.team_task_id = params.row.id;
                      this.max_number = params.row.number;
                      this.p_number = params.row.passed_number ? params.row.passed_number : 0 ;
                    }
                  }
                },
                "添加合格数量"
              )
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
      pass_qty: 0,
      xialiao_qty: 0,
      max_number:0 ,
      total: 0,
      x_number: 0,
      p_number: 0,
            xialiaoColumns: [
              {
          title: "序号",
          type: "index",
          width: 80,
          align: "left"
        },
        {
          title: "产品",
          align: "center",
          key: "template_type"
        },
        {
          title: "模板名称",
          align: "center",
          key: "m_name"
        },
        {
          title: "物料名称",
          align: "center",
          key: "b_name"
        },
        {
          title: "规格",
          align: "center",
          key: "spec"
        },
        {
          title: "宽度",
          align: "center",
          key: "width"
        },
        {
          title: "长度",
          align: "center",
          key: "length"
        },
        {
          title: "数量",
          align: "center",
          key: "number"
        },
        {
          title: "合格数量",
          align: "center",
          key: "passed_number"
        },
        {
          title: "备注",
          align: "center",
          key: "comment"
        },
       
        {
          title: "操作",
          key: "action",
         
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
                       this.show_passed =true;
                       this.xialiao_qty = params.row.passed_number ? (params.row.number-params.row.passed_number) : params.row.number ;
                       this.max_xialiao_number = params.row.passed_number ? (params.row.number-params.row.passed_number) : params.row.number ;
                       this.teamx_id = params.row.id;
                       this.bom_id =params.row.bid;
                       this.x_number = params.row.passed_number ? params.row.passed_number : 0 ;
                    }
                  }
                },
                "添加合格数量")])}
              }
      ],
       xialiaoData:[],
       show_passed:false,
       max_xialiao_number:0,
       teamx_id:"",
       bom_id:""
    };
  },
  methods: {
    xialiao_passed(){
       if (this.xialiao_qty != 0 &&(this.xialiao_qty+this.x_number>=0) ) {
      this.$axios.post('/xialiao_passed',{
        passed_number: this.xialiao_qty,
        teamx_id: this.teamx_id,
        bom_id: this.bom_id
      }).then(res=>{
        this.$Message.info("保存成功！");
        this.init();
      })}else{
         this.$Message.info("添加的合格数量不能为0或合格数量与添加的合格数量相加不能小于0");
        return;
      }
    },
    init(){
       this.$axios
      .get("/checking_list")
      .then(res => {
        this.workteam_materials = res.data.data;
        this.total = res.data.count;
        this.title = "质量管理"; 
      })
      .catch(error => {
        console.log(error);
      });

      this.$axios.get("/xialiao_checking_list").then(res => {

        console.log(res.data.data)
        this.xialiaoData = res.data.data;
      })
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
       if (this.pass_qty != 0 &&(this.pass_qty+this.p_number>=0) ) {
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
        this.$Message.info("添加的合格数量不能为0或合格数量与添加的合格数量相加不能小于0");
        return;
      }
    },
      handleChange(page) {
            this.$axios
      .get("/checking_list",{params:{page: page}})
      .then(res => {
        this.workteam_materials = res.data.data;
        this.total =res.data.count;
        this.title = "质量管理"; 
      })
      .catch(error => {
        console.log(error);
      });
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