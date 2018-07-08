<template>
	<Row>
		<Card dis-hover>
            <p slot="title">
                <Icon type="ios-list-outline"></Icon>
                {{cardtitle}}
            </p>
			<CheckboxGroup v-model="user_ids" @on-change="handle_change">
			    <Checkbox v-for="(item,index) in users" :key="item.id" :label="item.id" >{{item.name}}</Checkbox>
			</CheckboxGroup>
		</Card>
	</Row>
</template>
<script>
export default {
    name: 'all-users',
    data () {
        return {
            users: [],
            user_ids: [],
        };
    },
    props: ['cardtitle'],
    mounted () {
        this.$axios.get("/user_list")
        .then(res =>{
            // console.log(res.data);
            this.users = res.data;
        })
        .catch( error => {
            console.log(error);
        });        
    },
    methods:{
    	handle_change(data){//data is an arr
    		this.$emit('update-selected',this.user_ids)
    	}
    }

};
</script>