<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
<Card>
    <p slot="title">
      <Icon type="ios-keypad"></Icon>
      {{team_name}}
    </p>
    <div v-if="dept_type==='下料'">
    <Table :columns="xialiaoColumns" :data="xialiaoData"> </Table>
    </div>
    <div v-else-if="dept_type!='下料'">
    <Table :columns="teamOrderColumns" :data="workteam_materials"> </Table>
    </div>
</Card>
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
       
      ],
      xialiaoColumns: [
        {
          title: "序号",
          type: "index",
          width:40,
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
          title: "备注",
          align: "center",
          key: "comment"
        },
        {
          title: "当前流程",
          align: "center",
          key: "current_flow"
        },
        {
          title: "流程",
          align: "center",
          key: "flow"
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
                       this.flow_finished(params.row.id,params.row.bid);
                    }
                  }
                },
                "完成")])}
              }
      ],
      xialiaoData:[],
      team_name:"",
      dept_type:"",
      workteam_materials: [],
    };
  },
  methods: {
    
    init(){


        this.teamOrderColumns=[ {
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
        // {
        //   title: "合格数量",
        //   align: "center",
        //   width: 120,
        //   key: "passed_number"
        // },
        {
          title: "备注",
          key: "comment"
        },
      ];
       
      this.$axios.get('/work_team_task_list').then(res=>{
        if (res.data.type=="下料"){
        this.xialiaoData = res.data.data;
        this.team_name = res.data.team_name;
        this.dept_type = "下料"
        }else if(res.data.type=="组拼"){


          this.dept_type = "组拼"
          this.team_name = res.data.team_name;
          this.workteam_materials = res.data.data;
          this.teamOrderColumns.push({ 

                
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
                      this.$axios.post('/zupin_finished',{
                        id: params.row.id
                      }).then(res=>{
                        this.$Message.info("进入质检");
                       this.init();
                      })
                   
                    }
                  }
                },
                "完成"
              ),
              
              
              ])}
              })
        }else if(res.data.type=="喷漆"){
          this.dept_type = "喷漆"
          this.team_name = res.data.team_name;
          this.workteam_materials = res.data.data;

          
          this.teamOrderColumns.push({ 

                
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
                      this.$axios.post('/paint_finished',{
                        id: params.row.id
                      }).then(res=>{
                        this.$Message.info(res.data.msg);
                       this.init();
                      })
                   
                    }
                  }
                },
                "喷漆完成"
              ),
              
              
              ])}
              })
        

        }
      })
    },
    flow_finished(id,bid){
      this.$axios.post('/xialiao_flow_finished',{teamx_task_id: id,bom_id:bid}).then(res=>{
        this.$Message.info(res.data.msg);
        this.init();
      })
    }
  },
  created() {},
  mounted() {
    this.init();
  }
};
</script>