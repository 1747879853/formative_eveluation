<style lang="less">
    @import './styles/infor-card.less';
</style>

<template>
    <Card :padding="0">
        <Row class="height-100" type="flex" align="middle" justify="center" :style="{backgroundColor: color, color: 'white'}">
            <Icon type="ios-eye" size="50"></Icon>
        </Row>
        <Row  align="middle" justify="center" class="height-100">
            <p class="infor-intro-text">{{ wellName }}</p>
            <p class="infor-intro-text">{{ startStatus }}</p>
            <p class="infor-intro-text">{{ sensor }}</p>
            <p class="infor-intro-text">{{ flulidProduction }}</p>
        </Row>
    </Card>
</template>

<script>
export default {
    name: 'inforCard',
    props: {
        well_id: String,
        wellName: String,
        //开停机状态 -2 -1 0 1 
        isStart: Number,
        // sensor
        sensor: String,
        flulidProduction: Number,
    },
    watch: {
        groups: {  
      　　　handler(newValue, oldValue) {   
                
      　　　},  
      　　　deep: true  
      　}  
      },
    computed: {
        color(){
            if (this.isStart == 1) {
                return "#f90";
            }else if(this.isStart == -1){
                return "#ed4014";
            }else if(this.isStart == -2){
                return '#663300';
            }
            return "#2d8cf0";
        },
        startStatus(){
            if (this.isStart == 1) {
                return this.$t('t_halt ');
            }else if(this.isStart == -1){
                return this.$t('t_long_shutdown ');
            }else if (this.isStart == -2) {
                return this.$t('t_unkonw');
            }
            return this.$t('t_running ');  
        }
    },
};
</script>

