<template>
    <Row>
        <Card>            
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                <span style="float:right;margin-right:100px;"> <Button type="primary" icon="plus-round" @click="goto_add_dailySummary">添加日报</Button></span>
            </div>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                        今日工作总结                  
            </div>
            <table style="text-align:center;width:900px;">
            <tr>&nbsp;</tr>
            <tr>
                <td>日期:</td>
                <td>
                    {{ date }}
                </td>
                <td>工作地点:</td>
                <td>
                    {{ address }}
                </td>
            </tr>
            <tr>&nbsp;</tr>
            <tr>
                <td>工作内容:</td>
                <td>
                    <span v-for="(item, indexi) in workcontent" :key="indexi" >
                        <span v-html="item"></span> <br>
                    </span>
                </td>
                <td>交通工具:</td>
                <td>
                    {{ transport }}
                </td>
            </tr>
            <tr>&nbsp;</tr>
            <tr>
                <td>工作说明:</td>
                <td>
                    {{ explain }}
                </td>
            </tr>
            <tr>&nbsp;</tr>
            </table>                    
        </Card>
        <Card>
            <Table :columns="costColumns" :data="costData" style="width: 100%;"></Table>
        </Card>
    </Row>
</template>

<script>

export default {
    name: 'dailywork',
    data() {
            return {
                date:'暂无数据',
                address:'暂无数据',
                workcontent:'暂无数据',
                transport:'暂无数据',
                explain:'暂无数据',
                costData:[],
                costColumns:[
                    {
                        type: "index",
                        title: "序号",
                        width: 60
                    },
                    {
                        title:'花费科目',
                        key: "names",
                        align: "center"
                    },
                    {
                        title:'具体事由',
                        key: "thing",
                        align: "center"
                    },
                    {
                        title:'费用',
                        key: "money",
                        align: "center"

                    },],
            }
    },
    mounted(){
        // this.init();
        //没绑定this照样可以？
        // if (this.$route.params.flag == undefined) {
        this.$axios.get("/getSummary").then( res =>{
        // this.costdata = res.data;
            if (res.data.flag === 1) {
                if (res.data.date.length > 0){
                    this.date = res.data.date;
                    this.address=res.data.address;
                    this.workcontent=res.data.workcontentformat;
                    this.transport=res.data.transport;
                    this.explain=res.data.explain;
                    this.costData=res.data.costdata;
                }
            }   
        }).catch(error =>{
            console.log(error);
        })

        // }
    },

    methods: {
        goto_add_dailySummary(){
            // 不给id，最后post时，自己加，修改router.js
            // let argu = { dailySummary_id: '-1'};
            this.$router.push({
                name: 'add-dailySummary',
                // params: argu
            });
        },
        // init(){
        //     // this.date = this.$route.params.data;
        //     // console.log(this.$route.params.flag == undefined);
        //     // debugger
        //     if (this.$route.params.flag == undefined) {
        //         return;
        //     }else{
        //         this.date = this.$route.params.date;
        //         this.address=this.$route.params.address;
        //         this.workcontent=this.$route.params.workcontent;
        //         this.transport=this.$route.params.transport;
        //         this.explain=this.$route.params.explain;
        //         this.costData=this.$route.params.costData;
        //     }
        //     // console.log(this.flag);
        //     // console.log(this.costData);
        // },
    },
}
</script>

<style>
	
</style>