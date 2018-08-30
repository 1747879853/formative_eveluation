<style lang="less">
@import "./advanced-router.less";
</style>

<template>
<div>
<Row>
        <Col span="6">
            <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>

<el-tree
  class="filter-tree"
  :data="data2"
  :props="defaultProps"
  node-key="id"
  show-checkbox
  @check-change ="checkChange"
  :filter-node-method="filterNode"
  ref="tree2"
 
>
</el-tree>
 
        </Col>
        <Col span="18">
          <Modal width="60%" v-model="show_procedure" title="添加制作工序(  务必按顺序添加  )" @on-ok="give_task_teamx">
           <!-- {{model10}} -->
            <Select v-model="model10" multiple style="width:500px" placeholder="请按顺序添加生产工序">
            <Option v-for="item in workteams" :value="item.id" :key="item.id">{{ item.name }}</Option>
          
            </Select>

           
        </Modal>
         <Input v-model="searchConName2" @on-change="handleSearch2" icon="search" placeholder="请输入名称搜索..." style="width: 200px" />
         <Poptip
        confirm
        title="确定分配吗?"
        @on-ok="show_proc"
        placement="bottom"
       >
        <Button type="primary" shape="circle">分配</Button>
    </Poptip>
         <!-- <Button type="primary" shape="circle" @click="show_proc">分配</Button> -->
        <Table :columns="columns1" :data="datatable"  highlight-row @on-row-click="thisrow"></Table>
     
        
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
 data() {
    return {
      filterText: "",
      datatable: [],
      searchConName2: "",
      datac: [],
      workteams: [],
      model10: [],
      show_procedure: false,
      columns1: [
        {
          type: "index",
          title: "序号",
          width: 80
        },

        {
          title: "名称",
          key: "name"
        },
        {
          title: "规格",
          key: "spec"
        },
        {
          title: "长度",
          key: "length"
        },
        {
          title: "宽度",
          key: "width"
        },
        {
          title: "备注",
          key: "comment"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "分配数量",

          key: "given_number",
          align: "center",
          render: (h, params) => {
            let _this = this;
            return h("div", [
              h("Input", {
                props: {
                  type: "text",
                  autofocus: true,
                  value: params.row.give_number
                },
                on: {
                  input(value) {
                    // _this.datatable[params.index] = params.row;
                    params.row.given_number = value;
                    //  _this.changedata2(params.row.id,params.row.given_number);
                  },
                  "on-blur"(e) {
                    // console.log(e);
                    // _this.datatable[params.index] = params.row;
                    params.row.given_number = e.target.value
                      ? e.target.value
                      : "";
                    if (params.row.given_number < 0) {
                      _this.$Message.info("分配数量不可小于0");
                      params.row.given_number = "";
                    }
                    if (params.row.number < params.row.given_number) {
                      _this.$Message.info("分配数量不可大于可分配数量");
                      params.row.given_number = "";
                    }

                    _this.changedata2(
                      params.row.id,
                      params.row.given_number,
                      params.row.number
                    );
                  }
                }
              })
            ]);
          }
        }
      ],

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
        number: "number",
        give_number: "give_number"
      }
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // getCheckedKeys() {
    //     console.log(this.$refs.tree2.getCheckedKeys());
    //   },
    checkChange(data, checked) {
      // console.log(checked);
      var j = 0;
      var datatable1 = this.$refs.tree2.getCheckedNodes();
      var length1 = datatable1.length;
      if (length1 > 0) {
        for (j = 0; j < datatable1.length; j++) {
          if (
            datatable1[j]["id"].toString().indexOf("m") > -1 ||
            datatable1[j]["id"].toString().indexOf("w") > -1
          ) {
            delete datatable1[j];
          }
        }
        // if (checked){
        //  this.datatable = this.bouncer(datatable1);
        // }else{
        //   this.removeByValue(this.datatable,data);
        // }
        this.datatable = this.bouncer(datatable1);
      } else {
        this.datatable = [];
      }
      //    this.datatable = [];
      //   if(checked){
      //      if (data&&!data.children){
      //     this.datatable.push(data);
      //   }
      //   else if (data.children&&!data.children[0].children){
      //       this.datatable =data.children;
      //     }
      //   else if (data.children[0].children){
      //      for(var i= 0;i<data.children.length;i++){
      //        this.datatable.push(...data.children[i]["children"])
      //      }
      //     }

      // } else{
      //   this.datatable = [];
      // }
    },
    bouncer(arr) {
      return arr.filter(function(val) {
        return !(!val || val === "");
      });
    },
    changedata2(id, values, total) {
      for (let value of this.data2) {
        if (value["children"]) {
          for (let val of value["children"]) {
            for (let val1 of val["children"]) {
              if (val1["id"] == id) {
                val1["give_number"] = values;
              }
            }
          }
        }
      }
      this.checkChange();
    },
    handleSearch2() {
      this.checkChange();
      this.datac = this.datatable;

      this.datatable = this.search(this.datac, {
        name: this.searchConName2
      });
    },
    search(data, argumentObj) {
      let res = data;
      let dataClone = data;
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            return d[argu].indexOf(argumentObj[argu]) > -1;
          });
          dataClone = res;
        }
      }

      return res;
    },

    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    show_proc() {
      this.teams();
      this.show_procedure = true;
    },
    thisrow(row) {},
    teams() {
      this.$axios
        .get("/teams", {
          params: {
            work_shop_id: 1
          }
        })
        .then(res => {
          this.workteams = res.data.teams;
        })
        .catch(error => {
          console.log(error);
        });
    },
    give_task_teamx() {
      this.checkChange();
      if (this.datatable && this.datatable.length > 0&&this.model10.length>0) {
        this.$axios
          .post("/give_task_teamx", {
            data: this.datatable,
            procedure: this.model10.join(","),
          })
          .then(res => {
            this.$Message.info("分配成功");
            this.init();
          });
      }
    },
    init(){
         this.$axios.get("/tree_shop_task").then(res => {
      
      if(res.data.data[0].children[0].children&&res.data.data[0].children[0].children.length>0){
         this.data2 = res.data.data;
      }else{
        this.data2 =[];
      }
     
    });
  },
    
  },
  created() {},
  mounted() {
    this.init();
  },

 
};
</script>
