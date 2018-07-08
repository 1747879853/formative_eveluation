<template>
	<Row>
		<Card dis-hover>
            <p slot="title">
                <Icon type="ios-list-outline"></Icon>
                {{cardtitle}}
            </p>
			<CheckboxGroup v-model="group_ids" @on-change="handle_change">
			    <Checkbox v-for="(item,index) in user_groups" :key="item.id" :label="item.id" >{{item.name}}</Checkbox>
			</CheckboxGroup>
		</Card>
	</Row>
</template>
<script>
export default {
    name: 'user-group',
    data () {
        return {
            user_groups: [],
            group_ids: [],
        };
    },
    props: ['cardtitle'],
    mounted () {
        this.$axios.get("/user_group_list")
        .then(res =>{
            // console.log(res.data);
            this.user_groups = res.data;
        })
        .catch( error => {
            console.log(error);
        });        
    },
    methods:{
    	handle_change(data){//data is an arr
    		this.$emit('update-selected',this.group_ids)
    	}
    }

};
</script>