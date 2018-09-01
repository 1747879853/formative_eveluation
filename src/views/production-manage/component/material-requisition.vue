<style lang="less">
@import "../../../styles/common.less";
@import "../advanced-router.less";
@import "../../tables/components/table.less";
</style>

<template>
    <div>
       <Modal v-model="show_apply" width="70%" :title="title" @on-ok="boms_approval">
        
           <can-edit-table 
                                    refs="table4" 
                                    v-model="edit_apply_data" 
                                    @on-cell-change="handleCellChange" 
                                    @on-change="handleChange"  
                                    :editIncell="true" 
                                    :columns-list="edit_apply_columns"
              ></can-edit-table>
         
       </Modal>


        <Modal v-model="show_approval_detail" width="70%" title="领料明细"  >
        
                  <Table :columns="approval_details_columns"   :data="approval_details"></Table>
       
         
       </Modal>
   
        <div >
            <Row>
               <Card>
                    
                     <p >
                        <Icon type="compose"></Icon>
                        模板名称:{{name}}  *  {{number}}件;
                        <Button type="primary"  @click="apply_material">申请领料</Button>
                    </p>
                    <Table :columns="boms_col" :data="team_boms"></Table>
                  </Card>
                  <Card>
                    <p>
                       <Icon type="ios-list"></Icon>   物料申请单   (点击记录查看详情)
                    </p>
                  <Table :columns="boms_approval_columns"  highlight-row @on-row-click="approval_select" :data="boms_approval_list"></Table>
                  </Card>
            </Row>
        </div>
                

     
    </div>
</template>

<script>
import expandRow from "./expandRow.vue";
import canEditTable from "../../tables/components/canEditTable.vue";
import Cookies from 'js-cookie';
export default {
  name: "material-requisition",
  components: {
    expandRow,
    canEditTable
  },
  data() {
    return {
      boms_col: [
        {
          type: "index",
          title: "序号",
          width: 60
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
          title: "所需数量/套",
          key: "qty",
          align: "center"
        },
        
        {
          title: "完成数量",
          key: "passed_number",
          align: "center"
        },
        {
          title: "备注",
          key: "comment",
          align: "center"
        }
      ],
      edit_apply_data: [],
      edit_apply_columns: [
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
          title: "所需数量/套",
          key: "qty",
          align: "center"
        },
        {
          title: "请领数量",
          key: "req_qty",
          align: "center",
          render:(h,params) => {
            let _this = this;
            return h('div',[
              h('Input',{
                props:{
                  type: 'text',
                  autofocus: true,
                  value: params.row.req_qty
                },
                on: {
                  'input' (value){
                    _this.edit_apply_data[params.index] = params.row;
                    params.row.req_qty = value;
                  }
                }
              })
            ])
          }
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          key: "handle",
          handle: ["delete"]
        }
      ],

      team_boms: [],
      name: "",
      number: 0,
      show_apply: false,
      title: "物料申请单",
      mid: "",
      team_task_id:"",
      boms_approval_list: [],
      approval_details: [],
      boms_approval_columns:[
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
          title:"申请人",
          key: "apply_name",
          align: "center"
        },
        {
          title:"审批人",
          key: "approval_owner",
          align: "center"
        },
         {
          title: "状态",
          key: "status",
          align: "center"
        },
        {
          title: "审批意见",
          key: "approval_comment",
          align: "center"
        }
      ],
      show_approval_detail:false,
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
          align: "center",
        }
      ]
    };
  },
  
  mounted() {

    this.team_task_id = this.$route.params.team_task_id;
    this.$axios
      .get("/team_task_boms", {
        params: {
          material_id: this.$route.params.mid,
          task_id:  this.team_task_id
        }
      })
      .then(res => {
        this.team_boms = res.data.boms;
        this.name = this.$route.params.name;
        this.number = res.data.boms[0]["number"];
      })
      .catch(err => {
        console.log(err);
      });
      this.boms_approval_list1();
  },
  activated() {
    this.name = this.$route.params.name;
    this.mid = this.$route.params.mid;
    this.team_task_id = this.$route.params.team_task_id;

    this.$axios
      .get("/team_task_boms", {
        params: {
          material_id: this.$route.params.mid,
          task_id:  this.team_task_id
        }
      })
      .then(res => {
        this.team_boms = res.data.boms;
        this.name = this.$route.params.name;
        this.number = res.data.boms[0]["number"];
      })
      .catch(err => {
        console.log(err);
      });
      this.boms_approval_list1();
  },
  methods: {
    apply_material() {
      this.show_apply = true;

      this.edit_apply_data = this.team_boms;

      this.title = "物料申请单:" + this.name + " * " + this.number + "件";
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
    boms_approval() {
      this.$axios.post("/boms_approval", {
        boms: this.edit_apply_data,
        user: Cookies.get("user"),
        user_id: Cookies.get("userid"),
        comment: this.name + "  *  "+this.number+" 件",
        team_task_id: this.team_task_id
      }).then(res =>{
        this.$Message.info(res.data.msg);
        if(res.data.msg="领料成功！"){
          this.boms_approval_list1();
        }
      });
    },
    boms_approval_list1(){
      this.$axios.get('/boms_approvals',{params:{
        team_task_id: this.team_task_id,
        approval:"2"
      }}).then(res=>{
        this.boms_approval_list = res.data.boms_approval_list;
      })
    },
    approval_select(currentRow){
      this.$axios.get('/boms_approval_detail',{params:{
        approval_id: currentRow.id,
        
      }}).then(res=>{
        this.show_approval_detail =true;
        this.approval_details = res.data.boms_approval_detail;
      })
    }
  }
};
</script>
