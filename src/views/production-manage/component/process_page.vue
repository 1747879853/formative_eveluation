<style lang="less">
@import "../../../styles/common.less";
@import "../advanced-router.less";
</style>

<template>
    <div>
       

        <Modal width="60%" v-model="showPic" :title="graph_no">
           
            <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531138272810&di=fb25ebec179ae86ec8df80f3fb7aba90&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F12%2F81%2F58PIC5R58PICsqy_1024.jpg"></img>
        </Modal>
          <!-- <Button @click="dispatchWorkOrder = true" type="primary">分派工单</Button> -->
        <div >
            <Row>
               <Card>
                    <div v-if="work_order_detail[0]">
                    <div  v-for="(mat_data,index) in work_order_detail">
                        <card>
                    <p >
                        <Icon type="compose"></Icon>
                        模板-{{index+1}}#；工单号：{{work_order_id}}
                    </p>
                   
                    <Table :columns="materials_col" v-if="mat_data" :data="mat_data" :mat_data="mat_data" ></Table>
                    <!-- {{mat_data}} -->
                     <p >
                        <Icon type="compose"></Icon>
                        模板-{{index+1}}# 物料清单
                    </p>
                    <Table :columns="boms_col" :data="mat_data[0].children"></Table>
                    
                        </card>
                  
                   </div>
                    </div>
                  </Card>
            </Row>
        </div>
                

       <!--  <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    订单详情
                </p>
                <Table :columns="order_col" :data="order_data"></Table>
                <Modal width="700" v-model="showInfo" title="订单信息">
                    <Table :columns="order_col" :data="order_data"></Table>
                </Modal>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <Row>
                    <p class="advanced-router-tip-p">虽然iview-admin支持打开带参数的页面，但是类似于这种需求，还是建议用iview的Modal或者使用表格直接在表格内展开数据</p>
                    <p><Button @click="showInfo = true" type="primary">点击按钮弹出Modal</Button></p>
                </Row>
                <div class="margin-top-10">
                    <p class="advanced-router-tip-p">iview官方示例<a href="https://www.iviewui.com/components/table">表格</a></p>
                    <Table :columns="columns10" :data="data9"></Table>
                </div>
            </Card>
        </Row> -->
    </div>
</template>

<script>
import expandRow from "./expandRow.vue";
export default {
  name: "process-page",
  components: {
    expandRow
  },
  data() {
    return {
      model1: "",
      model2: "",
      work_order_col: [
        {
          type: "index",
          title: "序号",
          width: 30
        },
        {
          title: "工单号",
          key: "work_order_id",
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "设计",
          key: "user",
          align: "center"
        },
        {
          title: "模版名称",
          key: "type",
          align: "center"
        },
        {
          title: "数量",
          key: "number",
          align: "center"
        },
        {
          title: "分派工单",
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
                      this.dispatchWorkOrder = true;
                    }
                  }
                },
                "分派工单"
              )
            ]);
          }
        }
      ],
      work_order_data_arr: [],
      workshop_order_detail: [],
      materials_col: [
        // {
        //     title: '图号',
        //     key: 'graph_no',
        //     align: 'center'
        // },
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

      showInfo: false,
      dispatchWorkOrder: false,

      work_order_detail: [],

      workshop_directors: [],
      workshop_packaging: [],
      work_order_id: "",
      graph_no: "",
      showPic: false
    };
  },
  methods: {
    pic_show(picno) {
      this.graph_no = picno;
      this.showPic = true;
    }
  },
  mounted() {
     this.$axios.get("/work_order_details",{params:{
             work_order_id: this.$route.params.work_shop_order_id
           }})
           .then(res => {
               this.work_order_detail = res.data.materials_boms;
               this.work_order_id = currentRow.id;
            //    console.log(this.work_order_data_arr);
           }).catch(error =>{
                console.log(error);
           })
        
    this.work_order_id = this.$route.params.work_shop_order_id;
  },
  activated() {
    this.work_order_id = this.$route.params.work_shop_order_id;
  }
};
</script>
