<style lang="less">
@import "../../../styles/common.less";
@import "../advanced-router.less";
</style>

<template>
    <div>
       

   
        <div >
            <Row>
               <Card>
                    
                     <p >
                        <Icon type="compose"></Icon>
                        模板名称:{{name}};
                        <Button type="primary" >确定领料</Button>
                    </p>
                    <Table :columns="boms_col" :data="team_boms"></Table>
                  </Card>
            </Row>
        </div>
                

     
    </div>
</template>

<script>
import expandRow from "./expandRow.vue";
export default {
  name: "material-requisition",
  components: {
    expandRow
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
      team_boms: [],
      name:''
    };
  },
  methods: {},
  mounted() {
    this.$axios
      .get("/team_boms")
      .then(res => {
        this.team_boms = res.data;
        this.name = this.$route.params.work_shop_team_order_id;
      })
      .catch(err => {
        console.log(err);
      });
  },
  activated() {
      this.name = this.$route.params.work_shop_team_order_id;
  }
};
</script>
