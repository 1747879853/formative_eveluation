<style lang="less">
    @import "./home.less";
</style>
<template>
    <div>
        <Row>
        <Col span="12">
            <Card :bordered="false">
                <p slot="title">
                上周即时评价统计
                </p>
                <histo-gram></histo-gram>
            </Card>
        </Col>
        
        <Col span="12">
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
           
        }
    }
}
</script>
