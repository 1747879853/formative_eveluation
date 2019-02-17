<template>
<div>
  <Row>            
      <Card>
        <div style="text-align:center;font-size:24px;color: #2db7f5;">
            评价指标管理
        </div>当前学期：
        <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
            <Option v-for="(item, index) in term" :key="index" :value="item">{{item}}</Option>
        </Select>             
      </Card>                      
  </Row>
    <tree-grid 
        :items='data' 
        :columns='columns'
        :terms='option'
    ></tree-grid>
</div>           
</template>

<script>
import Vue from 'vue';

import TreeGrid from './treeGrid'
export default {
    name: 'evaluation-manage',
     data() {
            return {
                columns: [{
                      title: "评价指标号",
                      key: "eno",
                      align: "center"
                    },
                    {
                      title: "评价指标名",
                      key: "name",
                      align: "center"
                    },
                    {
                      title: "类型",
                      key: "types",
                      align: "center",
                    },
                    {
                      title: "描述",
                      key: "description",
                      align: "center",
                    },
                    {
                        title: '操作',
                        type: 'action',
                        actions: [
                        {
                            type: 'success',
                            text: '修改'
                        },{
                            type: 'error',
                            text: '删除'
                        }],
                        width: '150',
                }],
                data: [
                ],
                term:[],
                option:'',
            }
        },
         components: {
            TreeGrid
        },
    mounted(){
        // console.log('****************************************');
        this.$axios.get("/get_termList_e").then( res =>{
            this.term = res.data;
            this.termList();
        }).catch(error =>{
            console.log(error);
        });
    },
    methods:{
      termList(){
            let last = new Date();
            last = parseInt(last.getFullYear())+1;
            let termlast = parseInt(this.term[this.term.length-1].substring(0,4));
            // console.log(first)
            let m = last - termlast;
            for(let i = 1;i<=m;i++){
                if(this.term[this.term.length-1].indexOf('春季学期')!=-1){
                    this.term.push(termlast+"秋季学期");                    
                }
                this.term.push(termlast+1+"春季学期");
                this.term.push(termlast+1+"秋季学期");
            }
            let month = new Date();
            month = parseInt(month.getMonth()+1);
            if(month>8){
                this.option=last-1+"秋季学期";
            }else{
                this.option=last-1+"春季学期";
            } 

            this.$axios.post("/evaluationList1", {
                params: {
                    term:this.option,
                }
            }).then(res => {
              this.data = res.data;
              // console.log(res.data);
            })
            .catch(error => {
              console.log(error);
            });
        },
        selected() {
            this.data=[];
            this.$axios.post("/evaluationList1", {
                params: {
                    term:this.option,
                }
            }).then( res =>{
                this.data = res.data;               
            }).catch(error =>{
                console.log(error);
            });
        },
    }
};
</script>

<style>

</style>
