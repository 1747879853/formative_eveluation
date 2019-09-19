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
                <histo-gram></histo-gram>
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
        histoGram //上周提问活跃度——柱状图
    },
    data () {
        return { 
            show_histo:false
           
        }
    },
    mounted() {
        this.$axios.get("/show_histo").then( res =>{
            this.show_histo = res.data.show            
        }).catch(error =>{
            console.log(error);
        });
    }
}
</script>
