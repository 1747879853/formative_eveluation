<style lang="less">
    @import "./home.less";
</style>
<template>
    <div>
        <Row  v-if="show_histo">
        <Col span="12">
            <Card :bordered="false">
                <p slot="title">
                上周即时评价统计
                </p>
                <Button @click="show_details_histo()">详情</Button>
                <histo-gram></histo-gram>
            </Card>
        </Col>
        </Row>
        <Row v-else>
            <Col span="12">
                <h1>欢迎使用本系统</h1>
            </Col>
        </Row>
    <Modal v-model="show_details" width="1500px" height="1000px" :closable="false">
        <details-histogram ></details-histogram>
    </Modal>
        
        
    </div>
</template>
<script>
import histoGram from './components/histogram.vue';
import detailsHistogram from './components/details_histogram.vue'
export default {
    name: 'home',
    components: {
        histoGram, //上周提问活跃度——柱状图
        detailsHistogram //活跃度详情
    },
    data () {
        return { 
            show_histo:false,
            show_details:false
        }
    },
    methods:{
        show_details_histo() {
            this.show_details = true
        }
    },
    mounted() {
        this.$axios.get("/show_histo").then( res =>{
            this.show_histo = res.data
            console.log("sdfsadfsdf")
            console.log(res.data)          
        }).catch(error =>{
            console.log(error);
        });
    }
}
</script>
