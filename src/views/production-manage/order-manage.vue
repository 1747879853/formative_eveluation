<style lang="less">
@import "./advanced-router.less";
</style>


<template>
  <div>

    <Modal width="70%" v-model="progress_table_show" :title="progress_order_id">
            <Table :columns="progressColumns"   :data="progressData_list" style="width: 100%;"></Table>
          
    </Modal>
    
    
 <Col span="24">
       <Card>
            <p slot="title">
                <Icon type="ios-list"></Icon>
                订单列表
            </p>
             <Row type="flex" justify="center" align="top" >
                   <Table :columns="orderColumns"   :data="orderData" style="width: 100%;"></Table>
             </Row>
          </Card>>
       </Col>
  
    </div>
</template>

<script>
export default {
  name: "mutative-router",
  data() {
    return {
      orderColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "订单号",
          key: "order_id",
          align: "center"
        },
        {
          title: "客户",
          key: "customer",
          align: "center"
        },
        {
          title: "时间",
          key: "create_time"
        },
        {
          title: "详情",
          key: "show_more",
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
                      let argu = { order_id: params.row.order_id };
                      this.$router.push({
                        name: "order-info",
                        params: argu
                      });
                    }
                  }
                },
                "查看详情"
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
                      this.$axios.get("/progressData").then(res=>{
                        this.progressData_list = res.data.children;

                        console.log(progressData_list)

                      });
                      this.progress_order_id ="订单："+params.row.order_id;
                      this.progress_table_show = true;
                    }
                  }
                },
                "查看进度"
              )
            ]);
          }
        }
      ],
      progressColumns: [
        {
          type: "index",
          title: "序号",
          width: 60
        },
        {
          title: "工单号",
          key: "work_order_id",
          align: "center"
        },
        {
          title: "模板",
          key: "type",
          align: "center"
        },
        {
          title: "下料(已完成/总数量)",
          key: "xialiao"
        },
         {
          title: "组拼(已完成/总数量)",
          key: "zupin"
        }    
        ],
      orderData: [],
      progress_order_id: "",
      progress_table_show: false,
      progressData_list:[]
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.$axios
      .get("/orderListData")
      .then(res => {
        this.orderData = res.data.body;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
