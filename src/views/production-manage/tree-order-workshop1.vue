<style lang="less">
@import "./advanced-router.less";
</style>

<template>
<div>
<Row>
        <Col span="6">
            <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText"
  style="width:320px;">
</el-input>

<el-tree
  class="filter-tree"
  :data="data2"
  :props="defaultProps"
  node-key="id"
  show-checkbox
  @check ="checkChange"
  :filter-node-method="filterNode"
  ref="tree2"
  style="width:320px;"
>
</el-tree>
 
        </Col>
        <Col span="18">
        
        <Table :columns="columns1" :data="datatable"></Table>
     
        
        </Col>
    </Row>

 


  </div>
    
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "tree-order-workshop1",
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // getCheckedKeys() {
    //     console.log(this.$refs.tree2.getCheckedKeys());
    //   },
      checkChange(data,checked){
        var j = 0
      
        var datatable1 = this.$refs.tree2.getCheckedNodes();
        var length1 =datatable1.length;
        if (length1>0){
        for(j = 0; j < datatable1.length; j++) {

         
           if((datatable1[j]["id"].toString().indexOf("m")> -1) || (datatable1[j]["id"].toString().indexOf("w")> -1)){
          delete ( datatable1[j]);

           }
        }
        
        this.datatable = this.bouncer(datatable1);
        }else{
            this.datatable =[];
        }
      },
    bouncer(arr) {
       return arr.filter(function(val){
         return !(!val || val === "");
   });
}

       
  },
  mounted(){
    this.$axios.get('/tree_shop_task').then(res=>{
      this.data2 = res.data.data;
    })
  },

  data() {
    return {
      filterText: "",
      datatable:[],
      columns1: [
        {
          type: "index",
          title: "序号",
          width: 80
        },
       
        {
          title: "名称",
          key: "name",
          
        },
        {
          title: "规格",
          key: "spec",
         
        },
        {
          title: "长度",
          key: "length",
          
        },
        {
          title: "宽度",
          key: "width",
          
        },
        {
          title: "备注",
          key: "comment",
         
        },
        {
          title: "数量",
     
          key: "number",
          align: "center",
          render:(h,params) => {
            let _this = this;
            return h('div',[
              h('Input',{
                props:{
                  type: 'text',
                  autofocus: true,
                  value: params.row.req_qty ? params.row.req_qty : params.row.number
                },
                on: {
                  'input' (value){
                    _this.datatable[params.index] = params.row;
                    params.row.req_qty = value;
                  }
                }
              })
            ])
          }
         }],
     
     
     
      data2: [
        // {
         
        //   label:"一级 1",
        //   number: 2,
        //   children: [
        //     {
             
        //       label: "二级 1-1",
        //       number:3,
        //       children: [
        //         {
                 
        //           label: "三级 1-1-1",
        //            number:3,
        //         },
        //         {
        //          number:3,
        //           label: "三级 1-1-2"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   number:3,
        //   label: "一级 2",
        //   children: [
        //     {
        //       number:3,
        //       label: "二级 2-1"
        //     },
        //     {
        //       number:3,
        //       label: "二级 2-2"
        //     }
        //   ]
        // },
        // {
        //   number:3,
        //   label: "一级 3",
        //   children: [
        //     {
        //      number:3,
        //       label: "二级 3-1"
        //     },
        //     {
        //       number:3,
        //       label: "二级 3-2"
        //     }
        //   ]
        // }
      ],
      defaultProps: {
        children: "children",
        label: "name",
        number: "number"
      }
    };
  }
};
</script>
