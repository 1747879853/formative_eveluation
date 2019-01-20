<template>    
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        学生成绩查看&nbsp;&nbsp;&nbsp;
    </p>
    <p style="font-size:20px;padding:10px">
        {{stu.class_name}}&nbsp;&nbsp;&nbsp;{{stu.stu_name}}你好，你的成绩如下：&nbsp;&nbsp;&nbsp;
    </p>
    <div v-for="(item, index) in Columns" :key="index" style="padding:20px">
        <Table :columns="item" :data="data[index]" style="width: 100%;"></Table>
    </div>                         
</Card>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      stu:[],
      tab_msg:[],
      Columns: [],
      data:[],
    };
  },
  computed: {
  },
  mounted() {
      this.$axios.get("/studentgradeList").then(res => {
        this.stu = res.data.a;
        this.tab_msg=this.stu.table_msg;
        var tab_class_name={
              title: "课程名",
              key: "coursename",
              align: "center"
            };
        var tab_eval_name={
              title: "",
              key: "grade1",
              align: "center",
            };
        for(let i=0;i<this.tab_msg.length;i++){
            var tab=[];
            let m = JSON.parse(JSON.stringify(tab_class_name));
            tab.push(m);
            for(let j=0;j<this.tab_msg[i].eval.length;j++){
              let n = JSON.parse(JSON.stringify(tab_eval_name));
              n.title=this.tab_msg[i].eval[j].evalname;
              n.key="grade"+(j+1);
              tab.push(n);
            }
            this.Columns.push(tab);
        }
        console.log(this.Columns);
        this.data=res.data.b;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{     
  }
};
</script>
