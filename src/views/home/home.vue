<style lang="less">
    @import "./home.less";
</style>
<template>
    <div>
        <Row>
        <Col span="12" v-if="show_histo">
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
            show_histo:false
           
        }
    },
    mounted() {
        this.$axios.get("/show_histo").then( res =>{
            
           this.$axios.get('/now_show_histo', {
                params: {
                   checked_id:res.data.a.checked_id[0]
                }
            }).then(function(res) { 
              console.log(res.data[0].title)
              if(res.data[0].title=='超级管理员'||res.data[0].title=='开发者'){
                this.show_histo = true
              }
            }.bind(this))
            .catch(function(error) {
                console.log(error)
               
            });
        }).catch(error =>{
            console.log(error);
        });
    }
}
</script>
