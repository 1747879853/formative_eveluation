<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
    <div>
        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
        
        <Row class="margin-top-10">
            <Col span="24">
                <Card> 
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                      生产领料单-列表
                    </p>
                                <can-edit-table 
                                    refs="table4" 
                                   
                                    v-model="requisition_list" 
                                    @on-cell-change="handleCellChange"
                                    
                                    @on-change="handleChange"  
                                    :editIncell="true" 
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
          title: "领料单号",
          key: "id",
         
          align: "center",
         
        },
         {
          title: "请领人",
          key: "user_name",
        
          align: "center",
         
        },
          {
          title: "请领日期",
          key: "apply_date",
         
          align: "center",
         
        },
        {
          title: "模板",
          key: "type",
         
          align: "center",
         
        },
         {
          title: "数量",
          key: "number",
         
          align: "center",
         
        },

          {
          title: "审批状态",
          key: "approval_status",
         
          align: "center",
         
        },
          {
          title: "发料状态",
          align: "center",
         
          key: "send_status"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                       let argu = { material_requisition_id: params.row.id };
                      this.$router.push({
                      name: "material-requisition-detail",
                      params: argu
                    });
                  }
                }
              },
              "请领详情"
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
      requisition_list:[],
      props: ['data']
    };
  },
  methods: {
    handleNetConnect(state) {
      this.breakConnect = state;
    },
    handleLowSpeed(state) {
      this.lowNetSpeed = state;
    },
    getCurrentData() {
      this.showCurrentTableData = true;
    },
    handleDel(val, index) {
      this.$Message.success("删除了第" + (index + 1) + "行数据");
    },
    handleCellChange(val, index, key) {
      this.$Message.success(
        "修改了第 " + (index + 1) + " 行列名为 " + key + " 的数据"
      );
    },
    handleChange(val, index) {
      this.$Message.success("修改了第" + (index + 1) + "行数据");
    },
  
    pic_show(picno) {
      this.graph_no = picno;
      this.showPic = true;
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
    this.$axios
      .get("/requisition_list")
      .then(res => {
        this.requisition_list = res.data;
     
      })
      .catch(error => {
        console.log(error);
      });
    this.$axios
      .get("/workteams")
      .then(res => {
        this.workteams = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>