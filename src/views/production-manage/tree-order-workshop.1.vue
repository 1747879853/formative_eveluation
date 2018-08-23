<style lang="less">
@import "./advanced-router.less";
</style>

<template>
<div>
<el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>

<el-tree
  class="filter-tree"
  :data="data2"
  :props="defaultProps"
  
  show-checkbox
  :filter-node-method="filterNode"
  ref="tree2"
>
<span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>{{ data.parent }}</span>
        <span>
          <Input v-model="value" size="small" placeholder="small size" />
          
        </span>
      </span>
</el-tree>
  </div>
    
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "mutative-router",
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

       
  },

  data() {
    return {
      filterText: "",
      data2: [
        {
         
          label:"一级 1",
          number: 2,
          children: [
            {
             
              label: "二级 1-1",
              number:3,
              children: [
                {
                 
                  label: "三级 1-1-1",
                   number:3,
                },
                {
                 number:3,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          number:3,
          label: "一级 2",
          children: [
            {
              number:3,
              label: "二级 2-1"
            },
            {
              number:3,
              label: "二级 2-2"
            }
          ]
        },
        {
          number:3,
          label: "一级 3",
          children: [
            {
             number:3,
              label: "二级 3-1"
            },
            {
              number:3,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        number: "number"
      }
    };
  }
};
</script>
