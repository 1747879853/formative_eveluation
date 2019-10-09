<style lang="less">
    @import "./home.less";
</style>
<template>
    <div>
        <Row  v-if="show_histo">
        <Col span="12">
            <Card :bordered="false">
                <div slot="title">

                上周即时评价统计
                
                <Button @click="show_details_histo()">详情</Button>
                </div>
                
                <histo-gram ></histo-gram>
            </Card>
        </Col>
        </Row>
        <Row v-else>
            <Col span="12">
                <h1>欢迎使用本系统</h1>
            </Col>
        </Row>
   
       
    
    </div>
</template>
<script>
import histoGram from './components/histogram.vue';
export default {
    name: 'home',
    components: {
        histoGram, //上周提问活跃度——柱状图
        
       
    },
    data () {
        return { 
            show_histo:false,
            
            _width:"1500px",
        }
    },
    methods:{
        show_details_histo() {
            this.$router.push({ name: 'detailsHistogram' })
        }
    },
    mounted() {
        this.$axios.get("/show_histo").then( res =>{
            this.show_histo = res.data
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
    }
}
</script>
