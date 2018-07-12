<style lang="less">
@import "../../../styles/common.less";
@import "../advanced-router.less";
@import "../../tables/components/table.less";
</style>

<template>
    <div>
       <Modal v-model="show_apply" width="70%" :title="title">
        
           <can-edit-table 
                                    refs="table4" 
                                    v-model="edit_apply_data" 
                                    @on-cell-change="handleCellChange" 
                                    @on-change="handleChange"  
                                    :editIncell="true" 
                                    :columns-list="edit_apply_columns"
              ></can-edit-table>
         
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
            </Row>
        </div>
                

     
    </div>
</template>

<script>
import expandRow from "./expandRow.vue";
import canEditTable from "../../tables/components/canEditTable.vue";
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
          key: "total",
          align: "center"
        },
        {
          title: "已领用数量",
          key: "get_qty",
          align: "center"
        },
        {
          title: "申请中数量",
          key: "apply_qty",
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
          key: "total",
          align: "center"
        },
        {
          title: "请领数量",
          key: "request_qty",
          align: "center",
          editable: true
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
      title: "物料申请单"
    };
  },
  methods: {},
  mounted() {
    this.$axios
      .get("/team_boms")
      .then(res => {
        this.team_boms = res.data.boms;
        this.name = this.$route.params.work_shop_team_order_id;
        this.number = res.data.number;
      })
      .catch(err => {
        console.log(err);
      });
  },
  activated() {
    this.name = this.$route.params.work_shop_team_order_id;
  },
  methods: {
    apply_material() {
      this.show_apply = true;
      if (this.edit_apply_data.length == 0) {
        this.edit_apply_data = this.team_boms;
      }
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
    }
  }
};
</script>
