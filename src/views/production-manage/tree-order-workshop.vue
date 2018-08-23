
<style>
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
<div>
 <Row>
                        <Input v-model="searchConName2" @on-change="handleSearch2" icon="search" placeholder="请输入姓名搜搜..." style="width: 200px" />
                        <Input v-model="searchConTel2" @on-change="handleSearch2" icon="search" placeholder="请输入手机号搜搜..." style="width: 200px" />
        <Button type="success" @click="give_team">分配</Button>
        </Row>
    <tree-grid 
        ref="selection"
        :items='data' 
        :columns='columns'
         @on-selection-change='selectionClick'
    ></tree-grid>    
    </div>        
</template>

<script>
import Vue from "vue";

import TreeGrid from "./treeGrid";
export default {
  name: "authority-manage",
  data() {
    return {
      modal2: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          width: "150"
        },
        {
          title: "规格",
          key: "spec",
          width: "150"
        },
        {
          title: "长度",
          key: "length",
          width: "150"
        },
        {
          title: "宽度",
          key: "width",
          width: "150"
        },
        {
          title: "备注",
          key: "comment",
          width: "150"
        },
        {
          title: "数量",
          type: "input1",
          key: "number",
          align: "center"
         }
        // {
        //   title: "操作",
        //   type: "action",
        //   actions: [
        //     {
        //       type: "success",
        //       text: "修改"
        //     },
        //     {
        //       type: "error",
        //       text: "删除"
        //     }
        //   ],
        //   width: "150"
        // }
      ],
      data: [],
      f_authority: "",
      f_name: "",
      f_condition: "",
      f_status: "",
      initTable: [],
      searchConName2: "",
      searchConTel2: "",
      check_data: [],
      check_data1: []
    };
  },
  components: {
    TreeGrid
  },
 
  mounted() {
   
    this.$axios
      .get("/tree_grid_xialiao_task_list")
      .then(res => {
        this.data = this.initTable = res.data.data;
        console.log(this.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleSearch2() {
      this.data = this.initTable;

      this.data = this.search(this.data, {
        name: this.searchConName2
      });
    },
    search(data, argumentObj) {
      this.check_data1 = this.check_data;
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
      console.log(this.check_data1);
      return res;
    },
    give_team(){
      console.log(this.data);

      this.$axios.get('/tree_grid_xialiao_task_list',{params:{data:this.data}}).then(res=>{

      })
    },
    selectionClick(arr) {
      console.log("选中数据id数组:" + arr);
      this.check_data = arr;
    }
  }
};
</script>
