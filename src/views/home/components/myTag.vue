<style lang="less">
</style>

<template>
	<div>
		<!-- <ul v-for="(item,index) in statusData" v-if="(isStatus === 'true')&(isStatusBox === 'false')">
			<Tag color="primary" :key="index">{{ item }}</Tag>
		</ul> -->
		<Tag color="green" v-if="isStatusBox === 'false'">{{ statusData[0] }}</Tag>
		<Tag color="green" :key="index" v-for="(item,index) in statusData" v-if="isStatusBox === 'true'">{{ item }}</Tag>
		<Tag color="green" v-if="isSensorBox === 'false'">{{ sensorData[0] }}</Tag>
		<Tag color="green" :key="index" v-for="(item,index) in sensorData" v-if="isSensorBox === 'true'">{{ item }}</Tag>
		<Tag color="green" v-if="isTypeBox === 'false'">{{ typeData[0] }}</Tag>
		<Tag color="green" :key="index" v-for="(item,index) in typeData" v-if="isTypeBox === 'true'">{{ item }}</Tag>
		<Tag color="green" v-if="isName === 'true'">{{ nameData }}</Tag>
		
	</div>

    
</template>

<script>
export default {
    name: 'myTag',
    props: {
        //有没有，单选or复选，数据
        isStatusBox: String,
        statusData: Array,
        isSensorBox: String,
        sensorData: Array,
        isTypeBox: String,
        typeData: Array,
        isName: String,
        nameData: String,
    },
    watch: {
        typeData: {  
      　　　handler(newValue, oldValue) {   
                
      　　　},  
      　　　deep: true  
      　},
        sensorData: {  
        　　　handler(newValue, oldValue) {   

        　　　},  
        　　　deep: true  
        },
        statusData: {  
        　　　handler(newValue, oldValue) {   
            
        　　　},  
        　　　deep: true  
        }, 
      },
    computed: {

    },
};
</script>

