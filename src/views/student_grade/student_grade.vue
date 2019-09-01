<template>    
<div>
<Card>
    <p slot="title" style="height:25px">
        <Icon type="ios-list"></Icon>
        查看成绩&nbsp;&nbsp;&nbsp;
    </p>
    <p style="font-size:20px;padding:10px" v-if="class_name!=null">
        {{class_name}}&nbsp;&nbsp;&nbsp;{{name}}&nbsp;你好，你的成绩如下：&nbsp;&nbsp;&nbsp;
    </p>
    <p style="font-size:20px;padding:10px" v-if="class_name==null">
        {{name}}老师你好，此处只允许学生查看成绩。&nbsp;&nbsp;&nbsp;
    </p>
    <div v-for="(items, index) in Columns" :key="index" style="padding:20px">
      <p style="font-size:20px;padding:10px">
        {{term[index].name}}:&nbsp;&nbsp;&nbsp;
      </p>
      <div v-if="items.length!=0" v-for="(item, index1) in items" :key="index1" style="padding:20px">
          <Table :columns="item" :data="data[index][index1]" style="width: 100%;" :id="index1"></Table>
      </div>
      <p style="font-size:15px;padding:10px;margin-left:40px" v-if="items.length==0">
          请等待老师提交成绩。&nbsp;&nbsp;&nbsp;
      </p> 
    </div>                        
</Card>

</div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      modal:false,
      commentCount:0,
      homeworkName:[],
      comment:[],
      table_list:[],
      tab_msg:[],
      Columns: [],
      data:[],
      name:'',
      class_name:'',
      term:[]
      
    };
  },
  computed: {
  },
  mounted() {
      this.$axios.get("/studentgradeList").then(res => {
        
        this.commentCount = 0
        this.name = res.data.a;
        this.class_name = res.data.b;
        this.table_list = res.data.c;
        this.term = res.data.d;
        this.data = res.data.e;
        for(let j = 0;j< this.data.length;j++){
          for(let i = 0;i< this.data[j].length;i++){
          console.log(this.data[j][i][0])
          }
        }
        console.log(this.data)
        for(let k = 0;k<this.table_list.length;k++){
          this.tab_msg=this.table_list[k];
          var tab_class_name={
              title: "课程名",
              key: "coursename",
              align: "center"
            };
            /*var tab_tea_comment= {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                           return  h('div', [
                           h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => { 
                                          console.log(params.row.coursename)   
                                          this.showModal(params.row.coursename) 
                                        }
                                    }
                                }, '查看评语')
                           ])
                        }
            }*/
          var tab_eval_name={
              title: "",
              key: "",
              align: "center",
            };
          var column = [];
          for(let i=0;i<this.tab_msg.length;i++){
            var tab=[];
            let m = JSON.parse(JSON.stringify(tab_class_name));
            tab.push(m);
            for(let j=0;j<this.tab_msg[i].eval.length;j++){
              let n = JSON.parse(JSON.stringify(tab_eval_name));
              n.title=this.tab_msg[i].eval[j].evalname;
              n.key='e'+this.tab_msg[i].eval[j].id;
              tab.push(n);
            }            
            //let n = JSON.parse(JSON.stringify(tab_tea_comment));
            //tab.push(tab_tea_comment);
            column.push(tab);
          }
          this.Columns.push(column)
        }
        console.log(this.Columns)
        /*
        for(let j = 0;j<this.table_list.length;j++){
          this.commentCount+=this.table_list[j][0].eval.length
       }
      
       for(let j = 0;j<this.Columns.length;j++){
         for(let i = 1;i<this.Columns[j][0].length-1;i++){
         this.homeworkName.push(this.Columns[j][0][i].title)
         }
       }
       console.log(this.Columns)
       for(let j = 0;j < res.data.f.length;j++){
         if(res.data.f[j]==null){
           res.data.f[j]='暂无评语'
         }
         this.comment.push(res.data.f[j])
       }*/
       console.log(this.comment)
       console.log(this.homeworkName)
       
         //console.log(this.Columns[0][0][0])
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{    
    //showModal(coursename){
      //this.modal=!this.modal
    //} 
  }
};
</script>
