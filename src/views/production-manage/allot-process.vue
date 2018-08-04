<style lang="less">
@import "./advanced-router.less";
</style>


<template>
  <div>

    
    
 <Col span="24">
       <Card>
            <p slot="title">
                <Icon type="ios-list"></Icon>
                分配与进度列表
            </p>
<!--       
             <Row type="flex" justify="center" align="top" >
                  <Table :columns="orderColumns"   :data="work_logs" style="width: 100%;"></Table>
                  <span style="float:right;margin-right:765px;"></span>    
             </Row> -->
            <Input v-model="w_order_id" placeholder="工单号" clearable style="width: 80px" />
            <Input v-model="client_name" placeholder="客户名称" clearable style="width: 200px" />
            <Input v-model="type_name" placeholder="模板名称" clearable style="width: 200px" />
             <Button type="primary" icon="ios-search" @click="search_process">查询</Button>
             <Tree :data="data1" empty-text></Tree>

          </Card>

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
          title: "工单单号",
          key: "work_order_id",
          align: "center"
        },
        {
          title: "单据类型",
          key: "type",
          align: "center"
        },
        {
          title: "单号",
          key: "owner_id",
          align: "center"
        },
        {
          title: "分配人",
          key: "user_name",
          align: "center"
        },
        {
          title: "接收人",
          key: "get_user_name"
        },
        {
          title: "分配数量",
          key: "number"
        },
        {
          title: "完成数量",
          key: "passed_number"
        },
       
       
      ],
    work_logs: [],
    data1:[],
    w_order_id:"",
    client_name:"",
    type_name: ""
    };
  },
  computed: {
    avatorImage() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
        this.$axios
      .get("/work_log_tree",{
        headers: {
          "Content-Type":'application/json'
        }})
      .then(res => {
        this.data1 = res.data.data1; 
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    search_process(){
      if(this.w_order_id==""&&this.type_name==""&&this.client_name==""){
               this.$axios
      .get("/work_log_tree",{
        headers: {
          "Content-Type":'application/json'
        }})
      .then(res => {
        this.data1 = res.data.data1; 
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
      }else{
        this.$axios.get('/work_log_tree',{
          params:{
            client_name: this.client_name,
            type_name: this.type_name,
            w_order_id: this.w_order_id
          }
        }).then(res=>{
          this.data1 = res.data.data1;
        }) .catch(error => {
        console.log(error);
      });
      }
    }
  }
};
</script>
