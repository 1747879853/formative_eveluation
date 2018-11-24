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
            <p class="infor-intro-text">{{ startStatus }}</p> 
        </Row>
    </Card>
</template>

<script>
export default {
    name: 'inforCard',
    props: {
        well_id: String,
        wellName: String,
        //开停机状态 -1 0 1
        isStart: Number,
        // sensor
        sensor: Array,
        flulidProduction: Number,
    },
    computed: {
        color(){
            if (this.isStart == 1) {
                return "yellow";
            }else if(this.isStart == -1){
                return "red";
            }
            return "green";
        },
        startStatus(){
            if (this.isStart == 1) {
                return "当日停机";
            }else if(this.isStart == -1){
                return "长停";
            }
            return "正在运行";  
        }
    },
};
</script>

